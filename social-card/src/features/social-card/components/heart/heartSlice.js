import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SocialCardsApi from '../../../../api/socialCardApi';

const initialState = {
   social: [],
   status: 'idle',
};

export const fetchHeart = createAsyncThunk(
   'social/fetchHeart',
   async () => {
      const dataApi = await SocialCardsApi.showdata()
      const response = await new Promise((resolve) =>
         setTimeout(() => resolve({ data: dataApi }), 500)
      );
      return response.data;
   }
);

export const updateStatus = createAsyncThunk(
   'social/updateStatus',
   async (value) => {
      const dataApi = await SocialCardsApi.updateStatus(value.id, value.Heart);
      const response = await new Promise((resolve) =>
         setTimeout(() => resolve({ data: dataApi }), 500)
      );
      return response.data;
   }
);


export const heartSlice = createSlice({
   name: 'social',
   initialState,
   reducers: {
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchHeart.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(fetchHeart.fulfilled, (state, action) => {
            state.status = 'idle';
            state.social = action.payload;
         })
         .addCase(updateStatus.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(updateStatus.fulfilled, (state, action) => {
            state.status = 'idle';
            state.social = action.payload;
         })


   }
});

export const { } = heartSlice.actions;
export const selectHeart= (state) => state.heartSlice;
export default heartSlice.reducer;
