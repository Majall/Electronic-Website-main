import { useContext } from "react";
import { ShopContext } from "../context/ShopContextContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const cartTotal = getCartAmount();

  return (
    <div className="w-full rounded-lg border border-border bg-surface p-6 shadow-soft">
      <div className="text-xl">
        <Title text1={"Cart"} text2={"Totals"} />
      </div>
      <div className="mt-4 space-y-3 text-sm text-subtle">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {cartTotal}.00
          </p>
        </div>
        <div className="flex justify-between">
          <p>Shipping fee</p>
          <p>
            {currency} {delivery_fee}
          </p>
        </div>
        <div className="flex justify-between text-sm font-semibold text-foreground">
          <span>Total</span>
          <span>
            {currency} {cartTotal === 0 ? 0 : cartTotal + delivery_fee}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
