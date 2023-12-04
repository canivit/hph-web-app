import { ProtectedContent } from "./ProtectedContent";

// Content exclusive to signed in users
export function SignedInContent({ children }: { children: React.ReactNode }) {
  return <ProtectedContent role={false}>{children}</ProtectedContent>;
}
