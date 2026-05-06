import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { assets } from "../assets/assets";
import Button from "./ui/Button";
import Section from "./ui/Section";

const Hero = () => {
  return (
    <Section className="pt-10">
      <Motion.div
        className="glass-panel flex flex-col-reverse overflow-hidden rounded-xl sm:flex-row"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex w-full flex-col justify-center gap-6 px-6 py-12 sm:w-1/2 sm:px-10">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-subtle">
            <span className="h-px w-10 bg-border" />
            Our Bestseller
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Latest arrivals built for a premium digital life.
          </h1>
          <p className="text-sm text-subtle sm:text-base">
            Curated devices, refined aesthetics, and performance that feels
            effortless — shop the most in-demand electronics today.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/collection">
              <Button size="lg">Shop now</Button>
            </Link>
            <span className="h-px w-12 bg-border" />
          </div>
        </div>
        <div className="relative w-full overflow-hidden sm:w-1/2">
          <Motion.img
            className="h-[320px] w-full object-cover sm:h-full"
            src={assets.side}
            alt="Latest arrivals"
            loading="lazy"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-base/10 via-transparent to-accent/10" />
        </div>
      </Motion.div>
    </Section>
  );
};

export default Hero;
