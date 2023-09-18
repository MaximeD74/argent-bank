import { createStore } from 'redux';
import rootReducer from './rootReducer';

// Créez le store Redux en utilisant le rootReducer
const store = createStore(rootReducer);

export default store;