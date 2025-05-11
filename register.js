document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const notification = document.getElementById('notification');

    // Load existing users from localStorage
    const getUsers = () => {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    };

    // Save a new user to localStorage
    const saveUser = (user) => {
        const users = getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    };

    // Check if email already exists
    const emailExists = (email) => {
        const users = getUsers();
        return users.some(user => user.email === email);
    };

    // Validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validate password strength (at least 8 characters, 1 uppercase, 1 number)
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    // Clear error messages
    const clearErrors = () => {
        emailError.textContent = '';
        emailError.style.display = 'none';
        passwordError.textContent = '';
        passwordError.style.display = 'none';
        confirmPasswordError.textContent = '';
        confirmPasswordError.style.display = 'none';
        notification.textContent = '';
        notification.className = 'notification';
    };

    // Show notification
    const showNotification = (message, type) => {
        notification.textContent = message;
        notification.className = `notification ${type}-notification`;
        setTimeout(() => {
            notification.textContent = '';
            notification.className = 'notification';
        }, 3000);
    };

    // Form submission handler
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        let isValid = true;

        // Validate email
        if (!validateEmail(email)) {
            emailError.textContent = 'Please enter a valid email address.';
            emailError.style.display = 'block';
            isValid = false;
        } else if (emailExists(email)) {
            emailError.textContent = 'This email is already registered.';
            emailError.style.display = 'block';
            isValid = false;
        }

        // Validate password
        if (!validatePassword(password)) {
            passwordError.textContent = 'Password must be at least 8 characters long, contain 1 uppercase letter, and 1 number.';
            passwordError.style.display = 'block';
            isValid = false;
        }

        // Validate confirm password
        if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            confirmPasswordError.style.display = 'block';
            isValid = false;
        }

        // If all validations pass, save the user and redirect
        if (isValid) {
            const user = {
                email: email,
                password: password,
                name: document.getElementById('name').value.trim()
            };
            saveUser(user);
            showNotification('Registration successful, redirecting to login page', 'success');
            registerForm.reset();
            // Redirect to login page after 3 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        } else {
            showNotification('Please fix the errors and try again.', 'error');
        }
    });
});