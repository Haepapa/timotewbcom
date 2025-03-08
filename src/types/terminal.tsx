export type ThemeType = "dark" | "light" | "system";

export type CommandType = {
  input: string;
  output: string | JSX.Element;
  timestamp: Date;
};

export type TerminalTabType = {
  id: string;
  name: string;
  history: CommandType[];
  input: string;
};
