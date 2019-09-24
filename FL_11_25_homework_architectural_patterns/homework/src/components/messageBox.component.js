export class MessageBox {
    constructor(store) {
        if (MessageBox.item) {
            return MessageBox.item;
        }
        const quantMessageBox = document.getElementById('quantMessage');
        this.init = () => {
            this.render();
        };

        this.render = ( ) => {
            let data = store.getState();
            if (data.search && data.visibleUsers.length > 0) {
                quantMessageBox.textContent = `Found ${ data.visibleUsers.length }
                users out of ${data.usersData.length}`;
            } else if (data.visibleUsers.length===1) {
                quantMessageBox.textContent = `Displayed ${ data.visibleUsers.length }
                user out of ${data.usersData.length}`;
            } else if (data.visibleUsers.length > 1) {
                quantMessageBox.textContent = `Displayed ${ data.visibleUsers.length }
                users out of ${data.usersData.length}`;
            } else {
                quantMessageBox.textContent = 'There is no users';
            }
        };
        store.subscribe(this.render);
        MessageBox.item = this;
    }
}