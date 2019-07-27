const rootNode = document.getElementById('root');
const pages = rootNode.children;
const activityTemplate = document.querySelector('template').content;
const activities = document.querySelector('.activities');
const minusOne = -1;

let pageElements = {
    activityEditorInput: document.getElementById('activityEditor'),
    activityEditorSave: document.getElementById('editActivity'),
    showAddActivityWindow: document.getElementById('addButton'),
    activityInput: document.getElementById('activityInput'),
    addActivity: document.getElementById('addActivity')
};

let TODOItem = function (content) {
    this.isDone = false;
    this.id = methodsForItems.getId();
    this.description = content;
};
let todoItems = [];
let activitiesMethods = {
    setActivity: function (e, data, asEvent = false) {
        let activity = e;
        if (asEvent) {
            activity = e.currentTarget.parentElement.parentElement;
        }

        let checked = activity.querySelector('.checked');
        let unchecked = activity.querySelector('.unchecked');
        let content = activity.querySelector('.content');

        if (data.isDone) {
            checked.style.display = 'block';
            unchecked.style.display = 'none';
            content.style.backgroundColor = 'rgba(110, 109, 109, 0.5)';
            if (asEvent) {
                methodsForItems.insertAtEnd(data);
            }
        } else {
            if (asEvent) {
                methodsForItems.insertBeforeDone(data, true);
            }
            checked.style.display = 'none';
            unchecked.style.display = 'block';
        }
    },
    createActivity: function (activityObj) {
        let activity = activityTemplate.cloneNode(true);
        let content = activity.querySelector('.content');
        content.textContent = activityObj.description;

        activity.querySelector('input[type="checkbox"]').addEventListener('click', (e) => {
            activityObj.isDone = !activityObj.isDone;
            activitiesMethods.setActivity(e, activityObj, true);
            activitiesMethods.renderActivities(todoItems);
        });
        activitiesMethods.setActivity(activity, activityObj);

        content.addEventListener('click', () => activitiesMethods.modifyActivityEventHandler(activityObj));

        activity.querySelector('.delete').addEventListener('click', () => {
            methodsForItems.deleteActivity(methodsForItems.getIndex(activityObj.id));
            activitiesMethods.renderActivities(todoItems);
        });

        return activity;
    },
    createActivityEventHandler: function () {
        let data = pageElements.activityInput.value;
        if (data.trim().length === 0) {
            alert('Element can\'t be empty');
        } else if (methodsForItems.search(data, 'description', todoItems) !== minusOne) {
            alert('Activities can\'t be same');
        } else {
            let item = new TODOItem(data);
            methodsForItems.insertBeforeDone(item);
            storage.upade(todoItems, methodsForItems.id);
            activitiesMethods.renderActivities(todoItems);
            window.location.hash = '#/main';
            pageElements.activityInput.value = '';
        }
    },
    modifyActivityEventHandler: function (element) {
        if (element.isDone) {
            alert('You can\'t edit done activities');
        } else {
            window.location.hash = `#/modify/:item_${element.id}`;
            let activityEditor = document.getElementById('activityEditor');
            activityEditor.value = element.description;
        }
    },
    modifyActivity: function () {
        if (pageElements.activityEditorInput.value.trim().length !== 0) {
            let id = /#\/modify\/:item_(\d+)/.exec(window.location.hash)[1];
            let position = methodsForItems.getIndex(id);
            let activity = methodsForItems.deleteActivity(position);
            let succes = false;
            if (methodsForItems.search(pageElements.activityEditorInput.value, 'description', todoItems) === minusOne) {
                activity.description = pageElements.activityEditorInput.value;
                succes = true;
            } else {
                alert('You can\'t have  duplicate activities!');
            }
            methodsForItems.insertAtPosition(position, activity);
            if (succes) {
                window.location.hash = '/main';
            }
            activitiesMethods.renderActivities(todoItems);

        } else {
            alert('You can\'t save empty element');
        }
    },
    renderActivities: function (data) {
        activities.innerHTML = '';
        data.forEach((elem) => {
            let activity = activitiesMethods.createActivity(elem);
            activities.appendChild(activity);
        });
        storage.upade(data, methodsForItems.id);
    }

};
const methodsForItems = {
    id: 0,
    getId: function () {
        methodsForItems.id++;
        return methodsForItems.id;
    },
    search: function (data, cell) {
        for (let index = 0; index < todoItems.length; index++) {
            if (todoItems[index][cell] === data) {
                return todoItems[index];
            }
        }
        return minusOne;
    },
    markCheckState: function (id) {
        let elem = methodsForItems.search(id, 'id', todoItems);
        elem.isDone = !elem.isDone;
    },
    getIndex: function (id) {
        let pos = -1;
        todoItems.forEach((elem, index) => {
            if (elem.id === Number(id)) {
                pos = index;
            }
        });
        return pos;
    },
    deleteActivity: function (index) {
        let item = todoItems.splice(index, 1);
        storage.upade(todoItems, methodsForItems.id);
        return item[0];
    },
    insertAtPosition: function (position, element) {
        todoItems.splice(position, 0, element);
    },
    insertAtEnd: function (element) {
        methodsForItems.deleteActivity(methodsForItems.getIndex(element.id));
        todoItems.push(element);
    },
    insertBeforeDone: function (element, existingElement = false) {
        if (existingElement) {
            methodsForItems.deleteActivity(methodsForItems.getIndex(element.id));
        }
        let end = todoItems.length - 1;
        let position = 0;
        for (let index = end; index >= 0; index--) {
            if (!todoItems[index].isDone) {
                position = index + 1;
                break;
            }
        }
        methodsForItems.insertAtPosition(position, element);
    },
    sortItems: function (data) {
        let unchecked = [];
        let checked = [];
        data.forEach((elem) => {
            if (elem.isDone) {
                checked.push(elem);
            } else {
                unchecked.push(elem);
            }
        });
        data = unchecked.concat(checked);
        return data;
    }
};

