import { DefaultTheme } from "@react-navigation/native";

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: "#8FC1B5",
    border: "#8FC1B5",
  },
};

export const TabTheme = {
  headerTintColor: "#265C4B",
  tabBarActiveTintColor: "#8FC1B5",
  tabBarActiveBackgroundColor: "#265C4B",
  headerPressColor: "white",
  tabBarInactiveTintColor: "white",
  tabBarInactiveBackgroundColor: "#8FC1B5",
};
