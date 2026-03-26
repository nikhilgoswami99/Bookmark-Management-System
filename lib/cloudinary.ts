
const uploadURL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;


export const uploadProfileImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"
    );

    const res = await fetch(uploadURL, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || "Cloudinary upload failed");
    }

    const data = await res.json();
    return data.secure_url; // Return the HTTPS URL
  } catch (err) {
    console.error("Cloudinary upload Error:", err);
    return null;
  }
};