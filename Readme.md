# Pizzaria Tózas

## Descrição

Projeto fullstack de uma pizzaria com frontend em React e backend em Laravel.  
Inclui autenticação com Laravel Breeze (React), carrinho de compras, temas, internacionalização e backend com MySQL.

---
HOME MENU
![1](https://github.com/bbfmc22/pizzaria-fullstack/blob/main/Photo1HomeMenu.png)

WHITE MENU
![3](https://github.com/bbfmc22/pizzaria-fullstack/blob/main/Photo3MenuWhite.png)

DARKMODE MENU
![2](https://github.com/bbfmc22/pizzaria-fullstack/blob/main/Photo2MenuDark.png)

CONFIRM ORDER
![4](https://github.com/bbfmc22/pizzaria-fullstack/blob/main/Photo4Confirm.png)

PAYMENT
![5](https://github.com/bbfmc22/pizzaria-fullstack/blob/main/Photo5Payment.png)

PAYMENT CONFIRM
![6](https://github.com/bbfmc22/pizzaria-fullstack/blob/main/Photo6PaymentConfirm.png)
---

## Tecnologias / Dependências usadas

### Backend (Laravel)

- PHP 8.x  
- Laravel 10.x  
- Composer  
- MySQL  
- Laravel Breeze (React stack) para autenticação  
- Laravel Sanctum (para autenticação via API e cookies)  
- `.env` configurado para conexão com base de dados  

### Frontend (React)

- React 18+  
- React Router DOM  
- Axios (para comunicação API)  
- Vite (bundler e dev server)  
- CSS modularizado (ex: `LoginRegister.css`)  
- Context API (AuthContext, CartContext, ThemeContext)  
- React hooks (useState, useContext, useEffect)  
- Outros: Framer Motion (para animações), ToggleSwitch component  

---

## Passos para executar

### 1. Backend Laravel

1. Abrir terminal na pasta backend (`pizzaria-backend`):

   ```bash
   cd path/to/pizzaria-backend
   ```

2. Instalar dependências Laravel:

   ```bash
   composer install
   ```

3. Criar ficheiro `.env` (copiar de `.env.example`) e configurar dados da base de dados MySQL:

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=pizzaria
   DB_USERNAME=root
   DB_PASSWORD=sua_senha
   ```

4. Gerar chave da aplicação Laravel:

   ```bash
   php artisan key:generate
   ```

5. Executar migrações para criar tabelas:

   ```bash
   php artisan migrate
   ```

6. Executar servidor backend:

   ```bash
   php artisan serve
   ```

Servidor Laravel estará ativo em:  
`http://localhost:8000`

---

### 2. Frontend React

1. Abrir terminal na pasta frontend (ex: `pizzaria-frontend`):

   ```bash
   cd path/to/pizzaria-frontend

2. Instalar dependências npm:

   ```bash
   npm install
   ```

3. Executar servidor de desenvolvimento (Vite):

   ```bash
   npm run dev
   ```

Servidor frontend estará ativo em:  
`http://localhost:5173`

---

### 3. Configurações adicionais para autenticação

- Laravel Sanctum usa cookies para autenticação.  
- No frontend, garantir que o axios está configurado para enviar cookies (`withCredentials: true`).  
- No Laravel, no arquivo `config/cors.php`, permitir origem do frontend (`http://localhost:5173`) e permitir cookies.

Exemplo configuração CORS em `config/cors.php`:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],

'allowed_methods' => ['*'],

'allowed_origins' => ['http://localhost:5173'],

'allowed_headers' => ['*'],

'supports_credentials' => true,
```

---

### 4. Testar API

Use Postman ou similar para testar rotas de login, register, logout e obter usuário.

URLs base da API:

```
POST http://localhost:8000/api/login
POST http://localhost:8000/api/register
POST http://localhost:8000/api/logout
GET  http://localhost:8000/api/user
```

---

## Notas

- As rotas React (login, register, home, menu) estão configuradas via React Router.  
- Os estilos CSS estão modularizados e importados em componentes (ex: `LoginRegister.css`).  
- O backend Laravel serve a API, enquanto o frontend React roda no Vite dev server.  
- Para produção, será necessário configurar build e deploy do frontend e backend.
