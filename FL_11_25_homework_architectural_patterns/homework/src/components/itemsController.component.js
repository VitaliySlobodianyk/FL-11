import {userCard} from './userCard.component';
import {userActions} from '../actions/userActions.actions';
export class ItemsController {
    constructor(store) {
        if (ItemsController.item) {
            return ItemsController.item;
        }
        const container = document.getElementById('itemsContainer');
        const loadBut= document.getElementById('loadBut');
        loadBut.addEventListener('click', () => {
            store.dispatch(userActions.aDD_ITEMS(5));
        });

        this.init = () => {
            this.render();
        };
        this.render = ( ) => {
            let data = store.getState();
            console.log('STATE');
            console.log(data);
            container.innerHTML = '';
            if (data.visibleUsers.length>0) {
                for (let i = 0; i < data.visibleUsers.length; i++) {
                    container.innerHTML += userCard(data.visibleUsers[i]);
                }
                let cardsDelete = container.querySelectorAll(' button.remove');
                [].forEach.call(cardsDelete, (element) => {
                    element.addEventListener('click', (e) => {
                        store.dispatch(userActions.rEMOVE_ITEM(e.target.parentElement.id));
                    });
                });
            } else {
                container.innerHTML = '<h2 class="empty">NO ELEMENTS!</h2>';
            }
            if (data.search) {
                loadBut.disabled=true;
            } else {
                loadBut.disabled=false;
            }
        };
        store.subscribe(this.render);
        ItemsController.item = this;
    }
}