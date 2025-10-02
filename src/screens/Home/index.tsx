import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../domain/types/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Redireciona para login se não houver usuário logado
  useEffect(() => {
    if (!user) {
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }
  }, [user]);

  if (!user) {
    return null; // evita renderizar a tela antes do redirecionamento
  }

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: logout },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {user.name}</Text>
          <Text style={styles.profile}>
            Perfil: {user.profile?.riskProfile || 'Não definido'}
          </Text>
          <Text>Saldo: R$ {user?.balance.toFixed(2)}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔎 Recomendações Rápidas</Text>

        <View style={styles.card}>
          <Text style={styles.tipTitle}>📌 Renda fixa com liquidez diária</Text>
          <Text style={styles.tipText}>Ideal para reserva de emergência com segurança.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.tipTitle}>📌 Ações estáveis para médio prazo</Text>
          <Text style={styles.tipText}>Empresas consolidadas com histórico de dividendos.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.tipTitle}>📌 Fundos imobiliários com bom yield</Text>
          <Text style={styles.tipText}>Receba aluguéis mensais com boa previsibilidade.</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Education')}>
        <Text style={styles.buttonText}>🎓 Educação Interativa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recommendation')}>
        <Text style={styles.buttonText}>💼 Carteira Recomendada</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Goals')}>
        <Text style={styles.buttonText}>🎯 Meus Objetivos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6A0DAD',
  },
  profile: {
    fontSize: 16,
    color: '#666',
  },
  logout: {
    color: '#FF4D4D',
    fontWeight: 'bold',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#6A0DAD',
  },
  card: {
    backgroundColor: '#f3e8ff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  tipText: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#6A0DAD',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
