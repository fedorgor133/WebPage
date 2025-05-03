import { createTransport } from 'nodemailer';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

const transport = createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

async function sendEmail(to: string, subject: string, content: string) {
  const info = await transport.sendMail({
    from: '"Room Seekers Team" <info@room-seekers.com>',
    to,
    subject,
    html: content,
  });

  return info;
}

export default sendEmail;
