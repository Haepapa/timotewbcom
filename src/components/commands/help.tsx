import { cn } from "@/lib/utils";
import { themeClassesType } from "@/types/theme";

export function help(classes: themeClassesType) {
  return (
    <div className="space-y-1">
      <p className={cn(classes.text.heading, "font-semibold")}>
        Available Commands:
      </p>
      <p>
        <span className={cn(classes.text.command, "font-semibold")}>help</span>{" "}
        - Show this help message
      </p>
      <p>
        <span className={cn(classes.text.command, "font-semibold")}>clear</span>{" "}
        - Clear the terminal
      </p>
      <p>
        <span className={cn(classes.text.command, "font-semibold")}>date</span>{" "}
        - Show current date and time
      </p>
      <p>
        <span className={cn(classes.text.command, "font-semibold")}>
          echo [text]
        </span>{" "}
        - Echo back your text
      </p>
      <p>
        <span className={cn(classes.text.command, "font-semibold")}>
          whoami
        </span>{" "}
        - Display user info
      </p>
      <p>
        <span className={cn(classes.text.command, "font-semibold")}>
          theme [option]
        </span>{" "}
        - Change terminal theme
      </p>
      <p className="ml-4">
        <span className={cn(classes.text.command, "font-semibold")}>
          -d, --dark
        </span>{" "}
        - Switch to dark theme
      </p>
      <p className="ml-4">
        <span className={cn(classes.text.command, "font-semibold")}>
          -l, --light
        </span>{" "}
        - Switch to light theme
      </p>
      <p className="ml-4">
        <span className={cn(classes.text.command, "font-semibold")}>
          -s, --system
        </span>{" "}
        - Use system theme preference
      </p>
    </div>
  );
}
