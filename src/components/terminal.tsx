import type { JSX } from "react";

import { useState, useRef, useEffect } from "react";
import { Plus, X, Terminal as TerminalSVG } from "lucide-react";
import { cn } from "@/lib/utils";
import help from "./commands/help";
import date from "./commands/date";
import echo from "./commands/echo";
import whoami from "./commands/whoami";
import welcome from "./commands/welcome";
import cv from "./commands/cv";
import { theme as themecmd } from "./commands/theme";
import { ThemeType, TerminalTabType } from "@/types/terminal";

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
          output: welcome(),
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
      output = themecmd(command, setTheme, theme);
    } else if (command.toLowerCase().startsWith("cv")) {
      output = cv(command);
    } else {
      switch (command.toLowerCase()) {
        case "help":
          output = help();
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
                <span className="text-term-blue">help</span> for available
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
          output: welcome(),
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
    <div className="h-screen w-full overflow-hidden shadow-2xl border-header-border">
      {/* Terminal header with tabs */}
      <div className="border-b bg-header-background border-header-border">
        <div className="flex items-center">
          {/* Tab list */}
          <div className="flex-1 flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={cn(
                  "flex items-center px-4 py-2 text-sm border-r border-header-border",
                  tab.id === activeTabId
                    ? "bg-tab-active-bg"
                    : "bg-tab-inactive-bg"
                )}
              >
                <TerminalSVG className="w-3 h-3 mr-2" />
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
            className="px-3 py-2 text-new-tab-btn-text hover:text-tab-btn-text-hover hover:bg-tab-btn-bg-hover"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className="p-4 h-[calc(100vh-80px)] overflow-y-auto font-mono text-sm bg-tab-active-bg text-new-tab-btn-text-hover"
      >
        {activeTab.history.map((cmd, index) => (
          <div key={index} className="mb-4">
            {cmd.input && (
              <div className="flex">
                <span className="text-term-blue mr-2">guest@terminal:~$</span>
                <span>{cmd.input}</span>
              </div>
            )}
            <div className="mt-1 ml-0">{cmd.output}</div>
          </div>
        ))}

        {/* Current input line */}
        <form onSubmit={handleSubmit} className="flex">
          <span className="text-term-blue mr-2">guest@terminal:~$</span>
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
      <div className="px-4 py-2 border-t text-xs flex justify-between bg-header-bg border-header-border text-footer-text">
        <span>Terminal v2.0</span>
        <span>{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
