import React, { useState } from 'react';
import { StyleSheet, Alert, KeyboardAvoidingView, Platform, Image, View } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient'; // Certifique-se de que 'expo-linear-gradient' está instalado

export const LoginScreen = ({ navigation }: any) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    const success = await signIn(email, password);
    if (!success) {
      setError('Email ou senha inválidos. Tente novamente.');
      Alert.alert('Erro', 'Conta não encontrada. Crie sua conta para continuar.');
    } else {
      setError(''); // Limpa o erro em caso de sucesso
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <LinearGradient
        // Gradiente usando #F6EEFD (claro) e #641D83 (escuro)
        colors={['#F6EEFD', '#641D83']} 
        start={{ x: 0, y: 0.2 }} // Inicia o degradê um pouco abaixo
        end={{ x: 0.8, y: 0.9 }} 
        style={styles.container}
      >
        <Image
          // Ajuste o logo para ser visível no degradê. Se ele for colorido,
          // considere uma versão branca se a cor de fundo for escura no topo.
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
        />
        <Title style={styles.title}>Acesse sua conta</Title>
        
        <View style={styles.formContainer}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              mode="outlined"
              // Usando as cores da paleta para foco
              activeOutlineColor="#952FC1"
              theme={{ colors: { background: '#fff' } }}
            />

            <TextInput
              label="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              mode="outlined"
              activeOutlineColor="#952FC1"
              theme={{ colors: { background: '#fff' } }}
            />

            {!!error && <Text style={styles.errorText}>{error}</Text>}

            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.button}
              buttonColor="#952FC1" // Cor primária da sua paleta
              labelStyle={styles.buttonLabel}
            >
              ENTRAR
            </Button>

            <Button
              onPress={() => navigation.navigate('SignUp')}
              textColor="#F6EEFD" // Cor clara sobre o fundo degradê
              style={styles.secondaryButton}
              labelStyle={styles.secondaryButtonLabel}
            >
              Primeiro acesso? Crie sua Conta
            </Button>
        </View>

      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 180,
    height: 70,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 40,
    // Se o seu logo for escuro, esta cor de fundo o destaca contra o degradê
    // Opcional: backgroundColor: '#fff', borderRadius: 10 
  },
  formContainer: {
    padding: 25,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fundo translúcido para destacar o formulário
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#fff', 
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Sombra para legibilidade
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  input: {
    marginBottom: 15,
    borderRadius: 8,
    // Garante que o texto dentro do input seja escuro e legível
    color: '#370C4A', 
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 5,
  },
  buttonLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  },
  secondaryButton: {
    marginTop: 15,
  },
  secondaryButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#FFE082', // Amarelo claro da paleta para alertas
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
});