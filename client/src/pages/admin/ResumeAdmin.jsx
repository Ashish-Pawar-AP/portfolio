import { useState } from "react";
import { uploadResume } from "../../api/admin.resume.api";
import { motion } from "framer-motion";

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
      setMessage("✅ Resume uploaded successfully");
      setFile(null);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "❌ Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-xl shadow"
    >
      <h2 className="text-xl font-bold mb-4">
        Upload Resume (PDF)
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>

        {message && (
          <p className="text-sm text-center">{message}</p>
        )}
      </form>
    </motion.div>
  );
};

export default ResumeAdmin;
