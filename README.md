# 🎭 Testes E2E com Playwright - SauceDemo

Suíte de testes automatizados end-to-end para validação completa do fluxo de compras da aplicação [SauceDemo](https://www.saucedemo.com/).

---

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Configuração](#-configuração)
- [Executando os Testes](#-executando-os-testes)
- [Decisões Arquiteturais](#-decisões-arquiteturais)
- [Fixtures e Page Objects](#-fixtures-e-page-objects)
- [Convenções e Boas Práticas](#-convenções-e-boas-práticas)
- [Troubleshooting](#-troubleshooting)
- [Qualidade de Código](#-qualidade-de-código)
- [Suporte](#-suporte)

---

## 🎯 Sobre o Projeto

Este projeto implementa testes E2E automatizados com Playwright, cobrindo:

- ✅ Login e autenticação
- ✅ Navegação e filtragem de produtos
- ✅ Visualização de detalhes dos produtos
- ✅ Adição de produtos ao carrinho
- ✅ Processo de checkout completo
- ✅ Validação de informações e confirmação de compra

---

## 🛠️ Tecnologias Utilizadas

- **[Playwright](https://playwright.dev/)** - Framework de automação de testes
- **Node.js** (v16+)
- **JavaScript/ES6+**
- **Yarn** - Gerenciador de pacotes
- **ESLint** - Linter para qualidade de código
- **Prettier** - Formatação de código
- **Faker.js** - Geração de dados de teste

---

## ✅ Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** v16 ou superior
- **Yarn** v1.22 ou superior 
- **Git** →

### Verificar instalação:

```bash
node --version
yarn --version
```

---

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/johnqueiroz/desafioQA.git
cd desafioQA
```

### 2. Instale as dependências

```bash
yarn install
```

### 3. Instale o Playwright com navegadores

```bash
yarn playwright install --with-deps
```

> ℹ️ Este comando instala o Playwright, todos os navegadores e dependências do sistema automaticamente.

**Opcional:** Instalar navegadores específicos:

```bash
yarn playwright install chromium
yarn playwright install firefox
yarn playwright install webkit
```

---

## 📁 Estrutura do Projeto

```
desafioQA/
│
├── tests/
│   ├── e2e/
│   │   ├── buy-flow.spec.js          # Fluxo completo de compra
│   │   ├── cart.spec.js              # Testes do carrinho
│   │   ├── filters.spec.js           # Testes de filtros
│   │   ├── login.spec.js             # Testes de autenticação
│   │   └── products.spec.js          # Validação de produtos
│   │
│   └── index.js                      # Fixtures customizadas
│   │
│   └── pages/
│       ├── CartPage.js
│       ├── CheckoutCompletePage.js
│       ├── CheckoutFinishPage.js
│       ├── CheckoutPage.js
│       ├── LoginPage.js
│       ├── ProductItemPage.js
│       ├── ProductsPage.js
│       └── Sidebar.js
│
├── utils/
│   ├── fakerData.js                  # Gerador de dados com Faker
│   ├── products.js                   # Dados dos produtos
│   ├── routes.js                     # URLs da aplicação
│   └── users.js                      # Usuários de teste
│
├── .eslintrc.js                      # Configuração ESLint
├── .prettierrc                       # Configuração Prettier
├── playwright.config.js              # Configuração Playwright
└── package.json
```

---

## ⚙️ Configuração

### ESLint e Prettier

O projeto está configurado com ESLint e Prettier para garantir qualidade e consistência do código.

#### Comandos disponíveis:

```bash
# Verificar problemas de lint
yarn lint

# Corrigir problemas automaticamente
yarn lint:fix

# Formatar código
yarn format

# Verificar formatação
yarn format:check
```

### Variáveis de Ambiente

Não utilizei variáveis de ambiente neste projeto, pois não há dados sensíveis que necessitem ser ocultados.

---

## 🚀 Executando os Testes

### Todos os testes (modo headless)

```bash
yarn test
```

### Modo visual (headed)

```bash
yarn test:headed
```

ou

```bash
yarn playwright test --headed
```

### Via extensão do VS Code (⭐ Recomendado)

1. Instale a extensão **Playwright Test for VSCode**
2. No arquivo de teste, clique com botão direito no ícone verde ▶️
3. Selecione a opção desejada (Run Test, Debug Test, etc.)

### Visualizar relatório

```bash
yarn playwright show-report
```

### UI Mode (modo interativo)

```bash
yarn test:ui
```

---

## 🏗️ Decisões Arquiteturais

### 📋 Configuração Inicial

Após criar o repositório no GitHub e clonar localmente, executei:

```bash
yarn playwright install --with-deps
```

Este comando simplifica o setup inicial instalando o Playwright, navegadores e todas as dependências do sistema de uma só vez.

### 🔧 Arquitetura de Fixtures

Implementei **fixtures modulares e separadas** desde o início, seguindo o padrão recomendado pela documentação oficial do Playwright.

**Vantagens:**

- ✅ **Separação de responsabilidades**: Cada fixture gerencia um Page Object específico
- ✅ **Escalabilidade**: Novos componentes podem ser adicionados sem impacto nos existentes
- ✅ **Manutenibilidade**: Alterações são isoladas
- ✅ **Best practices**: Alinhado com padrões da comunidade Playwright

### 🎯 Estratégia de Testes

#### Princípio de Responsabilidade Única

Os testes de login validam **exclusivamente o processo de autenticação**. Validações adicionais (navegação, estado da aplicação) são delegadas a outras suítes de teste.

#### Data-Driven Testing

Cenários similares foram implementados com **testes parametrizados** usando loops:

```javascript
const successCases = [
  { username: 'standard', user: users.standard },
  { username: 'problem', user: users.problem },
  // ...
]

for (const { username, user } of successCases) {
  test(`deve validar login - user ${username}`, async () => {
    // teste
  })
}
```

**Vantagens:**
- Reduz verbosidade e duplicação
- Mantém consistência entre cenários similares
- Facilita adição de novos casos
- Permite separação futura se necessário

#### Isolamento de Cenários de Erro

Cenários de erro (ex: usuário bloqueado) permanecem isolados em testes dedicados, pois possuem:
- Fluxo diferente dos casos de sucesso
- Assertions específicas
- Setup/teardown distintos

#### Padrão Aplicado

A mesma estratégia foi replicada em:
- ✅ **Testes de filtros**: Ordenação (A-Z, Z-A, preço)
- ✅ **Visualização de produtos**: Detalhes dos 6 produtos
- ✅ **Adição ao carrinho**: Validação dos 6 produtos
- ✅ **Compra completa**: Fluxo E2E dos 6 produtos

---

## 🔧 Fixtures e Page Objects

### Fixtures Disponíveis

```javascript
import { test } from './fixtures'

test('exemplo', async ({ 
  loginPage,           // Página de login
  productsPage,        // Lista de produtos
  productItemPage,     // Detalhes do produto
  cartPage,            // Carrinho
  sideBar,             // Menu lateral
  checkoutPage,        // Checkout - informações
  checkoutFinishPage,  // Checkout - revisão
  checkoutCompletePage // Checkout - confirmação
}) => {
  // seu teste aqui
})
```

### Exemplo de Uso

```javascript
// Login
await loginPage.visit()
await loginPage.doLogin('standard_user', 'secret_sauce')

// Produtos
await productsPage.sortFilter('lohi')
await productsPage.clickProduct(0)

// Carrinho
await cartPage.validateCart(0)
await cartPage.checkout.click()

// Menu lateral
await sideBar.clickMenuItem('Logout')
```

---

## 📐 Convenções e Boas Práticas

### 1. Nomenclatura de Testes

```javascript
test('deve validar o fluxo de login com sucesso - user standard', async () => {
  // ...
})
```

### 2. Organização com test.step

```javascript
await test.step('acessar página e fazer login', async () => {
  // ações do passo
})
```

### 3. Assertions Claras

```javascript
await expect(page).toHaveURL(routes.inventory)
await expect(element).toBeVisible()
await expect(element).toHaveText('texto esperado')
```

### 4. Hooks de Setup e Teardown

```javascript
test.beforeEach('setup', async ({ loginPage }) => {
  await loginPage.visit()
})

test.afterEach('cleanup', async ({ sideBar }) => {
  await sideBar.clickMenuItem('Logout')
})
```

### 5. Data-Driven Testing

```javascript
const testCases = [
  { user: 'standard', expected: 'success' },
  { user: 'locked', expected: 'error' },
]

for (const { user, expected } of testCases) {
  test(`validar ${user}`, async () => {
    // ...
  })
}
```

---

## 🐛 Troubleshooting

### Erro: "Browser not found"

```bash
yarn playwright install
```

### Testes falhando intermitentemente

Aumente o timeout no `playwright.config.js`:

```javascript
timeout: 60000
```

### Problemas com seletores

Use o Playwright Inspector:

```bash
yarn playwright test --debug
```

### Limpar cache do Playwright

```bash
yarn playwright clean
yarn playwright install
```

### Problemas com ESLint/Prettier

```bash
# Reinstalar dependências
yarn install --force

# Limpar cache do ESLint
yarn eslint --cache-clear

# Verificar formatação
yarn format:check
```

---

## 🔍 Qualidade de Código

### Verificação antes de commit

```bash
# Verificar lint
yarn lint

# Verificar formatação
yarn format:check

# Executar testes
yarn test
```

### ESLint

O projeto utiliza ESLint para:
- Identificar problemas no código
- Aplicar convenções do time
- Prevenir bugs comuns

### Prettier

Formatação automática garantindo:
- Indentação padronizada
- Uso de aspas simples
- Linha com máximo de 80 caracteres

---

## 📊 Scripts Disponíveis

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "report": "playwright show-report"
  }
}
```

---

## 📞 Suporte

Para dúvidas ou problemas:

- 📚 [Documentação Oficial do Playwright](https://playwright.dev/)
- 💬 Entre em contato

---
