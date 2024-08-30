// Application
// Headers and Navigation Bar: Teal
// Primary Buttons and Links: Teal
// Secondary Buttons and Highlights: Coral
// Background: Soft White
// Task Cards and Panels: Light Gray with Charcoal Gray text
// Hover Effects and Interactive Elements: Golden Yellow
// Success Messages/Indicators: Emerald Green
// Error Messages/Indicators: Crimson Red

const tintColor = "#2f95dc";

export default {
  light: {
    // for primary buttons, headers, and active tab icons
    primary: "#008080",
    // for secondary buttons, highlights, and inactive tab icons
    secondary: "#FF6F61",

    // for the main background
    background: "#F5F5F5",

    // for important highlights and notifications
    accent: "#FFD700",

    // for main text
    text: "#333333",

    // for secondary text and descriptions
    lightGray: "#A9A9A9",

    // for success messages and indicators
    emeraldGreen: "#50C878",

    // for error messages and alerts
    crimsonRed: "#DC143C",

    //for input elements
    input: "#121212",

    // others
    tint: tintColor,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColor,
  },

  dark: {
    // for primary buttons, headers, and active tab icons
    primary: "#20B2AA",
    // for secondary buttons, highlights, and inactive tab icons
    secondary: "#FF7F50",

    // for the main background
    background: "#000000",

    // for important highlights and notifications
    accent: "#FFD700",

    // for main text
    text: "#E0E0E0",

    // for secondary text and descriptions
    lightGray: "#A9A9A9",

    // for success messages and indicators
    emeraldGreen: "#32CD32",

    // for error messages and alerts
    crimsonRed: "#FF6347",

    //for input elements
    input: "#E0E0E0",

    // others
    tint: tintColor,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColor,
  },
};
