import { useAppSelector } from "../hooks";

export function UserInfo() {
    const user = useAppSelector((s) => s.user);

    if (!user) return <div>No user loaded</div>;

    return (
        <div>
            <strong>User:</strong> {user.email} ({user.userId})<br />
            <small>Roles: {user.roles.join(", ")}</small>
        </div>
    );
}
