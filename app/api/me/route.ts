import { connectDB } from "@/lib/connectDB";
import Session from "@/lib/models/session";
import User from "@/lib/models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionID")?.value;

    if (!sessionId) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const session = await Session.findOne({ sessionId });
    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = await User.findById(session.userId).select("-password");
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ user }, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching user session:", error);
    return NextResponse.json({ user: null, message: "Server error" }, { status: 500 });
  }
}
