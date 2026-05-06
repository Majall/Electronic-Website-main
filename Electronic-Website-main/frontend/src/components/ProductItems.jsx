import { useContext } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContextContext";
import Badge from "./ui/Badge";
import Card from "./ui/Card";

const ProductItems = ({ id, image, name, price, ratings }) => {
  const { currency } = useContext(ShopContext);
  const numericRating = Number(ratings) || 0;

  return (
    <Link to={`/product/${id}`} className="group">
      <Card className="overflow-hidden p-4 hover:-translate-y-1 hover:shadow-strong">
        <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-md bg-muted">
          <img
            src={image[0]}
            className="h-32 w-full object-contain transition-transform duration-500 group-hover:scale-105"
            alt={name}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
        <div className="mt-4 space-y-2">
          <p className="min-h-[2.5rem] text-sm font-semibold text-foreground">
            {name}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">
              {currency}
              {price}
            </p>
            <Badge variant={numericRating >= 4 ? "success" : "danger"}>
              <img className="w-3" src={assets.star_icon} alt="" />
              {numericRating.toFixed(1)}
            </Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductItems;
