import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import SecondBlur from "../../components/SecondBlur";

const TransactionManagement = () => {
  const { theme } = useContext(ThemeContext);
  const [transactions, setTransactions] = useState([]);
  const [filterUser, setFilterUser] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const mockTransactions = [
      {
        id: 1,
        sender: "Samuel Flores",
        recipient: "Carlos Garcia",
        crypto: "BTC",
        amount: 500,
        date: "2024-05-01",
        type: "send",
      },
      {
        id: 2,
        sender: "Leo Cortez",
        recipient: "Samuel Flores",
        crypto: "ETH",
        amount: 200,
        date: "2024-02-01",
        type: "send",
      },
      {
        id: 3,
        sender: "Carlos Garcia",
        recipient: "Leo Cortez",
        crypto: "DOGE",
        amount: 100,
        date: "2024-03-01",
        type: "receive",
      },
    ];
    setTransactions(mockTransactions);
  }, []);

  const filterTransactions = () => {
    return transactions.filter((transaction) => {
      const matchesUser = filterUser
        ? transaction.sender.toLowerCase().includes(filterUser.toLowerCase()) ||
          transaction.recipient.toLowerCase().includes(filterUser.toLowerCase())
        : true;
      const matchesType = filterType ? transaction.type === filterType : true;
      const matchesStartDate = filterStartDate
        ? new Date(transaction.date) >= filterStartDate
        : true;
      const matchesEndDate = filterEndDate
        ? new Date(transaction.date) <= filterEndDate
        : true;
      return matchesUser && matchesType && matchesStartDate && matchesEndDate;
    });
  };

  const handleShowDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  const filteredTransactions = filterTransactions();

  return (
    <>
      <SecondBlur />
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <Text style={[styles.heading, { color: theme.textColor }]}>
          Gestión de Transacciones
        </Text>
        <Text style={[styles.subtitle, { color: theme.textColor }]}>
          Filtrar
        </Text>
        <View style={styles.filterContainer}>
          <TextInput
            style={[
              styles.input,
              {
                color: theme.textColor,
                borderColor: theme.textColor,
                backgroundColor: theme.cardColor,
              },
            ]}
            placeholder="Usuario"
            placeholderTextColor={theme.textColor}
            value={filterUser}
            onChangeText={setFilterUser}
          />
          <Picker
            selectedValue={filterType}
            style={[
              styles.input,
              {
                color: theme.textColor,
                borderColor: theme.textColor,
                backgroundColor: theme.cardColor,
              },
            ]}
            onValueChange={(itemValue) => setFilterType(itemValue)}
          >
            <Picker.Item label="Todos" value="" />
            <Picker.Item label="Envío" value="send" />
            <Picker.Item label="Recepción" value="receive" />
          </Picker>
        </View>
        <View style={styles.dateFiltersContainer}>
          <View style={styles.datePickerContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.cardColor }]}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text style={styles.buttonText}>
                {filterStartDate
                  ? filterStartDate.toISOString().split("T")[0]
                  : "Fecha de inicio"}
              </Text>
            </TouchableOpacity>

            {showStartDatePicker && (
              <DateTimePicker
                value={filterStartDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowStartDatePicker(false);
                  setFilterStartDate(selectedDate || filterStartDate);
                }}
              />
            )}
          </View>
          <View style={styles.datePickerContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.cardColor }]}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text style={styles.buttonText}>
                {filterEndDate
                  ? filterEndDate.toISOString().split("T")[0]
                  : "Fecha de fin"}
              </Text>
            </TouchableOpacity>

            {showEndDatePicker && (
              <DateTimePicker
                value={filterEndDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowEndDatePicker(false);
                  setFilterEndDate(selectedDate || filterEndDate);
                }}
              />
            )}
          </View>
        </View>
        <Text style={[styles.subtitle, { color: theme.textColor }]}>
          {filteredTransactions.length} transacciones encontradas
        </Text>
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.transactionCard,
                { backgroundColor: theme.cardColor },
              ]}
              onPress={() => handleShowDetails(item)}
            >
              <Text
                style={[styles.transactionText, { color: theme.textColor }]}
              >
                Remitente: {item.sender}
              </Text>
              <Text
                style={[styles.transactionText, { color: theme.textColor }]}
              >
                Destinatario: {item.recipient}
              </Text>
              <Text
                style={[styles.transactionText, { color: theme.textColor }]}
              >
                Crypto: {item.crypto}
              </Text>
              <Text
                style={[styles.transactionText, { color: theme.textColor }]}
              >
                Cantidad: ${item.amount.toFixed(2)}
              </Text>
              <Text
                style={[styles.transactionText, { color: theme.textColor }]}
              >
                Fecha: {item.date}
              </Text>
              <Text
                style={[styles.transactionText, { color: theme.textColor }]}
              >
                Tipo: {item.type === "send" ? "Envío" : "Recepción"}
              </Text>
            </TouchableOpacity>
          )}
        />
        {selectedTransaction && (
          <Modal
            visible={showDetailsModal}
            animationType="slide"
            onRequestClose={() => setShowDetailsModal(false)}
          >
            <View
              style={[
                styles.modalContainer,
                { backgroundColor: theme.backgroundColor },
              ]}
            >
              <Text style={[styles.modalTitle, { color: theme.textColor }]}>
                Detalles de la Transacción
              </Text>
              <Text style={[styles.modalText, { color: theme.textColor }]}>
                Remitente: {selectedTransaction.sender}
              </Text>
              <Text style={[styles.modalText, { color: theme.textColor }]}>
                Destinatario: {selectedTransaction.recipient}
              </Text>
              <Text style={[styles.modalText, { color: theme.textColor }]}>
                Cantidad: ${selectedTransaction.amount.toFixed(2)}
              </Text>
              <Text style={[styles.modalText, { color: theme.textColor }]}>
                Fecha: {selectedTransaction.date}
              </Text>
              <Text style={[styles.modalText, { color: theme.textColor }]}>
                Tipo:{" "}
                {selectedTransaction.type === "send" ? "Envío" : "Recepción"}
              </Text>
              <TouchableOpacity
                style={[styles.button, styles.closeButton]}
                onPress={() => setShowDetailsModal(false)}
              >
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  input: {
    height: 40,
    borderWidth: 0,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    flex: 1,
    marginRight: 10,
  },
  datePickerContainer: {
    marginRight: 10,
    flex: 1,
  },
  dateFiltersContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#e9e9e9",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  transactionCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 0,
    borderColor: "#ccc",
  },
  transactionText: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#F44336",
    marginTop: 20,
  },
});

export default TransactionManagement;
