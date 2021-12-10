import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SocialCardsApi from '../../../../api/socialCardApi';

const initialState = {
  social: [],
  status: 'idle',
};

export const fetchComment = createAsyncThunk(
  'social/fetchComment',
  async () => {
    const dataApi = await SocialCardsApi.showComment();
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: dataApi }), 500)
    );
    return response.data;
  }
);

export const addComment = createAsyncThunk(
  'social/addComment',
  async (value) => { 
    const dataApi = await SocialCardsApi.saveComment(value);
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: dataApi }), 500)
    );
    return response.data;
  }
);


export const commentSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.status = 'idle';
        state.social = action.payload;
      })
      .addCase(addComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = 'idle';
        state.social = action.payload;
      })
 
    
  }
});

export const { } = commentSlice.actions;
export const selectCommnet = (state) => state.commentSlice;
export default commentSlice.reducer;
