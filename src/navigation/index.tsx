// src/navigation/index.tsx
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../contexts/AuthContext";
import { LoginScreen } from "../screens/Login";
import { SignUpScreen } from "../screens/SignUp";
import HomeScreen from "../screens/Home";
import EducationScreen from "../screens/Education";
import RecommendationScreen from "../screens/Recommendation";
import GoalsScreen from "../screens/Goals";
import { ActivityIndicator, View } from "react-native";
import { RootStackParamList } from "../domain/types/navigation";
import { Header } from "../components/Header/Header";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerTitle: () => <Header />, headerTitleAlign: "center" }}
            />
            <Stack.Screen
              name="Education"
              component={EducationScreen}
              options={{ headerTitle: () => <Header />, headerTitleAlign: "center" }}
            />
            <Stack.Screen
              name="Recommendation"
              component={RecommendationScreen}
              options={{ headerTitle: () => <Header />, headerTitleAlign: "center" }}
            />
            <Stack.Screen
              name="Goals"
              component={GoalsScreen}
              options={{ headerTitle: () => <Header />, headerTitleAlign: "center" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
