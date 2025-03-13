/**
 * Renders a help message listing available terminal commands.
 *
 * This component displays a collection of command instructions including details for:
 * - Displaying this help message
 * - Clearing the terminal
 * - Showing the current date and time
 * - Echoing user-supplied text
 * - Displaying user information
 * - Changing the terminal theme (with options for dark, light, or system preferences)
 * - Viewing the CV (with sub-options for About Me and technical competencies)
 *
 * @returns The JSX element representing the help message.
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
        -t, --technical-competencies - My technical competencies
      </p>
    </div>
  );
}
