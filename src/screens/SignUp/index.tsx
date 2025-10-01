import React from "react";
import { View, StyleSheet, Text } from "react-native";
// IMPORTANTE: Todas as importações de StepName, StepEmail, etc. não são mais usadas aqui.
// Elas estão sendo usadas diretamente no src/navigation/index.tsx

// ESTE COMPONENTE NÃO TEM MAIS A LÓGICA DE MULTI-STEP.
// Ele é apenas um placeholder, já que a navegação para os passos
// (StepName, StepEmail, etc.) agora é feita pelo SignUpNavigator.

export const SignUpScreen = ({ navigation }: any) => {
  // Você pode iniciar a navegação para o primeiro passo aqui
  // Embora no seu AppNavigator, a tela "SignUp" já chame o SignUpNavigator que começa em "StepName".
  React.useEffect(() => {
    // Para garantir que o usuário vá para a primeira tela do fluxo
    // Se a navegação direta no AppNavigator não funcionar, ative este trecho:
    /*
    navigation.reset({
      index: 0,
      routes: [{ name: 'StepName' }],
    });
    */
  }, [navigation]);


  return (
    <View style={styles.container}>
      {/* Mensagem simples ou apenas um componente vazio */}
      <Text style={styles.infoText}>Iniciando o fluxo de cadastro...</Text>
      {/* Os passos agora são controlados pelo React Navigation.
          O código antigo de <Title>, <StepName>, <Button> e etc. foi removido. */}
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Mantendo o background original para consistência visual
    backgroundColor: "#F6EEFD",
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#6A0DAD",
  },
  // O restante dos styles (stepTitle, stepContainer, footer) foi removido
  // pois não são mais usados neste componente.
});