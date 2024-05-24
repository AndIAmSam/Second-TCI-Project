import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

const AdminDashboard = () => {
  const { theme } = useContext(ThemeContext);

  const [userCount, setUserCount] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    setUserCount(120);
    setTotalTransactions(450);
    setTotalBalance(123456.78);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <Text style={[styles.heading, { color: theme.textColor }]}>
        Dashboard del Administrador
      </Text>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: theme.textColor }]}>
          Número de Usuarios
        </Text>
        <Text style={[styles.cardValue, { color: theme.textColor }]}>
          {userCount}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: theme.textColor }]}>
          Total de Transacciones
        </Text>
        <Text style={[styles.cardValue, { color: theme.textColor }]}>
          {totalTransactions}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: theme.textColor }]}>
          Saldo Total Simulado
        </Text>
        <Text style={[styles.cardValue, { color: theme.textColor }]}>
          ${totalBalance.toFixed(2)}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default AdminDashboard;
