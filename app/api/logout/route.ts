import { connectDB } from "@/lib/connectDB";
import Session from "@/lib/models/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionID")?.value;

    if (sessionId) {
      await Session.deleteOne({ sessionId });
      cookieStore.delete("sessionID");
    }

    return NextResponse.json({ message: "Logout successful" }, { status: 200 });

  } catch (error: any) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Server error during logout" }, { status: 500 });
  }
}
