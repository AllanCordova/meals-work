const colors = {
  primary: "#D81B60",
  background: "#121212",
  surface: "#1E1E1E",
  textPrimary: "#EAEAEA",
  textSecondary: "#A0A0A0",
  error: "#CF6679",
  success: "#03DAC6",
  border: "#333333",
  placeholder: "#6C6C6C",
};

const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

const fontSizes = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
};

const theme = {
  colors,
  spacing,
  fontSizes,
} as const;

export default theme;
