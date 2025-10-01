Explicação da Declaração de Tipos
# Interface User
```
interface User {
  id: number;
  name: string;
  age: number;
}

A interface pode ser usada em múltiplos lugares do código
Se a estrutura mudar, basta atualizar a interface em um lugar
```

# Tipagem do Array
```
const users: User[] = [...]

Define explicitamente que é um array de objetos do tipo User
Previne adicionar objetos com estrutura incorreta
Facilita detecção de erros em tempo de desenvolvimento
```

# Parâmetros da Função
```
function getNamesAboveAge(users: User[], minAge: number = 23): string[]

users: User[]: Garante que a função recebe um array de usuários válidos
minAge: number = 23: Parâmetro opcional com valor padrão, aumenta flexibilidade
: string[]: Define que o retorno é um array de strings (nomes)
```