# Dashboard Amazônia Legal - Educação Ambiental e Sustentabilidade

## 📋 Descrição

Esta dashboard interativa foi desenvolvida com foco em educação ambiental e apoio à tomada de decisões sustentáveis na Amazônia Legal. Utiliza dados oficiais do sistema PRODES/INPE para apresentar visualizações impactantes sobre o desmatamento na região.

## 🌟 Características Principais

### 📊 Visualizações Obrigatórias
- **Evolução Anual das Taxas de Desmatamento por Estado**: Gráfico de linha mostrando a evolução temporal do desmatamento desde 1988
- **Ranking Acumulado por Estado**: Gráfico de barras evidenciando os maiores e menores contribuintes ao desmatamento

### 🎨 Design e Usabilidade
- **Layout Responsivo**: Funciona perfeitamente em desktop e mobile
- **Acessibilidade**: Segue boas práticas de acessibilidade web (WCAG)
- **Visual Atrativo**: Design moderno com gradientes e animações suaves
- **Modo Escuro**: Toggle para alternar entre tema claro e escuro

### 🔧 Funcionalidades Interativas
- **Filtros Temporais**: 
  - Todos os Anos (1988-2022)
  - Últimos 10 Anos
  - Agrupamento por Década
- **Tooltips Informativos**: Informações detalhadas ao passar o mouse sobre os gráficos
- **Animações**: Transições suaves e micro-interações
- **Estatísticas Dinâmicas**: Cards com métricas atualizadas automaticamente

### 🌿 Elementos Educacionais
- **Contexto Científico**: Informações sobre o sistema PRODES/INPE
- **Análises Interpretativas**: Explicações sobre os dados e suas implicações
- **Links Educacionais**: Acesso direto ao Terrabrasilis e documentação oficial
- **Ícones Temáticos**: Elementos visuais que remetem à natureza e floresta

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização moderna com Tailwind CSS
- **JavaScript ES6+**: Lógica interativa e manipulação de dados
- **Chart.js**: Biblioteca para visualizações de dados
- **Fontes**: Inter (Google Fonts)

## 📁 Estrutura do Projeto

```
amazonia-dashboard/
├── index.html              # Página principal
├── script.js              # Lógica JavaScript principal
├── styles.css             # Estilos adicionais e animações
├── desmatamento_prodes.csv # Dados originais (referência)
└── README.md              # Documentação
```

## 🚀 Como Usar

1. **Abrir a Dashboard**: Abra o arquivo `index.html` em qualquer navegador moderno
2. **Explorar os Dados**: Use os filtros temporais para diferentes visualizações
3. **Alternar Temas**: Use o toggle "Modo Escuro" para mudar o tema
4. **Interagir com Gráficos**: Passe o mouse sobre os elementos para ver detalhes
5. **Acessar Links**: Clique nos links educacionais para mais informações

## 📊 Dados Utilizados

Os dados utilizados são provenientes do sistema PRODES (Programa de Monitoramento do Desmatamento da Amazônia Legal por Satélite) do INPE, cobrindo o período de 1988 a 2022. Os dados incluem:

- **Estados**: Acre, Amazonas, Amapá, Maranhão, Mato Grosso, Pará, Rondônia, Roraima, Tocantins
- **Período**: 35 anos de monitoramento (1988-2022)
- **Métricas**: Área desmatada anual por estado (km²)

### 📈 Principais Insights dos Dados

- **Pico Histórico**: 1995 com 29.059 km² de desmatamento
- **Menor Taxa**: 2012 com 4.571 km² de desmatamento
- **Maior Contribuinte**: Pará (desmatamento acumulado)
- **Menor Contribuinte**: Amapá (desmatamento acumulado)
- **Total Acumulado**: 481.843 km² em 35 anos

## 🎯 Objetivos Educacionais

Esta dashboard foi desenvolvida seguindo os princípios do **Vibe Coding** (código limpo, criativo e com impacto) e tem como objetivos:

1. **Conscientização**: Apresentar dados científicos de forma acessível
2. **Educação**: Contextualizar a importância do monitoramento ambiental
3. **Tomada de Decisão**: Fornecer base de dados para políticas sustentáveis
4. **Engajamento**: Motivar ações de conservação através de visualizações impactantes

## 🌍 Impacto e Aplicações

- **Educação Ambiental**: Material didático para escolas e universidades
- **Políticas Públicas**: Suporte à formulação de estratégias de conservação
- **Pesquisa Científica**: Base para estudos sobre desmatamento
- **Conscientização Social**: Ferramenta de sensibilização para a sociedade civil

## 🔗 Links Úteis

- [Terrabrasilis](https://terrabrasilis.dpi.inpe.br/) - Portal oficial de dados
- [PRODES](http://www.obt.inpe.br/OBT/assuntos/programas/amazonia/prodes) - Documentação oficial
- [INPE](https://www.gov.br/inpe/) - Instituto Nacional de Pesquisas Espaciais

## 📱 Responsividade

A dashboard foi desenvolvida com design responsivo, adaptando-se automaticamente a diferentes tamanhos de tela:

- **Desktop**: Layout completo com gráficos em tamanho otimizado
- **Tablet**: Ajustes de layout para telas médias
- **Mobile**: Interface compacta com navegação touch-friendly

## ♿ Acessibilidade

Implementa boas práticas de acessibilidade:

- Contraste adequado entre cores
- Navegação por teclado
- Textos alternativos para elementos visuais
- Estrutura semântica HTML
- Tooltips informativos

## 🎨 Paleta de Cores

- **Verde Principal**: #22c55e (representando a floresta)
- **Verde Escuro**: #15803d (títulos e destaques)
- **Gradientes**: Tons de verde para harmonia visual
- **Modo Escuro**: Tons de cinza para conforto visual

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de conscientização ambiental. Os dados utilizados são de domínio público, fornecidos pelo INPE/Terrabrasilis.

---

**Desenvolvido com 💚 para a conservação da Amazônia Legal**

*"A preservação da Amazônia Legal é fundamental para o equilíbrio climático global. Use estes dados para informar decisões, apoiar políticas sustentáveis e promover a conscientização ambiental em sua comunidade."*

