const myMethods = {
    randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
};

const spinnerMethods = {
    hideSpinner: function () {
        pageElements.spinner.style.display = 'none';
    },
    showSpinner: function () {
        pageElements.spinner.style.display = 'block';
    }
};

const apiInfo = {
    users: 'https://jsonplaceholder.typicode.com/users',
    photos: 'https://pixabay.com/api/?key=13398219-3026fe5aa5feae0ac49e0d14e&q=small+kitten&image_type=photo',
    posts: 'https://jsonplaceholder.typicode.com/posts',
    comments: 'https://jsonplaceholder.typicode.com/comments'
};

const apiWorker = {
    makeRequest(method, url, callback, data = null, parametrs = []) {
        spinnerMethods.showSpinner();
        let request = new XMLHttpRequest();
        request.onload = () => {
            if (request.status === 200) {
                if (callback) {
                    callback(request.response, ...parametrs);
                }
            } else {
                console.error('Can`t send request!');
            }
            spinnerMethods.hideSpinner();
        };
        request.open(method, url, true);
        request.send(data);
    },
    usersPageRequest({
        method,
        url,
        callback,
        data = null,
        parametrs = []
    }) {
        pageWorker.hideUsersSection();
        apiWorker.makeRequest(method, url, callback, data, parametrs);
        pageWorker.showUsersSection();
    },
    postsPageRequest({
        method,
        url,
        callback,
        data = null,
        parametrs = []
    }) {
        apiWorker.makeRequest(method, url, callback, data, parametrs);
    },
};

const photosWorker = {
    photos: [],
    getRandomPhotos(photosResponce, users) {
        let photosToDownload = users.length;
        let photosArr = JSON.parse(photosResponce).hits;
        let result = [];
        for (let index = 0; index < photosArr.length && index < photosToDownload; index++) {
            let url = photosArr.splice(myMethods.randomInteger(0, photosArr.length - 1), 1)[0].webformatURL;
            let photo = photosWorker.downloadPhoto(url);
            result.push(photo);
        }
        photosWorker.photos = result;
        photosWorker.fillPhotos(photosWorker.photos, pageElements.users);
    },
    async downloadPhoto(url) {
        let data = await fetch(url);
        data = await data.blob();
        return await URL.createObjectURL(data);
    },
    async fillPhotos(photosArr, usersCollection) {
        if (photosArr && usersCollection.length <= photosArr.length) {
            for (let index = 0; index < usersCollection.length && photosArr.length; index++) {
                usersCollection[index].querySelector('.user_avatar_content').src = await photosArr[index];
            }
        } else if (usersCollection.length > photosArr.length) {
            apiWorker.usersPageRequest({
                method: 'GET',
                url: apiInfo.photos,
                callback: photosWorker.getRandomPhotos,
                parametrs: [pageElements.users]
            });
        }
    }
};

