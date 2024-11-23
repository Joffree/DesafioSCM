# DesafioSCM

## Descrição do Aplicativo

**Gerenciador de Pedidos** é um aplicativo web desenvolvido para facilitar a gestão de pedidos de produtos. Ele permite que os usuários solicitem produtos, consultem solicitações existentes, atualizem informações e excluam pedidos. O aplicativo possui uma interface amigável e intuitiva, com funcionalidades de filtro para facilitar a busca por pedidos específicos.

## Funcionalidades Principais

- **Solicitar Produto**: Permite adicionar novos pedidos com informações detalhadas como fornecedor, data, produto, quantidade, valor unitário e status.
- **Consultar Solicitação**: Exibe uma lista de pedidos existentes, permitindo filtrar por status e realizar ações de atualização e exclusão.
- **Atualizar Pedido**: Permite editar as informações de um pedido existente.
- **Excluir Pedido**: Permite remover um pedido da lista.

## Tecnologias Utilizadas

- **Frontend**: React.js, Axios, CSS
- **Backend**: Node.js, Express.js, File System (para armazenamento de dados em JSON)

## Manual de Execução

### Pré-requisitos

- Node.js e npm instalados no computador.
- Acesso à internet para baixar dependências.

### Passo a Passo para Executar o Aplicativo

1. **Clone o Repositório**

   Clone o repositório do projeto para o seu computador:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. **Instale as Dependências do Backend**

   Navegue até a pasta `backend` e instale as dependências:

   ```bash
   cd backend
   npm install
   ```

3. **Inicie o Servidor Backend**

   Execute o servidor backend:

   ```bash
   node server.js
   ```

   O servidor backend estará rodando na porta 5001.

4. **Instale as Dependências do Frontend**

   Abra um novo terminal, navegue até a pasta `frontend` e instale as dependências:

   ```bash
   cd frontend
   npm install
   ```

5. **Inicie o Servidor de Desenvolvimento do Frontend**

   Execute o servidor de desenvolvimento do React:

   ```bash
   npm start
   ```

   O servidor frontend estará rodando na porta 3000. O navegador abrirá automaticamente a aplicação.

6. **Acesse a Aplicação**

   Abra o navegador e acesse `http://localhost:3000` para visualizar e interagir com o aplicativo.

## Estrutura do Projeto

```plaintext
my-app/
├── backend/
│   ├── server.js
│   ├── orders.json
│   └── ...
├── frontend/
│   ├── public/
│   │   ├── BD112.jpg
│   │   ├── ProdutoList.json
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── App.js
│   │   ├── PedidoForm.js
│   │   ├── PedidoList.js
│   │   ├── index.css
│   │   └── ...
│   └── package.json
└── package.json
```

## Executando em uma Versão Antiga do Node.js

Para rodar o aplicativo em uma versão mais antiga do Node.js, você pode usar o Node Version Manager (nvm) para instalar e gerenciar diferentes versões do Node.js. Aqui estão os passos para fazer isso:

### Passo 1: Instalar o Node Version Manager (nvm)

#### No macOS/Linux

1. **Instale o nvm**:
   - Abra o terminal e execute o seguinte comando para instalar o nvm:
     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
     ```

2. **Carregue o nvm**:
   - Adicione o seguinte ao seu arquivo de configuração do shell (`~/.bashrc`, `~/.zshrc`, etc.):
     ```bash
     export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
     [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
     ```

3. **Reinicie o terminal** ou execute:
   ```bash
   source ~/.bashrc
   ```

#### No Windows

1. **Instale o nvm-windows**:
   - Baixe e instale o nvm-windows a partir do repositório oficial.

### Passo 2: Instalar e Usar uma Versão Antiga do Node.js

1. **Liste as versões disponíveis**:
   - Execute o seguinte comando para listar todas as versões disponíveis do Node.js:
     ```bash
     nvm ls-remote
     ```

2. **Instale a versão desejada**:
   - Escolha a versão que você deseja instalar (por exemplo, 14.17.0) e execute:
     ```bash
     nvm install 14.17.0
     ```

3. **Use a versão instalada**:
   - Para usar a versão instalada, execute:
     ```bash
     nvm use 14.17.0
     ```

4. **Verifique a versão do Node.js**:
   - Certifique-se de que a versão correta do Node.js está sendo usada:
     ```bash
     node -v
     ```

### Passo 3: Instalar Dependências e Executar o Aplicativo

1. **Navegue até a pasta `backend` e instale as dependências**:
   ```bash
   cd backend
   npm install
   ```

2. **Inicie o servidor backend**:
   ```bash
   node server.js
   ```

3. **Navegue até a pasta `frontend` e instale as dependências**:
   ```bash
   cd frontend
   npm install
   ```

4. **Inicie o servidor de desenvolvimento do React**:
   ```bash
   npm start
   ```

### Considerações Finais

Usar uma versão mais antiga do Node.js pode exigir ajustes nas dependências do projeto. Certifique-se de que todas as dependências são compatíveis com a versão do Node.js que você está usando. Se encontrar problemas de compatibilidade, você pode precisar atualizar ou substituir algumas dependências.
