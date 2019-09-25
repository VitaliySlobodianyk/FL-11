const $list = $(".list");
const $input = $("#add-input");
const $add = $("#add-submit");

const todos = [{
        id: 0,
        text: "Buy milk",
        done: false
    },
    {
        id: 1,
        text: "Play with dog",
        done: true
    }
];

class LSWorker {
    constructor() {
        const storage = window.localStorage;
        const key = 'items';
        if (LSWorker.item) {
            return LSWorker.item;
        }
        this.updateItems = (items) => {
            if (Array.isArray(items)) {
                storage.setItem(key, JSON.stringify(items));
            }
        };
        this.getItems = () => {
            const data = JSON.parse(storage.getItem(key));
            if (data && data.length > 0) {
                return data;
            }
            return null;
        };
        LSWorker.item = this;
    }
}


class Storage {
    constructor() {
        if (Storage.item) {
            return Storage.item;
        }
        const subscribers = [];
        let storage = [];
        let idCount = 0;
        const inform = () => {
            subscribers.forEach(elem => {
                elem();
            });
        };
        this.init = (initialData) => {
            this.refresh(initialData);
        };
        this.refresh = (data) => {
            if (Array.isArray(data)) {
                storage = [...data];
                idCount += data.length;
                inform();
            }
        };
        this.subscribe = (listener) => {
            if (typeof listener === 'function') {
                subscribers.push(listener);
            }
        };
        this.unsubscribe = (listener) => {
            if (typeof listener === 'function') {
                const position = subscribers.indexOf(listener);
                if (position !== -1) {
                    subscribers.splice(position, 1);
                }
            }
        };
        this.removeItem = (id) => {
            if (id >= 0) {
                const position = this.getPositionById(id, this.getSnapshot());
                if (position !== -1) {
                    const storage = this.getSnapshot();
                    storage.splice(position, 1);
                    this.refresh(storage);
                }
            }
        };
        this.addItem = (item) => {
            idCount++;
            const storage = this.getSnapshot();
            storage.push(item);
            this.refresh(storage);
        };
        this.getId = () => {
            return idCount;
        };
        this.getSnapshot = () => {
            return [...storage];
        };
        Storage.item = this;
    }

    getPositionById(id, storage) {
        return storage.findIndex(element => element.id === id);
    };
}
class storageLsDecorated {
    constructor(storage, localStorage) {
        let items = localStorage.getItems();
        if (items) {
            storage.init(items);
        } else {
            localStorage.updateItems(storage.getSnapshot());
        }
        this.refresh = (data) => {
            localStorage.updateItems(data);
            storage.refresh(data);
        };
        this.subscribe = (listener) => {
            storage.subscribe(listener);
        };
        this.unsubscribe = (listener) => {
            storage.unsubscribe(listener);
        };
        this.removeItem = (id) => {
            storage.removeItem(id);
            this.refresh(storage.getSnapshot());
        };
        this.addItem = (item) => {
            storage.addItem(item);
            this.refresh(storage.getSnapshot());
        };
        this.getId = () => {
            return storage.getId();
        };
        this.getSnapshot = () => {
            return localStorage.getItems();
        };
        this.getPositionById = (id, items) => {
            return storage.getPositionById(id, items);
        };
    }
}


class ToDOItem {
    constructor({ id, text, done }, clickHandler, removeHandler) {
        const item = $(`<ul><p>${text}</p>  </ul>`).attr("id", `${id}`)
            .addClass("todo-item");
        item.click(() => clickHandler({ id, text, done: !done }));
        const remove = $('<button>Remove</button>').addClass("todo-item").click(() => removeHandler(id));
        item.append(remove);

        if (done) {
            item.css({
                "text-decoration": "line-through",
                "font-style": "italic"
            });
        }
        return item;
    }

}


class ItemsWorker {
    constructor(storage) {
        let items = storage.getSnapshot();
        let container = $('.list');
        let changeData = (data) => {
            const position = storage.getPositionById(data.id, items);
            if (position != -1) {
                items[position] = data;
                storage.refresh(items);
            }

        };
        this.init = () => {
            this.render();
        };
        this.render = () => {
            items = storage.getSnapshot();
            container.html('');
            items.forEach(
                (element) => {
                    container.append(new ToDOItem(element, changeData, storage.removeItem));
                })
        };
        storage.subscribe(this.render);
    }
}
class AddItems {
    constructor(storage) {
        let input = $('#add-input');
        let addButton = $('#add-submit');
        addButton.click((e) => {
            e.preventDefault();
            if (input.val()) {

                storage.addItem({
                    id: storage.getId(),
                    text: input.val(),
                    done: false
                });
                input.val('');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const localStorage = new LSWorker();
    let storage = new Storage();
    storage.init(todos);
    storage = new storageLsDecorated(storage, localStorage);
    const items = new ItemsWorker(storage);
    items.init();
    const addPanel = new AddItems(storage);
});