## Fiz alguns comentários nos códigos para fortificar minhas escolhas, aqui vou colocar eles sem o contexto.
    HTML
    <!-- 
    O novalidate desabilita a validação padrão do browser porque vou
    fazer uma validação customizada no JavaScript. Isso me dá mais controle.
    -->

    <!-- 
    Coloquei logo aqui pra criar identidade e deixar claro
    que é um formulário da LiveSEO
    -->


    CSS
    /* 
    * CONTAINER PRINCIPAL
    * O card branco com sombra cria aquele efeito de "elevação" que deixa o design
    * mais moderno. Limitei a largura em 450px pra não ficar muito largo em telas
    * grandes, mas mantive width: 100% pra funcionar bem no mobile.
    */

    /* ESTADO DE FOCO */
    /* Quando o usuário clica no campo, mudo a cor da borda e adiciono uma sombra
    * suave pra dar feedback visual claro de onde ele está digitando.
    */

    /* VALIDAÇÃO VISUAL */
    /* Uso :not(:placeholder-shown) porque só quero validar depois que o usuário
    * começou a digitar algo. Se o campo tá vazio ainda, não mostro erro.
    */


    JS
    /* 
    * Adiciono validação quando o usuário sai do campo (chamei de blur o evento)
    * Só valido se o campo não tá vazio, senão fica mostrando erro antes
    * mesmo do usuário começar a digitar
    */

    /* 
    * VALIDAÇÃO DO FORMULÁRIO
    * Pego o form pelo ID pra poder interceptar o submit e fazer validação customizada
    */

    // Em produção, aqui eu faria um fetch/axios pro backend (prefiro axios)

# Organização de arquivos
escolhi organizar os arquivos por pastas referente ao seu tipo (html, css e js),
com isso consigo escalar e realizar manutenção no codigo de forma mais assertiva.

resolvi fazer um js simples apenas para interceptar o submit do html e fazer algumas mudanças personalizadas que seriam legal de ter em um formulario de cadastro.


# HTML
Utilizei tags semânticas apropriadas (<form>, <label>, <input>)
Estrutura hierárquica clara: container → header + form-container
Cada campo está envolvido em um <div class="form-group"> para facilitar o espaçamento e organização
Indicação visual de campos obrigatórios com <span class="required">*</span>

Validação HTML5 Nativa
Nome: required + minlength="3"
E-mail: type="email" + required
Senha: required + minlength="8" + pattern para exigir maiúsculas, minúsculas e números


# CSS
Flexbox no body para centralizar verticalmente e horizontalmente
Container com max-width: 450px para garantir legibilidade
Padding responsivo para mobile
:focus: Borda colorida + sombra suave para feedback visual
:invalid: Borda vermelha quando campo inválido (após interação)
:valid: Borda verde quando campo válido
:hover no botão: Elevação com transform e shadow
Mensagens de erro aparecem dinamicamente com display: none → display: block
Transições suaves (0.3s) em todos os elementos interativos
Cores semânticas: verde (sucesso), vermelho (erro), roxo (ação)

# JS
Inclui validação customizada que:
Previne envio do formulário se inválido
Foca no primeiro campo inválido
Exibe mensagens de erro contextuais
Valida em tempo real após o usuário sair do campo (blur)