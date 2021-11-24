import * as Print from 'expo-print';

export const printShipmentLabel = async (order) => {
    const shipment = order.shipmentDetails;

    const name = `${shipment.firstName} ${shipment.surname}`;
    const address = `${shipment.streetName} ${shipment.houseNumber}`
    const city = `${shipment.zipCode} ${shipment.city}`;
    const country = shipment.countryCode === 'NL' ? 'Nederland' : 'België';
    const orderNumber = order.orderId;
  
    await Print.printAsync({
      html: `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          </head>
          <body style="text-align: left;">
            <p style="font-size: 20px; font-family: Helvetica Neue; font-weight: normal;">
              ${name} <br />
              ${address} <br />
              ${city} <br />
              ${country} <br />
              <b>Bestelnummer:</b> ${orderNumber} <br />
            </p>
          </body>
        </html>
      `,
    });
  }