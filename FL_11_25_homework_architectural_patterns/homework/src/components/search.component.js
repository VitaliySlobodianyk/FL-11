import {userActions} from '../actions/userActions.actions';
export class SearchComponent {
    constructor(store) {
        if (SearchComponent.item) {
            return SearchComponent.item;
        }
        const searchInput = document.getElementById('search');
        let search= () => {
            console.log('search');
            store.dispatch(userActions.sEARCH_ITEMS(searchInput.value));
        };
        searchInput.addEventListener('input', search);
        SearchComponent.item = this;
    }
}