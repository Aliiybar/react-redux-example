import { useAppSelector } from "../hooks";

export function CartSummary() {
    const cart = useAppSelector((s) => s.cart);
    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = cart.reduce((sum, i) => sum + i.quantity * i.price, 0);

    return (
        <div>
            <strong>Cart:</strong> {totalItems} items — £{totalPrice.toFixed(2)}
        </div>
    );
}
