import React, { useState, useContext } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Title, RadioButton } from 'react-native-paper';
import { AuthContext } from '../contexts/authContext';

export const SignUpScreen = ({ navigation }: any) => {
  const { signUp } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [riskProfile, setRiskProfile] = useState<'conservador' | 'moderado' | 'agressivo'>('conservador');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setError('Preencha todos os campos');
      return;
    }
    const success = await signUp(name, email, password, riskProfile);
    if (!success) {
      setError('Falha no cadastro');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Title style={styles.title}>Criar Conta</Title>
      <TextInput
        label="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Text style={{ marginTop: 12 }}>Perfil de Risco</Text>
      <RadioButton.Group
        onValueChange={value => setRiskProfile(value as any)}
        value={riskProfile}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12 }}>
          <RadioButton.Item label="Conservador" value="conservador" />
          <RadioButton.Item label="Moderado" value="moderado" />
          <RadioButton.Item label="Agressivo" value="agressivo" />
        </View>
      </RadioButton.Group>
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Button mode="contained" onPress={handleSignUp} style={styles.button}>
        Cadastrar
      </Button>
      <Button onPress={() => navigation.goBack()}>
        Voltar para Login
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { marginBottom: 16 },
  button: { marginVertical: 8 },
  title: { textAlign: 'center', marginBottom: 24 },
  error: { color: 'red', textAlign: 'center', marginBottom: 12 },
});
