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
} from "react-native";
import { login } from "../../services/FirebaseAuthServices";

const LoginScreen = ({ navigation, toggleRegister, loggedOut }) => {
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePassText = (text) => {
    setPassword(text);
  };
  const handleEmailText = (text) => {
    setEmail(text);
  };

  const loginHandler = (email, password) => {
    setLoading(true);
    login(email, password)
      .then((result) => {
        const { success, errorMsg } = result;
        if (success) {
          navigation.navigate("Home");
        } else {
          showAlert("Login Failed", errorMsg);
        }
      })
      .catch((error) => {
        showAlert("Login Failed", "Make sure your are entering a valid email and password combination");
    });
  };
  return (
    <View style={styles.container}>
      {loading && !loggedOut ? (
        <ActivityIndicator style={styles.spinner} size="large" color="black" />
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
            placeholder="email"
            value={email}
            onChangeText={handleEmailText}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password} // Set the value of the TextInput
            onChangeText={handlePassText}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Sign In"
              color="white"
              onPress={() => {
                loginHandler(email, password);
                // login(navigation, "email@email.com", "password");
              }}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.text}>You Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                toggleRegister(true);
              }}
            >
              <Text style={styles.registerText}>Register</Text>
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

export default LoginScreen;
