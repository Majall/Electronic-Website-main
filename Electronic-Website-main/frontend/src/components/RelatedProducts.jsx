import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextContext";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductItems from "./ProductItems";
import Section from "./ui/Section";
import Title from "./Title";

const RelatedProducts = ({ category, subCategory }) => {
  const { products, isLoading } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <Section className="pt-10">
      <div className="text-center">
        <Title text1={"Related"} text2={"Products"} />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={`related-skeleton-${index}`} />
            ))
          : related.map((item) => (
              <ProductItems
                key={item._id}
                id={item._id}
                price={item.price}
                name={item.name}
                image={item.image}
                ratings={item.avgRating}
              />
            ))}
      </div>
    </Section>
  );
};

export default RelatedProducts;
