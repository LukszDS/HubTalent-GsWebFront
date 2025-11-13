
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    console.log("Current theme:", theme);
    const newTheme = theme === "dark" ? "light" : "dark";
    console.log("Setting theme to:", newTheme);
    setTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <header className="sticky pl-20 top-0 z-50 w-full border-b  bg-[hsl(var(--background)/0.3)] backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-blue-500"></div>
          <h1 className="text-xl font-bold">TalentHub</h1>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleThemeChange}
          className="rounded-full relative cursor-pointer"
        >
          <Sun 
            className="h-5 w-5 absolute transition-all" 
            style={{
              opacity: theme === "dark" ? 0 : 1,
              transform: theme === "dark" ? "rotate(-90deg) scale(0)" : "rotate(0deg) scale(1)",
            }}
          />
          <Moon 
            className="h-5 w-5 absolute transition-all" 
            style={{
              opacity: theme === "dark" ? 1 : 0,
              transform: theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
            }}
          />
          <span className="sr-only">Alternar tema</span>
        </Button>
      </div>
    </header>
  );
};
