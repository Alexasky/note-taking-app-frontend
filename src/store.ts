import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './features/auth/register/model';
import notesReducer from './features/notes/model';
import loginReducer from './features/auth/login/model';


const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

