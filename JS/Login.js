

const username = document.querySelector('#username')
const password = document.querySelector('#password')
const loginBtn = document.querySelector('#loginBtn')
const form = document.querySelector('#login-form')

form.addEventListener('submit', e => {
    e.preventDefault()
    if (username.value && password.value) {
        window.location = '/home.html'
    }
})