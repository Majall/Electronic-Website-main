import { useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { assets } from "../assets/assets";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const Contact = () => {
  const [image, setImage] = useState("");

  return (
    <div className="min-h-screen bg-base px-section-x py-section">
      {/* Header */}
      <Motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl font-semibold text-foreground md:text-4xl"
      >
        Contact <span className="text-accent">GetItWare</span>
      </Motion.h1>

      {/* Logo Section */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 flex flex-col items-center"
      >
        {image && (
          <img
            src={image}
            alt="Selected"
            className="mb-4 h-24 w-24 rounded-full border border-border bg-surface object-contain shadow-soft"
          />
        )}
        <Button
          onClick={() => setImage(assets.logo || "/assets/logo.png")}
          size="sm"
        >
          Show logo
        </Button>
      </Motion.div>

      {/* Contact Info */}
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-10 grid gap-6 md:grid-cols-3"
      >
        {/* Phone */}
        <Card className="flex flex-col items-center gap-2 p-6 text-center">
          <FaPhoneAlt className="mb-3 text-2xl text-accent" />
          <h3 className="text-sm font-semibold text-foreground">Phone</h3>
          <p className="text-xs text-subtle">+94 75 3411591</p>
        </Card>

        {/* Email */}
        <Card className="flex flex-col items-center gap-2 p-6 text-center">
          <FaEnvelope className="mb-3 text-2xl text-accent" />
          <h3 className="text-sm font-semibold text-foreground">Email</h3>
          <p className="text-xs text-subtle">supportGetitWare@gmail.com</p>
        </Card>

        {/* Address */}
        <Card className="flex flex-col items-center gap-2 p-6 text-center">
          <FaMapMarkerAlt className="mb-3 text-2xl text-accent" />
          <h3 className="text-sm font-semibold text-foreground">Address</h3>
          <p className="text-xs text-subtle">
            No. 96/1, Al Ameen Road, Kattankudy, Batticaloa, Sri Lanka
          </p>
        </Card>
      </Motion.div>

      {/* Contact Form */}
      <Motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="glass-panel mt-10 w-full max-w-3xl rounded-3xl p-8"
      >
        <h2 className="text-center text-xl font-semibold text-foreground">
          Send Us a Message
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus-ring"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus-ring"
          />
        </div>

        <textarea
          rows="5"
          placeholder="Your Message..."
          className="mt-6 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus-ring"
        ></textarea>

        <div className="flex justify-center mt-6">
          <Button type="submit" size="lg">
            Send message
          </Button>
        </div>
      </Motion.form>

      {/* Social Links */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-10 flex space-x-6"
      >
        <a
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-soft transition hover:-translate-y-0.5"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-soft transition hover:-translate-y-0.5"
        >
          <FaInstagram size={22} />
        </a>
      </Motion.div>

      {/* Footer */}
      <p className="mt-8 text-xs uppercase tracking-[0.3em] text-subtle">
        © {new Date().getFullYear()} GetItWare — All Rights Reserved.
      </p>
    </div>
  );
};

export default Contact;
