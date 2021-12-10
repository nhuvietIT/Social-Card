import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice'; 
import socialCardSlice from '../features/social-card/components/socialCardSlice';
import commentSlice from '../features/social-card/components/comment/commentSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    socialCardSlice: socialCardSlice,
    commentSlice:commentSlice
  },
});
