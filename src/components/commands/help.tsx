export function help() {
  return (
    <div className="space-y-1">
      <p className="text-emerald-400 font-semibold">Available Commands:</p>
      <p>
        <span className="text-yellow-300">help</span> - Show this help message
      </p>
      <p>
        <span className="text-yellow-300">clear</span> - Clear the terminal
      </p>
      <p>
        <span className="text-yellow-300">date</span> - Show current date and
        time
      </p>
      <p>
        <span className="text-yellow-300">echo [text]</span> - Echo back your
        text
      </p>
      <p>
        <span className="text-yellow-300">whoami</span> - Display user info
      </p>
      <p>
        <span className="text-yellow-300">theme [option]</span> - Change
        terminal theme
      </p>
      <p className="ml-4">
        <span className="text-yellow-300">-d, --dark</span> - Switch to dark
        theme
      </p>
      <p className="ml-4">
        <span className="text-yellow-300">-l, --light</span> - Switch to light
        theme
      </p>
      <p className="ml-4">
        <span className="text-yellow-300">-s, --system</span> - Use system theme
        preference
      </p>
    </div>
  );
}
