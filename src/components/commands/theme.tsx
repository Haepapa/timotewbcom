import { ThemeType } from "@/types/terminal";
import { Dispatch, SetStateAction } from "react";

export function theme(
  theme: string,
  setTheme: Dispatch<SetStateAction<ThemeType>>
) {
  const args = theme.split(" ");

  if (args.length === 1) {
    return (
      <div className="space-y-1">
        <p className="text-emerald-400 font-semibold">
          Current Theme: <span className="text-white">{theme}</span>
        </p>
        <p className="mt-2">
          Usage: <span className="text-yellow-300">theme [option]</span>
        </p>
        <p>Options:</p>
        <p>
          <span className="text-yellow-300">-d, --dark</span> - Switch to dark
          theme
        </p>
        <p>
          <span className="text-yellow-300">-l, --light</span> - Switch to light
          theme
        </p>
        <p>
          <span className="text-yellow-300">-s, --system</span> - Use system
          theme preference
        </p>
      </div>
    );
  } else {
    const flag = args[1].toLowerCase();

    if (flag === "-d" || flag === "--dark") {
      setTheme(() => "dark");
      return "Theme set to dark mode.";
    } else if (flag === "-l" || flag === "--light") {
      setTheme(() => "light");
      return "Theme set to light mode.";
    } else if (flag === "-s" || flag === "--system") {
      setTheme(() => "system");
      return "Theme set to follow system preference.";
    } else {
      return (
        <span className="text-red-400">
          Unknown option: {flag}. Use -d/--dark, -l/--light, or -s/--system.
        </span>
      );
    }
  }
}
