import { NextResponse } from "next/server";
import Bookmark from "@/lib/models/bookmark";
import { getSession } from "@/lib/getSession";
import { connectDB } from "@/lib/connectDB";


export async function DELETE(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const userId = await getSession();
        if (!userId) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        await Bookmark.findOneAndDelete({ _id: id, ownerId: userId });
        
        return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}