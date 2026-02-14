"use client";

import Image from "next/image";
import styles from "./page.module.css";
import BookmarkCard from "@/components/bookmarkCard/bookmarkCard";
import { useEffect, useState } from "react";
import AddBookmarkModal from "@/components/addBookmarkModal/AddBookmarkModal";
import { HiPlus } from "react-icons/hi";

interface Bookmark {
  _id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  favicon: string;
  createdAt: string;
}

export default function Home() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/bookmarks")
      .then((response) => response.json())
      .then((data) => {
        setBookmarks(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching bookmarks:", error);
      });
  }, []);

  const handleAddBookmark = (newBookmarkData: any) => {
    console.log("New bookmark added:", newBookmarkData);
    // Refresh bookmarks after adding
    fetch("/api/bookmarks")
      .then((response) => response.json())
      .then((data) => setBookmarks(data));
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/bookmarks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Optimistically update the UI by filtering out the deleted bookmark
        setBookmarks((prev) => prev.filter((bookmark) => bookmark._id !== id));
      } else {
        console.error("Failed to delete bookmark");
      }
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.heading}>All Bookmarks</h1>
          <button 
            className={styles.addButton}
            onClick={() => setIsModalOpen(true)}
          >
            <HiPlus className={styles.plusIcon} />
            Add Bookmark
          </button>
        </div>
        
        <div className={styles.grid}>
          {bookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark._id}
              _id={bookmark._id}
              title={bookmark.title}
              url={bookmark.url}
              description={bookmark.description}
              tags={bookmark.tags}
              date={new Date(bookmark.createdAt).toLocaleDateString(undefined, {
                day: 'numeric',
                month: 'short'
              })}
              favicon={bookmark.favicon}
              onDelete={() => handleDelete(bookmark._id)}
            />
          ))}
        </div>
      </div>

      <AddBookmarkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddBookmark}
      />
    </div>
  );
}

