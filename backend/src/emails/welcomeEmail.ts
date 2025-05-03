import sendEmail from '../config/email-config.js';
import { User } from '../config/types.js';

async function welcomeEmail(user: User) {
  const subject = 'Welcome 🤘!';
  const content = `
  <h1>Welcome ${user.name} to <u>Room Seekers</u>!</h1>
  <p>We hope you will enjoy our platform.</p>

  <p>Before you can use the web you need to validate your email. Click the next link to <a href="http://localhost:4321/users/validate?code=${user.validationCode}&email=${user.email}" >confirm your email.</a></p>

  <p>Don't hesitate to contact us if you have any question.</p>
  `;
  const info = await sendEmail(user.email, subject, content);
  // console.log('📨', info);
  return info;
}

export { welcomeEmail };
