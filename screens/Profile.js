import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import SecondBlur from "../components/SecondBlur";
import { Picker } from "@react-native-picker/picker";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker/src/ImagePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import ThemeSwitch from "../components/ThemeSwitch";

import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [profilePic, setProfilePic] = useState(null);
  const { email } = useAuth();

  useEffect(() => {
    const loadProfilePic = async () => {
      const savedProfilePic = await AsyncStorage.getItem("profilePic");
      if (savedProfilePic) {
        setProfilePic(savedProfilePic);
      }
    };
    loadProfilePic();
  }, []);

  const handleChoosePhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });

      console.log(result);

      if (!result.canceled) {
        const image = result.assets[0].uri;
        setProfilePic(image);
        await AsyncStorage.setItem("profilePic", image);
      }
    } catch (error) {
      console.error("Error selecting photo", error);
    }
  };

  const userData = {
    username: email,
    email,
    phoneNumber: "+123456789",
    fullName: "Samuel Flores",
    profilePic: require("../assets/profile-pic.jpg"),
  };

  const [creditCardInfo, setCreditCardInfo] = useState({
    number: "1234 1234 1234 1234",
    name: "Tu Nombre Completo",
    expiry: "MM/YY",
    type: "Visa",
  });

  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = (key, value) => {
    setCreditCardInfo({
      ...creditCardInfo,
      [key]: value,
    });
  };

  const handleSaveCardInfo = async () => {
    try {
      await validationSchema.validate(creditCardInfo, { abortEarly: false });
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", error.errors.join("\n"));
    }
  };

  const validationSchema = yup.object().shape({
    number: yup
      .string()
      .matches(/^\d{16}$/, "El número de tarjeta debe tener 16 dígitos")
      .required("El número de tarjeta es requerido"),
    name: yup
      .string()
      .matches(/^[a-zA-Z ]+$/, "El nombre debe contener solo letras")
      .required("El nombre es requerido"),
    expiry: yup
      .string()
      .matches(/^\d{2}\/\d{2}$/, "El formato de expiración debe ser MM/YY")
      .required("La fecha de expiración es requerida"),
  });

  const getColorForCardType = (cardType) => {
    switch (cardType.toLowerCase()) {
      case "visa":
        return "rgba(52, 152, 219, 0.5)";
      case "mastercard":
        return "rgba(231, 76, 60, 0.5)";

      default:
        return "#3498db";
    }
  };

  const getLogoForCardType = (cardType) => {
    switch (cardType.toLowerCase()) {
      case "visa":
        return require("../assets/visa.webp");
      case "mastercard":
        return require("../assets/mastercard.png");

      default:
        return require("../assets/icon.png");
    }
  };

  const cardColor = getColorForCardType(creditCardInfo.type);
  const cardLogo = getLogoForCardType(creditCardInfo.type);

  return (
    <>
      <SecondBlur />
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <View style={styles.switchContainer}>
          <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
        </View>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <View style={styles.profilePicContainer}>
            {profilePic ? (
              <Image source={{ uri: profilePic }} style={styles.profilePic} />
            ) : (
              <Text style={styles.profilePicPlaceholder}>
                Selecciona una foto de perfil
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <View
          style={[styles.infoContainer, { backgroundColor: theme.cardColor }]}
        >
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textColor }]}>
              Usuario:
            </Text>
            <Text style={[styles.text, { color: theme.textColor }]}>
              {userData.username}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textColor }]}>
              Nombre:
            </Text>
            <Text style={[styles.text, { color: theme.textColor }]}>
              {userData.fullName}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textColor }]}>
              Correo:
            </Text>
            <Text style={[styles.text, { color: theme.textColor }]}>
              {userData.email}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textColor }]}>
              Teléfono:
            </Text>
            <Text style={[styles.text, { color: theme.textColor }]}>
              {userData.phoneNumber}
            </Text>
          </View>
        </View>
        <Text style={[styles.subtitle, { color: theme.textColor }]}>
          Tarjeta asociada a tu Cuenta
        </Text>
        <View style={[styles.cardContainer, { backgroundColor: cardColor }]}>
          <Image source={cardLogo} style={styles.cardLogo} />
          <Text style={styles.cardNumber}>{creditCardInfo.number}</Text>
          <Text style={styles.cardName}>{creditCardInfo.name}</Text>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Expira:</Text>
            <Text style={styles.cardText}>{creditCardInfo.expiry}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={[styles.editCard, { color: "#a0a0a0" }]}>
            Editar Tarjeta
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: theme.modalBackground },
              ]}
            >
              <Text style={[styles.subtitle2, { color: theme.textColor }]}>
                Ingresa la información de tu tarjeta
              </Text>
              <Picker
                style={[
                  styles.input,
                  {
                    color: theme.textColor,
                    backgroundColor: theme.inputColor,
                  },
                ]}
                selectedValue={creditCardInfo.type}
                onValueChange={(itemValue, itemIndex) =>
                  handleInputChange("type", itemValue)
                }
              >
                <Picker.Item label="Visa" value="Visa" />
                <Picker.Item label="Mastercard" value="Mastercard" />
              </Picker>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.textColor,
                    backgroundColor: theme.inputColor,
                  },
                ]}
                placeholder="Número de Tarjeta"
                value={creditCardInfo.number}
                onChangeText={(text) => handleInputChange("number", text)}
              />
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.textColor,
                    backgroundColor: theme.inputColor,
                  },
                ]}
                placeholder="Nombre en la Tarjeta"
                value={creditCardInfo.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.textColor,
                    backgroundColor: theme.inputColor,
                  },
                ]}
                placeholder="Expiración"
                value={creditCardInfo.expiry}
                onChangeText={(text) => handleInputChange("expiry", text)}
              />
              <TouchableOpacity
                onPress={handleSaveCardInfo}
                style={[
                  styles.buttonSave,
                  { backgroundColor: theme.buttonConfirmColor },
                ]}
              >
                <Text styles={{ color: "#fff" }}>Guardar</Text>
              </TouchableOpacity>
            </View>
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
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
  },
  subtitle2: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 100,
    position: "absolute",
    top: 40,
    right: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    position: "relative",
  },
  cardNumber: {
    fontSize: 18,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLabel: {
    fontSize: 16,
    color: "#777",
  },
  cardText: {
    fontSize: 16,
  },
  cardLogo: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  buttonSave: {
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  input: {
    height: 40,
    borderWidth: 0,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  profilePicContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#E0E0E0",
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  profilePicPlaceholder: {
    textAlign: "center",
    color: "#7F7F7F",
  },
});

export default Profile;
