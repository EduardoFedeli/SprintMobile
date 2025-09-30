import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card } from 'react-native-paper';

const GoalsScreen = () => {
  const goals = [
    { id: '1', title: 'Quitar dívidas', description: 'Priorize o pagamento de dívidas com juros altos primeiro.' },
    { id: '2', title: 'Montar reserva de emergência', description: 'Tenha um fundo equivalente a 3 a 6 meses das suas despesas mensais.' },
    { id: '3', title: 'Investir mensalmente', description: 'Defina um valor fixo para investir todo mês, mesmo que seja pouco.' },
    { id: '4', title: 'Economizar para um objetivo', description: 'Planeje suas metas como viagens ou bens materiais com antecedência.' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Metas</Text>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.title} titleStyle={styles.cardTitle} />
            <Card.Content>
              <Text style={styles.cardText}>{item.description}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6A1B9A',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#F3E5F5',
    marginBottom: 12,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 18,
    color: '#6A1B9A',
    fontWeight: '600',
  },
  cardText: {
    fontSize: 16,
    color: '#4A148C',
  },
});

export default GoalsScreen;