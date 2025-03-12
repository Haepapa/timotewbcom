/**
 * Renders a help message displaying available terminal commands.
 *
 * The component returns a JSX element that lists various commands (e.g., help, clear, date, echo, whoami, theme, cv)
 * along with their descriptions. Command names are styled using a custom CSS class.
 *
 * @returns A JSX element containing the structured help information.
 */
export default function help() {
  return (
    <div className="space-y-1">
      <p className="font-semibold">Available Commands:</p>
      <p>
        <span className="cust-command-style">help</span> - Show this help
        message
      </p>
      <p>
        <span className="cust-command-style">clear</span> - Clear the terminal
      </p>
      <p>
        <span className="cust-command-style">date</span> - Show current date and
        time
      </p>
      <p>
        <span className="cust-command-style">echo</span> [text] - Echo back your
        text
      </p>
      <p>
        <span className="cust-command-style">whoami</span> - Display user info
      </p>
      <p>
        <span className="cust-command-style">theme</span> [option] - Change
        terminal theme
      </p>
      <p className="ml-4">-d, --dark - Switch to dark theme</p>
      <p className="ml-4">-l, --light - Switch to light theme</p>
      <p className="ml-4">-s, --system - Use system theme preference</p>
      <p>
        <span className="cust-command-style">cv</span> [option] - View my CV
      </p>
      <p className="ml-4">-a, --about - About Me</p>
      <p className="ml-4">
        -tc, --technical-competencies - My technical competencies
      </p>
    </div>
  );
}
