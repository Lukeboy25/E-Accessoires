import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { Reducers } from './reducers';

export type TypedDispatch = ThunkDispatch<Reducers, unknown, AnyAction>;
export type ReducerGetter = () => Reducers;

export const useTypedDispatch = (): TypedDispatch => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<Reducers> = useSelector;
