import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";

export function EducationSection({ country }: { country: Country }) {
  const education = country.educationInfo;

  return (
    <CountrySectionShell
      id="education"
      title="Education and childcare"
      description="The shape of childcare, school options, university setup, and language support."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.35rem] bg-background/85 p-5">
          <p className="font-semibold text-foreground">Childcare and schools</p>
          <div className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
            {education.childcare.map((item) => (
              <p key={item.localName}>
                <span className="font-semibold text-foreground">{item.localName}</span>: {item.averageCost}
              </p>
            ))}
            <p>{education.primarySchool.overview}</p>
            <p>{education.secondarySchool.overview}</p>
          </div>
        </div>
        <div className="rounded-[1.35rem] bg-background/85 p-5">
          <p className="font-semibold text-foreground">University and language courses</p>
          <div className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
            <p>{education.university.tuitionRange}</p>
            <p>{education.university.applicationNotes}</p>
            <p>{education.adultLanguageCourses.overview}</p>
            {education.adultLanguageCourses.providers.map((provider) => (
              <p key={provider}>{provider}</p>
            ))}
          </div>
        </div>
      </div>
    </CountrySectionShell>
  );
}
