import mongoose from "mongoose";

const DB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
    if (!DB_URI) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    // 1. Prevent multiple connections
    if (mongoose.connection.readyState >= 1) {
        console.log("✅ Database already connected");
        return;
    }

    try {
        await mongoose.connect(DB_URI);
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Database connection failed", error);
    }
};


