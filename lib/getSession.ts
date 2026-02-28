import { cookies } from "next/headers";
import { connectDB } from "@/lib/connectDB";
import Session from "@/lib/models/session";

export async function getSession() {
  // 1. Read the "sessionID" cookie
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionID")?.value;

  // 2. If no cookie, return null
  if (!sessionId) return null;

  // 3. Connect to DB
  await connectDB();

  // 4. Find session in DB by sessionId
  const session = await Session.findOne({ sessionId });

  // 5. If no session found, return null
  if (!session) return null;

  // 6. Return the userId
  return session.userId;
}
