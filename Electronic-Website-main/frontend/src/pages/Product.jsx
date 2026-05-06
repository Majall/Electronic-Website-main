import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductReviews from "../components/ProductReviews";
import RelatedProducts from "../components/RelatedProducts";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import Skeleton from "../components/ui/Skeleton";
import { ShopContext } from "../context/ShopContextContext";


const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, isLoading } =
    useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  
  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      } else {
        setProductData("not-found");
      }
    }
  }, [productId, products]);

  if (productData === "not-found") {
    return (
      <Section className="pt-10">
        <Card className="mx-auto flex max-w-xl flex-col items-center gap-4 p-10 text-center">
          <p className="text-lg font-semibold text-foreground">
            Product not found
          </p>
          <p className="text-sm text-subtle">
            Please return to the collection to explore available items.
          </p>
        </Card>
      </Section>
    );
  }

  if (isLoading && !productData) {
    return (
      <Section className="pt-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <Card className="p-6">
            <Skeleton className="h-72 w-full" />
          </Card>
          <div className="space-y-4">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </Section>
    );
  }

  return productData ? (
    <Section className="pt-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Card className="flex items-center justify-center p-6">
            <img
              src={image}
              className="h-72 w-full object-contain transition-transform duration-500 hover:scale-105"
              alt={productData.name}
              loading="lazy"
            />
          </Card>
          <div className="flex gap-3 overflow-x-auto">
            {productData.image.map((img, index) => (
              <button
                key={index}
                onClick={() => setImage(img)}
                className={`h-16 w-20 rounded-md border ${
                  image === img
                    ? "border-primary"
                    : "border-border/60 hover:border-border"
                } bg-surface p-2 transition`}
              >
                <img
                  src={img}
                  className="h-full w-full object-contain"
                  alt={`${productData.name}-${index}`}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground">
              {productData.name}
            </h1>
            <div className="flex items-center gap-2">
              <Badge variant="accent">
                <img className="w-3" src={assets.star_icon} alt="" />
                {Number(productData.avgRating || 0).toFixed(1)}
              </Badge>
              <p className="text-xs text-subtle">
                {productData.reviews?.length || 0} reviews
              </p>
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground">
            {currency}
            {productData.price}
          </p>
          <p className="text-sm text-subtle">{productData.description}</p>
          <ul className="space-y-2 text-sm text-subtle">
            {productData.features.map((feature, id) => (
              <li key={id} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-subtle">
              Select size
            </p>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((item) => (
                <button
                  key={item}
                  onClick={() => setSize(item)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    item === size
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-surface text-subtle hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => addToCart(productData._id, size)}>
              Add to cart
            </Button>
            <p className="text-xs text-subtle">
              Ships in 1-2 days • 7-day return policy
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-subtle">
          <span className="rounded-full border border-border px-4 py-2 text-foreground">
            Description
          </span>
          {productData.reviews && productData.reviews.length > 0 && (
            <span className="rounded-full border border-border px-4 py-2">
              Reviews ({productData.reviews.length})
            </span>
          )}
        </div>
        {productData.reviews && productData.reviews.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground">
              Customer reviews
            </h3>
            <div className="mt-4">
              <ProductReviews reviews={productData.reviews} />
            </div>
          </div>
        )}
      </div>
      <RelatedProducts
        id={productData._id}
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </Section>
  ) : (
    <div className="opacity-0" />
  );
};

export default Product;
