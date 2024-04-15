import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import About from "../screens/About";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Sidebar from "../navigation/Sidebar/Sidebar";

const Drawer = createDrawerNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <Sidebar {...props} />
            </SafeAreaView>
          );
        }}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerActiveTintColor: "green",
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  top: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#808080",
    borderBottomWidth: 1,
    backgroundColor: "red",
  },
});

export default AppNavigation;
