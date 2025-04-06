import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

if (!process.env.RESENT_EMAIL_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined");
}
const resend = new Resend(process.env.RESENT_EMAIL_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["b.koychev95@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
