import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import MyBlur from '../components/MyBlur';

const Login = ({ navigation, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginFields, setShowLoginFields] = useState(true); 
  const [showRegisterFields, setShowRegisterFields] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogin = () => {
    if (username === "1" && password === "1") {
      onLogin();
    } else {
      alert("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  const handleToggleRegisterFields = () => {
    setShowLoginFields(false); 
    setShowRegisterFields(true); 
  };

  const handleToggleLoginFields = () => {
    setShowLoginFields(true); 
    setShowRegisterFields(false);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <MyBlur />
      {showLoginFields && (
        <View>
          <TextInput
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <TouchableOpacity onPress={handleLogin}>
            <Text>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleToggleRegisterFields}>
            <Text>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      )}

      {showRegisterFields && (
        <View>
          <TextInput
            placeholder="Nombre"
            style={styles.input}
          />
          <TextInput
            placeholder="Correo electrónico"
            style={styles.input}
          />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            style={styles.input}
          />
          <Button title="Registrarse" onPress={() => {}} />
          <TouchableOpacity onPress={handleToggleLoginFields}>
            <Text>Volver a iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default Login;
