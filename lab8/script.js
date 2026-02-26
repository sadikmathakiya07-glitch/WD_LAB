document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === '' || password === '') {
        document.getElementById('errorMessage').textContent = 'Please fill in all fields.';
        return;
    }
    
    // Simulate sending data to backend
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/dashboard'; // Redirect on success
        } else {
            document.getElementById('errorMessage').textContent = 'Invalid credentials.';
        }
    })
    .catch(error => {
        document.getElementById('errorMessage').textContent = 'An error occurred.';
    });
});