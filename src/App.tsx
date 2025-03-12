import Terminal from "@/components/terminal";

/**
 * Root application component.
 *
 * Renders the main container with a minimum screen height and a custom background styling,
 * embedding the Terminal component.
 *
 * @returns The application's main layout as a JSX element.
 */
function App() {
  return (
    <main className="min-h-screen bg-background">
      <Terminal />
    </main>
  );
}

export default App;
