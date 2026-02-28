import User from "@/lib/models/user";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import Session from "@/lib/models/session";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        await connectDB();

        const cookieStore = await cookies();
        
        
        // 1. Get info from body
        const { email, password } = await req.json();

        // 2. Validate data
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        // 3. Find user (including password field which is hidden by default)
        const user = await User.findOne({ email }).select("+password");
        
        if (!user) {
            return NextResponse.json(
                { message: "Invalid email or password" }, 
                { status: 401 }
            );
        }

        // 4. Verify password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return NextResponse.json(
                { message: "Invalid email or password" }, 
                { status: 401 }
            );
        }

        // 5. Create session in DB
        const sessionId = crypto.randomUUID();
        await Session.create({ sessionId, userId: user._id });

        cookieStore.set("sessionID", sessionId, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        // 5. Successful Login
        // Remove password before sending user data back
        const { password: _, ...userWithoutPassword } = user.toObject();

        return NextResponse.json(
            { 
                message: "Login successful", 
                user: userWithoutPassword 
            }, 
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message }, 
            { status: 500 }
        );
    }
}
