import { createSystem, defaultConfig } from "@chakra-ui/react";

const MainTheme = createSystem(defaultConfig, {
  theme: {
    semanticTokens: {
      colors: {
        background: {
          value: {
            base: "#FFFEF5",
            _dark: "#1D1C14",
          },
        },
        black: {
          value: {
            base: "#2C2C2C",
            _dark: "#FFFFFF",
          },
        },
        buttonText: {
          value: {
            base: "#2C2C2C",
            _dark: "#2C2C2C",
          },
        },
        main: {
          solid: { value: "#FFFBB4" },
          contrast: { value: "#FFFBB4" },
          fg: { value: "#FFFBB4" },
          muted: { value: "#FFFBB4" },
          subtle: { value: "#FFFBB4" },
          emphasized: { value: "#FFFBB4" },
          focusRing: { value: "#FFFBB4" },
          value: {
            base: "#FFFBB4",
            _dark: "#FFFBB4",
          },
        },
        white: {
          value: {
            base: "#FFFFFF",
            _dark: "#262626",
          },
        },
        outline: {
          value: {
            base: "#2C2C2C",
            _dark: "#6A6A6A",
          },
        },
        grey: {
          value: {
            base: "#C1C1C1",
            _dark: "#C1C1C1",
          },
        },
      },
      shadows: {
        button: {
          value: {
            base: "0 1px 2px 2px rgba(218, 218, 218, 0.56)",
            _dark: "0 1px 2px 2px rgba(218, 218, 218, 0.56)",
          },
        },
      },
    },
  },
});

export default MainTheme;

// npx @chakra-ui/cli typegen ./src/theme/MainTheme.tsx
