import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice'; 
import socialCardSlice from '../features/social-card/components/socialCardSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    socialCardSlice: socialCardSlice
  },
});
