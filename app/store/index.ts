import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';

import { loginReducer } from './login/loginReducer';
import { offerReducer } from './offer/offerReducer';
import reducers from './reducers';
import { tokenReducer } from './token/tokenReducer';

const rootReducer = combineReducers({
    token: tokenReducer,
    login: loginReducer,
    offer: offerReducer,
    ...reducers,
});

// Middleware: Redux Persist Config
const persistConfig = {
    // Root
    key: 'token',
    // Storage Method (React Native)
    storage: AsyncStorage,
    // Whitelist (Save Specific Reducers)
    whitelist: ['token'],
    // Blacklist (Don't Save Specific Reducers)
    blacklist: ['order'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(persistedReducer, composeWithDevTools(middleWareEnhancer));
    return {
        store,
        persistor: persistStore(store),
    };
}
