import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";
import { formatDate } from "@/lib/utils/dates";

export function HolidaysSection({ country }: { country: Country }) {
  return (
    <CountrySectionShell
      id="holidays"
      title="Public holidays"
      description="A quick 2026 holiday view so you can anticipate closed offices, schools, and services."
    >
      <div className="overflow-hidden rounded-[1.35rem] border border-border/70">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/60 text-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Holiday</th>
              <th className="px-4 py-3 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {country.holidays.map((holiday) => (
              <tr key={holiday.name} className="border-t border-border/60 bg-background/85">
                <td className="px-4 py-3">{formatDate(holiday.date)}</td>
                <td className="px-4 py-3 font-medium text-foreground">{holiday.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{holiday.note ?? "National holiday"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CountrySectionShell>
  );
}
