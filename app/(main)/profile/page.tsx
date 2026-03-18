"use client";

import { useEffect, useState } from "react";
import { HiOutlineMail, HiPencil } from "react-icons/hi";
import styles from "./page.module.css";
import GoBackBtn from "@/components/goBackBtn/GoBackBtn";
import { useAuth } from "@/context/AuthContext";

interface FormState {
  name: string;
}

export default function ProfilePage() {
  const { user, setUser, loading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
  });

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
      const res = await fetch("/api/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        // Update global auth state
        setUser(data.user);
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setSaving(false);
    }
  };

  /* ── Avatar initial ── */
  const getInitial = (name: string) =>
    name ? name.charAt(0).toUpperCase() : "?";

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
            <div className={styles.avatarWrapper}>
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className={styles.avatar}
                  onError={(e) =>
                    ((e.currentTarget as HTMLImageElement).style.display = "none")
                  }
                />
              ) : (
                <div className={styles.avatarFallback}>
                  {getInitial(user?.name ?? "")}
                </div>
              )}
              
              <label className={styles.editAvatarLabel} htmlFor="avatar-upload">
                <HiPencil className={styles.editIcon} />
                <input 
                  type="file" 
                  id="avatar-upload"
                  className={styles.hiddenInput} 
                  accept="image/*"
                  onChange={(e) => {
                    // Logic for file upload goes here later
                    console.log("File selected:", e.target.files?.[0]);
                  }}
                />
              </label>
            </div>

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
