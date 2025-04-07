import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import WelcomePage from "./screens/WelcomePage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";
import { GlobalStyles } from "./constants/style";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.color.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: GlobalStyles.color.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.color.primary50 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: GlobalStyles.color.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton icon="exit" color={tintColor} size={24} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const [storedToken, setStoredToken] = useState("");

  // useEffect(() => {
  //   async function fetchToken() {
  //     const storedToken = await AsyncStorage.getItem("token");

  //     setIsTryingLogin(false);
  //     setStoredToken(storedToken);
  //     await SplashScreen.hideAsync();
  //   }

  //   fetchToken();
  // }, []);

  return (
    <NavigationContainer>
      {!storedToken && <AuthStack />}
      {storedToken && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      setIsTryingLogin(false);
      await SplashScreen.hideAsync();
    }

    fetchToken();
  }, []);

  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
