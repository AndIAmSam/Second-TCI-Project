import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import * as LocalAuthentication from "expo-local-authentication";

import { useFormik } from "formik";
import * as Yup from "yup";
import { loginAPI } from "../api/formAPI";

const SignIn = ({ navigation }) => {
  const { height } = Dimensions.get("window");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  const handleSignIn = () => {
    signIn();
  };

  const handleFingerprintLogin = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        signIn();
      } else {
        Alert.alert("Authentication failed", "Please try again.");
      }
    } else {
      Alert.alert(
        "Authentication not available",
        "Your device does not support biometric authentication."
      );
    }
  };

  // all about formik to check for data
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      console.log(formData);
      try {
        const result = await loginAPI(formData);

        if (result.statusCode) throw "El usuario/pass no existe";

        console.log("Usuario login");
        handleSignIn();
        //changeForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  function initialValues() {
    return {
      identifier: "",
      password: "",
    };
  }

  function validationSchema() {
    return {
      identifier: Yup.string()
        .email("El correo electrónico no es válido")
        .required("El correo electrónico es obligatorio"),
      password: Yup.string().required("La contraseña no es válida"),
    };
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Sign In</Text>
            {/* <Text style={styles.body}>SignIn</Text> */}
            <TextInput
              style={[
                styles.input,
                formik.errors.identifier && styles.errorInput,
              ]}
              placeholder="Enter email"
              autoCorrect={false}
              //value={username}
              //onChangeText={setUsername}

              // formik
              onChangeText={(text) => formik.setFieldValue("identifier", text)}
              value={formik.values.identifier}
              error={formik.errors.identifier}
            />
            {formik.errors.identifier && formik.touched.identifier && (
              <Text style={styles.errorText}>{formik.errors.identifier}</Text>
            )}

            <TextInput
              style={[
                styles.input,
                formik.errors.password && styles.errorInput,
              ]}
              placeholder="Password"
              autoCorrect={false}
              secureTextEntry={true}
              //value={password}
              //onChangeText={setPassword}

              // formik
              onChangeText={(text) => formik.setFieldValue("password", text)}
              value={formik.values.password}
              error={formik.errors.password}
            />

            {formik.errors.password && formik.touched.password && (
              <Text style={styles.errorText}>{formik.errors.password}</Text>
            )}

            {/* <TouchableOpacity>
              <Text
                style={[
                  styles.buttonsText,
                  { fontWeight: "bold", lineHeight: 30, textAlign: "right" },
                ]}
              >
                Recovery Password
              </Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.signInButton}
              //onPress={handleSignIn}
              onPress={formik.handleSubmit}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.fingerprintButton}
              onPress={handleFingerprintLogin}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Enter with your Fingerprint/Face
              </Text>
            </TouchableOpacity>

            {/* <Text style={{ textAlign: "center" }}>Or continue with</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button1}>
                <Image
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png",
                  }}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Welcome")}
                style={styles.button1}
              >
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
                  }}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
            </View> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  contentContainer: {
    paddingHorizontal: 30,
    marginBottom: 40,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 35,
    textAlign: "center",
    color: "#353147",
    marginBottom: 30,
  },
  body: {
    padding: 20,
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 20,
    fontWeight: "400",
    textAlign: "center",
    color: "#353147",
  },
  buttonsText: {
    fontWeight: "500",
    color: "#353147",
  },
  button1: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff70",
    padding: 16,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 16,
    marginHorizontal: 10,
  },
  button2: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",

    backgroundColor: "#DFE3E630",
    marginTop: 40,
  },
  input: {
    backgroundColor: "#F7F7F7",
    padding: 20,
    borderRadius: 16,
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: "#6aabfd",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginVertical: 30,
    shadowColor: "#FD6D6A",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
  },
  fingerprintButton: {
    backgroundColor: "#6aabfd",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginVertical: 30,
    shadowColor: "#FD6D6A",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 3,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