let pageWorker = {
    fillUsers(string) {
        pageElements.usersPlaceHolder.innerHTML = '';
        let arr = JSON.parse(string);
        Array.prototype.forEach.call(arr, (element => {
            let user = pageElements.userTemplate.cloneNode(true);
            
            let li = document.createElement('li');
            li.classList.add('user');
            li.id = `user_${element.id}`;
            li.appendChild(user);
            
            let userName = li.querySelector('.user__name.mainElement');
            let userEmail = li.querySelector('.user__email.mainElement a');
            let userWebsite = li.querySelector('.user__website.mainElement a');
            let userPhone = li.querySelector('.user__phone.mainElement .content');

            userName.textContent = element.name;
            userEmail.textContent = element.email;
            userEmail.href = `mailto:${element.email}`;
            userWebsite.textContent = element.website;
            userWebsite.href = `http://${element.website}`;
            userPhone.textContent = element.phone;

            let nameInput = li.querySelector('.user__name.editorElement input');
            let emailInput = li.querySelector('.user__email.editorElement input');
            let websiteInput = li.querySelector('.user__website.editorElement input');
            let phoneInput = li.querySelector('.user__phone.editorElement input');

            li.querySelector('.delete').addEventListener('click', () => {
                pageWorker.deleteUser(element.id);
            });
            li.querySelector('.edit').addEventListener('click', () => {
                pageWorker.elementsSwitcher(li, '.editorElement', '.mainElement');
                nameInput.value = userName.textContent;
                emailInput.value = userEmail.textContent;
                websiteInput.value = userWebsite.textContent;
                phoneInput.value = userPhone.textContent;
            });
            li.querySelector('.cancel').addEventListener('click', () => {
                pageWorker.elementsSwitcher(li, '.mainElement', '.editorElement');
            });
            userName.addEventListener('click', () => {
                window.location.href = `./posts.html#userId=${element.id}`;
            });
            li.querySelector('.save').addEventListener('click', () => {
                apiWorker.usersPageRequest({
                    method: 'PATCH',
                    url: `${apiInfo.users}/${element.id}`,
                    callback: console.log,
                    data: JSON.stringify({
                        email: emailInput.value,
                        name: nameInput.value,
                        phone: phoneInput.value,
                        website: websiteInput.value,
                    }),
                    parametrs: ['User Updated']
                });
                apiWorker.usersPageRequest({
                    method: 'GET',
                    url: apiInfo.users,
                    callback: pageWorker.fillUsers
                });
            });
            pageElements.usersPlaceHolder.appendChild(li);
        }));
        photosWorker.fillPhotos(photosWorker.photos, pageElements.users);
    },
    deleteUser(id) {
        apiWorker.usersPageRequest({
            method: 'DELETE',
            url: `${apiInfo.users}/${id}`,
            callback: () => console.log(`Deleted User, ID:${id}`),
            parametrs: []
        });
        apiWorker.usersPageRequest({
            method: 'GET',
            url: apiInfo.users,
            callback: pageWorker.fillUsers
        });
    },
    elementsSwitcher(userElement, classNameToShow, classNameToHide) {
        let elementsToShow = userElement.querySelectorAll(classNameToShow);
        let elementsToHide = userElement.querySelectorAll(classNameToHide);
        Array.prototype.forEach.call(elementsToShow, (element) => {
            element.style.display = 'block';
        });
        Array.prototype.forEach.call(elementsToHide, (element) => {
            element.style.display = 'none';
        });
    },
    showUsersSection() {
        pageElements.usersPlaceHolder.style.display = 'block';
    },
    hideUsersSection() {
        pageElements.usersPlaceHolder.style.display = 'none';
    },
    fillPosts(string) {
        let responce = JSON.parse(string);
        Array.prototype.forEach.call(responce, (data) => {
            let postNode = pageElements.postTemplate.cloneNode(true);
            let post = document.createElement('li');
            post.classList.add('post');
            post.appendChild(postNode);
            post.querySelector('.post__title').textContent = data.title;
            post.querySelector('.post__body').textContent = data.body;
            pageElements.postsPlace.appendChild(post);
            apiWorker.postsPageRequest({
                method: 'GET',
                url: `${apiInfo.comments}?postId=${data.id}`,
                callback: pageWorker.fillComments,
                parametrs: [post]
            });
        });
    },
    fillComments(string, parentElement) {
        let comments = JSON.parse(string);
        let commentsPlace = parentElement.querySelector('.post__comments');
        Array.prototype.forEach.call(comments, (element) => {
            let li = document.createElement('li');
            li.classList.add('comment');
            let comment = pageElements.commentTemplate.cloneNode(true);
            comment.querySelector('.comment__name').textContent = element.name;
            let commentatorEmail = comment.querySelector('.comment__email--data');
            commentatorEmail.textContent = element.email;
            commentatorEmail.href = `mailto:${element.email}`;
            comment.querySelector('.comment__body').textContent = element.body;
            li.appendChild(comment);
            commentsPlace.appendChild(li);
        });
    }
};