"use client";

import { ChangeEvent, useRef, useState } from "react";
import { HiCamera } from "react-icons/hi";
import styles from "./avatar.module.css";

interface AvatarProps {
  src?: string;
  name?: string;
  onFileSelect?: (file: File) => void;
  isLoading?: boolean;
}

export default function Avatar({ src, name, onFileSelect, isLoading }: AvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const getInitial = (name: string) => 
    name ? name.charAt(0).toUpperCase() : "?";

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a local preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      
      // Pass the file back to parent if needed
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const displayImage = preview || src;

  return (
    <div className={styles.avatarWrapper}>
      {/* Main Avatar display */}
      {displayImage ? (
        <img 
          src={displayImage} 
          alt={name || "User avatar"} 
          className={styles.avatar} 
        />
      ) : (
        <div className={styles.avatarFallback}>
          {getInitial(name ?? "")}
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner} />
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className={styles.hiddenInput}
        aria-label="Upload profile image"
      />

      {/* Edit Trigger */}
      <button 
        className={styles.editLabel} 
        onClick={handleClick}
        disabled={isLoading}
        type="button"
        title="Change profile picture"
      >
        <HiCamera className={styles.editIcon} />
      </button>
    </div>
  );
}
