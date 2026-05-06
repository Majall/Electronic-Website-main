import { useContext, useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import CartTotal from "./../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContextContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    province: "",
    district: "",
    zipcode: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      const response = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Please Login");
    }
  }, [token, navigate]);
  if (!token) {
    return null;
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col gap-10 border-t border-border pt-10 lg:flex-row lg:justify-between"
    >
      {/* left site */}
      <div className="flex w-full flex-col gap-4 lg:max-w-[480px]">
        <div className="text-xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus-ring"
          />
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus-ring"
          />
        </div>
        <input
          required
          type="email"
          onChange={onChangeHandler}
          name="email"
          placeholder="Email"
          value={formData.email}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus-ring"
        />
        <input
          required
          type="text"
          onChange={onChangeHandler}
          name="street"
          placeholder="Street"
          value={formData.street}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus-ring"
        />
        <div className="flex gap-3">
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="province"
            placeholder="Province"
            value={formData.province}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus-ring"
          />
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="district"
            placeholder="District"
            value={formData.district}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus-ring"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="number"
            onChange={onChangeHandler}
            name="zipcode"
            placeholder="ZipCode"
            value={formData.zipcode}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus-ring"
          />
          {/* <input required type='text' placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3 w-full'/> */}
        </div>
        <input
          required
          type="number"
          onChange={onChangeHandler}
          name="phone"
          placeholder="PhoneNumber"
          value={formData.phone}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus-ring"
        />
      </div>

      {/* right site */}
      <div className="mt-4 w-full lg:mt-0 lg:max-w-sm">
        <div className="min-w-0">
          <CartTotal />
        </div>
        <div className="mt-10">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <Card className="mt-4 flex items-center gap-3 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground">
              Cash on delivery
            </p>
          </Card>
        </div>
        <div className="mt-8 w-full text-end">
          <Button type="submit" size="lg">
            Place order
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
