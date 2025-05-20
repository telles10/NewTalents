document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (!form.checkValidity()) {
            event.stopPropagation();
        } else {
            // Add loading state to button
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Entrando...';
            
            // Simulate login - Replace with actual login logic
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
        
        form.classList.add('was-validated');
    });

    // Add password visibility toggle
    const passwordInput = document.getElementById('password');
    const togglePassword = document.createElement('button');
    togglePassword.type = 'button';
    togglePassword.className = 'btn btn-link position-absolute end-0 top-50 translate-middle-y text-primary pe-3';
    togglePassword.innerHTML = '<i class="bi bi-eye"></i>';
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
    });
    passwordInput.parentElement.appendChild(togglePassword);
});