# Primeiras verificações que eu faria:

### Verificar o Network no DevTools (F12)

```
Olharia a aba Network para ver quanto tempo cada requisição está levando
Verificaria se alguma chamada à API está demorando muito (ex: POST /login)
Checaria o tamanho dos arquivos sendo carregados (JS, CSS, imagens)
```

### Analisar o Console
```
Verificaria se há erros de JavaScript que possam estar travando a execução
Checaria warnings ou logs excessivos
```

### Performance do Frontend

```
Usaria a aba Performance do DevTools
Verificaria se há componentes renderizando desnecessariamente
Checaria se há bibliotecas muito pesadas sendo carregadas
```

### Verificar o Backend

```
Usaria algum tipo de controle de monitoramento como o prometheus
verificaria por ele lentidão de query´s ou algo que esteja causando lentidão
```

## Duas possíveis soluções:
1: Otimizar Bundle do Frontend
 - carregar apenas arquivos necessários como por exemplo na pagina de login
 - carregaria somente os componentes necessarios para a pagina de login e cadastro

Solução 2: Otimizar a Query do Backend

 - ao inves de fazer uma query gigante, iria otimizar e buscar somente o necessario

async login(email: string) {
  const user = await this.userRepository.findOne({
    where: { email },
    relations: ['posts', 'comments', 'followers', 'following'] 
  });
}

 - nessa maneira aqui eu so faço a query com o essencial do login
async login(email: string) {
  const user = await this.userRepository.findOne({
    where: { email },
    select: ['id', 'email', 'password', 'name'] 
  });
}