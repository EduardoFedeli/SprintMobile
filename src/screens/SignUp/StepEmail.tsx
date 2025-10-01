import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

const StepEmail: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>(); 
  const { name } = route.params || {};

  const [email, setEmail] = useState("");

  const handleNext = () => {
    if (!email.includes("@") || email.length < 5) {
      Alert.alert("Email inválido", "Por favor, insira um endereço de e-mail válido.");
      return;
    }
    
    navigation.navigate('StepPassword', { 
      name: name,
      email: email.trim() 
    });
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{name}, digite seu e-mail.</Title>
      <TextInput
        label="Seu Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        mode="flat"
        style={styles.input}
        activeUnderlineColor="#952FC1"
      />
      <Button 
        mode="contained" 
        onPress={handleNext} 
        disabled={!email.includes('@')}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
      >
        Prosseguir
      </Button>
    </View>
  );
};

export default StepEmail;

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
    marginBottom: 20,
    backgroundColor: "#E4C9F9",
    borderRadius: 8,
  },
  button: { 
    marginTop: 10,
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