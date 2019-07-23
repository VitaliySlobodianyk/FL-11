const rootNode = document.getElementById('root');
const activityInput = document.getElementById('activityInput');
const addButton = document.getElementById('addActivity');
const activities = document.getElementsByClassName('activities')[0];
const activityTemplate = document.getElementsByTagName('template')[0].content.firstElementChild;
const itemsMaxSize = 10;

let button = {
    disable: function (button) {
        button.setAttribute('disabled', 'disabled');
        button.classList.add('disabled');
        button.classList.remove('enabled');
    },
    enable: function (button) {
        button.removeAttribute('disabled');
        button.classList.remove('disabled');
        button.classList.add('enabled');
    },
    create: function (className, figureInside) {
        let button = document.createElement('button');
        button.classList.add(className);
        let buttonContent = document.createElement('i');
        buttonContent.classList.add('material-icons');
        buttonContent.textContent = figureInside;
        button.appendChild(buttonContent);
        return button;
    }
};

let input = {
    disableRelatedButton: function (e) {
        if (e.target.value.trim().length === 0) {
            button.disable(addButton);

        } else {
            button.enable(addButton);
        }
    },
    blockAdding: function () {
        button.disable(addButton);
        activityInput.setAttribute('disabled', 'disabled');
        document.querySelector('.notification').style.display = 'block';
    },
    allowAdding: function () {
        activityInput.removeAttribute('disabled');
        document.querySelector('.notification').style.display = 'none';
    },
    enterActivation: function (e, callback, ...parametrs) {
        if (e.key === 'Enter' &&
            e.target.value.trim().length !== 0) {
            callback(...parametrs);
        }
    }
};
let checkBox = {
    disable: function (e) {
        if (e.target.checked) {
            e.preventDefault();
            e.target.previousSibling.style.display = 'block';
        }
    }
};
document.findIndexOfElement = function (element) {
    let index = [].indexOf.call(activities.children, element);
    return index;
};
document.getElementFromCollection = function (index) {
    return activities.children[index];
};
document.insertAtPosition = function (elem, index) {
    let collection = activities.children;
    if (index < collection.length && index >= 0) {
        return activities.insertBefore(elem, document.getElementFromCollection(index));
    } else {
        return activities.appendChild(elem);
    }
};
let dragNDrop = {
    dragOver: function (e) {
        e.preventDefault();
        let dropClass = 'dropPlace';
        if (!e.currentTarget.classList.contains(dropClass)) {
            e.currentTarget.classList.add(dropClass);
        }
    },
    dragLeave: function (e) {
        let dropClass = 'dropPlace';
        if (e.currentTarget.classList.contains(dropClass)) {
            e.currentTarget.classList.remove(dropClass);
        }
    },
    dragStart: function (e) {
        let index = document.findIndexOfElement(e.target);
        e.dataTransfer.setData('text/plain', index.toString());
        if (!e.currentTarget.classList.contains('dragElement')) {
            e.currentTarget.classList.add('dragElement');
        }
    },
    dragEnd: function (e) {
        if (e.currentTarget.classList.contains('dragElement')) {
            e.currentTarget.classList.remove('dragElement');
        }
    },
    dropped: function (e) {
        let oldIndex = Number(e.dataTransfer.getData('text/plain'));
        let target = e.currentTarget;
        let newIndex = document.findIndexOfElement(target);
        let dropped = document.getElementFromCollection(oldIndex);
        if (newIndex !== oldIndex) {
            dropped.remove();
            document.insertAtPosition(dropped, newIndex);
        }
        dragNDrop.dragLeave(e);
    }
};

let activity = {
    remove: function (e) {
        activities.removeChild(e.currentTarget.parentElement);
        if (activities.children.length < itemsMaxSize) {
            input.allowAdding();
        }
    },
    saveChanges: function (element, newData) {
        if (newData) {
            element.textContent = newData;
            Array.prototype.forEach.call(element.parentElement.children, element => {
                if (element.classList.contains('editorElement')) {
                    element.style.display = 'none';
                } else {
                    element.style.display = 'block';
                }
            });
        } else {
            alert('You can\'t save empty activity!');
        }
    },
    edit: function (e) {
        let children = e.currentTarget.parentElement.children;
        Array.prototype.forEach.call(children, element => {
            if (element.classList.contains('editorElement')) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });
        let activityName = e.currentTarget.parentElement.querySelector('h2');
        let editInput = e.currentTarget.parentElement.querySelector('input[type="text"]');
        editInput.value = activityName.textContent;
    },
    add: function () {
        let activityItem = activityTemplate.cloneNode(true);
        let activityData = activityItem.querySelector('.activityData');
        activityData.textContent = activityInput.value;
        let editorInput = activityItem.querySelector('input[type="text"]');

        activityItem.querySelector('input[type="checkbox"]').addEventListener('click', checkBox.disable);
        activityItem.querySelector('.edit').addEventListener('click', activity.edit);
        activityItem.querySelector('.save').addEventListener('click',
            () => activity.saveChanges(activityData, editorInput.value));
        editorInput.addEventListener('keyup', (e) => {
            input.enterActivation(e, activity.saveChanges, activityData, editorInput.value);
        });
        activityItem.querySelector('.delete').addEventListener('click', activity.remove);

        activityItem.addEventListener('dragstart', dragNDrop.dragStart);
        activityItem.addEventListener('dragend', dragNDrop.dragEnd);
        activityItem.addEventListener('drop', dragNDrop.dropped);
        activityItem.addEventListener('dragover', dragNDrop.dragOver);
        activityItem.addEventListener('dragleave', dragNDrop.dragLeave);

        activities.appendChild(activityItem);
        activityInput.value = '';
        button.disable(addButton);
        if (activities.children.length >= itemsMaxSize) {
            input.blockAdding();
        }
    }
};
addButton.addEventListener('click', activity.add);
activityInput.addEventListener('keyup', (e) => {
    input.enterActivation(e, activity.add);
});
activityInput.addEventListener('input', input.disableRelatedButton);
button.disable(addButton);