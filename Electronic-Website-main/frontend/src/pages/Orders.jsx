import { useCallback, useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextContext";
import Title from "../components/Title";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const { backendUrl, token, currency, user } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [reviewBox, setReviewBox] = useState({}); // track which item shows review box

  const orders = useCallback(async () => {
    try {
      if (!token) return null;

      const res = await axios.get(backendUrl + "/api/order/userOrders", {
        headers: { token },
      });

      if (res.data.success) {
        let allOrders = [];
        res.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrders.push(item);
          });
        });
        setOrderData(allOrders.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  }, [backendUrl, token]);

  useEffect(() => {
    orders();
  }, [orders]);

  const toggleReviewBox = (index) => {
    setReviewBox((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const submitReview = async (index, item) => {
    try {
      const comment = item.review;
      if (!comment) {
        toast.error("Please enter a review.");
        return;
      }

      const res = await axios.post(
        backendUrl + "/api/user/addReview",
        {
          productId: item._id,
          userId: user._id,
          comment,
          rating: 5, 
        },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Review submitted successfully!");
        toggleReviewBox(index);
        orders(); // refresh orders to reflect review if needed
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error submitting review");
    }
  };

  return (
    <div className="border-t border-border pt-10">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 border-b border-border py-6 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                className="w-16 rounded-md bg-muted object-contain sm:w-20"
                src={item.image[0]}
                alt={item.name}
                loading="lazy"
              />
              <div>
                <p className="text-sm font-semibold text-foreground sm:text-base">
                  {item.name}
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs text-subtle">
                  <p className="text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity:{item.quantity}</p>
                  <p>Size:{item.size}</p>
                </div>
                <p className="mt-2">
                  Date:{" "}
                  <span className="text-subtle">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-2">
                  Payment:{" "}
                  <span className="text-subtle">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-success"></p>
                <p className="text-sm text-foreground md:text-base">
                  {item.status}
                </p>
              </div>

              {item.status !== "Delivered" && (
                <button
                  onClick={orders}
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-muted"
                >
                  Track Order
                </button>
              )}

              {/* Review Button */}
              {item.status === "Delivered" && !reviewBox[index] && (
                <button
                  onClick={() => toggleReviewBox(index)}
                  className="mt-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-muted"
                >
                  Write a Review
                </button>
              )}

              {/* Review Box */}
              {item.status === "Delivered" && reviewBox[index] && (
                <div className="flex flex-col gap-2 mt-2 w-full">
                  <textarea
                    placeholder="Write your review..."
                    className="w-full rounded-md border border-border bg-surface p-2 text-xs text-foreground focus-ring"
                    value={item.review || ""}
                    onChange={(e) => {
                      const updatedOrders = [...orderData];
                      updatedOrders[index].review = e.target.value;
                      setOrderData(updatedOrders);
                    }}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => submitReview(index, item)}
                      className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                      Submit Review
                    </button>
                    <button
                      onClick={() => toggleReviewBox(index)}
                      className="rounded-full border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-surface"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
