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
    <section
      className="relative mx-auto max-w-5xl px-6 md:px-8 py-24 md:py-28"
      style={{ backgroundColor: "rgb(var(--bg-primary))" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl font-bold md:text-5xl">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
            }}
          >
            Contact Me
          </span>
        </h1>

        <p
          className="mx-auto mt-4 max-w-xl text-base md:text-lg"
          style={{ color: "rgb(var(--text-secondary))" }}
        >
          Have a project, opportunity, or question? Fill out the form below and
          I’ll respond as soon as possible.
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-xl rounded-3xl p-10 backdrop-blur-2xl shadow-2xl"
        style={{
          backgroundColor: "rgba(var(--bg-secondary),0.7)",
          border: "1px solid rgb(var(--border-color))",
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Success */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl px-4 py-3 text-sm"
              style={{
                backgroundColor: "rgba(var(--accent-primary),0.1)",
                color: "rgb(var(--accent-primary))",
                border: "1px solid rgb(var(--accent-primary))",
              }}
            >
              {success}
            </motion.div>
          )}

          {/* Error */}
          {mutation.isError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl px-4 py-3 text-sm"
              style={{
                backgroundColor: "rgba(220,38,38,0.08)",
                color: "rgb(220,38,38)",
                border: "1px solid rgba(220,38,38,0.4)",
              }}
            >
              Something went wrong. Please try again.
            </motion.div>
          )}

          {/* Name */}
          <motion.div variants={fadeUp}>
            <label
              className="mb-1 block text-sm font-medium"
              style={{ color: "rgb(var(--text-primary))" }}
            >
              Name
            </label>

            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all duration-300"
              style={{
                backgroundColor: "rgba(var(--bg-primary),0.6)",
                border: "1px solid rgb(var(--border-color))",
                color: "rgb(var(--text-primary))",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor =
                  "rgb(var(--accent-primary))")
              }
              onBlur={(e) =>
                (e.target.style.borderColor =
                  "rgb(var(--border-color))")
              }
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={fadeUp}>
            <label
              className="mb-1 block text-sm font-medium"
              style={{ color: "rgb(var(--text-primary))" }}
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all duration-300"
              style={{
                backgroundColor: "rgba(var(--bg-primary),0.6)",
                border: "1px solid rgb(var(--border-color))",
                color: "rgb(var(--text-primary))",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor =
                  "rgb(var(--accent-primary))")
              }
              onBlur={(e) =>
                (e.target.style.borderColor =
                  "rgb(var(--border-color))")
              }
            />
          </motion.div>

          {/* Message */}
          <motion.div variants={fadeUp}>
            <label
              className="mb-1 block text-sm font-medium"
              style={{ color: "rgb(var(--text-primary))" }}
            >
              Message
            </label>

            <textarea
              name="message"
              rows="5"
              required
              value={form.message}
              onChange={handleChange}
              className="w-full resize-none rounded-xl px-4 py-3 focus:outline-none transition-all duration-300"
              style={{
                backgroundColor: "rgba(var(--bg-primary),0.6)",
                border: "1px solid rgb(var(--border-color))",
                color: "rgb(var(--text-primary))",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor =
                  "rgb(var(--accent-primary))")
              }
              onBlur={(e) =>
                (e.target.style.borderColor =
                  "rgb(var(--border-color))")
              }
            />
          </motion.div>

          {/* Submit */}
          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            disabled={mutation.isPending}
            className="w-full rounded-xl py-3 font-medium text-white shadow-lg disabled:opacity-60 transition-all duration-300"
            style={{
              background:
                "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
            }}
          >
            {mutation.isPending ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;