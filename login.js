
localStorage.setItem('username', 'krishna');
localStorage.setItem('password', 'krishna');

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');


    if (username === storedUsername && password === storedPassword) {
        alert('Login successful!');
        window.location.href = 'home-page.html'; 
    } 
    else {
        alert('Invalid username or password. Please try again!');
    }
});

