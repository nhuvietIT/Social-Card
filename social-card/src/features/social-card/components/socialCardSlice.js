import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SocialCardsApi from '../../../api/socialCardApi';

const initialState = {
  social: [],
  status: 'idle',
};

export const fetchSocalDetail = createAsyncThunk(
  'social/fetchDetail',
  async () => {
    const dataApi = await SocialCardsApi.showdata();
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: dataApi }), 500)
    );
    return response.data;
  }
);

export const addSocalDetail = createAsyncThunk(
  'social/addSocalDetail',
  async (value) => {
    const infor = await SocialCardsApi.uploadFile(value.Upload)
    console.log(infor)
    const data = {
      Name: value.Name,
      Description: value.Description,
      Avatar: infor.file.filename,
      Image: infor.file.path
    }
    const dataApi = await SocialCardsApi.saveAll(data);
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: dataApi }), 500)
    );
    return response.data;
  }
);

export const deleteocalDetail = createAsyncThunk(
  'social/deleteocalDetail',
  async (id) => {
    const dataApi = await SocialCardsApi.delete(id);
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: dataApi }), 500)
    );
    return response.data;
  }
);

export const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocalDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSocalDetail.fulfilled, (state, action) => {
        state.status = 'idle';
        state.social = action.payload;
      })
      .addCase(addSocalDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addSocalDetail.fulfilled, (state, action) => {
        state.status = 'idle';
        state.social = action.payload;
      })
      .addCase(deleteocalDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteocalDetail.fulfilled, (state, action) => {
        state.status = 'idle';
        state.social = action.payload;
      })
  }
});

export const { } = socialSlice.actions;
export const selectSocial = (state) => state.socialCardSlice;
export default socialSlice.reducer;
