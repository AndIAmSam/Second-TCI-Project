import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { CryptoContext } from "../context/CryptoContext";
import SecondBlur from "../components/SecondBlur";

import { useAuth } from "../context/AuthContext";
import { API_URL } from "../api/constants";

const Operations = () => {
  const cryptoData = useContext(CryptoContext);

  const { theme } = useContext(ThemeContext);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [amount, setAmount] = useState("$");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [wallet, setWallet] = useState(null);
  const [cryptos, setCryptos] = useState(null);
  const [userId, setId] = useState(null);

  const { email } = useAuth();

  useEffect(() => {
    const fetchWallet = async () => {
      const [walletData, userId] = await getCryptoData(email);
      setWallet(walletData);
      setCryptos(cryptos);
      setId(userId);
    };

    fetchWallet();
  }, [email]);

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
      return [result[0].cryptos, result[0]._id];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // wallet = getCryptoData(email);

  const handleAction = (crypto, actionType) => {
    setSelectedCrypto(crypto);
    setAction(actionType);
    setShowModal(true);
  };

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

  const handleConfirm = async () => {
    console.log("\noperation");
    if (selectedCrypto && action) {
      const { id, name } = selectedCrypto;
      const numericAmount = parseFloat(amount.replace("$", ""));
      //let updatedWallet = [...wallet];
      let success = true;

      const [walletData, userId] = await getCryptoData(email);
      let updatedWallet = [...walletData];

      updatedWallet = updatedWallet.map((crypto) => {
        if (crypto.name.toLowerCase() === id.toLowerCase()) {
          const newBalance =
            action === "buy"
              ? crypto.balance + numericAmount
              : crypto.balance - numericAmount;

          if (newBalance < 0) {
            success = false;
            Alert.alert(
              "Error",
              "No tienes suficientes fondos para esta venta"
            );
            return crypto;
          }

          return { ...crypto, balance: newBalance };
        }
        return crypto;
      });

      setWallet(updatedWallet);

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

      if (action === "buy") {
        Alert.alert("Operación completada", `Compraste ${amount} ${name}`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        console.log(`Comprando ${amount} ${name} usando`);
      } else if (action === "sell" && success === true) {
        Alert.alert("Operación completada", `Vendiste ${amount} ${name}`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        console.log(`Vendiendo ${amount} ${name} usando`);
      }

      console.log(wallet);
      console.log(updatedWallet);

      setSelectedCrypto(null);
      setAmount("");
      setPaymentMethod("");
      setAction("");
      setShowModal(false);
    }
  };

  return (
    <>
      <SecondBlur />
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <Text style={[styles.heading, { color: theme.textColor }]}>
          Comprar Criptomonedas
        </Text>
        <View style={styles.cryptoList}>
          {cryptoData &&
            cryptoData.map((crypto) => (
              <TouchableOpacity
                key={crypto.id}
                style={[
                  styles.cryptoButton,
                  { backgroundColor: theme.cardColor },
                ]}
                onPress={() => handleAction(crypto)}
              >
                <Text
                  style={[
                    styles.cryptoAbbreviation,
                    { color: theme.textColor },
                  ]}
                >
                  {crypto.abbreviation}
                </Text>
                <Image
                  source={{ uri: crypto.icon }}
                  style={styles.cryptoIcon}
                />
                <Text
                  style={[styles.cryptoButtonText, { color: theme.textColor }]}
                >
                  {crypto.name}
                </Text>
              </TouchableOpacity>
            ))}
        </View>

        <Modal visible={showModal} animationType="slide">
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: theme.modalBackground },
            ]}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Icon name="times" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: theme.textColor }]}>
              Detalles de {selectedCrypto?.name}
            </Text>
            <View
              style={[
                styles.detailContainer,
                { backgroundColor: theme.cardColor },
              ]}
            >
              <Image
                source={{ uri: selectedCrypto?.icon }}
                style={styles.cryptoIcon}
              />
              <Text>({selectedCrypto?.abbreviation})</Text>
              <Text style={[styles.modalText, { color: theme.textColor }]}>
                Precio: ${selectedCrypto?.price.toLocaleString()}
              </Text>
              <Text style={[styles.modalText, { color: theme.textColor }]}>
                Cambio 24h: ${selectedCrypto?.change24h.toLocaleString()}
              </Text>
              <Text style={[styles.modalText, { color: theme.textColor }]}>
                Market Cap: ${selectedCrypto?.marketCap.toLocaleString()}
              </Text>
              <Text style={[styles.modalText, { color: theme.textColor }]}>
                Max: ${selectedCrypto?.allTimeHigh.toLocaleString()}
              </Text>
              <Text style={[styles.modalText, { color: theme.textColor }]}>
                Min: ${selectedCrypto?.allTimeLow.toLocaleString()}
              </Text>
              <Text style={[styles.modalText, { color: theme.textColor }]}>
                Volumen: ${selectedCrypto?.volume.toLocaleString()}
              </Text>
            </View>

            <Text style={[styles.modalText, { color: theme.textColor }]}>
              ¿Qué quieres hacer?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.cardColor }]}
                onPress={() => setAction("buy")}
              >
                <Ionicons name="arrow-down" size={22} color="green" />
                <Text style={[styles.buttonText, { color: theme.textColor }]}>
                  Comprar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.cardColor }]}
                onPress={() => setAction("sell")}
              >
                <Ionicons name="arrow-up" size={22} color="red" />
                <Text style={[styles.buttonText, { color: theme.textColor }]}>
                  Vender
                </Text>
              </TouchableOpacity>
            </View>
            {action && (
              <>
                <Text style={[styles.modalText, { color: theme.textColor }]}>
                  Cantidad:
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: theme.textColor,
                      backgroundColor: theme.cardColor,
                    },
                  ]}
                  placeholder="Cantidad"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
                {/* <Text style={[styles.modalText, { color: theme.textColor }]}>
                  Método de{" "}
                  {action === "buy" ? "Pago" : "Recibimiento del Pago"}:
                </Text> */}
                {/* <TextInput
                  style={[
                    styles.input,
                    {
                      color: theme.textColor,
                      backgroundColor: theme.cardColor,
                    },
                  ]}
                  placeholder={`Método de ${
                    action === "buy" ? "Pago" : "Recibimiento del Pago"
                  }`}
                  value={paymentMethod}
                  onChangeText={setPaymentMethod}
                /> */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: theme.buttonConfirmColor },
                    ]}
                    onPress={handleConfirm}
                  >
                    <Text style={styles.buttonText}>Confirmar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#ff8585" }]}
                    onPress={() => setShowModal(false)}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </Modal>
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
  cryptoList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  cryptoButton: {
    width: 100,
    height: 120,
    alignItems: "center",
    borderWidth: 0,
    justifyContent: "center",
    borderColor: "#ccc",
    borderRadius: 10,
    margin: 5,
  },
  cryptoIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  cryptoAbbreviation: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  cryptoButtonText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 0,
    borderColor: "#ccc",
    borderRadius: 22,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    borderWidth: 0,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ff8585",
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 100,
  },
  detailContainer: {
    marginBottom: 20,
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
});

export default Operations;
