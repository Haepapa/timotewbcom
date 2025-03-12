import type { JSX } from "react";

import { useState, useRef, useEffect } from "react";
import { Command, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { help } from "./commands/help";
import { date } from "./commands/date";
import { echo } from "./commands/echo";
import { whoami } from "./commands/whoami";
import { theme as themecmd } from "./commands/theme";
import { ThemeType, TerminalTabType } from "@/types/terminal";
import { themeClasses } from "@/theme";

export default function Terminal() {
  //----------------------------------------------------------------------------------------
  // Vars
  //----------------------------------------------------------------------------------------
  const [activeTabId, setActiveTabId] = useState("1");
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  //----------------------------------------------------------------------------------------
  // Theme and color mode
  //----------------------------------------------------------------------------------------
  const [theme, setTheme] = useState<ThemeType>("dark");
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("terminal-theme", "dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
      localStorage.setItem("terminal-theme", "light");
    } else if (theme === "system") {
      localStorage.setItem("terminal-theme", "system");
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  // Listen for system theme changes if in system mode
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const root = document.documentElement;
      if (e.matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Determine which theme classes to use
  const currentTheme =
    theme === "system"
      ? document.documentElement.classList.contains("dark")
        ? "dark"
        : "light"
      : theme;

  const classes = themeClasses[currentTheme as keyof typeof themeClasses];

  //----------------------------------------------------------------------------------------
  // Tabs
  //----------------------------------------------------------------------------------------
  const [tabs, setTabs] = useState<TerminalTabType[]>([
    {
      id: "1",
      name: "Terminal 1",
      history: [
        {
          input: "",
          output: (
            <div className={cn(classes.text.heading, "font-semibold")}>
              <p>Welcome to the Terminal</p>
              <p className="text-zinc-400 mt-1">
                Type <span className={classes.text.command}>help</span> to see
                available commands
              </p>
            </div>
          ),
          timestamp: new Date(),
        },
      ],
      input: "",
    },
  ]);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  //----------------------------------------------------------------------------------------
  // Terminal UI
  //----------------------------------------------------------------------------------------
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem(
      "terminal-theme"
    ) as ThemeType | null;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Auto focus input
  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  //----------------------------------------------------------------------------------------
  // Commands
  //----------------------------------------------------------------------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTab.input.trim()) return;

    const command = activeTab.input.trim();
    let output: string | JSX.Element = "";

    // Process commands
    if (command.toLowerCase().startsWith("theme")) {
      output = themecmd(command, setTheme);
    } else {
      switch (command.toLowerCase()) {
        case "help":
          output = help(classes);
          break;
        case "clear":
          setTabs((prev) =>
            prev.map((tab) =>
              tab.id === activeTabId ? { ...tab, history: [] } : tab
            )
          );
          updateTabInput("");
          return;
        case "date":
          output = date();
          break;
        case "whoami":
          output = whoami();
          break;
        default:
          if (command.toLowerCase().startsWith("echo ")) {
            output = echo(command.substring(5));
          } else {
            output = (
              <span className="text-red-400">
                Command not found: {command}. Type{" "}
                <span className={classes.text.command}>help</span> for available
                commands.
              </span>
            );
          }
      }
    }

    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTabId
          ? {
              ...tab,
              history: [
                ...tab.history,
                {
                  input: command,
                  output,
                  timestamp: new Date(),
                },
              ],
            }
          : tab
      )
    );

    updateTabInput("");
  };

  const updateTabInput = (value: string) => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTabId ? { ...tab, input: value } : tab
      )
    );
  };

  const addNewTab = () => {
    const newId = (tabs.length + 1).toString();
    const newTab: TerminalTabType = {
      id: newId,
      name: `Terminal ${newId}`,
      history: [
        {
          input: "",
          output: (
            <div className={cn(classes.text.heading, "font-semibold")}>
              <p>Welcome to the Terminal</p>
              <p className="text-zinc-400 mt-1">
                Type <span className={cn(classes.text.command)}>help</span> to
                see available commands
              </p>
            </div>
          ),
          timestamp: new Date(),
        },
      ],
      input: "",
    };

    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (tabs.length === 1) return; // Don't close the last tab

    const newTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(newTabs);

    // If we're closing the active tab, switch to the first available tab
    if (id === activeTabId) {
      setActiveTabId(newTabs[0].id);
    }
  };
  return (
    <div
      className={cn(
        "h-screen w-full overflow-hidden border-zinc-700 shadow-2xl",
        currentTheme === "dark" ? "border-zinc-700" : "border-gray-200"
      )}
    >
      {/* Terminal header with tabs */}
      <div className={cn("border-b", classes.header)}>
        <div className="flex items-center">
          {/* Tab list */}
          <div className="flex-1 flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={cn(
                  "flex items-center px-4 py-2 text-sm border-r",
                  currentTheme === "dark"
                    ? "border-zinc-700"
                    : "border-gray-200",
                  tab.id === activeTabId
                    ? classes.tab.active
                    : classes.tab.inactive
                )}
              >
                <Command className="w-3 h-3 mr-2" />
                <span className="truncate">{tab.name}</span>
                {tabs.length > 1 && (
                  <X
                    className="w-3 h-3 ml-2 opacity-60 hover:opacity-100"
                    onClick={(e) => closeTab(tab.id, e)}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Add new tab button */}
          <button
            onClick={addNewTab}
            className={cn(
              "px-3 py-2",
              currentTheme === "dark"
                ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
            )}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className={cn(
          "p-4 h-[calc(100vh-80px)] overflow-y-auto font-mono text-sm",
          classes.content
        )}
      >
        {activeTab.history.map((cmd, index) => (
          <div key={index} className="mb-4">
            {cmd.input && (
              <div className="flex">
                <span className={cn(classes.text.heading, "mr-2")}>
                  guest@terminal:~$
                </span>
                <span>{cmd.input}</span>
              </div>
            )}
            <div className="mt-1 ml-0">{cmd.output}</div>
          </div>
        ))}

        {/* Current input line */}
        <form onSubmit={handleSubmit} className="flex">
          <span className={cn(classes.text.heading, "mr-2")}>
            guest@terminal:~$
          </span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={activeTab.input}
              onChange={(e) => updateTabInput(e.target.value)}
              className="w-full bg-transparent outline-none caret-transparent"
              autoFocus
            />
            <span className="absolute left-0 top-0 whitespace-pre">
              {activeTab.input}
            </span>
            <span
              className={cn(
                "absolute top-0 left-0 ml-[calc(1ch*var(--cursor-position))]",
                cursorVisible ? "opacity-100" : "opacity-0"
              )}
              style={
                {
                  "--cursor-position": activeTab.input.length,
                } as React.CSSProperties
              }
            >
              ▎
            </span>
          </div>
        </form>
      </div>

      {/* Terminal footer */}
      <div
        className={cn(
          "px-4 py-2 border-t text-xs flex justify-between",
          classes.footer
        )}
      >
        <span>Terminal v1.0</span>
        <span>{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
