import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ThemeContext } from "../context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Transactions = () => {
  const { theme } = useContext(ThemeContext);
  const [recipient, setRecipient] = useState("");
  const [crypto, setCrypto] = useState("");
  const [amount, setAmount] = useState("");

  const cryptocurrencies = [
    { label: "Bitcoin", value: "Bitcoin" },
    { label: "Ethereum", value: "Ethereum" },
    { label: "Doge Coin", value: "Doge Coin" },
    { label: "Cardano", value: "Cardano" },
    { label: "Binance Coin", value: "Binance Coin" },
    { label: "Tether", value: "Tether" },
  ];

  const handleSendTransaction = () => {
    Alert.alert(
      "Transacción Enviada",
      `Se han enviado ${amount} ${crypto} a ${recipient}`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );

    setRecipient("");
    setCrypto("");
    setAmount("");
    
    console.log("Enviando criptomonedas a:", recipient);
    console.log("Tipo de criptomoneda:", crypto);
    console.log("Cantidad:", amount);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.heading, { color: theme.textColor }]}>
        Enviar Criptomonedas
      </Text>
      <TextInput
        style={[styles.input, { color: theme.textColor }]}
        placeholder="Destinatario"
        value={recipient}
        onChangeText={setRecipient}
      />
      <Picker
        selectedValue={crypto}
        style={[styles.input, { color: theme.textColor }]}
        onValueChange={(itemValue, itemIndex) => setCrypto(itemValue)}
      >
        {cryptocurrencies.map((crypto) => (
          <Picker.Item
            key={crypto.value}
            label={crypto.label}
            value={crypto.value}
          />
        ))}
      </Picker>
      <TextInput
        style={[styles.input, { color: theme.textColor }]}
        placeholder="Cantidad"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSendTransaction}>
        <MaterialCommunityIcons name="cube-send" size={24} color="blue" />
        <Text style={[styles.text, { color: theme.textColor }]}>Enviar crypto</Text>
      </TouchableOpacity>
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Transactions;
