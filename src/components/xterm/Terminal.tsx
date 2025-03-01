import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import "./Terminal.css";

interface TerminalProps {
  onCommand?: (command: string) => void;
}

const TerminalComponent: React.FC<TerminalProps> = ({ onCommand }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    // Initialize xterm.js
    if (terminalRef.current) {
      // Create terminal instance
      const term = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: "monospace",
        theme: {
          background: "background",
          foreground: "foreground",
        },
      });

      // Create fit addon to resize terminal properly
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);

      // Open terminal
      term.open(terminalRef.current);
      fitAddon.fit();

      // Save references
      xtermRef.current = term;
      fitAddonRef.current = fitAddon;

      // Handle terminal input
      let currentLine = "";
      term.onKey(({ key, domEvent }) => {
        const printable =
          !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

        if (domEvent.keyCode === 13) {
          // Enter key
          term.write("\r\n$ ");
          if (currentLine.trim() === "clear") {
            term.clear();
          }
          if (onCommand && currentLine) {
            onCommand(currentLine);
          }
          currentLine = "";
        } else if (domEvent.keyCode === 8) {
          // Backspace
          if (currentLine.length > 0) {
            currentLine = currentLine.substring(0, currentLine.length - 1);
            term.write("\b \b");
          }
        } else if (printable) {
          currentLine += key;
          term.write(key);
        }
      });

      // Display welcome message
      term.writeln("Welcome to Terminal Interface");
      term.writeln("Type commands below:");
      term.write("\r\n$ ");

      // Handle window resize
      const handleResize = () => {
        if (fitAddonRef.current) {
          fitAddonRef.current.fit();
        }
      };

      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        term.dispose();
      };
    }
  }, [onCommand]);

  return <Box ref={terminalRef} overflow="hidden" padding={2} />;
};

export default TerminalComponent;
