import { useSelector } from "react-redux";
import { GlobalState } from "../Store/store";

// Content exclusive to signed in users
export function SignedInContent({ children }: { children: React.ReactNode }) {
  const currentUser = useSelector((state: GlobalState) => state.userReducer.currentUser);
  if (currentUser === false) {
    return <></>;
  }

  return <>{children}</>;
}
