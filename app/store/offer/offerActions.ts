import { OfferViewModel } from '../../entities/Offer/Offer';
import HttpService from '../../services/HttpService';
import { OFFER } from './offerTypes';
import { Dispatch } from 'redux';

export function setOffer(offer: OfferViewModel) {
  return {
    type: OFFER,
    offer,
  };
}

const getOfferByUuid = (offerUuid: string, language: string) => async ()=> {
  const httpService = new HttpService(language);

  return httpService.get(`offers/${offerUuid}`);
};

export const checkStockForOffer = (offerUuid: string, language: string) => async (dispatch: Dispatch): Promise<string> => {
  const offer = await dispatch(getOfferByUuid(offerUuid, language));

  if (offer.stock.correctedStock === 0) {
    return `Let op! De voorraad van ${offer.store.productTitle} is opgeraakt!`;
  }
};
