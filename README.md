# Consultor Financeiro Autossustentável - NotebookLM 🧠💹

Bem-vindo ao repositório do **Consultor Financeiro AI**, um projeto desenvolvido para o Desafio de Projeto da DIO explorando o potencial do NotebookLM do Google.

## 🎯 Contexto e Objetivos

O mercado financeiro é altamente dinâmico, e a informação desatualizada pode custar caro. O objetivo deste projeto foi criar um **Consultor Financeiro utilizando o NotebookLM**, mas resolvendo um problema crítico: a obsolescência dos dados.

Ao invés de alimentar a IA com PDFs estáticos de relatórios passados, este projeto foi construído utilizando **fontes autossustentáveis**. Isso significa que o NotebookLM foi ancorado em links e portais de dados em tempo real. Dessa forma, posso perguntar diariamente sobre as notícias do mercado, cotações de câmbio e taxas macroeconômicas, e a IA sempre terá a informação atualizada sem que eu precise fazer novos uploads.

Este repositório documenta a linhagem desses dados (Data Lineage), a arquitetura dos prompts, e serve como um portal (Frontend) elegante para acessar as fontes e interagir com o consultor.

---

## 🗂️ Curadoria de Fontes (Data Lineage)

Foram selecionadas **19 fontes dinâmicas**, cuidadosamente categorizadas para fornecer uma visão 360º da economia brasileira e global. Você pode explorar todas elas através do painel interativo no nosso site (arquivo `index.html`).

