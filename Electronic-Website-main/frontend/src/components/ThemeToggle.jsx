import { Moon, Sun } from "lucide-react";
import Button from "./ui/Button";
import useTheme from "../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-label="Toggle theme"
      className="rounded-full border border-border bg-surface/70 hover:bg-muted"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      <span className="sr-only">{isDark ? "Light mode" : "Dark mode"}</span>
    </Button>
  );
};

export default ThemeToggle;
