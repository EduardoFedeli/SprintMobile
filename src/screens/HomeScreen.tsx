import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button, Title } from 'react-native-paper';
import { AuthContext } from '../contexts/authContext';
import { AssetCard } from '../components/AssetCard';
import { getRecommendations } from '../services/recommendation.service';

export const HomeScreen = () => {
  const { user, signOut } = useContext(AuthContext);

  if (!user) return null;

  // Pega recomendação baseado no perfil do usuário
  const recommendations = getRecommendations(user);

  return (
    <View style={styles.container}>
      <Title>Bem-vindo, {user.name}!</Title>
      <Text>Perfil de risco: {user.riskProfile}</Text>

      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AssetCard asset={item} />}
        style={{ marginTop: 16, width: '100%' }}
      />

      <Button mode="contained" onPress={signOut} style={styles.logoutButton}>
        Sair
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, padding: 16, alignItems: 'center' },
  logoutButton: { marginTop: 24, width: '100%' },
});
