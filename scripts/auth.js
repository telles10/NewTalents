class UserAuth {
    static setUserData(userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
    }

    static getUserData() {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    }

    static isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    static logout() {
        localStorage.removeItem('userData');
        localStorage.setItem('isLoggedIn', 'false');
        window.location.href = 'login.html';
    }
}