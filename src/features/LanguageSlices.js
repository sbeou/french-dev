import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getLanguage = (languageConfig) => {
  return languageConfig
}

export const fetchDataLanguage = createAsyncThunk(
  'language/fetchDataLanguage',
  async (setLanguage, thunkAPI) => {
    try {
      let dataLanguageJson
      if(setLanguage === 'french') {
        dataLanguageJson = "/data/frenchData.json"
      }
      else if(setLanguage === 'portugues') {
        dataLanguageJson = "/data/portuguesData.json"
      }
      else {
        dataLanguageJson = "/data/englishData.json"
      }
      const response = await fetch(dataLanguageJson);
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
    [fetchDataLanguage.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchDataLanguage.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.socialNetwork = payload.socialNetwork;
      state.menu = payload.menu;
      state.banner = payload.banner;
      state.works = payload.works;
      state.skills = payload.skills;
      state.timeLine = payload.timeLine;
      state.contact = payload.contact;
      state.allCat = payload.allCat;
    },
    [fetchDataLanguage.rejected]: (state) => {
      console.log('fetchDataLanguage');
      state.isFetching = false;
      state.isError = true;
    },
    [getLanguage.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.languageConfig = payload.languageConfig;
    },
  },
});

export const { clearState } = languageSlice.actions;

export const languageSelector = (state) => state.language;
