# 📚 Documentação do Backend - API de Usuários

## 🗂️ Estrutura de Arquivos

```
src/
├── main.ts                    # Inicialização da aplicação
├── app.module.ts              # Módulo raiz
│
└── users/                     # Módulo de usuários
    ├── users.module.ts        # Configuração do módulo
    ├── users.controller.ts    # Endpoints HTTP
    ├── users.service.ts       # Regras de negócio
    │
    ├── entities/              # Modelos de dados
    │   └── user.entity.ts     # Entidade User
    │
    └── dto/                   # Data Transfer Objects
        ├── create-user.dto.ts # Validação de criação
        └── update-user.dto.ts # Validação de atualização
```

---

## 🎯 Decisões de Arquitetura

### **Padrão Modular**

Organizei o código seguindo o padrão de módulos por funcionalidade do NestJS. Cada feature (neste caso, Users) fica encapsulada em seu próprio módulo, facilitando a manutenção e escalabilidade.

### **Separação de Responsabilidades**

Apliquei o princípio de Single Responsibility:

- **Controller**: Responsável apenas por receber requisições HTTP e delegar ao service
- **Service**: Contém toda a lógica de negócio e manipulação de dados
- **Entity**: Define a estrutura do modelo de dados
- **DTOs**: Validam e tipam os dados de entrada

---

## 📄 Descrição dos Arquivos

### **main.ts**

Ponto de entrada da aplicação. Aqui inicializo o servidor, habilito CORS para permitir comunicação com o frontend, e configurei o ValidationPipe global para validação automática dos DTOs.

```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,           // Remove propriedades não definidas nos DTOs
  forbidNonWhitelisted: true, // Retorna erro se houver props extras
  transform: true,            // Transforma tipos automaticamente
}));
```

### **app.module.ts**

Módulo raiz que centraliza a importação de todos os feature modules. Mantém a estrutura limpa e modular.

### **users.module.ts**

Configura o módulo de usuários, registrando o controller e o service. O service é exportado caso outros módulos precisem utilizá-lo (seguindo o padrão de injeção de dependências do NestJS).

### **users.controller.ts**

Define os endpoints da API REST. Utilizei os decorators do NestJS para mapear as rotas:

- `@Get()` para listar e buscar usuários
- `@Post()` para criação (retorna 201)
- `@Put()` para atualização
- `@Delete()` para remoção (retorna 204)

Todos os métodos são assíncronos para manter consistência e preparar o código para operações com banco de dados.

### **users.service.ts**

Contém a lógica de negócio. Por enquanto, os dados estão em memória (array), mas a estrutura já está preparada para integração com ORM (TypeORM ou Prisma).

Implementei tratamento de erros com `NotFoundException` para casos onde o usuário não é encontrado.

### **user.entity.ts**

Representa o modelo de dados do usuário. Optei por usar uma classe ao invés de interface porque:

- Permite instanciar objetos: `new User(...)`
- Facilita integração com ORMs
- Pode conter métodos e lógica interna

O constructor aceita `Partial<User>` para facilitar a criação de instâncias com spread operator.

### **DTOs (create-user.dto.ts e update-user.dto.ts)**

Utilizei class-validator para validação de dados de entrada:

- `CreateUserDto`: Campos obrigatórios com validações (email válido, nome mínimo 3 caracteres)
- `UpdateUserDto`: Todos os campos opcionais para permitir atualização parcial

Isso garante que dados inválidos sejam rejeitados antes de chegarem ao service.

---

## 🔄 Fluxo de uma Requisição

```
Cliente → Controller → Service → Entity → Response
         (rotas)     (lógica)   (dados)
```

**Exemplo: POST /users**

1. Controller recebe a requisição
2. ValidationPipe valida o CreateUserDto
3. Controller chama `usersService.create(dto)`
4. Service cria uma nova instância de User
5. Service adiciona ao array (futuramente, salvará no banco)
6. Retorna o usuário criado com status 201

---

## ⚡ Por que Async/Await?

Mesmo trabalhando com dados em memória, implementei todos os métodos como assíncronos. Isso porque:

- **Preparação para banco de dados**: Quando integrar com TypeORM/Prisma, só preciso trocar a implementação
- **Consistência**: Mantém o mesmo padrão em toda a aplicação
- **Boas práticas**: Operações I/O devem ser não-bloqueantes

---

## 🧪 Endpoints Disponíveis

| Método | Rota | Descrição | Status de Sucesso |
|--------|------|-----------|-------------------|
| GET | `/users` | Lista todos os usuários | 200 |
| GET | `/users/:id` | Busca usuário por ID | 200 |
| POST | `/users` | Cria novo usuário | 201 |
| PUT | `/users/:id` | Atualiza usuário | 200 |
| DELETE | `/users/:id` | Remove usuário | 204 |

---

## 🚀 Próximos Passos

Para evoluir esta API, eu sugeriria:

1. **Integração com banco de dados** (TypeORM com PostgreSQL ou Prisma)
2. **Autenticação JWT** para proteger as rotas
3. **Paginação** no endpoint GET /users
4. **Testes unitários** para service e controller
5. **Documentação Swagger** para facilitar consumo da API
6. **Variáveis de ambiente** para configurações sensíveis

---

## 📦 Dependências Principais

```json
{
  "@nestjs/common": "^10.0.0",
  "@nestjs/core": "^10.0.0",
  "class-validator": "^0.14.0",
  "class-transformer": "^0.5.1"
}
```

---

## 🏃 Como Executar

```bash
# Instalar dependências
npm install

# Desenvolvimento (com hot reload)
npm run start:dev

# Produção
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3000`