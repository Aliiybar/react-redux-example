import { useAppDispatch, useAppSelector } from "../hooks";
import { selectMenuItem } from "../store";

export function Menu() {
    const menu = useAppSelector((s) => s.menu);
    const dispatch = useAppDispatch();

    return (
        <nav style={{ marginBottom: "1rem" }}>
            {menu.map((item) => (
                <button
                    key={item.link}
                    onClick={() => dispatch(selectMenuItem(item.link))}
                    style={{
                        marginRight: "0.5rem",
                        fontWeight: item.isSelected ? "bold" : "normal",
                    }}
                >
                    {item.title}
                </button>
            ))}
        </nav>
    );
}
