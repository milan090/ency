import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { handler } from "src/server/api-handler";
import prisma from "src/server/prisma/prisma";
import { SENDGRID_PRELAUNCH_TEMPLATE_ID, sgMail } from "src/server/sendgrid";

export default handler().post(async (req, res) => {
  const email = req.body.email;

  if (!email || typeof email !== "string")
    return res.status(400).json({ error: "No email field provided in body" });

  try {
    await prisma.preLaunchEmail.create({
      data: {
        email: email,
      },
    });
    await sgMail.send({
      to: email,
      from: {
        name: "Ency",
        email: "info@ency.live",
      },
      subject: "Welcome to Ency!",
      templateId: SENDGRID_PRELAUNCH_TEMPLATE_ID,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code !== "P2002") {
        console.error(error);
        res.status(503).json({ erorr: "Something went wrong on our side" });
      }
    } else {
      console.error(error);
      res.status(503).json({ erorr: "Something went wrong on our side" });
    }
  }

  return res.send("Success");
});
