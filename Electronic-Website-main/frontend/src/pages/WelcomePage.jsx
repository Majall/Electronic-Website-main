import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";
import OurPolicy from "../components/OurPolicy";
import Button from "../components/ui/Button";

const WelcomePage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-base">
      {/* 🔹 Top Welcome Banner */}
      <Motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-primary py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground"
      >
        Welcome to GetItWare — your trusted destination for premium electronics.
      </Motion.div>

      {/* Hero Section */}
      <section className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-10 px-section-x py-section md:flex-row">
        {/* Left Content */}
        <Motion.div
          className="w-full space-y-6 text-center md:w-1/2 md:text-left"
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            Discover{" "}
            <span className="text-accent">
              Smarter Shopping
            </span>{" "}
            with GetItWare.
          </h1>

          <p className="max-w-md text-sm text-subtle md:mx-0 md:text-base">
            Your one-stop store for premium electronics — laptops, mobiles, and
            gadgets designed to make your life easier.
          </p>

          <Motion.div
            className="flex flex-col justify-center gap-3 sm:flex-row md:justify-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              to="/home"
            >
              <Button size="lg">Explore products</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="secondary">
                Sign up
              </Button>
            </Link>
          </Motion.div>

          <Motion.div
            className="flex flex-wrap justify-center gap-6 text-xs text-subtle md:justify-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <span>🚚</span>
              <p>Free shipping</p>
            </div>
            <div className="flex items-center gap-2">
              <span>💬</span>
              <p>24/7 support</p>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <p>Secure payment</p>
            </div>
          </Motion.div>
        </Motion.div>

        {/* Right Image */}
        <Motion.div
          className="relative flex w-full justify-center md:w-1/2"
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 rounded-3xl bg-accent/10 blur-3xl" />
          <Motion.img
            src={assets.side}
            alt="Electronics"
            className="relative z-10 w-full max-w-lg rounded-3xl object-contain shadow-strong"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6 }}
            loading="lazy"
          />
        </Motion.div>
      </section>

      {/* Features / Policy Section */}
      <Motion.section
        className="border-t border-border bg-base py-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-6xl px-section-x text-center">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Why shop with <span className="text-accent">GetItWare?</span>
          </h2>
          <div className="mt-8">
            <OurPolicy />
          </div>
        </div>
      </Motion.section>

      {/* Footer */}
      <Motion.footer
        className="mt-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Footer />
      </Motion.footer>
    </div>
  );
};

export default WelcomePage;
