const minimalEmailLength = 6;
const minimalPasswordLength = 4;
let email = prompt('Enter your email:');
let users = {
    'admin@gmail.com': 'AdminPass',
    'user@gmail.com': 'UserPass'
};
let supposedPassword;
switch (email) {
    case '':
    case null:
        alert('Canceled');
        break;
    default:
        {
            if (email in users) {
                supposedPassword = users[email];
            } else if (email.length < minimalEmailLength) {
                alert('I don\'t know any emails having name length less than 6 symbols');
            } else {
                alert('I don\'t know you');
            }
        }
}
let password;
let registrationStatus = false;
if (supposedPassword) {
    password = prompt(`Succes.\n Enter your password for: ${email}`);
    switch (password) {
        case null:
        case '':
            alert('Canceled');
            break;

        case supposedPassword:
            registrationStatus = true;
            break;

        default:
            alert('Wrong password!');

    }
}
let changePassword;
let oldPassword;
if (registrationStatus) {
    changePassword = confirm('Do you want to change your password?');
    if (changePassword) {
        oldPassword = prompt('Enter your old password:');
        switch (oldPassword) {
            case null:
            case '': 
                alert('Canceled');
                changePassword = false;
                break;

            case password:
                changePassword = true;
                break;

            default:
                {
                    alert('Wrong password!');
                    changePassword = false;
                }
        }
    } else {
        alert('You have failed the change.');
    }

    if (changePassword) {
        let newPassword = prompt('Enter new password: \n[longer than 5 characters]');
        if(newPassword.length <= minimalPasswordLength){
            alert('It’s too short password. Sorry.');
        }else if (newPassword.length > minimalPasswordLength && prompt('Re-enter your new password:') === newPassword) {
            users[email] = newPassword;
            alert('You have successfully changed your password.');
        }else {
            alert('You wrote the wrong password.');
        }
    }
}






