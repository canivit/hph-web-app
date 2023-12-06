import { useSelector } from "react-redux";
import { GlobalState } from "../Store/store";

// Content exclusive to signed in users
export function ProtectedContent({
  children,
  role,
  userId,
}: {
  children: React.ReactNode;
  role: "Trainer" | "Athlete" | false;
  userId: string | false;
}) {
  const currentUser = useSelector(
    (state: GlobalState) => state.userReducer.currentUser
  );
  if (
    currentUser !== false &&
    (role === false || currentUser.role === role) &&
    (userId === false || currentUser._id === userId)
  ) {
    return <>{children}</>;
  }

  return <></>;
}
