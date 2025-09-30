import React, { useState, useContext } from 'react';
import { StyleSheet, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { AuthContext } from '../../contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export const LoginScreen = ({ navigation }: any) => {
  const { signIn } = useContext(AuthContext);
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
      Alert.alert('Erro', 'Conta não encontrada. Crie sua conta para continuar.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={['#F6EEFD', '#E4C9F9', '#CE95F3', '#BB59EC', '#952FC1', '#641D83', '#370C4A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
        />

        <Text style={styles.slogan}>Aqui o seu dinheiro é inteligente</Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: '#952FC1', text: '#370C4A', placeholder: '#641D83' } }}
        />

        <TextInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: '#952FC1', text: '#370C4A', placeholder: '#641D83' } }}
        />

        {!!error && <Text style={styles.error}>{error}</Text>}

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          buttonColor="#952FC1"
          textColor="#F6EEFD"
        >
          Entrar
        </Button>

        <Button
          onPress={() => navigation.navigate('SignUp')}
          textColor="#F6EEFD"
          style={styles.secondaryButton}
        >
          Criar Conta
        </Button>
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
    width: 160,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  slogan: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#F6EEFD',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    marginBottom: 10,
    borderRadius: 8,
  },
  secondaryButton: {
    marginTop: 5,
  },
  error: {
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
  },
});
