export function help() {
  return (
    <div className="space-y-1">
      <p className="font-semibold">Available Commands:</p>
      <p>
        <span className="font-semibold">help</span>
        <span className="text-term-gray"> - Show this help message</span>
      </p>
      <p>
        <span className="text-term-blue font-semibold">clear</span> - Clear the
        terminal
      </p>
      <p>
        <span className="text-term-blue font-semibold">date</span> - Show
        current date and time
      </p>
      <p>
        <span className="text-term-blue font-semibold">echo [text]</span> - Echo
        back your text
      </p>
      <p>
        <span className="text-term-blue font-semibold">whoami</span> - Display
        user info
      </p>
      <p>
        <span className="text-term-blue font-semibold">theme [option]</span> -
        Change terminal theme
      </p>
      <p className="ml-4">
        <span className="text-term-blue font-semibold">-d, --dark</span> -
        Switch to dark theme
      </p>
      <p className="ml-4">
        <span className="text-term-blue font-semibold">-l, --light</span> -
        Switch to light theme
      </p>
      <p className="ml-4">
        <span className="text-term-blue font-semibold">-s, --system</span> - Use
        system theme preference
      </p>
    </div>
  );
}
