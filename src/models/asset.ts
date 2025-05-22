export interface Asset {
  id: string;
  name: string;
  type: string;
  riskLevel: 'Baixo' | 'Médio' | 'Alto';
  description: string;
}


export const assetsList: Asset[] = [
  {
    id: '1',
    name: 'Tesouro Selic',
    type: 'Renda Fixa',
    riskLevel: 'Baixo',
    description: 'Títulos do governo federal, investimento seguro e com liquidez diária.'
  },
  {
    id: '2',
    name: 'CDB Bancário',
    type: 'Renda Fixa',
    riskLevel: 'Baixo',
    description: 'Certificados de Depósito Bancário com boa rentabilidade e baixo risco.'
  },
  {
    id: '3',
    name: 'Ações Vale',
    type: 'Renda Variável',
    riskLevel: 'Alto',
    description: 'Ações da Vale S.A., investimento com maior potencial de retorno e risco.'
  },
  {
    id: '4',
    name: 'Fundo Imobiliário XP',
    type: 'Fundo Imobiliário',
    riskLevel: 'Médio',
    description: 'Fundo que investe em imóveis comerciais e residenciais.'
  },
  {
    id: '5',
    name: 'Fundos Multimercados',
    type: 'Fundo de Investimento',
    riskLevel: 'Médio',
    description: 'Fundos que diversificam entre ações, renda fixa e moedas.'
  },
];
