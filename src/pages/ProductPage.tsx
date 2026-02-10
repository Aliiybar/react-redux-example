import { useAppDispatch, useAppSelector } from "../hooks";
import { addToCart, removeFromCart } from "../store";

const PRODUCTS = [
    { itemId: "p1", itemName: "Product 1", price: 10 },
    { itemId: "p2", itemName: "Product 2", price: 20 },
    { itemId: "p3", itemName: "Product 3", price: 30 },
];

export function ProductsPage() {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((s) => s.cart);

    const inCart = (id: string) => cart.some((i) => i.itemId === id);

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {PRODUCTS.map((p) => (
                    <li key={p.itemId} style={{ marginBottom: "0.5rem" }}>
                        {p.itemName} — £{p.price.toFixed(2)}{" "}
                        {!inCart(p.itemId) ? (
                            <button
                                onClick={() =>
                                    dispatch(
                                        addToCart({
                                            itemId: p.itemId,
                                            itemName: p.itemName,
                                            price: p.price,
                                            quantity: 1,
                                        })
                                    )
                                }
                            >
                                Add to cart
                            </button>
                        ) : (
                            <button onClick={() => dispatch(removeFromCart(p.itemId))}>
                                Remove from cart
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            <p>
                Adding/removing items will trigger a Redux middleware that calls the
                server via Axios.
            </p>
        </div>
    );
}
