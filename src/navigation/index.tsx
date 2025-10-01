import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// Removendo NativeStackNavigationOptions da importação
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import { useAuth } from "../contexts/AuthContext";
import { LoginScreen } from "../screens/Login";
import HomeScreen from "../screens/Home";
import EducationScreen from "../screens/Education";
import RecommendationScreen from "../screens/Recommendation";
import GoalsScreen from "../screens/Goals";
import { ActivityIndicator, View } from "react-native";
import { RootStackParamList } from "../domain/types/navigation";
import { Header } from "../components/Header/Header"; 

// Importe as telas de Etapas que agora são telas de navegação
import StepName from "../screens/SignUp/StepName";
import StepEmail from "../screens/SignUp/StepEmail";
import StepPassword from "../screens/SignUp/StepPassword";
import StepProfile from "../screens/SignUp/StepProfile";

const RootStack = createNativeStackNavigator<RootStackParamList>();

// Novo Stack Navigator para as etapas de Cadastro
const SignUpStack = createNativeStackNavigator<any>(); 

// Opções de Header padrão (com o seu componente Header e alinhamento)
const defaultHeaderOptions = {
    headerTitle: () => <Header />,
    headerTitleAlign: "center" as 'center', // Usamos 'center' as 'center' para manter a tipagem correta
};

// --- SignUpNavigator: Gerencia o fluxo de cadastro ---
const SignUpNavigator = () => {
  return (
    <SignUpStack.Navigator
      initialRouteName="StepName"
      // Aplicamos as opções padrão, sem customização de cor
      screenOptions={defaultHeaderOptions} 
    >
      <SignUpStack.Screen 
        name="StepName" 
        component={StepName} 
        options={{ title: 'Seu Nome' }} 
      />
      <SignUpStack.Screen 
        name="StepEmail" 
        component={StepEmail} 
        options={{ title: 'Seu Email' }} 
      />
      <SignUpStack.Screen 
        name="StepPassword" 
        component={StepPassword} 
        options={{ title: 'Sua Senha' }} 
      />
      <SignUpStack.Screen 
        name="StepProfile" 
        component={StepProfile} 
        options={{ title: 'Seu Perfil' }} 
      />
    </SignUpStack.Navigator>
  );
};
// ------------------------------------


export const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {user ? (
          <>
            {/* Telas Autenticadas - Usando as opções padrão */}
            <RootStack.Screen
              name="Home"
              component={HomeScreen}
              options={defaultHeaderOptions}
            />
            <RootStack.Screen
              name="Education"
              component={EducationScreen}
              options={defaultHeaderOptions}
            />
            <RootStack.Screen
              name="Recommendation"
              component={RecommendationScreen}
              options={defaultHeaderOptions}
            />
            <RootStack.Screen
              name="Goals"
              component={GoalsScreen}
              options={defaultHeaderOptions}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            {/* Usa o SignUpNavigator e esconde o header principal */}
            <RootStack.Screen
              name="SignUp"
              component={SignUpNavigator}
              options={{ headerShown: false }} 
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};