import { auth } from './firebase.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';

// sign up
const signUp = (() => {
  const modal = document.querySelector('#sign-up');
  const signUpForm = modal.querySelector('form');

  const checkName = () => {
    const name = signUpForm.name;
    // something must be entered as display name
    return !!name.value;
  };
  const checkEmail = () => {
    const email = signUpForm.email;
    // email address must contain @ symbol
    return email.value.includes('@');
  };
  const checkPassword = () => {
    const pw1 = document.querySelector('#password');
    const pw2 = document.querySelector('#password-confirm');
    // passwords must match and be 6 chars or more
    return pw1.value === pw2.value && pw1.value.length >= 6;
  };

  const validate = () => {
    // all tests must return true
    return [checkName(), checkEmail(), checkPassword()].every((a) => a);
  };
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validate()) {
      // validate inputs
      createUserWithEmailAndPassword(
        auth,
        // pass in form info
        signUpForm.email.value,
        signUpForm.password.value
      )
        .then((credential) => {
          // grab user object
          const user = credential.user;
          M.Modal.getInstance(modal).close();
          signUpForm.reset();
        })
        .catch((err) => {
          // TODO - display error in message or toast
          const errorCode = err.code;
          const errorMessage = err.message;
          console.log(`Error ${errorCode}: ${errorMessage}`);
        });
    }
  });
})();

// log out
const logOut = (() => {
  const logOutBtns = document.querySelectorAll('.log-out');
  logOutBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      auth.signOut();
      // TODO - hide btns on logout
    });
  });
})();

// log in
const logIn = (() => {
  
 })();
