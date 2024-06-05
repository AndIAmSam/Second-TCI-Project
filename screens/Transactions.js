import React, { useState, useContext, useEffect } from "react";
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
import SecondBlur from "../components/SecondBlur";

import { useAuth } from "../context/AuthContext";
import { API_URL, IMG_FOOTER } from "../api/constants";

import { sendEmail } from "../api/emailAPI";

const Transactions = () => {
  const { theme } = useContext(ThemeContext);
  const [recipient, setRecipient] = useState("");
  const [crypto, setCrypto] = useState("");
  const [amount, setAmount] = useState("");

  const [wallet, setWallet] = useState(null);
  const [userId, setId] = useState(null);

  const [recipientId, setRecipientId] = useState(null);
  const [recipientWallet, setRecipientWallet] = useState(null);

  const { email } = useAuth();

  async function getCryptoData(email) {
    try {
      const url = `${API_URL}/balances?email=${email}`;
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if(result.length === 0) {
        return [null, null];
      }
      return [result[0].cryptos, result[0]._id];
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  async function updateCryptoData(id, newCryptosData) {
    try {
      const url = `${API_URL}/balances/${id}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cryptos: newCryptosData }),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const cryptocurrencies = [
    { label: "Bitcoin", value: "Bitcoin" },
    { label: "Ethereum", value: "Ethereum" },
    { label: "Doge Coin", value: "Doge Coin" },
    { label: "Cardano", value: "Cardano" },
    { label: "Binance Coin", value: "Binance Coin" },
    { label: "Tether", value: "Tether" },
  ];

  const handleSendTransaction = async () => {
    console.log("\n")
    console.log("***transaction***");
    if (recipient && crypto && amount) {

      const [walletData, userId] = await getCryptoData(email);
      setWallet(walletData);
      setId(userId);

      const [recipientWalletData, recipientId] = await getCryptoData(recipient);
      setRecipientWallet(recipientWalletData);
      setRecipientId(recipientId);

      if(recipientId === null) {
        Alert.alert(
          "Error",
          "El destinatario no existe",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        return;
      }

      let updatedWallet = [...walletData];
      let success = true;

      console.log("\nBEFORE:");
      console.log(updatedWallet);
      console.log("\n");

      updatedWallet = updatedWallet.map((cryptoWallet) => {
        //console.log(cryptoWallet);
        if (cryptoWallet.name.toLowerCase() === crypto.toLowerCase()) {
          const newBalance = cryptoWallet.balance - amount;
            if (newBalance < 0) success = false
            return { ...cryptoWallet, balance: newBalance };
        }
        return cryptoWallet;
      });

      if(!success) {
        Alert.alert(
          "Error",
          "No tienes suficientes fondos para realizar esta transacción",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        return;
      }

      setWallet(updatedWallet);

      console.log("\nAFTER:");
      console.log(updatedWallet);
      console.log("\n");

      let updatedRecipientWallet = [...recipientWalletData];
      console.log("\n");
      //console.log(updatedRecipientWallet);
      console.log("\n");

      updatedRecipientWallet = updatedRecipientWallet.map((cryptoWallet) => {
        if (cryptoWallet.name.toLowerCase() === crypto.toLowerCase()) {
          const newBalance = Number(cryptoWallet.balance) + Number(amount);
          return { ...cryptoWallet, balance: newBalance };
        }
        return cryptoWallet;
      });

      setRecipientWallet(updatedRecipientWallet);

      try {
        const newCryptosData = updatedWallet.map((crypto) => ({
          id: crypto.id,
          balance: crypto.balance,
          name: crypto.name,
        }));

        await updateCryptoData(userId, newCryptosData);
      } catch (error) {
        console.log(error);
      }

      try {
        const newCryptosData = updatedRecipientWallet.map((crypto) => ({
          id: crypto.id,
          balance: crypto.balance,
          name: crypto.name,
        }));

        await updateCryptoData(recipientId, newCryptosData);
      } catch (error) {
        console.log(error);
      }

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

    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0-based in JavaScript
    const day = ("0" + date.getDate()).slice(-2);
    const formattedDate = `${day}/${month}/${year}`;
    console.log(formattedDate);

    let data = {
      address: email,
      subject: "Crypto Wallet - Notificación de Transferencia",
      message: `Apreciable usuario,<br><br>
      Le informamos que recibimos su solicitud para realizar una transferencia a la cuenta <strong>${recipient}</strong>
      por un importe de <strong>${amount}</strong> unidades de <strong>${crypto}</strong> el <strong>${formattedDate}</strong>.<br><br>
      Atentamente,<br>
      El equipo de Crypto Wallet.<br>
      ${IMG_FOOTER}`
    }
    sendEmail(data);

    data = {
      address: recipient,
      subject: "Crypto Wallet - Has recibido una Transferencia",
      message: `Apreciable usuario,<br><br>
      Te informamos que recibiste una transferencia de la cuenta <strong>${email}</strong>
      por un importe de <strong>${amount}</strong> unidades de <strong>${crypto}</strong> el <strong>${formattedDate}</strong>.<br><br>
      El depósito ya se encuentra disponible en tu cuenta.<br><br>
      Atentamente,<br>
      El equipo de Crypto Wallet.<br>
      ${IMG_FOOTER}`
    }
    sendEmail(data);
    }
    console.log("end");
  };

  return (
    <>
      <SecondBlur />
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <Text style={[styles.heading, { color: theme.textColor }]}>
          Enviar Criptomonedas
        </Text>
        <TextInput
          style={[
            styles.input,
            { color: theme.textColor, backgroundColor: theme.cardColor },
          ]}
          placeholder="Destinatario"
          value={recipient}
          onChangeText={setRecipient}
        />
        <Picker
          selectedValue={crypto}
          style={[
            styles.input,
            { color: theme.textColor, backgroundColor: theme.cardColor },
          ]}
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
          style={[
            styles.input,
            { color: theme.textColor, backgroundColor: theme.cardColor },
          ]}
          placeholder="Cantidad"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.buttonConfirmColor }]}
          onPress={handleSendTransaction}
        >
          <MaterialCommunityIcons name="cube-send" size={24} color="white" />
          <Text style={styles.buttonText}>Enviar crypto</Text>
        </TouchableOpacity>
      </View>
    </>
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
    borderWidth: 0,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    borderWidth: 0,
    borderColor: "#ccc",
    paddingVertical: 2,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
  },
});

export default Transactions;
