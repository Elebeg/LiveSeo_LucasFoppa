/* 
* VALIDAÇÃO DO FORMULÁRIO
* Pego o form pelo ID pra poder interceptar o submit e fazer validação customizada
*/
const form = document.getElementById('cadastroForm');

// Intercepto o evento de submit
form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (form.checkValidity()) {
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value
        };

        // Em produção, aqui eu faria um fetch/axios pro backend (prefiro axios)
        console.log('Dados do formulário:', formData);
        alert('Cadastro realizado com sucesso! (Em produção, os dados seriam enviados ao servidor e persistidos em um banco de dados)');
        form.reset();
    } else {
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
            firstInvalid.focus();
        }
    }
});

/* 
* Adiciono validação quando o usuário sai do campo (chamei de blur o evento)
* Só valido se o campo não tá vazio, senão fica mostrando erro antes
* mesmo do usuário começar a digitar
*/
const inputs = form.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value !== '') {
            this.checkValidity();
        }
    });
});