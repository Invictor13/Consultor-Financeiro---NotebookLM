# Consultor-Financeiro---NotebookLM
# Ecossistema RAG Autossustentável: Consultoria e Análise do Mercado Financeiro no Google NotebookLM

## 🎯 Contexto e Objetivos

Este projeto foi desenvolvido como parte de um Desafio de Projeto na **DIO (Digital Innovation One)** com o objetivo de explorar os limites práticos do **NotebookLM** como uma ferramenta de aprendizagem ativa e consultoria financeira automatizada. 

O core do ecossistema consiste em criar uma arquitetura híbrida de dados de **Retrieval-Augmented Generation (RAG)** capaz de munir a Inteligência Artificial com conceitos atemporais de economia (camada estrutural) e dados factuais capturados diretamente do pregão (camada dinâmica). O objetivo final é ter um consultor financeiro autônomo que necessite de **zero manutenção de links no futuro**, bastando utilizar o comando nativo de sincronização para obter análises em tempo real sobre o mercado brasileiro.

---

## 📚 Curadoria de Fontes

Para garantir alta credibilidade nas respostas e evitar alucinações ("grounding" robusto), o ecossistema foi dividido em duas camadas de ingestão de dados:

### 1. Camada Estrutural (Manuais Teóricos)
*   **CVM (Comissão de Valores Mobiliários) - Caderno 5: O Mercado de Ações**
    *   *Papel no RAG:* Fornece à IA a base regulatória de renda variável, governança corporativa e dinâmica de negociações.
*   **ENAP / Tesouro Nacional - O Tesouro Direto e o Mercado de Renda Fixa**
    *   *Papel no RAG:* Ensina à IA a mecânica de precificação dos títulos públicos, marcação a mercado e o comportamento dos indexadores macroeconômicos.

### 2. Camada Dinâmica (Hubs de HTML Estático Mutável)
*   **Trading Economics Brasil**
    *   *URL Utilizada:* `https://pt.tradingeconomics.com/brazil/stock-market`
    *   *Papel no RAG:* Fornece a tabela de cotações das principais empresas da B3 (Petrobras, Vale, Ambev) e os principais indicadores do dia (Selic, IPCA e variação do PIB).
*   **ADVFN Brasil - Central de Cotações**
    *   *URL Utilizada:* `https://br.advfn.com/bolsa-de-valores/bovespa/maiores-altas`
    *   *Papel no RAG:* Entrega ao parser do NotebookLM o comportamento imediato do pregão diário com foco nas maiores oscilações do mercado.
*   **Investing.com Brasil - Painel de Economia**
    *   *URL Utilizada:* `https://br.investing.com/news/economy`
    *   *Papel no RAG:* Alimenta a IA com o fluxo de notícias factuais e o sentimento diário do mercado global.

---

## 🛠️ Engenharia de Prompts e "Cicatrizes" (Troubleshooting)

O mercado valoriza o raciocínio por trás dos resultados. Durante a validação do ecossistema de dados, foram identificadas e tratadas três falhas de infraestrutura do parser do NotebookLM:

### Cicatriz 1: O Bloqueio Antirobô (Cloudflare Check)
*   **Dificuldade:** Ao tentar conectar o site *Fundamentus* para extrair os múltiplos de valuation ($P/L, ROE$), o scraper do NotebookLM tomou um bloqueio total da camada de segurança de borda (*"Performing security verification... This website uses a security service to protect against malicious bots"*). A IA ficou indexando uma página de erro.
*   **Solução (Troubleshooting):** Substituição imediata da fonte por agregadores que utilizam arquitetura baseada em **Server-Side Rendering (SSR)** e tabelas em HTML clássico, como o diretório do *Trading Economics*.

### Cicatriz 2: A Cegueira de JavaScript Dinâmico
*   **Dificuldade:** Links com painéis interativos modernos e gráficos avançados geravam documentos quase vazios no NotebookLM. O parser capturava o menu e o rodapé, mas a tabela de cotações real sumia por ser injetada via Client-Side JavaScript.
*   **Solução (Troubleshooting):** Pivotagem técnica da estratégia de curadoria. Foi estabelecido o uso de páginas puramente textuais ou de plataformas legadas (como os diretórios alfabéticos do *ADVFN*), garantindo que o dado estivesse exposto no código-fonte bruto da página.

