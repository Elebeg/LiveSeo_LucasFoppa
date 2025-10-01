# Explicação do Funcionamento
A query é composta por três partes principais:
### SELECT id, name, email, created_at
Especifica quais colunas queremos recuperar da tabela

### FROM users
Indica de qual tabela queremos buscar os dados
Aqui estamos consultando a tabela users

### ORDER BY created_at DESC
```
ORDER BY: Cláusula que ordena os resultados com base em uma ou mais colunas
created_at: A coluna usada como critério de ordenação (data de criação)
DESC: decrescente, ou seja, do maior para o menor valor (ASC é padrão)
```

