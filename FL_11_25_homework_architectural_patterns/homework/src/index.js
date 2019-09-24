import './style.scss';
import users from './data';
import {createStore} from 'redux';
import {ItemsController} from './components/itemsController.component';
import {usersReducer} from './reducers/userActions.reducer';
import {MessageBox} from './components/messageBox.component';
import {SearchComponent} from './components/search.component';

console.log(users);
let preloadedState= {
    visibleUsers: users.slice(0, 5),
    usersData: users,
    items: 5
};

const store = createStore(usersReducer, preloadedState);
const usersController = new ItemsController(store);
const messageBox= new MessageBox(store);
new SearchComponent(store);
messageBox.render();
usersController.init();


// class Store {
//     constructor() {
//         if (Store.item) {
//             return Dispatcher.item;
//         }
//         let store = {};
//         let subscribers = [];
//         this.getStore = () => {
//             return Object.freeze({ ...store });
//         };
//         this.subscribe = (fun) => {
//             if (typeof fun === 'function') {
//                 subscribers.push(fun);
//             }
//         };
//         this.dispatch = (action) => {
//             if (typeof action === 'object' &&
//                 typeof action.key === 'string' &&
//                 action.value) {
//                 const newStore = { ...store };
//                 newStore[action.key] = action.value;
//                 store = newStore;
//                 subscribers.forEach(
//                     (call) => call(this.getStore()));
//             }
//         };
//     }
// }