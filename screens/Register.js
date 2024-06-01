import React from "react";
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

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { registerAPI } from '../api/formAPI'

const SignIn = ({ navigation }) => {
  const { height } = Dimensions.get("window");

  const { signIn } = useAuth();

  const handleSignIn = () => {
    signIn();
  };


  // all about formik to check for data
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
        console.log(formData);
        try {
            const result = await registerAPI(formData);
            
            if(result.statusCode) throw 'Error al crear usuario';

            console.log('Usuario creado');
            handleSignIn();
            //changeForm();
        } catch (error) {
            console.log(error);
        }
    }
  });

  function initialValues() {
    return {
        email: '',
        username: '',
        password: '',
        repeatPassword: '',
        userType: 'admin'
    }
  }

  function validationSchema() {
    return {
        email: Yup.string().email().required(true),
        password: Yup.string().required(true),
        repeatPassword: Yup.string().required(true).oneOf([Yup.ref('password')])
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Register</Text>
            {/* <Text style={styles.body}>Register</Text> */}

            <TextInput
              style={[
                styles.input,
                formik.errors.email && styles.errorInput]}
              placeholder="Enter email"
              autoCorrect={false}
              // formik
              onChangeText={(text) => {formik.setFieldValue('email', text);
                                      formik.setFieldValue('username', text)}}
              value={formik.values.email}
              error={formik.errors.email}
            />
            <TextInput
              style={[
                styles.input,
                formik.errors.password && styles.errorInput]}
              placeholder="Password"
              autoCorrect={false}
              secureTextEntry={true}

              // formik
              onChangeText={(text) => formik.setFieldValue('password', text)}
              value={formik.values.password}
              error={formik.errors.password}
            />
            <TextInput
              style={[
                styles.input,
                formik.errors.repeatPassword && styles.errorInput]}
              placeholder="Repeat password"
              autoCorrect={false}
              secureTextEntry={true}

              // formik
              onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
            />

            <TouchableOpacity style={styles.signInButton} /*onPress={handleSignIn}*/ onPress={formik.handleSubmit}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Register
              </Text>
            </TouchableOpacity>

            {/* <Text style={{ textAlign: "center" }}>Or register with</Text>

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
    backgroundColor: "#FD6D6A",
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
    borderColor: 'red',
    borderWidth: 3,
  },
});
