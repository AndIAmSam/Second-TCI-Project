import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";

const Sidebar = ({ navigation }) => {
  const [isHomeActive, setIsHomeActive] = useState(true); // Estado para Home
  const [isAboutActive, setIsAboutActive] = useState(false); // Estado para About

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isHomeActive && styles.buttonActive]}
        onPress={() => {
          navigation.navigate('Home');
          setIsHomeActive(true);
          setIsAboutActive(false); // Actualizamos ambos estados
        }}
      >
        <Entypo name="home" size={24} color="black" style={styles.buttonIcon} />
        <Text>Home Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
         style={[styles.button, isAboutActive && styles.buttonActive]}
         onPress={() => {
           navigation.navigate('About');
           setIsHomeActive(false);
           setIsAboutActive(true); // Actualizamos ambos estados
         }}
      >
        <Entypo
          name="info-with-circle"
          size={24}
          color="black"
          style={styles.buttonIcon}
        />
        <Text>About Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    justifyContent: "center",
    padding: 10,
  },
  button: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonActive: {
    backgroundColor: "#b8e9e0",
  },
  buttonIcon: {
    marginRight: 20,
  },
});

export default Sidebar;
