import { createClient } from "@/lib/supabase/client";
import { getSupabaseConfig } from "@/lib/supabase/config";
import type { UserProfile } from "@/stores/userProfileStore";

export async function syncProfileToSupabase(profile: UserProfile) {
  const { isConfigured } = getSupabaseConfig();

  if (!isConfigured) {
    return { synced: false, reason: "supabase-not-configured" as const };
  }

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { synced: false, reason: "no-user" as const };
    }

    const payload = {
      id: user.id,
      destination_country: profile.destinationCountry || null,
      arrival_date: profile.arrivalDate || null,
      has_arrived: profile.hasArrived,
      home_country: profile.homeCountry || null,
      nationality: profile.nationality || null,
      is_eu_citizen: profile.isEuCitizen,
      has_dual_citizenship: profile.hasDualCitizenship,
      second_nationality: profile.secondNationality || null,
      situation: profile.situation,
      number_of_children: profile.numberOfChildren,
      children_ages: profile.childrenAges,
      school_preference: profile.schoolPreference,
      has_pension: profile.hasPension,
      pension_type: profile.pensionType || null,
      is_university_student: profile.isUniversityStudent,
      employment_situation: profile.employmentSituation,
      has_drivers_license: profile.hasDriversLicense,
      driver_license_country: profile.driverLicenseCountry || null,
      has_pet: profile.hasPet,
      pet_type: profile.petType || null,
      priorities: profile.priorities,
      wizard_completed: profile.wizardCompleted,
      wizard_completed_at: profile.wizardCompletedAt || null,
      profile_data: profile,
    };

    const { error } = await supabase.from("profiles").upsert(payload, {
      onConflict: "id",
    });

    if (error) {
      return { synced: false, reason: error.message as string };
    }

    return { synced: true as const };
  } catch (error) {
    return { synced: false, reason: error instanceof Error ? error.message : "unknown-error" };
  }
}
