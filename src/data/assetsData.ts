import { Asset } from '../models/asset';

export const assetsList: Asset[] = [
  {
    id: '1',
    name: 'Tesouro Direto',
    riskLevel: 'Baixo',
    type: 'Renda Fixa',
    description: 'Investimento seguro garantido pelo governo federal.'
  },
  {
    id: '2',
    name: 'CDB de Banco Médio',
    riskLevel: 'Baixo',
    type: 'Renda Fixa',
    description: 'Certificado de Depósito Bancário com rentabilidade atrativa.'
  },
  {
    id: '3',
    name: 'Fundo Imobiliário',
    riskLevel: 'Médio',
    type: 'Fundo',
    description: 'Investimento em empreendimentos imobiliários.'
  },
  {
    id: '4',
    name: 'Ações de Empresas Estáveis',
    riskLevel: 'Médio',
    type: 'Renda Variável',
    description: 'Empresas consolidadas com histórico de crescimento.'
  },
  {
    id: '5',
    name: 'Criptomoedas',
    riskLevel: 'Alto',
    type: 'Renda Variável',
    description: 'Ativos digitais com alta volatilidade.'
  },
  {
    id: '6',
    name: 'Ações de Startups',
    riskLevel: 'Alto',
    type: 'Renda Variável',
    description: 'Empresas emergentes com grande potencial e risco elevado.'
  }
];