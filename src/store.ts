/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, MenuItem, CartItem } from "./types";
import { syncCartToServer } from "./api";


// USER SLICE
type UserState = User | null;

const userSlice = createSlice({
  name: "user",
  initialState: null as UserState,
  reducers: {
    setUser: (_state, action: PayloadAction<User>) => action.payload,
  },
});

// MENU SLICE
type MenuState = MenuItem[];

const menuSlice = createSlice({
  name: "menu",
  initialState: [] as MenuState,
  reducers: {
    setMenu: (_state, action: PayloadAction<MenuItem[]>) => action.payload,
    selectMenuItem: (state, action: PayloadAction<string>) => {
      const link = action.payload;
      const update = (items: MenuItem[]): MenuItem[] =>
        items.map((item) => ({
          ...item,
          isSelected: item.link === link,
          children: item.children ? update(item.children) : [],
        }));
      return update(state);
    },
  },
});

// CART SLICE
type CartState = CartItem[];

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartState,
  reducers: {
    setCart: (_state, action: PayloadAction<CartItem[]>) => action.payload,
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.find((i) => i.itemId === action.payload.itemId);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      return state.filter((i) => i.itemId !== action.payload);
    },
  },
});

// MIDDLEWARE: sync cart to server on add/remove
const cartSyncMiddleware = (storeAPI: any) => (next: any) => async (action: any) => {
  const result = next(action);

  if (
    action.type === cartSlice.actions.addToCart.type ||
    action.type === cartSlice.actions.removeFromCart.type
  ) {
    const state = storeAPI.getState();
    try {
      await syncCartToServer(state.cart);
      console.log("Cart synced to server:", state.cart);
    } catch (e) {
      console.error("Failed to sync cart", e);
    }
  }

  return result;
};

// STORE
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    menu: menuSlice.reducer,
    cart: cartSlice.reducer,
  },
  middleware: (getDefault) => getDefault().concat(cartSyncMiddleware),
});

// TYPES
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ACTIONS
export const { setUser } = userSlice.actions;
export const { setMenu, selectMenuItem } = menuSlice.actions;
export const { setCart, addToCart, removeFromCart } = cartSlice.actions;
