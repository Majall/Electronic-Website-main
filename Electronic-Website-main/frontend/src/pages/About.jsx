import { motion as Motion } from "framer-motion";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-base px-section-x py-section">
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-panel mx-auto max-w-4xl rounded-3xl p-10 text-center"
      >
        {/* Title */}
        <h1 className="text-4xl font-semibold text-foreground md:text-5xl">
          About GetItWare
        </h1>

        {/* Description */}
        <p className="mt-6 text-sm leading-relaxed text-subtle md:text-base">
          <span className="font-semibold text-foreground">GetItWare</span> is
          your trusted hub for all things tech — where{" "}
          <span className="text-accent font-semibold">
            innovation meets convenience
          </span>
          . From cutting-edge laptops and smartphones to high-quality home
          electronics, we bring you products that blend performance and value.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-subtle md:text-base">
          We go beyond just selling — our commitment includes{" "}
          <span className="font-semibold text-accent">
            24/7 customer support, fast island-wide delivery, and hassle-free
            returns
          </span>
          . Whether you’re enhancing your workspace or exploring smart devices,
          we’re here to make your experience seamless and enjoyable.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-subtle md:text-base">
          Our mission is simple:{" "}
          <span className="italic font-semibold text-foreground">
            making technology accessible, affordable, and reliable for everyone
            in Sri Lanka
          </span>
          .
        </p>

        {/* Animated Icons */}
        <Motion.div
          className="mt-8 flex justify-center space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-soft transition hover:-translate-y-0.5"
          >
            <FaFacebookF size={22} />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-soft transition hover:-translate-y-0.5"
          >
            <FaInstagram size={26} />
          </a>
        </Motion.div>

        {/* Tagline */}
        <Motion.p
          className="mt-10 text-xs uppercase tracking-[0.3em] text-subtle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          © {new Date().getFullYear()} GetItWare — Empowering Tech for Everyone
          ⚡
        </Motion.p>
      </Motion.div>
    </div>
  );
};

export default About;
