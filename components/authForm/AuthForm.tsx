"use client";

import { useState } from "react";
import styles from "./authForm.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AuthFormProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  showNameField?: boolean;
  mode: "login" | "register";
};

const AuthForm = ({
  title,
  subtitle,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkHref,
  showNameField = false,
  mode,
}: AuthFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ...(showNameField ? { name: "" } : {}),
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginUser = async (data: any) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }
    return res.json();
  };

  const registerUser = async (data: any) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }
    return res.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "login") {
        await loginUser(formData);
        router.push("/");
      } else {
        await registerUser(formData);
        router.push("/signin");
      }
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <p className={styles.errorMessage}>{error}</p>}
          {showNameField && (
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="name">
                Full Name
              </label>
              <input
                className={styles.input}
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                onChange={handleChange}
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>

          <button 
            disabled={loading} 
            className={styles.submitBtn} 
            type="submit"
          >
            {loading ? "Processing..." : buttonText}
          </button>
        </form>

        <p className={styles.footer}>
          {footerText}{" "}
          <Link href={footerLinkHref} className={styles.footerLink}>
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
