import { Level } from "./types";

export function LevelBadge({ level }: { level: Level }) {
  const color = {
    Beginner: "success",
    Intermediate: "warning",
    Advanced: "danger",
  }[level];

  return <span className={`badge bg-${color}`}>{level}</span>;
}
