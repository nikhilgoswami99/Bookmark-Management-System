import React, { useState } from "react";
import styles from "./addBookmarkModal.module.css";
import { AiOutlineClose } from "react-icons/ai";

interface AddBookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (bookmark: {
    title: string;
    url: string;
    description: string;
    tags: string[];
    favicon: string;
  }) => void;
}

const AddBookmarkModal: React.FC<AddBookmarkModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    tags: "",
    favicon: "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const bookmarkData = {
      title: formData.title,
      url: formData.url,
      description: formData.description,
      tags: tagsArray,
      favicon:
        formData.favicon ||
        `https://www.google.com/s2/favicons?domain=${formData.url}`,
    };

    try {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookmarkData),
      });

      if (response.ok) {
        const newBookmark = await response.json();
        onAdd(newBookmark); // Pass the new bookmark back to parent if needed
        // Reset form
        setFormData({
          title: "",
          url: "",
          description: "",
          tags: "",
          favicon: "",
        });
        onClose();
      } else {
        console.error("Failed to add bookmark");
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Add New Bookmark</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <AiOutlineClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.input}
              placeholder="e.g. Next.js Documentation"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="url" className={styles.label}>
              URL
            </label>
            <input
              type="url"
              id="url"
              value={formData.url}
              onChange={handleChange}
              className={styles.input}
              placeholder="https://nextjs.org"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Brief description of the site..."
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tags" className={styles.label}>
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              value={formData.tags}
              onChange={handleChange}
              className={styles.input}
              placeholder="e.g. documentation, react, framework"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="favicon" className={styles.label}>
              Favicon URL (Optional)
            </label>
            <input
              type="url"
              id="favicon"
              value={formData.favicon}
              onChange={handleChange}
              className={styles.input}
              placeholder="https://example.com/favicon.ico"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Add Bookmark
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookmarkModal;
