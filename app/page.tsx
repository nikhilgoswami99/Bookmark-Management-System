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
    // Ideally, here you would re-fetch bookmarks or add the new one to the state
    // For now, we just close the modal
    setIsModalOpen(false);
    // Optional: Reload bookmarks to see the new one if API was called in modal
    // window.location.reload(); 
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
              title={bookmark.title}
              url={bookmark.url}
              description={bookmark.description}
              tags={bookmark.tags}
              date={new Date(bookmark.createdAt).toLocaleDateString(undefined, {
                day: 'numeric',
                month: 'short'
              })}
              favicon={bookmark.favicon}
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

