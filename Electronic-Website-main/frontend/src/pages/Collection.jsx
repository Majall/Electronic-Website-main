import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import ProductItems from "../components/ProductItems";
import Title from "../components/Title";
import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import { ShopContext } from "../context/ShopContextContext";


const Collection = () => {
  const { products, search, showSearch, categories, brands, isLoading } =
    useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleBrand = (e) => {
    if (brand.includes(e.target.value)) {
      setBrand((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setBrand((prev) => [...prev, e.target.value]);
    }
  };

  useEffect(() => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category._id.toString())
      );
    }

    if (brand.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        brand.includes(item.brand._id.toString())
      );
    }

    const sortedProducts = [...productsCopy];
    switch (sortType) {
      case "low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "Top-Rated":
        sortedProducts.sort((a, b) => b.avgRating - a.avgRating);
        break;
      default:
        break;
    }

    setFilterProducts(sortedProducts);
  }, [brand, category, products, search, showSearch, sortType]);

  return (
    <Section className="pt-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="lg:w-64">
          <button
            type="button"
            onClick={() => setShowFilter(!showFilter)}
            className="flex w-full items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground shadow-soft lg:hidden"
          >
            Filter products
            <img
              className={`h-3 transition-transform ${
                showFilter ? "rotate-90" : ""
              }`}
              src={assets.dropdown_icon}
              alt=""
            />
          </button>
          <div
            className={`mt-4 flex flex-col gap-4 ${
              showFilter ? "block" : "hidden"
            } lg:block`}
          >
            <Card className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-subtle">
                Category
              </p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-foreground">
                {categories.map((item) => (
                  <label key={item._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      onChange={toggleCategory}
                      value={item._id}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-subtle">
                Brands
              </p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-foreground">
                {brands.map((item) => (
                  <label key={item._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      value={item._id}
                      onChange={toggleBrand}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </Card>
          </div>
        </aside>
        <div className="flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Title text1={"All"} text2={"Collections"} />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground shadow-soft focus-ring"
              value={sortType}
            >
              <option value="relevant">Sort: Relevant</option>
              <option value="low-high">Sort: Low to high</option>
              <option value="high-low">Sort: High to low</option>
              <option value="Top-Rated">Sort: Top rated</option>
            </select>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={`collection-skeleton-${index}`} />
                ))
              : filterProducts.map((item) => (
                  <ProductItems
                    key={item._id}
                    name={item.name}
                    id={item._id}
                    price={item.price}
                    image={item.image}
                    ratings={item.avgRating}
                  />
                ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Collection;
