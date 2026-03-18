"use client";

import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import styles from "./goBackBtn.module.css";

interface GoBackBtnProps {
  className?: string;
  label?: string;
}

export default function GoBackBtn({ className = "", label = "Go Back" }: GoBackBtnProps) {
  const router = useRouter();

  const handleBack = () => {
    // If we have a history stack, go back. Otherwise, go to dashboard.
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <button 
      onClick={handleBack} 
      className={`${styles.btn} ${className}`}
      aria-label="Go back"
    >
      <HiArrowLeft className={styles.icon} />
      <span>{label}</span>
    </button>
  );
}
