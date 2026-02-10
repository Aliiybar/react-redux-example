import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setUser, setMenu, setCart } from "./store";
import { fetchInitialData } from "./api";
import { UserInfo } from "./components/UserInfo";
import { Menu } from "./components/Menu";
import { CartSummary } from "./components/CartSummary";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from './pages/ProductPage';

export function App() {
  const dispatch = useAppDispatch();
  const menu = useAppSelector((s) => s.menu);
  const selected = menu.find((m) => m.isSelected)?.link ?? "home";

  useEffect(() => {
    (async () => {
      const data = await fetchInitialData();
      dispatch(setUser(data.user));
      dispatch(setMenu(data.menu));
      dispatch(setCart(data.cart));
    })();
  }, [dispatch]);

  let content = null;
  if (selected === "home") content = <HomePage />;
  if (selected === "products") content = <ProductsPage />;

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>My Shop</h1>
      <UserInfo />
      <Menu />
      <CartSummary />
      <hr />
      {content}
    </div>
  );
}
