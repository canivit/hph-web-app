import { ProtectedContent } from "./ProtectedContent";

// Content exclusive to signed in athletes
export function AthleteContent({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedContent role="Athlete" userId={false}>
      {children}
    </ProtectedContent>
  );
}
