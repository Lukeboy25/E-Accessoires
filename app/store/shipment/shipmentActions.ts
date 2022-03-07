import { Dispatch } from 'redux';
import HttpService from '../../services/HttpService';
import { SET_IS_LOADING, SHIPMENTS } from './shipmentTypes';

export function setIsLoading(isLoading: boolean) {
  return {
    type: SET_IS_LOADING,
    isLoading,
  };
}

export function setShipments(shipments) {
  return {
    type: SHIPMENTS,
    shipments,
  };
}

export const getShipments = (language: string) => async (dispatch: Dispatch) => {
  dispatch(setIsLoading(true));
  const params = { 'fulfilment-method': 'FBR' };

  const httpService = new HttpService(language);
  const { shipments } = await httpService.get('shipments', { params }).catch((e) => {
    console.error('error while fetching shipments:', e);
  });

  if (!shipments || shipments === undefined) {
    dispatch(setIsLoading(false));

    return dispatch(setShipments([]));
  }

  dispatch(setShipments(shipments));
  dispatch(setIsLoading(false));
};
