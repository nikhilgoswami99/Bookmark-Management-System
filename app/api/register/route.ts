import User from "@/lib/models/user";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await connectDB();
        
        // 1. Get info from body
        const { name, email, password } = await req.json();

        // 2. Validate data
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "All fields (name, email, password) are required" },
                { status: 400 }
            );
        }

        // 3. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "A user with this email already exists" }, 
                { status: 400 }
            );
        }

        // 4. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Create user
        await User.create({ name, email, password: hashedPassword });

        return NextResponse.json(
            { message: "User registered successfully" }, 
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message }, 
            { status: 500 }
        );
    }
}