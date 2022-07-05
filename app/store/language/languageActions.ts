import { Dispatch } from 'redux';

import { Language } from '../../types/languageTypes';
import { setLanguage } from './languageReducer';

export const switchLanguage = (language: Language) => (dispatch: Dispatch): void => {
    dispatch(setLanguage(language));
};
