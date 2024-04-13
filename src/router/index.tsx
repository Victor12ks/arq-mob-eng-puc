import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../pages/home/index";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { User } from "../pages/user";
import { MyTheme, TabTheme } from "./util";
import { RootTabParamList } from "../types/router";


const Tab = createBottomTabNavigator<RootTabParamList>();

export const Routes = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
            title: "Inicio",
            ...TabTheme,
          }}
        />
        <Tab.Screen
          listeners={({ navigation }) => ({
            focus: () => {
              navigation.setParams({ id: undefined });
            },
          })}
          name="User"
          component={User}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-multiple-plus"
                color={color}
                size={26}
              />
            ),
            title: "Usuário",
            ...TabTheme,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
