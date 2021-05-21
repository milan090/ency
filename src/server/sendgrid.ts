import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY)
  throw new Error("Please provide the following variable in your .env file: SENDGRID_API_KEY");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const SENDGRID_PRELAUNCH_TEMPLATE_ID = "d-268dd7f7fce443ca9d5b3f98c1265629";

export { sgMail };
