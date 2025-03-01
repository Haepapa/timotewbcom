import { createSystem, defaultConfig } from "@chakra-ui/react";

const MainTheme = createSystem(defaultConfig, {
  theme: {
    semanticTokens: {
      colors: {
        background: {
          value: {
            base: "#f8f8f2", //
            _dark: "#282a36", // dark blue
          },
        },
        foreground: {
          value: {
            base: "#282a36", // dark blue
            _dark: "#f8f8f2", //
          },
        },
      },
      shadows: {
        button: {
          value: {
            base: "0 1px 2px 2px rgba(40, 42, 54, 25, .25)",
            _dark: "0 1px 2px 2px rgba(40, 42, 54, 25, .25)",
          },
        },
      },
    },
  },
});

export default MainTheme;

// npx @chakra-ui/cli typegen ./src/theme/MainTheme.tsx
