import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Language } from '../../types/languageTypes';
import { AsyncReduxState, initialAsyncReduxState } from '../AsyncReduxState';

export type LanguageState = AsyncReduxState<{
    language: Language;
}>

const initialState: LanguageState = {
    ...initialAsyncReduxState,
    language: 'NL',
};

export const languageSlice = createSlice({
    name: 'languageReducer',
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>): LanguageState {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
        setIsSuccessful(state, action: PayloadAction<boolean>): LanguageState {
            return {
                ...state,
                isSuccessful: action.payload,
            };
        },
        setLanguage(state, action: PayloadAction<Language>): LanguageState {
            return {
                ...state,
                language: action.payload,
            };
        },
    },
});

export const {
    setIsLoading,
    setIsSuccessful,
    setLanguage,
} = languageSlice.actions;

export default languageSlice.reducer;
