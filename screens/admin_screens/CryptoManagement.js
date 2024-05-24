import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { CryptoContext } from "../../context/CryptoContext";
import { ThemeContext } from "../../context/ThemeContext";

const SystemConfiguration = () => {
  const { theme } = useContext(ThemeContext);
  const { cryptos, setCryptos } = useContext(CryptoContext);
  const [newCryptoName, setNewCryptoName] = useState("");
  const [newCryptoPrice, setNewCryptoPrice] = useState("");
  const [newCryptoAbbreviation, setNewCryptoAbbreviation] = useState("");
  const [newCryptoIcon, setNewCryptoIcon] = useState("");

  const handleAddCrypto = () => {
    const newCrypto = {
      id: cryptos.length + 1,
      name: newCryptoName,
      price: parseFloat(newCryptoPrice),
      abbreviation: newCryptoAbbreviation,
      icon: newCryptoIcon,
    };
    setCryptos([...cryptos, newCrypto]);
    setNewCryptoName("");
    setNewCryptoPrice("");
    setNewCryptoAbbreviation("");
    setNewCryptoIcon("");
  };

  const handleRemoveCrypto = (id) => {
    setCryptos(cryptos.filter((crypto) => crypto.id !== id));
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.heading, { color: theme.textColor }]}>
        Crypto Management
      </Text>
      <TextInput
        style={[
          styles.input,
          { color: theme.textColor, borderColor: theme.textColor },
        ]}
        placeholder="Nombre de la Criptomoneda"
        placeholderTextColor={theme.textColor}
        value={newCryptoName}
        onChangeText={setNewCryptoName}
      />
      <TextInput
        style={[
          styles.input,
          { color: theme.textColor, borderColor: theme.textColor },
        ]}
        placeholder="Precio"
        placeholderTextColor={theme.textColor}
        value={newCryptoPrice}
        onChangeText={setNewCryptoPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={[
          styles.input,
          { color: theme.textColor, borderColor: theme.textColor },
        ]}
        placeholder="Abreviatura"
        placeholderTextColor={theme.textColor}
        value={newCryptoAbbreviation}
        onChangeText={setNewCryptoAbbreviation}
      />
      <TextInput
        style={[
          styles.input,
          { color: theme.textColor, borderColor: theme.textColor },
        ]}
        placeholder="URL del Icono"
        placeholderTextColor={theme.textColor}
        value={newCryptoIcon}
        onChangeText={setNewCryptoIcon}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddCrypto}>
        <Text style={styles.buttonText}>Agregar Criptomoneda</Text>
      </TouchableOpacity>
      <Text style={[styles.heading2, { color: theme.textColor }]}>
        Cryptos Actuales
      </Text>

        <FlatList
          data={cryptos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.cryptoCard,
                { backgroundColor: theme.cardBackground },
              ]}
            >
              <Image source={item.icon} style={styles.cryptoIcon} />
              <View>
                <Text style={[styles.cryptoText, { color: theme.textColor }]}>
                  {item.name}
                </Text>
                <Text style={[styles.cryptoText, { color: theme.textColor }]}>
                  Precio: ${item.price.toFixed(2)}
                </Text>
                <Text style={[styles.cryptoText, { color: theme.textColor }]}>
                  Abreviatura: {item.abbreviation}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleRemoveCrypto(item.id)}
                style={styles.buttonDelete}
              >
                <Text style={[styles.removeText, { color: "red" }]}>
                  Eliminar
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cardsContainer: {
    marginTop: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  heading2: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  cryptoCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cryptoIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  cryptoText: {
    fontSize: 16,
  },
  removeText: {
    marginLeft: "auto",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  buttonDelete: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
});

export default SystemConfiguration;
