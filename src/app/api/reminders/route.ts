import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

import { getCountryBySlug } from "@/data/countries";
import { generateChecklist } from "@/lib/checklist/generator";
import { calculateDeadline, daysUntil } from "@/lib/utils/dates";
import { sendReminderEmail } from "@/lib/email/reminders";
import type { UserProfile } from "@/stores/userProfileStore";

export async function POST(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const requestSecret = request.headers.get("x-cron-secret");

  if (!cronSecret || requestSecret !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceRole || !supabaseUrl) {
    return NextResponse.json({ error: "Supabase service credentials are missing." }, { status: 500 });
  }

  const supabase = createAdminClient(supabaseUrl, serviceRole);
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email, notifications_enabled, profile_data, destination_country")
    .eq("notifications_enabled", true);

  const sent: string[] = [];

  for (const profileRow of profiles ?? []) {
    const profile = profileRow.profile_data as UserProfile | null;
    const destinationSlug = profileRow.destination_country || profile?.destinationCountry;

    if (!profile || !destinationSlug || !profileRow.email) {
      continue;
    }

    const country = await getCountryBySlug(destinationSlug);

    if (!country) {
      continue;
    }

    const tasks = generateChecklist(country, profile).filter((task) => {
      if (!task.deadlineDays) {
        return false;
      }

      const deadline = calculateDeadline(profile.arrivalDate, task.deadlineDays);
      const days = deadline ? daysUntil(deadline) : null;

      return days !== null && [0, 1, 7].includes(days);
    });

    if (!tasks.length) {
      continue;
    }

    await sendReminderEmail({
      to: profileRow.email as string,
      countryName: country.name,
      tasks: tasks.map((task) => task.title),
    });

    sent.push(profileRow.id as string);
  }

  return NextResponse.json({ ok: true, sentCount: sent.length, userIds: sent });
}
