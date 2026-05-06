import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextContext";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductItems from "./ProductItems";
import Section from "./ui/Section";
import Title from "./Title";

const LatestCollection = () => {
  const { products, isLoading } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <Section className="pt-6">
      <div className="text-center">
        <Title text1={"Latest"} text2={"Collections"} />
        <p className="mx-auto mt-4 max-w-2xl text-sm text-subtle sm:text-base">
          Discover the newest arrivals in our collection — curated for sleek
          performance, refined style, and effortless everyday use.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={`latest-skeleton-${index}`} />
            ))
          : latestProducts.map((item) => (
              <ProductItems
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
                ratings={item.avgRating}
              />
            ))}
      </div>
    </Section>
  );
};

export default LatestCollection;