### Cicatriz 3: Conflito de Cotação de Moedas
*   **Dificuldade:** Ao cruzar dados de plataformas de remessa com portais de notícias, a IA começou a misturar o valor do Dólar Comercial real (R$ 5,03) com estimativas de conversões internacionais com spread comercial embutido (R$ 4,84).
*   **Solução (Troubleshooting):** Ajuste fino no prompt do sistema instruindo o modelo a ignorar taxas operacionais de corretoras e priorizar o par cambial do indexador global do *Trading Economics*.

---

## 📖 Miniguia de Estudo (Entrega Final)

### 1. Resumos Estruturados do Cenário Econômico
Com base no acoplamento das fontes do ecossistema, o consultor consolidou a análise do cenário atual de mercado em **28 de maio de 2026**:
*   **Mercado de Ações:** O Ibovespa operou em queda de 0,39%, fechando aos 175.063 pontos, pressionado por perspectivas de taxas de juros mais restritivas. Ações sensíveis a juros como Itaú e Bradesco recuaram, enquanto a Petrobras fechou cotada a R$ 47,54 refletindo ruídos de acordos geopolíticos internacionais.
*   **Macroeconomia e Renda Fixa:** A taxa de inflação de curto prazo (IGP-M) registrou alta de 0,84% em maio, o que levou grandes instituições financeiras (como o Citi) a elevarem suas projeções da Taxa Selic para o encerramento do ano para 13,75%. Esse movimento valorizou os títulos de renda fixa atrelados aos juros reais e pressionou os ativos de risco.

### 2. Glossário de Conceitos Aprendidos
*   **RAG (Retrieval-Augmented Generation):** Técnica de arquitetura em IA que otimiza a resposta de um Large Language Model (LLM) consultando uma base de conhecimento externa confiável antes de gerar o texto final.
*   **Grounding (Ancoragem):** O processo de prender as respostas da IA estritamente às evidências extraídas dos documentos fornecidos pelo usuário, eliminando as chances de alucinação do modelo.
*   **Selic (Taxa Básica de Juros):** O principal instrumento de política monetária do Banco Central do Brasil usado para controlar a inflação. Afeta diretamente o rendimento de investimentos em Renda Fixa e o custo de crédito corporativo.
*   **Valuation e Múltiplos:** Indicadores matemáticos (como $P/L$ - Preço sobre Lucro, e $ROE$ - Retorno sobre Patrimônio Líquido) extraídos dos demonstrativos financeiros das empresas para avaliar se uma ação está cara ou barata no pregão.

### 3. Conjunto de Prompts Reutilizáveis para Revisão
Insira estes prompts no chat do seu NotebookLM para conduzir revisões periódicas do mercado sem precisar reconfigurar os links:

> **Prompt 1 (Análise Macroeconômica Semanal):**
> *"Com base exclusivamente nas tabelas do Trading Economics e nas notícias injetadas neste caderno, faça um resumo executivo em tópicos indicando qual é o patamar atual da inflação (IPCA/IGP-M) e da taxa Selic. Explique como esse cenário macro está impactando os fundos imobiliários e os títulos de Renda Fixa nesta semana."*

> **Prompt 2 (Raio-X de Volatilidade e Maiores Altas):**
> *"Consulte os dados raspados do ADVFN e do portfólio de ações. Liste quais foram os papéis que lideraram o volume ou registraram as maiores variações do pregão. Cruze esses movimentos com as últimas manchetes de negócios coletadas para justificar o motivo da oscilação desses ativos."*

> **Prompt 3 (Auditoria de Grounding e Troubleshooting):**
> *"Faça uma varredura nas fontes dinâmicas deste caderno e me diga se alguma URL apresentou mensagem de erro de carregamento, bloqueio por robô (Cloudflare) ou código inválido. Se houver, liste o link afetado para que eu faça a manutenção."*
