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
    const inforAvatar = await SocialCardsApi.uploadFile(value.Upload)
    const inforImg = await SocialCardsApi.uploadFileIMG(value.Image)
    const data = {
      Name: value.Name,
      Description: value.Description,
      Avatar: inforAvatar.file.filename,
      Image: inforImg.file.filename,
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

export const updateSocalDetail = createAsyncThunk(
  'social/updateSocalDetail',
  async (value) => {

    if (value.Upload !== "" && value.Image !== "") {
      const infor = await SocialCardsApi.uploadFile(value.Upload)
      const inforImg = await SocialCardsApi.uploadFileIMG(value.Image)
      const data = {
        id: value.id,
        Name: value.Name,
        Description: value.Description,
        Avatar: infor.file.filename,
        Image: inforImg.file.filename
      }
      const dataApi = await SocialCardsApi.update(data);
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ data: dataApi }), 500)
      );
      return response.data;
    } else if (value.Upload !== "" && value.Image === "") {
      const infor1 = await SocialCardsApi.uploadFile(value.Upload)
      const data1 = {
        id: value.id,
        Name: value.Name,
        Description: value.Description,
        Avatar: infor1.file.filename,
      }
      const dataApi1 = await SocialCardsApi.update(data1);
      const response1 = await new Promise((resolve) =>
        setTimeout(() => resolve({ data: dataApi1 }), 500)
      );
      return response1.data;
    } else if (value.Upload === "" && value.Image !== "") {
      const inforImg2 = await SocialCardsApi.uploadFileIMG(value.Image)
      const data2 = {
        id: value.id,
        Name: value.Name,
        Description: value.Description,
        Image: inforImg2.file.filename
      }
      const dataApi2 = await SocialCardsApi.update(data2);
      const response2 = await new Promise((resolve) =>
        setTimeout(() => resolve({ data: dataApi2 }), 500)
      );
      return response2.data;
    } else {
      const data3 = {
        id: value.id,
        Name: value.Name,
        Description: value.Description,
      }
      const dataApi3 = await SocialCardsApi.update(data3);
      const response3 = await new Promise((resolve) =>
        setTimeout(() => resolve({ data: dataApi3 }), 500)
      );
      return response3.data;
    }
  }
)

export const revertUndo = createAsyncThunk(
  'social/revertUndo',
  async (id) => {
    const dataApi = await SocialCardsApi.revertUndo(id);
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
      .addCase(updateSocalDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSocalDetail.fulfilled, (state, action) => {
        state.status = 'idle';
        state.social = action.payload;
      })
      .addCase(revertUndo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(revertUndo.fulfilled, (state, action) => {
        state.status = 'idle';
        state.social = action.payload;
      })
      
  }
});

export const { } = socialSlice.actions;
export const selectSocial = (state) => state.socialCardSlice;
export default socialSlice.reducer;
