import { Link } from "react-router-dom";

export function SimpleLink({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) {
  return (
    <Link to={to} style={{ textDecoration: "inherit", color: "inherit" }}>
      {children}
    </Link>
  );
}
