import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { getStripeServerClient } from "@/lib/stripe/stripe";
import { getSupabaseConfig } from "@/lib/supabase/config";

export async function POST() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const stripe = getStripeServerClient();
    const { isConfigured } = getSupabaseConfig();

    if (!isConfigured) {
      return NextResponse.json(
        { error: "Supabase must be configured before checkout can identify the user." },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Please log in before checkout." }, { status: 401 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 200,
            product_data: {
              name: "Expat Starter Pack Premium",
              description: "One-time premium unlock for deeper country guidance.",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/profile?payment=success`,
      cancel_url: `${siteUrl}/pricing?payment=cancelled`,
      metadata: {
        userId: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create checkout session." },
      { status: 500 },
    );
  }
}