### 1. Câmbio
*   [Remessa Online: Dólar americano Hoje (USD)](https://www.remessaonline.com.br/cotacao/cotacao-dolar)
*   [Investing.com: USD/BRL - Cotação Dólar para Real](https://br.investing.com/currencies/usd-brl)

### 2. Indicadores Econômicos
*   [Trading Economics: Brazil Inflation Rate](https://pt.tradingeconomics.com/brazil/inflation-rate)
*   [Banco Central: Estatísticas monetárias e de crédito](https://www.bcb.gov.br/estatisticas/estatisticasmonetariascredito)
*   [Banco Central: Focus Relatório de Mercado](https://www.bcb.gov.br/publicacoes/focus)
*   [Trading Economics: Taxa de Crescimento do PIB do Brasil](https://pt.tradingeconomics.com/brazil/gdp-growth)
*   [Banco Central: Taxas de juros básicas – Histórico](https://www.bcb.gov.br/controleinflacao/historicotaxasjuros)

### 3. Investimentos e Dividendos
*   [Investing.com: Agenda de Dividendos](https://br.investing.com/dividends-calendar/)
*   [Tesouro Direto: Balanço do Tesouro Direto 2026](https://www.tesourodireto.com.br/titulos/balanco-do-tesouro.htm)
*   [Money Times: FIIs - calendário de dividendos de Maio de 2026](https://www.moneytimes.com.br/fiis-confira-o-calendario-de-dividendos-de-maio-de-2026/)
*   [Blog brapi.dev: Melhores Corretoras de Valores 2026](https://blog.brapi.dev/melhores-corretoras-de-valores-2026/)

### 4. Mercado de Ações
*   [ADVFN: Bovespa e BM&F - Cotações Gratis da Bolsa de Valores de SP](https://br.advfn.com/bolsa-de-valores/bovespa/bovespa)
*   [Trading Economics: Ibovespa Cai Apesar das Perspectivas de Cessar-Fogo no Oriente](https://pt.tradingeconomics.com/brazil/stock-market)
*   [Mais Retorno: Lista Completa das Ações listadas na bolsa de valores B3](https://maisretorno.com/bolsa/acoes/lista-completa)
*   [ADVFN: Rankings de BOV - Maiores Altas (%) - Hoje](https://br.advfn.com/bolsa-de-valores/bovespa/maiores-altas)
*   [Relatório do Deep Research: Structural Divergence and Valuation Anomalies in the Brazilian Capital Markets] (Nota: Esse é o documento interno gerado/colado no bloco de notas)

### 5. Notícias e Calendário
*   [CVM Caderno 5: Negociações On Line](https://www.gov.br/investidor/pt-br/educacional/publicacoes-educacionais/cadernos/cvm-caderno-5.pdf)
*   [Investing.com: Calendário Econômico](https://br.investing.com/economic-calendar/)
*   [Money Times: Notícias que enriquecem seu dia](https://www.moneytimes.com.br/)

---

## 🛠️ Engenharia de Prompts e "Cicatrizes" (Troubleshooting)

Construir uma IA baseada em links dinâmicos no NotebookLM traz desafios únicos. Abaixo, registro o processo empírico.

### O Desafio da Alucinação e Fontes Estáticas
*   **Problema:** Inicialmente, tentei perguntar: *"Qual a Selic hoje?"*. O NotebookLM às vezes respondia com dados do momento em que o link foi inicialmente lido, ou alucinava dados de treinamento prévio.
*   **Solução (O Prompt "Forçador"):** Para contornar isso, criei prompts que obrigam a IA a citar a fonte específica.

### Variações de Prompts Testadas

**❌ Prompt Inicial (Falho):**
> "Faça um resumo do mercado hoje."
> *Resultado: Resposta genérica, muitas vezes sem ler os links das fontes recém-atualizadas.*

**⚠️ Prompt Intermediário (Parcial):**
> "Leia os links do Valor Econômico e me diga como está o mercado."
> *Resultado: Melhorou, mas a IA misturava notícias antigas com novas.*

**✅ Prompt Final Otimizado (Sucesso):**
> "Aja como meu analista financeiro sênior. Acesse APENAS os dados da fonte 'B3: Maiores Altas e Baixas' e 'Banco Central: Selic Atual'. Me diga: 1) Qual a taxa Selic exata reportada lá agora? 2) Quais as 3 ações que mais subiram? Ignore qualquer conhecimento prévio."
> *Resultado: Respostas precisas, estruturadas e com os dados em tempo real da página conectada.*

---

## 📚 Miniguia de Estudo e Revisão

### Resumo Estruturado do Ecossistema
A lógica deste projeto é baseada na arquitetura **RAG (Retrieval-Augmented Generation)** adaptada para o usuário final via NotebookLM. Em vez de criar pipelines complexos de dados (Python, SQL), delegamos a ingestão de dados ao próprio Google, fornecendo a ele os "ponteiros" (URLs) de onde a verdade absoluta (Single Source of Truth) reside.

### Glossário Financeiro e Técnico
*   **Selic:** A taxa básica de juros da economia brasileira. Influencia o crédito, o consumo e o rendimento da renda fixa.
*   **IPCA:** O índice oficial de inflação do Brasil. Mede a variação dos preços para o consumidor final.
*   **Ibovespa:** O principal indicador de desempenho das ações negociadas na B3 (Bolsa brasileira).
*   **Data Lineage:** O processo de rastrear os dados de volta à sua origem, garantindo que as decisões sejam tomadas com base em fontes confiáveis.
*   **RAG (Retrieval-Augmented Generation):** Técnica onde a IA consulta uma base de conhecimento externa (nossas 19 fontes) antes de gerar a resposta.

### 🤖 Prompts Reutilizáveis (Sua vez de usar!)

Use estes prompts diretamente no [Caderno do NotebookLM](https://notebooklm.google.com/notebook/360dcfd8-7f7e-45a3-8775-53225e85c73b) para testar a ferramenta:

1.  **Morning Call Rápido:**
    > *"Analise as manchetes da 'Bloomberg Brasil' e do 'Valor Econômico'. Liste em bullet points os 3 principais eventos que podem impactar a abertura da bolsa brasileira hoje."*
2.  **Radar de Dividendos:**
    > *"Consulte o 'Status Invest' e a 'Infomoney'. Quais empresas possuem 'data com' para dividendos esta semana? Me dê os tickers e os valores previstos."*
3.  **Análise Macro:**
    > *"Cruze os dados do 'IBGE (IPCA)' com a 'Selic (BCB)'. O juro real (Selic menos Inflação) está aumentando ou diminuindo com base nas últimas atualizações desses links?"*

---
## 👨‍💻 Sobre o Engenheiro
Desenvolvido por **Victor Ladislau Viana (Invictor13)**.
Focado em unir engenharia de dados e inteligência artificial para criar soluções elegantes, precisas e sustentáveis.

🔗 [Acesse o Front-end do Projeto aqui](index.html)
🔗 [GitHub - Invictor13](https://github.com/Invictor13)