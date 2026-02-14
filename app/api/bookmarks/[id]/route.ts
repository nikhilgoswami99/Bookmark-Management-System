import { NextResponse } from "next/server";
import Bookmark from "@/lib/models/bookmark";


export async function DELETE(
  request: Request, 
  { params }: { params: Promise<{ id: string }> } // Type it as a Promise
) {
    const { id } = await params;

    try {
        console.log("Deleting ID:", id);
        await Bookmark.findByIdAndDelete(id);
        
        return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}