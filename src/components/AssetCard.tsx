import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { Asset } from '../models/asset';

export const AssetCard = ({ asset }: { asset: Asset }) => (
  <Card style={styles.card}>
    <Card.Content>
      <Title>{asset.name}</Title>
      <Paragraph>Tipo: {asset.type}</Paragraph>
      <Paragraph>Risco: {asset.riskLevel}</Paragraph>
      <Paragraph>{asset.description}</Paragraph>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    width: '100%',
  },
});
