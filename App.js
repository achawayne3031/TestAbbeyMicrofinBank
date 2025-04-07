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
import RegUsers from "./screens/user/RegUsers";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Friends from "./screens/user/Friends";
import Followers from "./screens/user/Followers";
import Peers from "./screens/user/Peers";

const Drawer = createDrawerNavigator();
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
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#3c0a6b" },
        headerTintColor: "white",
        drawerActiveBackgroundColor: "#f0e1ff",
        drawerActiveTintColor: "#3c0a6b",
        drawerStyle: { backgroundColor: "#ccc" },
      }}
    >
      <Drawer.Screen
        name="Users"
        component={RegUsers}
        options={{
          drawerLabel: "Registered Users",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Friends"
        component={Friends}
        options={{
          drawerLabel: "My Friends",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Followers"
        component={Followers}
        options={{
          drawerLabel: "My Followers",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Peers"
        component={Peers}
        options={{
          drawerLabel: "My Peers",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function Navigation() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const [storedToken, setStoredToken] = useState("");

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

  return (
    <>
      <NavigationContainer>
        {!storedToken && <AuthStack />}
        {storedToken && <AuthenticatedStack />}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
