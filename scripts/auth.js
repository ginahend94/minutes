import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';

// listen for auth status change
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('user logged in:', user)
  } else {
    console.log('user logged out')
  }
})

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
        .then((creds) => {
          const user = auth.currentUser;
          // TODO - add display name and photo
          updateProfile(user, {
            displayName: signUpForm.name.value,
          }).then(() => {
            console.log('display name added');
            console.log(user.displayName, user.email);
          })
          // close and reset form
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
      auth.signOut()
        .catch((err) => {
        console.log(err)
      })
    });
  });
})();

// log in
const logIn = (() => {
  const modal = document.querySelector('#log-in');
  const logInForm = modal.querySelector('form');
  logInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // get user info
    const email = logInForm.email.value;
    const password = logInForm.password.value;
    signInWithEmailAndPassword(auth, email, password).then((cred) => {
      // close and reset form
      M.Modal.getInstance(modal).close();
      logInForm.reset();
    })
      .catch((err) => {
        console.log(err);
    })
  })
 })();
