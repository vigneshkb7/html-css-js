const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');



function showSuccess(input){
    const parent = input.parentElement;
    parent.className = 'form-control success';
}

function showError(input,msg){
    const parent = input.parentElement;
    parent.className = 'form-control error';
    const small = parent.querySelector('small');
    small.innerText =  msg;
}

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function isValidEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value.trim())) {
        showSuccess(email)
    }else{
        showError(email,'Email is not valid')
    }
}

function checkLength(input,min,max){
    if(input.value.length < min){
        showError(input,`${getFieldName(input)} must be atleast ${min} `)
    }else if(input.value.length < min){
        showError(input,`${getFieldName(input)} must be less then ${max} `)
    }else{
        showSuccess(input)
    }
}

function checkRequired(inputArray){
 inputArray.forEach(function(input){
    if(input.value.trim() === ''){
        showError(input, `${getFieldName(input)} is Required`);
    }else{
        showSuccess(input);
    }
 });
}

form.addEventListener('submit',function(e){
    e.preventDefault();
    checkRequired([username,email,password,password2]);
    checkLength(username,4,10);
    isValidEmail(email);
})