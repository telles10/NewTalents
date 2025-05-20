document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value;
            const confirmar = document.getElementById('confirmarSenha').value;
            if (!email || !senha || !confirmar) {
                alert('Preencha todos os campos.');
                return;
            }
            if (senha !== confirmar) {
                alert('As senhas não coincidem.');
                return;
            }
            // Aqui você pode adicionar lógica para enviar os dados ao backend
            alert('Cadastro realizado com sucesso!');
            form.reset();
        });
    }
});