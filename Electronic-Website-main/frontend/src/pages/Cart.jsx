import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Button from "../components/ui/Button";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContextContext";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const size in cartItems[items]) {
          if (cartItems[items][size] > 0) {
            //Converts cartItems (an object) into cartData (an array).
            tempData.push({
              _id: items,
              size: size,
              quantity: cartItems[items][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t border-border pt-10">
      <div className="mb-6 text-2xl">
        <Title text1={"Your"} text2={"Cart"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="grid grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4 border-b border-border py-4 text-sm text-subtle"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 rounded-md bg-muted object-contain sm:w-20"
                  src={productData.image[0]}
                  alt={productData.name}
                  loading="lazy"
                />
                <div>
                  <p className="text-xs font-semibold text-foreground sm:text-base">
                    {productData.name}
                  </p>
                  <div className="mt-2 flex items-center gap-5 text-xs text-subtle">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="rounded-full border border-border bg-surface px-3 py-1 text-[10px]">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="max-w-14 rounded-md border border-border bg-surface px-2 py-1 text-xs text-foreground focus-ring"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                src={assets.bin_icon}
                className="mr-4 w-4 cursor-pointer sm:w-5"
                alt="Remove item"
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <Button
              onClick={() => navigate("/PlaceOrder")}
              size="lg"
              className="my-8 w-full sm:w-auto"
            >
              Proceed to checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
