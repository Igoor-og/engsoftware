# 🧮 Calculadora Python & Web — Igor Almeida

![Dark Mode](https://img.shields.io/badge/Theme-Dark%20%26%20Red%20Accents-red)
![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-3178c6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8.0-646cff?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

Uma calculadora moderna, minimalista e responsiva desenvolvida com foco em **UI/UX**, **código limpo** e **didática em programação**. O projeto reúne uma aplicação web completa com tema escuro e detalhes em vermelho e um script modular em Python voltado para estudantes e iniciantes na área de tecnologia.

---

## 🌟 Funcionalidades

- **4 Operações Básicas:** Adição (`+`), Subtração (`-`), Multiplicação (`*` / `×`) e Divisão (`/` / `÷`).
- **Prevenção de Falhas Matemáticas:** Tratamento seguro contra divisão por zero e validação de tipos de dados numéricos.
- **Histórico de Cálculos:** Persistência automática no armazenamento local (`localStorage`) do navegador, permitindo copiar ou reutilizar resultados anteriores com um clique.
- **Design System Minimalista:**
  - Interface em **Dark Theme** com acentos vibrantes em **vermelho carmesim**.
  - **Botões Grandes e Ergonômicos:** Facilidade de toque em smartphones e excelente usabilidade no computador.
  - Suporte completo ao teclado físico (`0-9`, `+`, `-`, `*`, `/`, `Enter`, `Backspace`, `Escape`).
- **Simulador Interativo do Terminal Python:** Permite ao estudante visualizar passo a passo como o Python lê entradas com `input()`, converte dados e executa cada função.
- **Script Python Independente:** Código Python limpo, documentado com *docstrings* e pronto para rodar em qualquer terminal.

---

## 🛠️ Tecnologias Utilizadas

### Aplicação Web
- **React 19** & **TypeScript**
- **Vite** (Build Tool de alta performance)
- **Tailwind CSS v4** (Estilização utilitária e responsiva)
- **Lucide React** (Ícones modernos e leves)

### Backend / Lógica de Programação
- **Python 3.10+**
- Estruturas de controle de fluxo (`while`, `if/elif/else`, `try/except`)
- Funções puras e modulares com anotações de tipo (*Type Hints*)

---

## 🚀 Como Executar o Projeto

### 1. Executando o Script em Python no Terminal

Caso queira rodar apenas a calculadora em Python no seu computador:

```bash
# Certifique-se de ter o Python 3 instalado
python --version

# Execute o script da calculadora
python calculadora.py
```

### 2. Executando a Aplicação Web Interativa

Para rodar a interface web com histórico local e simulador integrado:

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/calculadora-python-web.git

# 2. Acesse a pasta do projeto
cd calculadora-python-web

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Abra o seu navegador e acesse: `http://localhost:3000`

---

## 📂 Estrutura do Projeto

```text
├── calculadora.py               # Script puro em Python para rodar no terminal
├── index.html                   # Entry point HTML com metadados e SEO
├── src/
│   ├── App.tsx                  # Componente principal e roteamento de abas
│   ├── main.tsx                 # Ponto de entrada do React
│   ├── types.ts                 # Interfaces e tipos TypeScript
│   ├── pythonCode.ts            # Código Python e explicações didáticas
│   ├── hooks/
│   │   └── useCalculationHistory.ts  # Gerenciamento de histórico no localStorage
│   └── components/
│       ├── Calculator.tsx       # Interface da calculadora com botões grandes
│       ├── HistoryPanel.tsx     # Painel de histórico de cálculos recentes
│       ├── PythonGuide.tsx      # Guia de estudo e exibição do código Python
│       ├── PythonSimulator.tsx  # Terminal interativo para simulação didática
│       └── Footer.tsx           # Rodapé minimalista com links oficiais
├── package.json
└── README.md
```

---

## 🧠 Como Funciona a Lógica em Python

1. **Entrada de Dados (`input()`):** O terminal solicita que o usuário selecione a operação e digite dois números.
2. **Conversão de Tipos (`float()`):** Os textos digitados são convertidos para números de ponto flutuante, aceitando vírgula ou ponto decimal.
3. **Decisão Lógica (`if / elif / else`):** O sistema identifica a operação escolhida e direciona a execução para a função correspondente (`somar`, `subtrair`, `multiplicar` ou `dividir`).
4. **Tratamento de Exceções (`try / except`):** Impede que o programa trave caso o usuário digite letras ou divida por zero.
5. **Histórico em Memória:** Uma lista `historico = []` acumula as contas da sessão via `.append()`.

---

## 👨‍💻 Autor

Desenvolvido por **Igor Almeida**.

- 🌐 **Website:** [igoralmeida.online](https://igoralmeida.online)
- 📸 **Instagram:** [@igoralmeidall](https://instagram.com/igoralmeidall)

---

## 📄 Licença

Este projeto está sob a licença [MIT](./LICENSE) — sinta-se à vontade para utilizar, estudar e aprimorar o código!
