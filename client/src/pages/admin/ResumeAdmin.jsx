import { useState } from "react";
import { uploadResume } from "../../api/admin.resume.api";
import { motion } from "framer-motion";

/**
 * Admin Resume Upload (Theme-Based + Premium UI)
 */
const ResumeAdmin = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return setMessage("Please select a PDF file");
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setMessage("");
      await uploadResume(formData);
      setMessage("Resume uploaded successfully");
      setFile(null);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto rounded-3xl p-8 backdrop-blur-2xl shadow-xl"
      style={{
        backgroundColor: "rgba(var(--bg-secondary),0.7)",
        border: "1px solid rgb(var(--border-color))",
      }}
    >
      <h2
        className="text-xl font-bold mb-6"
        style={{ color: "rgb(var(--text-primary))" }}
      >
        Upload Resume (PDF)
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Input */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "rgb(var(--text-secondary))" }}
          >
            Select PDF File
          </label>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full rounded-xl px-4 py-3 outline-none transition"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.9)",
              border: "1px solid rgb(var(--border-color))",
              color: "rgb(var(--text-primary))",
            }}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          type="submit"
          className="w-full rounded-xl py-3 font-medium text-white disabled:opacity-50"
          style={{
            background:
              "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
          }}
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </motion.button>

        {/* Message */}
        {message && (
          <p
            className="text-sm text-center"
            style={{
              color: message.includes("successfully")
                ? "rgb(var(--accent-primary))"
                : "rgb(var(--accent-secondary))",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default ResumeAdmin;