import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import MyBlur from "../components/MyBlur";
import SignIn from "./SignIn";
import Register from "./Register";

const Welcome = () => {
  const { height } = Dimensions.get("window");
  const [contentToShow, setContentToShow] = useState(null);

  const showContent = (contentType) => {
    if (contentToShow === contentType) {
    //   setContentToShow(null);
    } else {
      setContentToShow(contentType);
    }
  };

  const hideContent = () => {
    setContentToShow(null);
  };

  return (
    <>
      <MyBlur />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Crypto-Wallet</Text>
            {/* <Text style={styles.title}>$</Text>
            <Text style={styles.body}>
              Welcome to Crypto-Wallet, the best app to manage your
              cryptocurrencies.
            </Text> */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => showContent("Register")}
                style={styles.button1}
              >
                <Text style={styles.buttonsText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => showContent("SignIn")}
                style={styles.button2}
              >
                <Text style={styles.buttonsText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.authScrollViewContainer}>
            {contentToShow === "SignIn" && <SignIn />}
            {contentToShow === "Register" && <Register />}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 35,
    textAlign: "center",
    color: "#353147",
  },
  body: {
    paddingTop: 20,
    fontSize: 16,
    lineHeight: 23,
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
  },
  button2: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 16,
    backgroundColor: "#DFE3E630",
    marginTop: 40,
  },
  authScrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
