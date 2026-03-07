import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Bookmark from "@/lib/models/bookmark";
import { getSession } from "@/lib/getSession";

export async function GET() {
  try {
    const userId = await getSession();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    // The .distinct() method returns an array of unique values for a field
    const uniqueTags = await Bookmark.distinct("tags", { ownerId: userId });

    console.log(uniqueTags);
    
    // Sort them alphabetically for a better UI
    const sortedTags = uniqueTags.sort((a, b) => a.localeCompare(b));

    return NextResponse.json(sortedTags, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
  }
}
