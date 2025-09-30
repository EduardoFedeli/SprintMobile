import { Asset } from '../domain/assets/asset';
import { UserProfile } from '../domain/types/userProfile';
import { assetsList } from '../domain/assets/assetsData'; 

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
