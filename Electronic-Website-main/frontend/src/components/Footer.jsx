import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-base">
      <div className="mx-auto w-full max-w-7xl px-section-x py-section">
        <div className="grid gap-10 sm:grid-cols-[2fr_1fr_1fr] text-sm text-subtle">
          <div className="space-y-4">
            <img
              src={assets.logo}
              className="w-32 transition-transform duration-500 hover:scale-105"
              alt="GetItWare"
              loading="lazy"
            />
            <p className="max-w-md leading-relaxed">
              <span className="font-semibold text-foreground">GetItWare</span>{" "}
              curates premium electronics with a focus on smart design, trusted
              performance, and elevated everyday experiences. Explore the latest
              devices with confidence.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground">
              Company
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {["Home", "About us", "Delivery", "Privacy Policy"].map(
                (item, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer transition-colors duration-300 hover:text-foreground"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground">
              Contact
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              <li className="transition-colors duration-300 hover:text-foreground">
                0753411591
              </li>
              <li className="transition-colors duration-300 hover:text-foreground">
                supportGetitWare@gmail.com
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-border pt-6 text-xs text-subtle sm:flex-row sm:justify-between">
          <p>© 2025 GetItWare.com — All Rights Reserved.</p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground">
            Crafted for modern commerce
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
