import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useSEO from "../../hooks/useSEO";
import { sendContactMessage } from "../../api/contact.api";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Contact = () => {
  useSEO({
    title: "Contact",
    description:
      "Get in touch with me for full stack development opportunities, collaborations, or freelance work.",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const mutation = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      setSuccess("Message sent successfully. I’ll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    mutation.mutate(form);
  };

  return (
    <section className="relative mx-auto max-w-5xl px-8 py-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl font-bold md:text-5xl">
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Contact Me
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-400">
          Have a project, opportunity, or question? Fill out the form below and
          I’ll respond as soon as possible.
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="
          mx-auto max-w-xl
          rounded-3xl
          border border-slate-200 dark:border-slate-800
          bg-white/80 dark:bg-slate-900/70
          p-10
          backdrop-blur-xl
          shadow-2xl
        "
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Success */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                rounded-lg
                bg-green-50 text-green-700
                px-4 py-3 text-sm
              "
            >
              {success}
            </motion.div>
          )}

          {/* Error */}
          {mutation.isError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                rounded-lg
                bg-red-50 text-red-700
                px-4 py-3 text-sm
              "
            >
              Something went wrong. Please try again.
            </motion.div>
          )}

          {/* Name */}
          <motion.div variants={fadeUp}>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="
                w-full rounded-xl
                border border-slate-300 dark:border-slate-700
                bg-transparent
                px-4 py-3
                text-slate-700 dark:text-slate-200
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={fadeUp}>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="
                w-full rounded-xl
                border border-slate-300 dark:border-slate-700
                bg-transparent
                px-4 py-3
                text-slate-700 dark:text-slate-200
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </motion.div>

          {/* Message */}
          <motion.div variants={fadeUp}>
            <label className="mb-1 block text-sm font-medium">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              value={form.message}
              onChange={handleChange}
              className="
                w-full resize-none rounded-xl
                border border-slate-300 dark:border-slate-700
                bg-transparent
                px-4 py-3
                text-slate-700 dark:text-slate-200
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </motion.div>

          {/* Submit */}
          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            disabled={mutation.isPending}
            className="
              w-full rounded-xl
              bg-linear-to-r from-blue-600 to-purple-600
              py-3
              font-medium text-white
              shadow-lg shadow-blue-500/30
              disabled:opacity-60
            "
          >
            {mutation.isPending ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
