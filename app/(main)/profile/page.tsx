"use client";

import { useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import styles from "./page.module.css";
import GoBackBtn from "@/components/goBackBtn/GoBackBtn";
import Avatar from "@/components/avatar/Avatar";
import { useAuth } from "@/context/AuthContext";
import { uploadProfileImage } from "@/lib/cloudinary";

interface FormState {
  name: string;
}

export default function ProfilePage() {
  const { user, setUser, loading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  /* ── Sync form with context user ── */
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name ?? "",
      });
    }
  }, [user]);

  /* ── Save handler ── */
  const handleSave = async () => {
    setSaving(true);
    try {
      let profilePicUrl = user?.profilePic;

      // 1. Upload new image if chosen
      if (selectedFile) {
        const uploadedUrl = await uploadProfileImage(selectedFile);
        if (uploadedUrl) {
          profilePicUrl = uploadedUrl;
        }
      }

      // 2. Patch details to backend
      const res = await fetch("/api/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          profilePic: profilePicUrl,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // Update global auth state
        setUser(data.user);
        setSelectedFile(null); // clear staging
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setSaving(false);
    }
  };


  /* ──────────────── Skeleton ────────────────────────────────── */
  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div
              className={styles.skeletonLine}
              style={{ width: "9rem", marginBottom: "0.5rem" }}
            />
            <div
              className={styles.skeletonLine}
              style={{ width: "16rem", opacity: 0.6 }}
            />
          </div>

          <div className={styles.card}>
            {/* Avatar skeleton */}
            <div className={styles.avatarSection}>
              <div className={styles.skeletonAvatar} />
              <div style={{ flex: 1 }}>
                <div
                  className={styles.skeletonLine}
                  style={{ width: "10rem", marginBottom: "0.5rem" }}
                />
                <div
                  className={styles.skeletonLine}
                  style={{ width: "14rem", opacity: 0.6 }}
                />
              </div>
            </div>

            {/* Fields skeleton */}
            <div className={styles.formBody}>
              <div className={styles.skeletonInput} />
              <div className={styles.skeletonInput} />
            </div>

            <div
              className={styles.formFooter}
              style={{ justifyContent: "flex-end" }}
            >
              <div
                className={styles.skeletonInput}
                style={{ width: "7rem", height: "2.3rem" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ──────────────── Main UI ─────────────────────────────────── */
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Go Back Button */}
        <div className={styles.topNav}>
          <GoBackBtn label="Dashboard" />
        </div>

        {/* Page header */}
        <div className={styles.header}>
          <h1 className={styles.heading}>Profile</h1>
          <p className={styles.subheading}>
            Manage your account details and personal information
          </p>
        </div>

        <div className={styles.card}>
          {/* ── Avatar row ── */}
          <div className={styles.avatarSection}>
            <Avatar 
               src={user?.profilePic} 
               name={user?.name} 
               onFileSelect={(file) => setSelectedFile(file)}
               isLoading={saving}
            />

            <div className={styles.avatarMeta}>
              <p className={styles.avatarName}>{user?.name ?? "—"}</p>
              <p className={styles.avatarEmail}>{user?.email ?? "—"}</p>
            </div>
          </div>

          {/* ── Form ── */}
          <div className={styles.formBody}>
            {/* Name */}
            <div className={styles.field}>
              <label htmlFor="profile-name" className={styles.label}>
                Full Name
              </label>
              <input
                id="profile-name"
                type="text"
                className={styles.input}
                placeholder="Your full name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            {/* Email (read-only) */}
            <div className={styles.field}>
              <label className={styles.label}>Email Address</label>
              <div className={styles.infoRow}>
                <HiOutlineMail className={styles.infoIcon} />
                <span className={styles.infoText}>{user?.email ?? "—"}</span>
              </div>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className={styles.formFooter}>
            <button
              id="profile-save-btn"
              className={styles.btnPrimary}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
