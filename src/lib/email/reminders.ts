import { Resend } from "resend";

interface ReminderEmailParams {
  to: string;
  countryName: string;
  tasks: string[];
}

export async function sendReminderEmail({
  to,
  countryName,
  tasks,
}: ReminderEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { sent: false, reason: "missing-resend-key" as const };
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "Expat Starter Pack <reminders@expatstarterpack.com>",
    to,
    subject: `Upcoming relocation tasks for ${countryName}`,
    html: `<p>Here are the tasks coming up in your Expat Starter Pack:</p><ul>${tasks
      .map((task) => `<li>${task}</li>`)
      .join("")}</ul>`,
  });

  return { sent: true as const };
}
