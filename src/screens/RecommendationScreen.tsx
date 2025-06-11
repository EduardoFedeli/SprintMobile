import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

const RecommendationScreen = () => {
  const recommendations = [
    {
      title: 'CDB do Banco X',
      description: 'Rende 110% do CDI com liquidez diária. Ideal para reserva de emergência.'
    },
    {
      title: 'Tesouro Selic',
      description: 'Investimento seguro e indicado para quem está começando.'
    },
    {
      title: 'Fundo de Renda Fixa Conservador',
      description: 'Baixo risco, boa alternativa para quem quer diversificar com segurança.'
    },
    {
      title: 'Ações de empresas consolidadas',
      description: 'Investimento de longo prazo em empresas com bons fundamentos.'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Recomendações de Investimento</Text>
      {recommendations.map((item, index) => (
        <Card key={index} style={styles.card}>
          <Card.Title title={item.title} titleStyle={styles.cardTitle} />
          <Card.Content>
            <Text style={styles.cardText}>{item.description}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
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

export default RecommendationScreen;