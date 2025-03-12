import { ThemeType } from "@/types/terminal";
import { Dispatch, SetStateAction } from "react";

/**
 * Processes a theme command to either display the current theme information or update the theme.
 *
 * Splits the given command string and, if no additional options are provided, returns a JSX element that shows
 * the current theme with usage instructions and available options. When a valid theme option (-d/--dark, -l/--light,
 * or -s/--system) is supplied, it updates the theme via the state updater and returns a confirmation message. An
 * unrecognized option results in a JSX element with an error message.
 *
 * @param flag - Command input string that may contain a theme option.
 * @param theme - The currently active theme.
 * @returns A confirmation message or a JSX element with usage information or an error message.
 */
export function theme(
  flag: string,
  setTheme: Dispatch<SetStateAction<ThemeType>>,
  theme: string
) {
  const args = flag.split(" ");

  if (args.length === 1) {
    return (
      <div className="space-y-1">
        <p className="font-semibold">Current Theme: {theme}</p>
        <p className="mt-2">
          Usage: <span className="cust-command-style">theme</span> [option]
        </p>
        <p>Options:</p>
        <p className="ml-4">-d, --dark - Switch to dark theme</p>
        <p className="ml-4">-l, --light - Switch to light theme</p>
        <p className="ml-4">-s, --system - Use system theme preference</p>
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
