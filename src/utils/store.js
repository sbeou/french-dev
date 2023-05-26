import { configureStore } from '@reduxjs/toolkit';
import { languageSlice } from '../features/LanguageSlices';
export default configureStore({
  reducer: {
    language: languageSlice.reducer,
  },
});