import * as Print from 'expo-print';
import { capitalize, capitalizeLastName } from './capitalize';

export const printShipmentLabel = async (order) => {
    const shipment = order.shipmentDetails;

    const name = `${capitalize(shipment.firstName)} ${capitalizeLastName(shipment.surname)}`;
    const address = `${shipment.streetName} ${shipment.houseNumber} ${shipment.houseNumberExtension}`
    const city = `${shipment.zipCode} ${shipment.city}`;
    const country = shipment.countryCode === 'NL' ? 'Nederland' : 'België';
    const orderNumber = order.orderId;
  
    await Print.printAsync({
      html: `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            <style> 
              @page { 
                margin: 5px;
              } 
            </style>
          </head>
          <body style="text-align: left; width: 100vw; width: 100vw;">
            <p style="font-size: 7vw; font-family: Helvetica Neue; font-weight: normal;">
              ${name} <br />
              ${address} <br />
              ${city} <br />
              ${country} <br />
              <b>Bestelnummer:</b> ${orderNumber} <br />
            </p>
          </body>
        </html>
      `,
      orientation: Print.Orientation.landscape
    },);
  }