import { ProtectedContent } from "./ProtectedContent";

// Content exclusive to signed in users
export function UserContent({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedContent role={false} userId={false}>
      {children}
    </ProtectedContent>
  );
}
