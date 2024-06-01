import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import SecondBlur from "../../components/SecondBlur";
import { Picker } from "@react-native-picker/picker";

const UserManagement = () => {
  const { theme } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBalances, setNewBalances] = useState({});

  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: "Samuel Flores",
        email: "sam@sam.com",
        balances: { BTC: 1.5, ETH: 10, DOGE: 1000 },
      },
      {
        id: 2,
        name: "Carlos Garcia",
        email: "carlos@carlos.com",
        balances: { BTC: 0.5, ETH: 5, ADA: 300 },
      },
      {
        id: 3,
        name: "Leo Cortez",
        email: "leo@cortez.com",
        balances: { BTC: 2, BNB: 20, USDT: 1000 },
      },
    ]);
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setNewName(user.name);
    setNewEmail(user.email);
    setNewBalances(user.balances);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id
        ? { ...user, name: newName, email: newEmail, balances: newBalances }
        : user
    );
    setUsers(updatedUsers);
    setShowEditModal(false);
  };

  const handleDeleteUser = (userId) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que deseas eliminar este usuario?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            const updatedUsers = users.filter((user) => user.id !== userId);
            setUsers(updatedUsers);
          },
        },
      ]
    );
  };

  const renderBalances = (balances) => {
    return Object.keys(balances).map((crypto) => (
      <Text
        key={crypto}
        style={[styles.userBalance, { color: theme.textColor }]}
      >
        {crypto}: {balances[crypto]}
      </Text>
    ));
  };

  const [typeUser, setTypeUser] = useState("");

  return (
    <>
      <SecondBlur />
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <Text style={[styles.heading, { color: theme.textColor }]}>
          Gestión de Usuarios
        </Text>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[styles.userCard, { backgroundColor: theme.cardColor }]}
            >
              <Text style={[styles.userName, { color: theme.textColor }]}>
                {item.name}
              </Text>
              <Text style={[styles.userEmail, { color: theme.textColor }]}>
                {item.email}
              </Text>
              {renderBalances(item.balances)}
              <View style={styles.userActions}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.editButton,
                    { backgroundColor: theme.buttonConfirmColor },
                  ]}
                  onPress={() => handleEditUser(item)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => handleDeleteUser(item.id)}
                >
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {selectedUser && (
          <Modal
            visible={showEditModal}
            animationType="slide"
            onRequestClose={() => setShowEditModal(false)}
          >
            <View
              style={[
                styles.modalContainer,
                { backgroundColor: theme.modalBackground },
              ]}
            >
              <Text style={[styles.modalTitle, { color: theme.textColor }]}>
                Información
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { color: theme.textColor, backgroundColor: theme.cardColor },
                ]}
                placeholder="Nombre"
                value={newName}
                onChangeText={setNewName}
              />
              <TextInput
                style={[
                  styles.input,
                  { color: theme.textColor, backgroundColor: theme.cardColor },
                ]}
                placeholder="Correo Electrónico"
                value={newEmail}
                onChangeText={setNewEmail}
                keyboardType="email-address"
              />
              <Text style={[styles.modalTitle2, { color: theme.textColor }]}>
                Tipo de usuario
              </Text>
              <Picker
                selectedValue={typeUser}
                onValueChange={(newType) => setTypeUser(newType)}
                style={[
                  styles.input,
                  { color: theme.textColor, backgroundColor: theme.cardColor },
                ]}
              >
                <Picker.Item label="admin" value="admin" key="admin" />
                <Picker.Item label="usuario" value="usuario" key="usuario" />
              </Picker>
              <Text style={[styles.modalTitle, { color: theme.textColor }]}>
                Balances
              </Text>
              {Object.keys(newBalances).map((crypto) => (
                <View key={crypto} style={styles.balanceInputContainer}>
                  <Text
                    style={[styles.balanceLabel, { color: theme.textColor }]}
                  >
                    {crypto}
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        color: theme.textColor,
                        backgroundColor: theme.cardColor,
                      },
                    ]}
                    placeholder={crypto}
                    value={newBalances[crypto].toString()}
                    onChangeText={(value) =>
                      setNewBalances({
                        ...newBalances,
                        [crypto]: parseFloat(value),
                      })
                    }
                    keyboardType="numeric"
                  />
                </View>
              ))}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.saveButton,
                    { backgroundColor: theme.buttonConfirmColor },
                  ]}
                  onPress={handleSaveEdit}
                >
                  <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setShowEditModal(false)}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
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
  userCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 0,
    borderColor: "#ccc",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
  },
  userBalance: {
    fontSize: 16,
    marginBottom: 10,
  },
  userActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 22,
  },
  editButton: {},
  deleteButton: {
    backgroundColor: "#f18b84",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalTitle2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 0,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  balanceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  balanceLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  saveButton: {},
  cancelButton: {
    backgroundColor: "#f18b84",
  },
});

export default UserManagement;
