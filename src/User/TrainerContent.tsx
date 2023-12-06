import { ProtectedContent } from "./ProtectedContent";

// Content exclusive to signed in trainers
export function TrainerContent({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedContent role="Trainer" userId={false}>
      {children}
    </ProtectedContent>
  );
}
