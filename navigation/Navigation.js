// Navigation.js
import React, {useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { ThemeContext } from "../context/ThemeContext";
import Home from "../screens/Home";
import About from "../screens/About";
import Welcome from "../screens/Welcome";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "../context/AuthContext";

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

  // Si el usuario está autenticado, muestra la pila principal de navegación
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
          name="About"
          component={About}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="information-circle" size={24} color={color} />
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
