# 🏥 App Health - Sistema de Acompanhamento de Saúde Pessoal e Familiar

[![React 19](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%26%20Auth-FFCA28?logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Uma plataforma web responsiva, intuitiva e completa para o monitoramento de saúde individual e acompanhamento compartilhado em grupo familiar em tempo real.

---

## 🌟 Funcionalidades Principais

### 💊 1. Gestão de Medicamentos & Previsão de Estoque
* **Agendamento Flexível de Doses:** Suporte a uso diário (1x, 2x, 3x ao dia), **dias específicos da semana** (ex: *apenas aos Domingos*, *Seg, Qua, Sex*) e **dias alternados** (ex: *dia sim/dia não (48h)*, *a cada 3 dias*, *semanal*).
* **Busca via API ANVISA / OpenFDA:** Autocomplete em tempo real para preenchimento de dosagem recomendada.
* **Previsão Inteligente de Estoque:** Cálculo automático da data exata de término do estoque com alertas visuais para medicamentos próximos ao fim.
* **Registro de Ingestão:** Histórico de doses tomadas com horário e observações.

### 👨‍👩‍👧‍👦 2. Grupo Familiar Multi-Membro (Código de 6 Dígitos)
* **Conexão Instantânea em Nuvem:** Criação e entrada em grupos familiares via código PIN numérico de 6 dígitos (ex: `842917`).
* **Visão Multi-Membro:** Barra de seleção visual (`MemberSelectorBar`) para alternar a visão do prontuário entre familiares (`[👨 Mateus]`, `[👩 Ana]`, `[👵 Maria - Mãe]`).
* **Sincronização em Tempo Real:** Sincronização automática via `onSnapshot` no Firebase Cloud Firestore — quando um familiar toma um remédio ou afere a pressão, todos os dispositivos atualizam instantaneamente.

### 📄 3. Exames, Laudos & Instruções de Preparo
* Visualização de PDFs de exames laboratoriais e de imagem.
* Guia de instruções detalhadas de preparo pré-exame (ex: tempo de jejum, consumo de água).

### 📅 4. Consultas Médicas & Calendário
* Agenda de consultas médicas com dados do doutor, especialidade, local e horário.
* Botão de direções e rotas do consultório/hospital.
* Opção de reagendamento direto.

### 🩸 5. Monitoramento de Sinais Vitais
* Gráfico dinâmico de 7 dias de **Pressão Arterial** (Sistólica / Diastólica).
* Leitura de **Frequência Cardíaca (bpm)**, **Glicemia (mg/dL)** e **Peso (kg)**.

### 🎨 6. Personalização de Cores & Temas Visuais
* 6 paletas de cores customizáveis com injeção dinâmica de CSS variables:
  * 🌿 **Verde Esmeralda** (Padrão Saúde)
  * 🌊 **Azul Oceano** (Clínico)
  * 💜 **Violeta Elegante** (Moderno)
  * 🌸 **Rosa Amora** (Suave)
  * 🍊 **Laranja Terracota** (Vibrante)
  * 🌙 **Modo Escuro (Slate)** (Fundo Escuro)

### 👁️ 7. Acessibilidade & Inclusão (a11y)
* 🔍 **Redimensionamento de Fonte:** Opções Normal (100%), Grande (+12%) e Extra Grande (+25%).
* 🌓 **Modo Alto Contraste:** Cores em contraste máximo WCAG AAA para baixa visão.
* 🔊 **Leitor de Resumo de Voz:** Síntese de fala em português (`pt-BR` Web Speech API) para leitura de compromissos.
* ⌨️ **Navegação por Teclado:** Suporte a foco visível (`focus-visible`) em todos os botões e formulários.

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
| :--- | :--- |
| **Front-end** | React 19, Vite, Lucide React (Ícones) |
| **Estilização** | Vanilla CSS (CSS Custom Variables Design System) |
| **Nuvem & Banco de Dados** | Google Firebase Cloud Firestore (Realtime DB) |
| **Autenticação** | Firebase Authentication (E-mail & Senha) |
| **APIs Integradas** | ANVISA & OpenFDA API, Web Speech API |

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* Node.js v18.0.0 ou superior
* NPM ou Yarn

### 1. Clonar o Repositório
```bash
git clone https://github.com/usuario/app-health.git
cd app-health
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Executar o Servidor de Desenvolvimento
```bash
npm run dev
```
O aplicativo estará disponível em `http://localhost:5173`.

### 4. Gerar Build de Produção
```bash
npm run build
```

---

## 📂 Estrutura de Pastas

```
app-health/
├── public/                 # Recursos estáticos e imagens
├── src/
│   ├── assets/             # Logos e ilustrações
│   ├── components/
│   │   ├── common/         # Componentes compartilhados (MemberSelectorBar, etc.)
│   │   └── modals/         # Modais (AddMedication, FamilyGroup, ThemeColor, Accessibility, etc.)
│   ├── context/
│   │   └── HealthContext.jsx # Gerenciamento de estado global e sincronização Cloud
│   ├── pages/              # Abas da aplicação (HomeTab, MedicationsTab, ExamsTab, ConsultationsTab, VitalsTab, ProfileTab)
│   ├── services/
│   │   ├── firebase.js     # Configuração e queries do Firestore & Auth
│   │   └── medicationApi.js # Integração com API ANVISA / OpenFDA
│   └── styles/
│       └── global.css      # Sistema de design tokens e temas CSS
├── package.json
└── README.md
```

---

## 📜 Licença
Este projeto é distribuído sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.
