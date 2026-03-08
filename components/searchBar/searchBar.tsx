"use client";

import React, { useState } from "react";
import styles from "./searchBar.module.css";
import { FiSearch } from "react-icons/fi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search by title...",
  className,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (query.trim()) {
      params.set('q', query);
    } else {
      params.delete('q');
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={`${styles.searchContainer} ${className || ""}`}>
      <FiSearch className={styles.searchIcon} />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.searchInput}
        // value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
