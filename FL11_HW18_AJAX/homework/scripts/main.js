pageElements = {
    userTemplate: document.getElementById('user_template').content,
    usersPlaceHolder: document.querySelector('.main__users'),
    spinner: document.querySelector('.main__spinner'),
    users: document.getElementsByClassName('user'),
};
document.addEventListener('DOMContentLoaded', async () => {
    await apiWorker.usersPageRequest({
        method: 'GET',
        url: apiInfo.users,
        callback: pageWorker.fillUsers
    });
});





