import { Asset, assetsList } from '../models/asset';
import { UserProfile } from '../models/userProfile';

export const getRecommendations = (user: UserProfile): Asset[] => {
  switch (user.riskProfile) {
    case 'conservador':
      return assetsList.filter(asset => asset.riskLevel === 'Baixo');
    case 'moderado':
      return assetsList.filter(asset => asset.riskLevel !== 'Alto');
    case 'agressivo':
      return assetsList;
    default:
      return [];
  }
};
