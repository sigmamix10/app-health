# 📖 Documentação Técnica & Manual do Usuário - App Health

Esta documentação fornece uma explicação aprofundada da arquitetura de software, modelo de dados do Firebase Firestore, algoritmo de agendamento de medicamentos, sistema de acessibilidade e guia de uso da plataforma **App Health**.

---

## 📐 1. Arquitetura do Sistema

```
 ┌─────────────────────────────────────────────────────────┐
 │                   INTERFACE DO USUÁRIO                  │
 │      React 19 + Vite (Dashboard Responsivo Fluid)       │
 └────────────────────────────┬────────────────────────────┘
                              │
 ┌────────────────────────────▼────────────────────────────┐
 │               GERENCIADOR DE ESTADO GLOBAL              │
 │                   (HealthContext.jsx)                   │
 └──────────────┬──────────────────────────┬───────────────┘
                │                          │
 ┌──────────────▼─────────────┐  ┌─────────▼──────────────┐
 │    FIREBASE FIRESTORE DB   │  │   APIs DE INTEGRAÇÃO   │
 │ (Coleção healthRecords &   │  │ (ANVISA, OpenFDA,      │
 │   familyGroups Realtime)   │  │  Web Speech API)       │
 └────────────────────────────┘  └────────────────────────┘
```

---

## 🗄️ 2. Modelo de Dados (Firestore Schemas)

### Coleção `healthRecords` (Prontuário Individual)
Caminho no Firestore: `healthRecords/patient_<UID>`

```json
{
  "userProfile": {
    "name": "Mateus Ribeiro",
    "age": "34 anos",
    "location": "São Paulo, SP",
    "greeting": "Como está sua saúde hoje?",
    "avatar": "https://api.dicebear.com/...",
    "bloodType": "O +",
    "height": "1,82 m",
    "weight": "78,4 kg",
    "allergiesAndConditions": [
      { "text": "Alergia: Penicilina", "type": "danger" },
      { "text": "Hipertensão Leve", "type": "warning" }
    ],
    "emergencyContact": {
      "name": "Ana Ribeiro",
      "relation": "Esposa",
      "phone": "(11) 98765-4321"
    },
    "healthPlan": {
      "name": "Bradesco Saúde",
      "planType": "Nacional Flex",
      "number": "Nº 4279 8812 0031"
    }
  },
  "medications": [
    {
      "id": "med-1700000000",
      "name": "Vitamina D3",
      "dosage": "50.000 UI",
      "frequency": "Apenas aos Domingos",
      "frequencyType": "specific_days",
      "selectedDays": ["Dom"],
      "dailyDoseCount": 0.14,
      "currentStock": 10,
      "totalStock": 10,
      "time": "09:00",
      "status": "pending",
      "category": "active"
    }
  ],
  "intakeHistory": [
    {
      "id": "intake-1700000000",
      "medId": "med-1",
      "medName": "Losartana Potássica",
      "dosage": "50mg",
      "quantityTaken": 1,
      "timeTaken": "08:00",
      "dateTaken": "28/08/2026",
      "notes": "Tomado no café da manhã"
    }
  ],
  "vitals": {
    "bloodPressure": { "systolic": 120, "diastolic": 80, "unit": "mmHg", "status": "Estável e ideal" },
    "heartRate": { "value": 72, "unit": "bpm", "status": "Ritmo perfeito" },
    "weight": { "value": 78.4, "unit": "kg", "target": 75.0 },
    "glucose": { "value": 92, "unit": "mg/dL", "status": "Excelente controle" },
    "history7Days": [
      { "day": "Seg", "systolic": 118, "diastolic": 78 },
      { "day": "Ter", "systolic": 122, "diastolic": 82 }
    ]
  },
  "updatedAt": "2026-08-28T15:00:00.000Z"
}
```

---

### Coleção `familyGroups` (Grupo Familiar Multi-Membro)
Caminho no Firestore: `familyGroups/<PIN_6_DIGITOS>` (Ex: `familyGroups/842917`)

```json
{
  "code": "842917",
  "familyName": "Família Ribeiro",
  "creatorName": "Mateus Ribeiro",
  "createdAt": "2026-08-28T14:00:00.000Z",
  "members": [
    { "name": "Mateus Ribeiro", "role": "Criador / Administrador" },
    { "name": "Ana Ribeiro", "role": "Membro" },
    { "name": "Maria Ribeiro", "role": "Dependente / Familiar" }
  ],
  "membersHealthData": {
    "Mateus Ribeiro": { /* Objeto HealthPayload completo de Mateus */ },
    "Ana Ribeiro": { /* Objeto HealthPayload completo de Ana */ },
    "Maria Ribeiro": { /* Objeto HealthPayload completo de Maria */ }
  },
  "updatedAt": "2026-08-28T15:20:00.000Z"
}
```

---

## 🧮 3. Algoritmo de Agendamento e Previsão de Estoque

A previsão de término do estoque (`calculateStockPrediction`) calcula a taxa de consumo diário médio (`dailyDoseCount`) da seguinte forma:

| Tipo de Frequência (`frequencyType`) | Seleção do Paciente | Fórmula do `dailyDoseCount` | Exemplo de Estoque (30 un.) |
| :--- | :--- | :--- | :--- |
| `daily` | 1x ao dia / 2x ao dia | `1` ou `2` ou `3` | 30 / 1 = **30 dias** |
| `specific_days` | `[Dom]`, `[Seg]`, `[Qua]`, `[Sex]` | `Nº de dias marcados / 7` | Ex: 3/7 = 0,43 → 30 / 0,43 ≈ **70 dias** |
| `alternate_days` | Dia sim, dia não (48h) | `0.5` | 30 / 0,5 = **60 dias** |
| `alternate_days` | A cada 3 dias | `0.33` | 30 / 0,33 = **90 dias** |
| `alternate_days` | Semanalmente (a cada 7 dias) | `0.14` | 30 / 0,14 = **214 dias** |

---

## 👁️ 4. Diretrizes de Acessibilidade & Inclusão (a11y)

O aplicativo segue as diretrizes da **WCAG 2.1 AAA**:

1. **Redimensionamento de Texto:**
   * `.font-scale-large` altera `font-size: 112%` globalmente.
   * `.font-scale-xlarge` altera `font-size: 125%` globalmente.
2. **Modo Alto Contraste:**
   * `.high-contrast` redefine `--bg-app: #000000`, `--bg-card: #121212`, `--text-main: #FFFFFF` e elementos interativos em tom neon `#00E6B8`.
3. **Navegação por Teclado:**
   * Foco visível com anel de alto contraste em elementos focáveis (`focus-visible`).
4. **Síntese de Voz:**
   * Web Speech API (`SpeechSynthesisUtterance`) em voz nativa de português brasileiro.

---

## 👨‍💻 5. Guia de Desenvolvimento & Boas Práticas

* **Edição de Estado:** Sempre utilize as funções expostas pelo `useHealth()` para atualizar o estado e acionar a sincronização em nuvem.
* **Componentização:** Manter formulários dentro da pasta `src/components/modals/` e páginas na pasta `src/pages/`.
* **Verificação de Compilação:** Antes de enviar alterações, execute o comando:
  ```bash
  cmd /c npm run build
  ```
