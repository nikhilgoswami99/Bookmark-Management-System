import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Bookmark from "@/lib/models/bookmark";
import { getSession } from "@/lib/getSession";

export async function GET() {
  try {
    const userId = await getSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const bookmarks = await Bookmark.find({ ownerId: userId }).sort({ createdAt: -1 });

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
    const userId = await getSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    const body = await req.json();
    const { title, url, description, tags, favicon } = body;
    
    const bookmark = await Bookmark.create({
      title,
      url,
      description,
      tags,
      favicon,
      ownerId: userId,
    });

    return NextResponse.json({ message: "Bookmark created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create bookmark" },
      { status: 500 }
    );
  }
}


