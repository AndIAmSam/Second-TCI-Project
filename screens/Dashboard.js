import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import SecondBlur from "../components/SecondBlur";

import { useAuth } from "../context/AuthContext";
import { API_URL } from "../api/constants";


async function getCryptoData(email) {
  try{
    const url = `${API_URL}/balances?email=${email}`;
    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, params);
    const result = await response.json();
    return result[0].cryptos;
  } catch(error) {
    console.log(error);
    return null;
  }

}


let cryptoData = [
  { id: 1, name: "Bitcoin", balance: 2.5 },
  { id: 2, name: "Ethereum", balance: 2.3 },
  { id: 3, name: "Litecoin", balance: 5.8 },
  { id: 4, name: "Ripple", balance: 500 },
  { id: 5, name: "Cardano", balance: 120 },
];


const transactionData = [
  {
    id: 1,
    crypto: "Bitcoin",
    amount: 0.5,
    type: "Compra",
    date: "2024-05-22",
    time: "14:30",
  },
  {
    id: 2,
    crypto: "Ethereum",
    amount: 2.3,
    type: "Venta",
    date: "2024-05-21",
    time: "10:15",
  },
  {
    id: 3,
    crypto: "Bitcoin",
    amount: 1.2,
    type: "Venta",
    date: "2024-05-20",
    time: "09:45",
  },
  {
    id: 4,
    crypto: "Litecoin",
    amount: 3.7,
    type: "Compra",
    date: "2024-05-19",
    time: "16:20",
  },
  {
    id: 5,
    crypto: "Ripple",
    amount: 150,
    type: "Venta",
    date: "2024-05-18",
    time: "11:55",
  },
];

const Dashboard = () => {
  const [cryptoBalances, setCryptoBalances] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { email } = useAuth();

  //console.log(getCryptoData(email));
  cryptoData = getCryptoData(email);

  useEffect(() => {
    if (cryptoData.length > 0) {
      const balances = cryptoData.map((crypto) => {
        const transactions = transactionData.filter(
          (trans) => trans.crypto === crypto.name
        );
        const balance =
          crypto.balance -
          transactions.reduce((acc, curr) => {
            return curr.type === "Compra" ? acc + curr.amount : acc - curr.amount;
          }, 0);
        return { ...crypto, balance };
      });
      setCryptoBalances(balances);
    }
    setTransactions(transactionData);
  }, [cryptoData, transactionData]);

  console.log(cryptoBalances)

  const renderTransactionIcon = (type) => {
    if (type === "Compra") {
      return <Ionicons name="arrow-down" size={22} color="green" />;
    } else if (type === "Venta") {
      return <Ionicons name="arrow-up" size={22} color="red" />;
    }
    return null;
  };

  return (
    <>
      <SecondBlur />
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <Text style={[styles.heading, { color: theme.title }]}>
          Saldo de Criptomonedas
        </Text>
        <FlatList
          horizontal
          data={cryptoBalances}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.cryptoContainer,
                { backgroundColor: theme.cardColor },
              ]}
            >
              <Text style={[styles.cryptoName, { color: theme.textColor }]}>
                {item.name}
              </Text>
              <Text style={[styles.balance, { color: theme.textColor }]}>
                {item.balance}
              </Text>
            </View>
          )}
        />
        <Text style={[styles.transactionsHeading, { color: theme.title }]}>
          Transacciones Recientes
        </Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.transactionContainer,
                { backgroundColor: theme.cardColor },
              ]}
            >
              <View style={styles.transactionHeader}>
                <Text style={[styles.type, { color: theme.textColor }]}>
                  {item.type}
                </Text>
                <Text style={[styles.cryptoName, { color: theme.textColor }]}>
                  {item.crypto}
                </Text>
              </View>
              <View style={styles.amountContainer}>
                <Text style={[styles.amount, { color: theme.textColor }]}>
                  {renderTransactionIcon(item.type)} {item.amount}
                </Text>
              </View>

              <View style={styles.dateTimeContainer}>
                <Text style={[styles.date, { color: theme.textColor }]}>
                  {item.date}
                </Text>
                <Text style={[styles.time, { color: theme.textColor }]}>
                  {item.time}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 30,
    textTransform: "uppercase",
  },
  cryptoContainer: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 20,
    borderWidth: 0,
    borderColor: "#ccc",
    flexDirection: "column",
    alignItems: "center",
    width: 150,
  },
  cryptoName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  balance: {
    fontSize: 16,
    marginBottom: 20,
  },
  transactionsHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 30,
    textTransform: "uppercase",
  },
  transactionContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "#ccc",
    width: "100%",
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  type: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 70,
  },
  amount: {
    fontSize: 22,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 14,
  },
  time: {
    fontSize: 14,
  },
  amountContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Dashboard;
