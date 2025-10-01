import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

const StepPassword: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>(); 
  const { name, email } = route.params || {};

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const validatePassword = (pwd: string) => {
    // Requisitos: 8+ chars, maiúscula, minúscula, número e especial
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const handleNext = () => {
    if (!validatePassword(password)) {
      Alert.alert(
        "Senha Insegura",
        "Sua senha precisa ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial."
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erro de Confirmação", "As senhas digitadas não coincidem. Tente novamente.");
      return;
    }
    
    navigation.navigate('StepProfile', {
      name: name, 
      email: email, 
      password: password 
    });
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Escolha uma senha segura</Title>

      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secure}
        mode="flat"
        style={styles.input}
        activeUnderlineColor="#952FC1"
        right={
          <TextInput.Icon icon={secure ? "eye-off" : "eye"} onPress={() => setSecure((s) => !s)} />
        }
      />

      <TextInput
        label="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={secure}
        mode="flat"
        style={styles.input}
        activeUnderlineColor="#952FC1"
      />

      <Button 
        mode="contained" 
        onPress={handleNext} 
        disabled={!password || !confirmPassword}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
      >
        Avançar para Perfil
      </Button>
    </View>
  );
};

export default StepPassword;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 30, 
    backgroundColor: "#F6EEFD",
  },
  title: { 
    fontSize: 24, 
    marginBottom: 30, 
    textAlign: "center",
    color: "#641D83",
    fontWeight: "bold",
  },
  input: { 
    marginBottom: 15,
    backgroundColor: "#E4C9F9",
    borderRadius: 8,
  },
  button: { 
    marginTop: 15,
    borderRadius: 8,
    backgroundColor: "#952FC1",
  },
  buttonContent: {
    paddingVertical: 4,
  },
  buttonLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});