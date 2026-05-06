import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContextContext";
import ThemeToggle from "./ThemeToggle";
import Button from "./ui/Button";
import cn from "../utils/cn";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      setToken("");
      setCartItems({});
      navigate("/login");
    }
  };

  const navLinkClass = ({ isActive }) =>
    cn(
      "text-xs font-semibold tracking-[0.2em] text-subtle transition-colors duration-300 hover:text-foreground focus-ring",
      isActive && "text-foreground"
    );

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-base/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-section-x py-4">
        <Link to={"/"} className="flex items-center gap-3">
          <img src={assets.logo} className="w-36 sm:w-40" alt="GetItWare" />
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          <NavLink to={"/home"} className={navLinkClass}>
            HOME
          </NavLink>
          <NavLink to={"/collection"} className={navLinkClass}>
            COLLECTION
          </NavLink>
          <NavLink to={"/about"} className={navLinkClass}>
            ABOUT
          </NavLink>
          <NavLink to={"/contact"} className={navLinkClass}>
            CONTACT
          </NavLink>
        </nav>
        <div className="flex items-center gap-3 sm:gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearch(true)}
            aria-label="Open search"
            className="rounded-full border border-border bg-surface/70 hover:bg-muted"
          >
            <img src={assets.search_icon} className="w-4" alt="" />
          </Button>

          <ThemeToggle />

          <div className="group relative hidden sm:block">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (token ? null : navigate("/login"))}
              aria-label="Open profile"
              className="rounded-full border border-border bg-surface/70 hover:bg-muted"
            >
              <img src={assets.profile_icon} className="w-4" alt="" />
            </Button>
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-40 rounded-lg border border-border bg-surface p-3 text-sm text-subtle shadow-soft">
                  <Link to={"/Profile"} className="focus-ring rounded-md px-2 py-1">
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => navigate("/orders")}
                    className="text-left focus-ring rounded-md px-2 py-1"
                  >
                    Orders
                  </button>
                  <button
                    type="button"
                    onClick={logout}
                    className="text-left focus-ring rounded-md px-2 py-1"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link to={"/cart"} className="relative">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Open cart"
              className="rounded-full border border-border bg-surface/70 hover:bg-muted"
            >
              <img src={assets.cart_icon} className="w-4 min-w-4" alt="" />
            </Button>
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-primary-foreground">
              {getCartCount()}
            </span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setVisible(true)}
            aria-label="Open menu"
            className="rounded-full border border-border bg-surface/70 hover:bg-muted sm:hidden"
          >
            <img src={assets.menu_icon} className="w-4" alt="" />
          </Button>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-50 overflow-hidden bg-base/90 backdrop-blur-xl transition-all duration-300 ${
          visible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-xs transform border-l border-border bg-base p-6 transition-transform duration-300 ${
            visible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-subtle">
              Menu
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setVisible(false)}
              className="rounded-full border border-border bg-surface/70 hover:bg-muted"
            >
              <img src={assets.cross_icon} className="w-3" alt="Close menu" />
            </Button>
          </div>
          <div className="mt-8 flex flex-col gap-4 text-sm font-semibold text-foreground">
            <NavLink
              onClick={() => setVisible(false)}
              className="focus-ring rounded-md px-2 py-1"
              to={"/home"}
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="focus-ring rounded-md px-2 py-1"
              to={"/collection"}
            >
              Collection
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="focus-ring rounded-md px-2 py-1"
              to={"/about"}
            >
              About
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="focus-ring rounded-md px-2 py-1"
              to={"/contact"}
            >
              Contact
            </NavLink>
            <button
              type="button"
              onClick={() => {
                setVisible(false);
                navigate(token ? "/profile" : "/login");
              }}
              className="focus-ring rounded-md px-2 py-1 text-left"
            >
              Account
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
