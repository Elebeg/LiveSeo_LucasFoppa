# teste2

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


📂 Organização do Código

Organizei o projeto separando cada parte por responsabilidade:

public/ → arquivos estáticos (como index.html e favicon).

src/ → onde está a aplicação Vue. Dentro dele:

assets/ → estilos e imagens.

components/ → cada parte da tela que pode ser reutilizada.

App.vue → componente raiz que junta tudo.

main.js → ponto de entrada que inicializa a aplicação.

Essa separação deixa o código mais limpo, fácil de escalar e manter. Se precisar trocar um pedaço, eu sei exatamente onde ir.

⚙️ Uso do Vue.js

Sim, usei Vue.js e quebrei a aplicação em componentes.
Isso ajuda a deixar o código modular, reaproveitável e cada parte com sua própria responsabilidade.

🔹 Componentes criados


### App.vue
```
É o “pai” da aplicação. Ele orquestra tudo, importando e exibindo os outros componentes.
```


### TodoInput.vue
```
Responsável pela entrada de novas tarefas.

Tem um input e um botão.

Emite eventos pro App.vue sempre que o usuário adiciona algo.
```

### TodoList.vue
```
Lista todas as tarefas já criadas.

Recebe a lista via props.

Renderiza cada item chamando o componente TodoItem.vue.
```

### TodoItem.vue
```
Representa uma única tarefa.
Mostra o texto.
Permite marcar como concluída.
Pode emitir evento pra deletar ou editar o item.
```