import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { ThemeContext } from "../context/ThemeContext";
import Home from "../screens/Home";
import About from "../screens/About";
import Welcome from "../screens/Welcome";
import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";
import Transactions from "../screens/Transactions";
import Operations from "../screens/Operations";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  const { isAuthenticated } = useAuth();

  const { theme } = useContext(ThemeContext);

  if (!isAuthenticated) {
    return <AuthStack />;
  }

  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: theme.bottomBarBackgroundColor }}
      activeColor={theme.textColor}
      inactiveColor="#c0c0c0"
      shifting={true}
      theme={{ colors: { secondaryContainer: theme.iconBackgroundColor } }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="money-check" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Operations"
        component={Operations}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="compare-arrows" size={24} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="information-circle" size={24} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="feed-person" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MainStack />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default Navigation;
