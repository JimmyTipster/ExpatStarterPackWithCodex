import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient as createAdminClient } from "@supabase/supabase-js";

import { getStripeServerClient } from "@/lib/stripe/stripe";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!secret || !serviceRole || !supabaseUrl) {
    return NextResponse.json({ error: "Webhook environment is incomplete." }, { status: 500 });
  }

  const payload = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe signature." }, { status: 400 });
  }

  try {
    const stripe = getStripeServerClient();
    const event = stripe.webhooks.constructEvent(payload, signature, secret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (userId) {
        const supabase = createAdminClient(supabaseUrl, serviceRole);
        await supabase.from("profiles").upsert(
          {
            id: userId,
            is_premium: true,
            premium_purchased_at: new Date().toISOString(),
            stripe_payment_id: session.payment_intent?.toString() ?? session.id,
          },
          { onConflict: "id" },
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook verification failed." },
      { status: 400 },
    );
  }
}
