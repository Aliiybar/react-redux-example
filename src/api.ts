import axios from "axios";
import type { CartItem } from "./types";

export const api = axios.create({
  baseURL: "https://httpbin.org", // simple echo API
});

// Simulate loading initial data (user, menu, cart)
export async function fetchInitialData() {
  // In real life, you'd call your own backend
  await api.get("/get");
  return {
    user: {
      userId: "u1",
      email: "user@example.com",
      roles: ["customer"],
    },
    menu: [
      {
        title: "Home",
        link: "home",
        isSelected: true,
        children: [],
      },
      {
        title: "Products",
        link: "products",
        isSelected: false,
        children: [],
      },
    ],
    cart: [] as CartItem[],
  };
}

// Simulate syncing cart to server
export async function syncCartToServer(cart: CartItem[]) {
  // This will always succeed and echo back
  const res = await api.post("/post", { cart });
  return res.data;
}
