import { Box } from "@chakra-ui/react";
import TerminalComponent from "./components/xterm/Terminal";

function App() {
  const handleCommand = (command: string) => {
    console.log("Command received:", command);
    // Handle the command - you can integrate with Appwrite here
    // For example, execute functions, store data, etc.
  };

  return (
    <Box background={"background"}>
      <TerminalComponent onCommand={handleCommand} />
    </Box>
  );
}

export default App;
