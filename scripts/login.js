document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            
            // Simulate login - In real app, verify credentials first
            const userData = {
                nome: 'João Silva',
                email: email,
                username: email.split('@')[0],
                fotoPerfil: 'https://randomuser.me/api/portraits/men/32.jpg',
                cursos: {
                    total: 15,
                    concluidos: 8,
                    certificados: 12
                }
            };

            UserAuth.setUserData(userData);
            window.location.href = 'perfil.html';
        });
    }
});