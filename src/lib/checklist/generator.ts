import type { Country, ChecklistTask } from "@/data/types";
import type { UserProfile } from "@/stores/userProfileStore";
import { isEeaCitizen } from "@/lib/utils/eu";

export function generateChecklist(
  country: Country,
  profile: UserProfile,
): ChecklistTask[] {
  const allTasks = country.tasks;
  const hasFreeMoveRight =
    isEeaCitizen(profile.nationality) && isEeaCitizen(country.isoCode);

  return allTasks
    .filter((task) => {
      if (task.originRule) {
        switch (task.originRule.type) {
          case "eu-only":
            if (!hasFreeMoveRight) {
              return false;
            }
            break;
          case "non-eu-only":
            if (hasFreeMoveRight) {
              return false;
            }
            break;
          case "specific-countries":
            if (!task.originRule.countries?.includes(profile.nationality)) {
              return false;
            }
            break;
          default:
            break;
        }
      }

      if (task.audience.includes("everyone")) {
        return true;
      }

      const matchesAudience = task.audience.some((audience) => {
        switch (audience) {
          case "family":
            return ["family", "single-parent"].includes(profile.situation);
          case "family-toddler":
            return profile.childrenAges?.some((age) => age <= 3);
          case "family-preschool":
            return profile.childrenAges?.some((age) => age >= 4 && age <= 5);
          case "family-school":
            return profile.childrenAges?.some((age) => age >= 6 && age <= 14);
          case "family-teen":
            return profile.childrenAges?.some((age) => age >= 15);
          case "pensioner":
            return profile.situation === "pensioner";
          case "student":
            return profile.situation === "student";
          case "driver":
            return profile.hasDriversLicense;
          case "pet-owner":
            return profile.hasPet;
          case "pet-dog":
            return profile.hasPet && profile.petType === "dog";
          case "employed":
            return profile.employmentSituation === "employed";
          case "remote-worker":
            return profile.employmentSituation === "remote-worker";
          case "freelancer":
            return ["freelancer", "starting-business"].includes(
              profile.employmentSituation,
            );
          case "starting-business":
            return profile.employmentSituation === "starting-business";
          case "job-seeker":
            return profile.employmentSituation === "job-seeker";
          case "not-working":
            return profile.employmentSituation === "not-working";
          default:
            return false;
        }
      });

      return matchesAudience;
    })
    .sort((a, b) => {
      if (a.isMandatory !== b.isMandatory) {
        return a.isMandatory ? -1 : 1;
      }
      if (a.deadlineDays && b.deadlineDays) {
        return a.deadlineDays - b.deadlineDays;
      }
      if (a.deadlineDays && !b.deadlineDays) {
        return -1;
      }
      return a.sortOrder - b.sortOrder;
    });
}
