import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextContext";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductItems from "./ProductItems";
import Section from "./ui/Section";
import Title from "./Title";

const BestSeller = () => {
  const { products, isLoading } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestSeller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <Section className="pt-4">
      <div className="text-center">
        <Title text1={"Best"} text2={"Sellers"} />
        <p className="mx-auto mt-4 max-w-2xl text-sm text-subtle sm:text-base">
          Explore the products customers return to — a curated set of favorites
          designed for everyday performance.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={`best-skeleton-${index}`} />
            ))
          : bestSeller.map((item) => (
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

export default BestSeller;