let storage = {
    key: 'toDoItems',
    keyId: 'Id',
    upade: function (data, id) {
        localStorage.setItem(storage.key, JSON.stringify(data));
        localStorage.setItem(storage.keyId, `${id}`);
    },
    get: function () {
        return {
            items: JSON.parse(localStorage.getItem(storage.key)),
            id: Number(localStorage.getItem(storage.keyId))
        };
    }
};

let page = {
    pageClasses: {
        main: 'main',
        add: 'addActivity',
        edit: 'editActivity'
    },
    pageRoutes: {
        mainPage: '/main',
        addPage: '/add',
        modifyPage: '/modify/:item_'
    },
    pageSwitcher: function (pageClassName) {
        [].forEach.call(pages, (elem) => {
            if (elem.classList.contains(pageClassName)) {
                elem.style.display = 'block';
            } else {
                elem.style.display = 'none';
            }
        });
    },
    pageRouter: function () {
        let edit = /#\/modify\/:item_(\d+)/;
        if (window.location.hash === '#/main') {
            page.pageSwitcher(page.pageClasses.main);
        } else if (edit.test(window.location.hash)) {
            page.pageSwitcher(page.pageClasses.edit);
        } else if (window.location.hash === '#/add') {
            page.pageSwitcher(page.pageClasses.add);
        }
    }
};

let alertObj = {
    alertBox: document.getElementById('customAlert'),
    timeoutId: null,
    hideAlert: (timeoutId) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        alertObj.alertBox.style.display = 'none';
    },
    handleTime: 2000
};

window.alert = function (txt) {
    alertObj.alertBox.querySelector('.alertContent').textContent = txt;
    alertObj.alertBox.style.display = 'block';
    alertObj.timeoutId = this.setTimeout(alertObj.hideAlert, alertObj.handleTime);
};

document.addEventListener('DOMContentLoaded', function () {
    alertObj.alertBox.querySelector('button').addEventListener('click', () => {
        alertObj.hideAlert(alertObj.timeoutId);
    });

    let chrome = /.+Chrome.+/i;
    if (chrome.test(navigator.userAgent)) {
        alertObj.alertBox.classList.add('chrome');
    } else {
        alertObj.alertBox.classList.add('default');
    }

    window.addEventListener('hashchange', page.pageRouter);
    window.location.hash = page.pageRoutes.mainPage;
    page.pageRouter();

    pageElements.showAddActivityWindow.addEventListener('click', () => {
        window.location.hash = page.pageRoutes.addPage;
    });

    let cancellButtons = document.querySelectorAll('.cancelSaving');
    [].forEach.call(cancellButtons, (elem) => {
        elem.addEventListener('click', (e) => {
            e.currentTarget.parentElement.querySelector('input[type="text"]').value = '';
            window.location.hash = page.pageRoutes.mainPage;
        });
    });

    let data = storage.get();
    if (data.items && data.id) {
        todoItems = data.items;
        methodsForItems.id = data.id;
        activitiesMethods.renderActivities(todoItems);
    } else {
        storage.upade(todoItems, methodsForItems.id);
        activitiesMethods.renderActivities(todoItems);
    }

    pageElements.addActivity.addEventListener('click', activitiesMethods.createActivityEventHandler);
    pageElements.activityEditorSave.addEventListener('click', activitiesMethods.modifyActivity);
});





