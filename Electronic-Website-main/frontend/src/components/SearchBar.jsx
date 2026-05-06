import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContextContext";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location.pathname]);

  return showSearch && visible ? (
    <div className="border-y border-border bg-base/80 text-center backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 py-4">
        <div className="flex w-full items-center gap-3 rounded-full border border-border bg-surface px-4 py-2 shadow-soft">
          <img src={assets.search_icon} className="w-4" alt="" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-subtle"
            type="text"
            placeholder="Search products, brands, or categories"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowSearch(false)}
          className="rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold text-subtle transition hover:text-foreground focus-ring"
          aria-label="Close search"
        >
          <img src={assets.cross_icon} className="w-3" alt="" />
        </button>
      </div>
    </div>
  ) : null;
};

export default SearchBar;
