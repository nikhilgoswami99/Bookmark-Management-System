import { connectDB } from "@/lib/connectDB";
import Session from "@/lib/models/session";
import User from "@/lib/models/user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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






export async function PATCH(req: NextRequest) {
  try {
    // Step 1: Connect to DB
    await connectDB();

    // Step 2: Get sessionID from cookies
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionID")?.value;

    if (!sessionId) {
      return NextResponse.json({ message: "Not logged in" }, { status: 401 });
    }

    // Step 3: Extract data from request body
    const body = await req.json();

    // Step 4 (security): Only allow safe fields — never trust raw body
    const allowedFields = ["name", "profilePic"];
    const updates: Record<string, any> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ message: "No valid fields to update" }, { status: 400 });
    }

    // Step 4: Use sessionID → find session → get userId → update user
    const session = await Session.findOne({ sessionId });
    if (!session) {
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      session.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Step 5: Return updated user to refresh the UI
    return NextResponse.json({ user: updatedUser }, { status: 200 });

  } catch (error: any) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

