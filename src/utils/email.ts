import log from "logger";
import nodemailer from "nodemailer";
import { container } from "tsyringe";
import { EmailHTMLTemplateDao, EmailTemplateDao } from "../dao/vigor/emailRelatedDaos";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// verify connection configuration//
transporter.verify(function (err: Error, success: boolean) {
  if (err) {
    log.info(err);
  } else {
    log.info("Server is ready to take our messages");
  }
});

function sendEmail(msg: Record<any, any>) {
  // send email using nodemailer
  transporter.sendMail(msg, function (err: Error, info: any) {
    err ? log.error(err) : log.info(info);
  });
}

export async function sendMail(
  to: string,
  emailHtmlName: string,
  templateName: string,
  content: Record<string, string>
) {
  const emailHTMLTemplate = await container.resolve(EmailHTMLTemplateDao).findByName(emailHtmlName);
  const emailTemplate = await container.resolve(EmailTemplateDao).findByName(templateName);

  emailHTMLTemplate.emailHTMLContent = emailHTMLTemplate.emailHTMLContent
    .replace("{{emailTitle}}", emailTemplate.emailTitle)
    .replace("{{emailBody}}", emailTemplate.emailContent);
  Object.entries(content).map(([key, value]) => {
    emailHTMLTemplate.emailHTMLContent = emailHTMLTemplate.emailHTMLContent.replace(`{${key}}`, value);
  });

  const mailOptions = {
    from: "manish.shakya534@gmail.org", // listed in rfc822 message header
    to: to, // listed in rfc822 message header
    html: `${emailHTMLTemplate.emailHTMLContent}`, // html body
    subject: emailTemplate.subject,
  };
  sendEmail(mailOptions);
}
