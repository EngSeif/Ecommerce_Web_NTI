const signUpName = document.querySelector("#signUpName")
const signUpEmail = document.querySelector("#signUpEmail")
const signUpPass = document.querySelector("#signUpPass")
const signUpBtn = document.querySelector("#signUpBtn")
const emailExist = document.querySelector("#emailExist")

let users = [];

if (JSON.parse(localStorage.getItem('usersInfo')) != null) {
    users = JSON.parse(localStorage.getItem('usersInfo'))
}


// signUp 
function signUp(){
    if (signUpName.value == '' || signUpEmail.value == '' || signUpPass.value == '') {
        emailExist.innerHTML = `<span class="text-danger my-3">All Inputs Are Required</span>`
    } else {

        for (let i = 0; i < users.length; i++) {
            if (users[i].email.toLowerCase() == signUpEmail.value.toLowerCase()) {
                emailExist.innerHTML = `<span class="text-danger my-3">Email Already Exist</span>`
                return false;
            }
        }

        getUserData()
        emailExist.innerHTML = `<span class="text-success my-3">Success</span>`
    }
}

function getUserData(){
    let user = {
        name: signUpName.value,
        email: signUpEmail.value,
        pass: signUpPass.value 
    }
    users.push(user)
    localStorage.setItem('usersInfo',JSON.stringify(users))
    location.href = './login.html'
}

// events
signUpBtn?.addEventListener('click',function(){
    signUp()
})



// Sign in 
const signInEmail = document.querySelector("#signInEmail")
const signInPass = document.querySelector("#signInPass")
const logBtn = document.querySelector("#logBtn")
const checkInput = document.querySelector("#checkInput")

function signIn(){
    if (signInEmail.value == '' || signInPass.value == '') {
        checkInput.innerHTML = `<span class="text-danger my-3">All Inputs Are Required</span>`
    }else{
        for (let i = 0; i < users.length; i++) {
            if (signInEmail.value.toLowerCase() == users[i].email.toLowerCase() && signInPass.value == users[i].pass) {
                checkInput.innerHTML = `<span class="text-success my-3">Success</span>`
                // localStorage.setItem('userName',JSON.stringify(users[i].name))
                location.href = '../index.html'
                return
            }
            
        }
        checkInput.innerHTML = `<span class="text-danger my-3">You Should Sign Up</span>`
    }
}

logBtn?.addEventListener('click',function(){
    signIn()
})