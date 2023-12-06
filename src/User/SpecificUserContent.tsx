import { ProtectedContent } from "./ProtectedContent";

// Content exclusive to a specific signed in user
export function SpecificUserContent({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  return (
    <ProtectedContent role={false} userId={userId}>
      {children}
    </ProtectedContent>
  );
}
