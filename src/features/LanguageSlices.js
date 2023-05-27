import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFrench = createAsyncThunk(
  'lingage/fetchFrench',
  async ( thunkAPI) => {
    try {
      const response = await fetch('/frenchData.json');
      const data = await response.json();

      if (response.status === 200) {
        return data ;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchFrench.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchFrench.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.socialNetwork = payload.socialNetwork;
      state.menu = payload.menu;
      state.banner = payload.banner;
      state.works = payload.works;
      state.skills = payload.skills;
      state.timeLine = payload.timeLine;
      state.contact = payload.contact;
    },
    [fetchFrench.rejected]: (state) => {
      console.log('fetchFrench');
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = languageSlice.actions;

export const languageSelector = (state) => state.language;
