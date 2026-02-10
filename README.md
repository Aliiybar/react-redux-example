# React + TypeScript + Vite + Redux

This is a simple working example of redux usage

To keep it simple store api etc are not in folders.

## Running the application

commands

```
bun i
bun run dev
```

## Explanation

We have 3 entities in the store User, Menu, and Cart.

- User is loaded in the beginning and stay there forever.
- Menu is loaded in the beginning and only active menu item is updated based on the selection.
- Cart is dynamic and updates server when an item is added.

### src/types.ts

Entities defined in types.ts. They are the data structures.

### src/api.ts

it's a dummy api call to get initial data and cart sync

### src/store.ts

it contains slices (for entities), middleware to update cart in the server, store, types and actions

### src/hook.ts

it's the wrapper for useDispatch and useSelector. Small but effective wrapper

### src/components/UserInfo.tsx

it's the user component using store to get user info

### src/components/Menu.tsx

it's the menu component using store to get menu items and set active menu

### src/components/CartSummary.tsx

it's the cart component using store to update and display cart items and sync them with server

### src/pages/ProductPage.tsx

dummy product page to add / remove item from cart

### src/App.tsx

It's where we fetch initial data from the server and update the store

### src/main.tsx

it's where we wire up store and set Provider
