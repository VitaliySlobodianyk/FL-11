let rootNode = document.getElementById('root');
let activityInput = document.getElementById('activityInput');
let addButton = document.getElementById('addActivity');
let activities = document.getElementsByClassName('activities')[0];
const itemsMaxSize = 10;

let localStorage = {
    update: function (data) {
        if ('log' in window.localStorage) {
            window.localStorage.removeItem('log');
        }
        window.localStorage.setItem('log', JSON.stringify(data));
    },
    get: function () {
        return JSON.parse(window.localStorage.getItem('log'));
    }
};
let button= {
     disable : function (button) {
        button.setAttribute('disabled', 'disabled');
        button.classList.add('disabled');
        button.classList.remove('enabled');
    },
    enable : function (button) {
        button.removeAttribute('disabled');
        button.classList.remove('disabled');
        button.classList.add('enabled');
    },
     create : function (className, figureInside) {
        let button = document.createElement('button');
        button.classList.add(className);
        let buttonContent = document.createElement('i');
        buttonContent.classList.add('material-icons');
        buttonContent.textContent = figureInside;
        button.appendChild(buttonContent);
        return button;
    }
};

let input ={
     disableRelatedButton : function (e) {
        if (e.target.value.trim().length === 0) {
            button.disable(addButton);
    
        } else {
             button.enable(addButton);
        }
    },
     blockAdding : function () {
        button.disable(addButton);
        activityInput.setAttribute('disabled', 'disabled');
        document.querySelector('.notification').style.display = 'block';
    },  
     allowAdding : function () {
        activityInput.removeAttribute('disabled');
        document.querySelector('.notification').style.display = 'none';
    }
};
let checkBox ={
    disable : function (e) {
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
        console.log(index);
        e.dataTransfer.setData('text/plain', index.toString());
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

let activity ={
    
remove : function (e) {
    activities.removeChild(e.currentTarget.parentElement);
    if (activities.children.length < itemsMaxSize) {
        input.allowAdding();
    }
},
saveChanges : function (element, newData) {
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
 edit : function (e) {
    let children = e.currentTarget.parentElement.children;
    Array.prototype.forEach.call(children, element => {
        if (element.classList.contains('editorElement')) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
    let activityName= e.currentTarget.parentElement.querySelector('h2');
    let editInput = e.currentTarget.parentElement.querySelector('input[type="text"]');
    editInput.value=activityName.textContent;
},
 add : function () {
    let activityItem = document.createElement('li');
    activityItem.classList.add('activity');
    activityItem.draggable = true;

    let label = document.createElement('label');
    label.classList.add('checkBox');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    let icon = document.createElement('i');
    icon.classList.add('material-icons', 'checkboxDone');
    icon.textContent = 'done';
    label.appendChild(icon);
    label.appendChild(checkbox);

    let activityName = document.createElement('h2');
    activityName.textContent = activityInput.value;
    let editButton = button.create('edit', 'create');
    let deleteButton = button.create('delete', 'delete_forever');

    let editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.classList.add('editorElement');
    editInput.style.display = 'none';

    let saveButton = button.create('save', 'save');
    saveButton.classList.add('editorElement');
    saveButton.style.display = 'none';

    checkbox.addEventListener('click', checkBox.disable);
    deleteButton.addEventListener('click', activity.remove, true);
    editButton.addEventListener('click', activity.edit);
    saveButton.addEventListener('click', () => activity.saveChanges(activityName, editInput.value));

    activityItem.addEventListener('dragstart', dragNDrop.dragStart);
    activityItem.addEventListener('drop', dragNDrop.dropped);
    activityItem.addEventListener('dragover', dragNDrop.dragOver);
    activityItem.addEventListener('dragleave', dragNDrop.dragLeave);

    activityItem.appendChild(editInput);
    activityItem.appendChild(saveButton);
    activityItem.appendChild(label);
    activityItem.appendChild(activityName);
    activityItem.appendChild(editButton);
    activityItem.appendChild(deleteButton);

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
    if (e.key === 'Enter' &&
        e.target.value.trim().length !== 0) {
            activity.add();
    }
});
activityInput.addEventListener('input', input.disableRelatedButton);
button.disable(addButton);