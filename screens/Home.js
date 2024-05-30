import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { CryptoContext } from "../context/CryptoContext";
import SecondBlur from "../components/SecondBlur";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const cryptoData = useContext(CryptoContext);

  return (
    <>
      <SecondBlur />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.backgroundColor },
        ]}
      >
        <Text style={[styles.heading, { color: theme.title }]}>
          Crypto Wallet
        </Text>

        {cryptoData &&
          cryptoData.map((crypto) => (
            <View
              key={crypto.id}
              style={[styles.cryptoCard, { backgroundColor: theme.cardColor }]}
            >
              <View style={styles.cryptoHeader}>
                <Text style={[styles.cryptoName, { color: theme.textColor }]}>
                  {crypto.name}
                </Text>
                <Image
                  source={{ uri: crypto.icon }}
                  style={styles.cryptoIcon}
                />
              </View>
              <View style={styles.cryptoInfo}>
                <Text style={[styles.text, { color: theme.textColor }]}>
                  Price: ${crypto.price.toLocaleString()}
                </Text>
                <Text style={[styles.text, { color: theme.textColor }]}>
                  Change (24h): {crypto.change24h.toLocaleString()}%
                </Text>
                <Text style={[styles.text, { color: theme.textColor }]}>
                  Market Cap: ${crypto.marketCap.toLocaleString()}
                </Text>
                <Text style={[styles.text, { color: theme.textColor }]}>
                  Volume (24h): ${crypto.volume.toLocaleString()}
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
  cryptoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    width: "100%",
    borderWidth: 0,
    borderColor: "#ccc",
  },
  cryptoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cryptoIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  cryptoInfo: {
    marginLeft: 10,
    fontSize: 10,
  },
});

export default Home;
