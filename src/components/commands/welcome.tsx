/**
 * Renders a welcome message for the Terminal interface.
 *
 * The component displays a styled greeting with a bolded title and an instruction
 * prompting the user to type "help" to see available commands. The "help" text is
 * visually distinguished using a custom styling class.
 */
export default function welcome() {
  return (
    <div className="text-term-grey">
      <p className="font-semibold">Welcome to the Terminal</p>
      <p className="mt-1">
        Type <span className="cust-command-style">help</span> to see available
        commands
      </p>
    </div>
  );
}
