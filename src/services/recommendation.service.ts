import { Asset } from '../models/asset';
import { UserProfile } from '../models/userProfile';
import { assetsList } from '../data/assetsData'; 

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
