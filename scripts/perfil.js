document.addEventListener('DOMContentLoaded', function() {
    if (!UserAuth.isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    const userData = UserAuth.getUserData();
    
    // Update profile information
    document.querySelector('.profile-avatar img').src = userData.fotoPerfil;
    document.querySelector('.profile-details h1').innerHTML = 
        `${userData.nome} <i class="bi bi-patch-check-fill text-primary"></i>`;
    document.querySelector('.username').textContent = `@${userData.username}`;
    
    // Update statistics
    const stats = document.querySelectorAll('.stat-value');
    stats[0].textContent = userData.cursos.total;
    stats[1].textContent = userData.cursos.concluidos;
    stats[2].textContent = userData.cursos.certificados;
    
    // Update personal information
    document.querySelector('#sobre .info-item:nth-child(1) span').textContent = userData.email;
    
    // Handle tab switching
    const tabs = document.querySelectorAll('[role="tab"]');
    tabs.forEach(tab => {
        tab.addEventListener('click', changeTabs);
    });
});

function changeTabs(e) {
    const target = e.target;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;
    const tabId = target.getAttribute('aria-controls');

    // Remove all current selected tabs
    parent.querySelectorAll('[aria-selected="true"]').forEach(t => {
        t.setAttribute('aria-selected', false);
        t.classList.remove('active');
    });

    // Set this tab as selected
    target.setAttribute('aria-selected', true);
    target.classList.add('active');

    // Hide all tab panels
    grandparent.querySelectorAll('[role="tabpanel"]').forEach(p => {
        p.hidden = true;
    });

    // Show the selected panel
    document.getElementById(tabId).hidden = false;
}