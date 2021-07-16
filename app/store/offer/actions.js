import HttpService from '../../services/HttpService';
import { OFFER } from './types';

export function setOffer(offer) {
  return {
    type: OFFER,
    offer: offer,
  };
}

const getOfferByUuid = (offerUuid, language) => async (dispatch) => {
  const httpService = new HttpService(language);

  return await httpService.get(`offers/${offerUuid}`);
};

export const checkStockForOffer = (offerUuid, language) => async (dispatch) => {
  const offer = await dispatch(getOfferByUuid(offerUuid, language));

  if (offer.stock.correctedStock === 0) {
    return true;
  }

  return false;
};
