import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Command, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

type CommandType = {
  input: string
  output: string | JSX.Element
  timestamp: Date
}

type TerminalTabType = {
  id: string
  name: string
  history: CommandType[]
  input: string
}

type ThemeType = "dark" | "light" | "system"

export default function Terminal() {
  const [tabs, setTabs] = useState<TerminalTabType[]>([
    {
      id: "1",
      name: "Terminal 1",
      history: [
        {
          input: "",
          output: (
            <div className="text-emerald-400 font-semibold">
              <p>Welcome to the Terminal</p>
              <p className="text-zinc-400 mt-1">
                Type <span className="text-yellow-300">help</span> to see available commands
              </p>
            </div>
          ),
          timestamp: new Date(),
        },
      ],
      input: "",
    },
  ])

  const [activeTabId, setActiveTabId] = useState("1")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [theme, setTheme] = useState<ThemeType>("dark")
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0]

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("terminal-theme") as ThemeType | null

    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }, [])

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement

    if (theme === "dark") {
      root.classList.add("dark")
      localStorage.setItem("terminal-theme", "dark")
    } else if (theme === "light") {
      root.classList.remove("dark")
      localStorage.setItem("terminal-theme", "light")
    } else if (theme === "system") {
      localStorage.setItem("terminal-theme", "system")
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    }
  }, [theme])

  // Listen for system theme changes if in system mode
  useEffect(() => {
    if (theme !== "system") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e: MediaQueryListEvent) => {
      const root = document.documentElement
      if (e.matches) {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Auto focus input
  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus()
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeTab.input.trim()) return

    const command = activeTab.input.trim()
    let output: string | JSX.Element = ""

    // Process commands
    if (command.toLowerCase().startsWith("theme")) {
      const args = command.split(" ")

      if (args.length === 1) {
        // Just 'theme' command without flags
        output = (
          <div className="space-y-1">
            <p className="text-emerald-400 font-semibold">
              Current Theme: <span className="text-white">{theme}</span>
            </p>
            <p className="mt-2">
              Usage: <span className="text-yellow-300">theme [option]</span>
            </p>
            <p>Options:</p>
            <p>
              <span className="text-yellow-300">-d, --dark</span> - Switch to dark theme
            </p>
            <p>
              <span className="text-yellow-300">-l, --light</span> - Switch to light theme
            </p>
            <p>
              <span className="text-yellow-300">-s, --system</span> - Use system theme preference
            </p>
          </div>
        )
      } else {
        const flag = args[1].toLowerCase()

        if (flag === "-d" || flag === "--dark") {
          setTheme("dark")
          output = "Theme set to dark mode."
        } else if (flag === "-l" || flag === "--light") {
          setTheme("light")
          output = "Theme set to light mode."
        } else if (flag === "-s" || flag === "--system") {
          setTheme("system")
          output = "Theme set to follow system preference."
        } else {
          output = (
            <span className="text-red-400">Unknown option: {flag}. Use -d/--dark, -l/--light, or -s/--system.</span>
          )
        }
      }
    } else {
      switch (command.toLowerCase()) {
        case "help":
          output = (
            <div className="space-y-1">
              <p className="text-emerald-400 font-semibold">Available Commands:</p>
              <p>
                <span className="text-yellow-300">help</span> - Show this help message
              </p>
              <p>
                <span className="text-yellow-300">clear</span> - Clear the terminal
              </p>
              <p>
                <span className="text-yellow-300">date</span> - Show current date and time
              </p>
              <p>
                <span className="text-yellow-300">echo [text]</span> - Echo back your text
              </p>
              <p>
                <span className="text-yellow-300">whoami</span> - Display user info
              </p>
              <p>
                <span className="text-yellow-300">theme [option]</span> - Change terminal theme
              </p>
              <p className="ml-4">
                <span className="text-yellow-300">-d, --dark</span> - Switch to dark theme
              </p>
              <p className="ml-4">
                <span className="text-yellow-300">-l, --light</span> - Switch to light theme
              </p>
              <p className="ml-4">
                <span className="text-yellow-300">-s, --system</span> - Use system theme preference
              </p>
            </div>
          )
          break
        case "clear":
          setTabs((prev) => prev.map((tab) => (tab.id === activeTabId ? { ...tab, history: [] } : tab)))
          updateTabInput("")
          return
        case "date":
          output = `Current date: ${new Date().toLocaleString()}`
          break
        case "whoami":
          output = (
            <div className="space-y-1">
              <p className="text-emerald-400">
                User: <span className="text-white">guest</span>
              </p>
              <p className="text-emerald-400">
                Role: <span className="text-white">visitor</span>
              </p>
              <p className="text-emerald-400">
                Session: <span className="text-white">{Math.random().toString(36).substring(2, 10)}</span>
              </p>
            </div>
          )
          break
        default:
          if (command.toLowerCase().startsWith("echo ")) {
            output = command.substring(5)
          } else {
            output = (
              <span className="text-red-400">
                Command not found: {command}. Type <span className="text-yellow-300">help</span> for available commands.
              </span>
            )
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
          : tab,
      ),
    )

    updateTabInput("")
  }

  const updateTabInput = (value: string) => {
    setTabs((prev) => prev.map((tab) => (tab.id === activeTabId ? { ...tab, input: value } : tab)))
  }

  const addNewTab = () => {
    const newId = (tabs.length + 1).toString()
    const newTab: TerminalTabType = {
      id: newId,
      name: `Terminal ${newId}`,
      history: [
        {
          input: "",
          output: (
            <div className="text-emerald-400 font-semibold">
              <p>Welcome to the Terminal</p>
              <p className="text-zinc-400 mt-1">
                Type <span className="text-yellow-300">help</span> to see available commands
              </p>
            </div>
          ),
          timestamp: new Date(),
        },
      ],
      input: "",
    }

    setTabs((prev) => [...prev, newTab])
    setActiveTabId(newId)
  }

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()

    if (tabs.length === 1) return // Don't close the last tab

    const newTabs = tabs.filter((tab) => tab.id !== id)
    setTabs(newTabs)

    // If we're closing the active tab, switch to the first available tab
    if (id === activeTabId) {
      setActiveTabId(newTabs[0].id)
    }
  }

  const themeClasses = {
    dark: {
      header: "bg-zinc-800 border-zinc-700",
      tab: {
        active: "bg-zinc-900 text-zinc-200",
        inactive: "bg-zinc-800 text-zinc-400 hover:bg-zinc-700",
      },
      content: "bg-zinc-900 text-zinc-200",
      footer: "bg-zinc-800 border-zinc-700 text-zinc-500",
    },
    light: {
      header: "bg-gray-100 border-gray-200",
      tab: {
        active: "bg-white text-gray-800",
        inactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
      },
      content: "bg-white text-gray-800",
      footer: "bg-gray-100 border-gray-200 text-gray-500",
    },
  }

  // Determine which theme classes to use
  const currentTheme =
    theme === "system" ? (document.documentElement.classList.contains("dark") ? "dark" : "light") : theme

  const classes = themeClasses[currentTheme as keyof typeof themeClasses]

  return (
    <div
      className={cn(
        "h-screen w-full overflow-hidden border-zinc-700 shadow-2xl",
        currentTheme === "dark" ? "border-zinc-700" : "border-gray-200",
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
                  currentTheme === "dark" ? "border-zinc-700" : "border-gray-200",
                  tab.id === activeTabId ? classes.tab.active : classes.tab.inactive,
                )}
              >
                <Command className="w-3 h-3 mr-2" />
                <span className="truncate">{tab.name}</span>
                {tabs.length > 1 && (
                  <X className="w-3 h-3 ml-2 opacity-60 hover:opacity-100" onClick={(e) => closeTab(tab.id, e)} />
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
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-200",
            )}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className={cn("p-4 h-[calc(100vh-80px)] overflow-y-auto font-mono text-sm", classes.content)}
      >
        {activeTab.history.map((cmd, index) => (
          <div key={index} className="mb-4">
            {cmd.input && (
              <div className="flex">
                <span className="text-emerald-400 mr-2">guest@terminal:~$</span>
                <span>{cmd.input}</span>
              </div>
            )}
            <div className="mt-1 ml-0">{cmd.output}</div>
          </div>
        ))}

        {/* Current input line */}
        <form onSubmit={handleSubmit} className="flex">
          <span className="text-emerald-400 mr-2">guest@terminal:~$</span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={activeTab.input}
              onChange={(e) => updateTabInput(e.target.value)}
              className="w-full bg-transparent outline-none caret-transparent"
              autoFocus
            />
            <span className="absolute left-0 top-0 whitespace-pre">{activeTab.input}</span>
            <span
              className={cn(
                "absolute top-0 left-0 ml-[calc(1ch*var(--cursor-position))]",
                cursorVisible ? "opacity-100" : "opacity-0",
              )}
              style={{ "--cursor-position": activeTab.input.length } as React.CSSProperties}
            >
              ▎
            </span>
          </div>
        </form>
      </div>

      {/* Terminal footer */}
      <div className={cn("px-4 py-2 border-t text-xs flex justify-between", classes.footer)}>
        <span>Terminal v1.0</span>
        <span>{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  )
}

