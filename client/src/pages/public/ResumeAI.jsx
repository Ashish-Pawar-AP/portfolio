import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../../utils/axios";
import useSEO from "../../hooks/useSEO";
import { motion } from "framer-motion";

/**
 * AI Resume Analyzer (Advanced UI)
 */
const ResumeAI = () => {
  useSEO({
    title: "AI Resume Analyzer",
    description: "Get AI-powered resume feedback",
  });

  const [text, setText] = useState("");

  const mutation = useMutation({
    mutationFn: (data) =>
      api.post("/ai/resume-review", data).then((r) => r.data),
  });

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 space-y-4"
      >
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          AI Resume Analyzer
        </h1>

        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Paste your resume content below and get instant, AI-powered feedback
          to improve clarity, structure, and impact.
        </p>

        <div className="h-1 w-24 rounded-full bg-linear-to-r from-blue-500 to-purple-500" />
      </motion.div>

      {/* ================= INPUT CARD ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="
          rounded-3xl
          border border-slate-200 dark:border-slate-800
          bg-white/70 dark:bg-slate-900/60
          p-8
          backdrop-blur-xl
          shadow-xl
        "
      >
        <label className="mb-3 block font-medium">Resume Content</label>

        <textarea
          rows={10}
          placeholder="Paste your resume text here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="
            w-full
            rounded-xl
            border border-slate-300 dark:border-slate-700
            bg-white dark:bg-slate-900
            p-4
            text-sm
            text-slate-700 dark:text-slate-200
            placeholder-slate-400
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            transition
          "
        />

        {/* Analyze Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!text.trim() || mutation.isPending}
          onClick={() => mutation.mutate({ text })}
          className="
            mt-6
            inline-flex
            items-center
            justify-center
            rounded-xl
            bg-linear-to-r from-blue-600 to-purple-600
            px-8 py-3
            font-medium
            text-white
            shadow-lg shadow-blue-500/30
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {mutation.isPending ? "Analyzing Resume…" : "Analyze Resume"}
        </motion.button>
      </motion.div>

      {/* ================= RESULT ================= */}
      {mutation.data && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            mt-12
            rounded-3xl
            border border-slate-200 dark:border-slate-800
            bg-slate-50 dark:bg-slate-900
            p-8
            shadow-lg
          "
        >
          <h3 className="mb-4 text-xl font-semibold">AI Feedback</h3>

          <p className="leading-relaxed text-slate-600 dark:text-slate-400">
            {mutation.data.result}
          </p>
        </motion.div>
      )}

      {/* ================= ERROR ================= */}
      {mutation.isError && (
        <p className="mt-6 text-center text-sm text-red-500">
          Failed to analyze resume. Please try again.
        </p>
      )}
    </section>
  );
};

export default ResumeAI;
