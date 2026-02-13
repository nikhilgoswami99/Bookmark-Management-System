import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Bookmark from "@/lib/models/bookmark";

export async function GET() {
  try {
    await connectDB();

    const bookmarks = await Bookmark.find({}).sort({ createdAt: -1 });

    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bookmarks" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { title, url, description, tags, favicon } = body;
    
    const bookmark = await Bookmark.create({
      title,
      url,
      description,
      tags,
      favicon,
    });
    

    return NextResponse.json({ message: "Bookmark created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create bookmark" },
      { status: 500 }
    );
  }
}


