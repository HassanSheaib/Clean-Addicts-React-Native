import { theme } from "./theme/Theme";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/home/Home";
import Auth from "./screens/auth/Auth";
import { getUserState } from "./services/FirebaseAuthServices";
import { ActivityIndicator, View } from "react-native";
import CleanRequest from "./screens/cleanRequest/CleanRequest";
import CleanRequestDetails from "./screens/cleanRequest/CleanRequestDetails";
import IconButton from "./components/IconButton";

const Stack = createStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState("");
  const [userName, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getUserState((userData) => {
      setInitialRoute(userData.state);
      setUsername(userData.displayName);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
              headerTintColor: "gray", // Set the accent color here
            }}
          >
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Create Request" component={CleanRequest} />
            <Stack.Screen name="Request" component={CleanRequestDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};
export default App;
