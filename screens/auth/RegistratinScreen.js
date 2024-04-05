import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { register } from "../../services/FirebaseAuthServices";

const RegistrationScreen = ({ navigation, toggleRegister }) => {
  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "OK",
          onPress: () => setLoading(false),
        },
      ],
      { cancelable: false }
    );
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const nameValidation = (name) => {
    const namePattern = /^[a-zA-Z]{6,}$/;
    return namePattern.test(name);
  };
  const validatePass = (pass, confirmPass) => {
    const areMatched = pass === confirmPass;
    return areMatched;
  };

  const handelRegister = (name, email, pass, confrimPass) => {
    setLoading(true);
    if (!nameValidation(name)) {
      showAlert(
        "Registration Failed",
        "Make sure the name dosen't contain special characters and at least 6 characters long!!"
      );
    } else if (!validatePass(pass, confrimPass) || pass === "") {
      showAlert("Registration Failed", "Make sure your passwords match!!");
    } else {
      register(email, pass, name)
        .then((result) => {
          const { success, errorMsg } = result;
          if (success) {
            navigation.navigate("Home");
          } else {
            showAlert("Registration Failed", errorMsg);
          }
        })
        .catch((error) => {
          showAlert("Registration Failed", error.errorMsg);
        });
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
          <ActivityIndicator
            style={styles.spinner}
            size="large"
            color="black"
          />
      ) : (
          <>

              <Image
                source={require("../../assets/cleanIt.png")}
                style={styles.image}
              />
              <Text style={styles.logo}>Clean Adicts</Text>
              <Text style={styles.message}>Welcome!!</Text>
              <TextInput
                style={styles.input}
                placeholder="name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password} // Set the value of the TextInput
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                secureTextEntry
                value={confrimPass} // Set the value of the TextInput
                onChangeText={(text) => {
                  setConfirmPass(text);
                }}
              />
              <View style={styles.buttonContainer}>
                <Button
                  title="Next"
                  color="white"
                  onPress={() => {
                    handelRegister(name, email, password, confrimPass);
                  }}
                />
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.text}>You already have an account?</Text>
                <TouchableOpacity
                  onPress={() => {
                    toggleRegister(false);
                  }}
                >
                  <Text style={styles.registerText}>Sign in</Text>
                </TouchableOpacity>
              </View>
          </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 5,
  },
  message: {
    fontSize: 20,
    marginBottom: 50,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: "100%",
    backgroundColor: "#222831",
    borderRadius: 5,
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#222831",
  },
  text: {
    fontSize: 12,
    fontWeight: "200",
    color: "black",
    marginVertical: 10,
    marginRight: 5, // Add some space between text and button
  },
  rowContainer: {
    flexDirection: "row", // Arrange children horizontally
    alignItems: "center", // Align children vertically
  },
  registerText: {
    textDecorationLine: "underline", // Add underline to make it look like a link
  },
  spinner: {
    marginTop: 20,
  },
});

export default RegistrationScreen;
