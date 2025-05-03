import { eq } from 'drizzle-orm';
import { User } from '../config/types.js';
import db from '../db/connection.js';
import { users } from '../db/schema.js';

async function addOneUser(newUser: User) {
  const [user] = await db
    .insert(users)
    .values({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      validationCode: newUser.validationCode,
    })
    .returning();

  return user;
}

async function getUserByEmail(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  return user;
}

const userModel = {
  addOneUser,
  getUserByEmail,
};

export default userModel;
