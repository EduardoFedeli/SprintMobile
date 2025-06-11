import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

const EducationScreen = () => {
  const tips = [
    {
      title: 'Evite Gastos Desnecessários',
      description: 'Antes de comprar, pergunte-se se realmente precisa daquilo. Pequenas economias viram grandes resultados.'
    },
    {
      title: 'Tenha um Orçamento Mensal',
      description: 'Organize seus ganhos e gastos em uma planilha ou aplicativo. Isso te dá clareza e controle.'
    },
    {
      title: 'Monte sua Reserva de Emergência',
      description: 'Guarde ao menos 3 a 6 meses de despesas em uma conta segura e com liquidez.'
    },
    {
      title: 'Entenda Juros Compostos',
      description: 'Investir cedo faz seu dinheiro crescer com o tempo. Pesquise sobre Tesouro Direto, CDBs e fundos.'
    },
    {
      title: 'Cuidado com o Crédito Fácil',
      description: 'Cartão de crédito e empréstimos podem virar vilões se usados sem controle. Use com consciência.'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dicas de Educação Financeira</Text>
      {tips.map((tip, index) => (
        <Card key={index} style={styles.card}>
          <Card.Title title={tip.title} titleStyle={styles.cardTitle} />
          <Card.Content>
            <Text style={styles.cardText}>{tip.description}</Text>
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
    marginBottom: 16,
    color: '#6A1B9A',
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

export default EducationScreen;