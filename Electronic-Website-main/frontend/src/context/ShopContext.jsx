import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "./ShopContextContext";

const ShopContextProvider = (props) => {
  //the component that stores and provides that data
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    // Adds an item to the cart with a selected size. store data in object
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = +1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    toast.success("Item Added to Cart");

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
        toast.success("Item Added to Cart");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        //cartItems["product123"] = { "M": 2, "L": 1 }
        if (cartItems[items][size] > 0) {
          totalCount += cartItems[items][size];
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.put(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const size in cartItems[items]) {
        if (cartItems[items][size] > 0 && itemInfo) {
          totalAmount += itemInfo.price * cartItems[items][size];
        }
      }
    }
    return totalAmount;
  };

  const getProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        const productsWithAvgRating = response.data.products.map((product) => {
          if (!product.reviews.length) {
            return { ...product, avgRating: "4.0" };
          }

          const totalRating = product.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          const avgRating = parseFloat(
            (totalRating / product.reviews.length).toFixed(1)
          );

          return { ...product, avgRating };
        });

        setProducts(productsWithAvgRating);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [backendUrl]);

  const getCategories = useCallback(async () => {
    try {
      const res = await axios.get(backendUrl + "/api/category/list");
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [backendUrl]);
  const getBrands = useCallback(async () => {
    try {
      const res = await axios.get(backendUrl + "/api/brand/list");
      if (res.data.success) {
        setBrands(res.data.brands);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [backendUrl]);

  const getUserCart = useCallback(
    async (userToken) => {
      try {
        const response = await axios.get(backendUrl + "/api/cart/get", {
          headers: { token: userToken },
        });
        if (response.data.success) {
          setCartItems(response.data.cartData);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
    [backendUrl]
  );

  useEffect(() => {
    if (token) {
      axios
        .get(backendUrl + "/api/user/profile", { headers: { token } })
        .then((res) => {
          if (res.data.success) setUser(res.data.user);
        })
        .catch((err) => console.log(err));
    }
  }, [backendUrl, token]);

  useEffect(() => {
    getProducts();
    getCategories();
    getBrands();
  }, [getBrands, getCategories, getProducts]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, [getUserCart, token]);

  const value = {
    products,
    isLoading,
    currency,
    delivery_fee,
    categories,
    brands,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    user,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
