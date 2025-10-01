import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const StepName: React.FC = () => {
  const navigation = useNavigation<any>(); 
  const [name, setName] = useState("");

  const handleNext = () => {
    if (!name.trim()) return;
    navigation.navigate('StepEmail', { name: name.trim() });
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Digite seu nome de usuário</Title>
      <TextInput
        label="Username"
        value={name}
        onChangeText={setName}
        mode="flat" // Usando 'flat' para um visual mais limpo
        style={styles.input}
        activeUnderlineColor="#952FC1" // Cor da linha ativa
      />
      <Button
        mode="contained"
        onPress={handleNext} 
        disabled={!name.trim()}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
      >
        Próximo Passo
      </Button>
    </View>
  );
};

export default StepName;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 30, 
    backgroundColor: "#F6EEFD", // Cor de fundo mais clara
  },
  title: { 
    fontSize: 24, 
    marginBottom: 30, 
    textAlign: "center",
    color: "#641D83", // Cor escura para o texto principal
    fontWeight: "bold",
  },
  input: { 
    marginBottom: 20,
    backgroundColor: "#E4C9F9", // Fundo do input levemente colorido
    borderRadius: 8,
  },
  button: { 
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "#952FC1", // Cor primária para o botão
  },
  buttonContent: {
    paddingVertical: 4,
  },
  buttonLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});