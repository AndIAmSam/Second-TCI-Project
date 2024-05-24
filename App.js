import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigation from "./navigation/Navigation";
import { ThemeProvider } from "./context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CryptoProvider } from "./context/CryptoContext";
import { AuthProvider } from "./context/AuthContext";
import SystemConfiguration from "./screens/admin_screens/CryptoManagement";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <CryptoProvider>
          <View style={styles.container}>
            <Navigation />
            <StatusBar style="auto" />
          </View>
        </CryptoProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
