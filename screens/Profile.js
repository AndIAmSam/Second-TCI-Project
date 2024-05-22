import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Switch } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const Profile = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const userData = {
    username: "AndIAmSam",
    email: "sam@sam.com",
    phoneNumber: "+123456789",
    fullName: "Samuel Flores",
    profilePic: require("../assets/profile-pic.jpg"),
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.switchContainer}>
        <Text style={[styles.text, { color: theme.textColor }]}>
          Modo Oscuro
        </Text>
        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={theme === "dark" ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
      <Image source={userData.profilePic} style={styles.profilePic} />
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.textColor }]}>
            Usuario:
          </Text>
          <Text style={[styles.text, { color: theme.textColor }]}>
            {userData.username}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.textColor }]}>
            Nombre y Apellidos:
          </Text>
          <Text style={[styles.text, { color: theme.textColor }]}>
            {userData.fullName}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.textColor }]}>
            Correo Electrónico:
          </Text>
          <Text style={[styles.text, { color: theme.textColor }]}>
            {userData.email}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.textColor }]}>
            Teléfono:
          </Text>
          <Text style={[styles.text, { color: theme.textColor }]}>
            {userData.phoneNumber}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 100,
  },
});

export default Profile;
