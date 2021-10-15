# Description

Library for using the EnotIO payment system for NodeJS

## Installation

```bash
npm i enotIO
```

## Usage

```javascript
const {EnotIO} = require('enotIO');

let enot = new EnotIO({
    merchant_id: YOUR_MERCHANT_ID,
    secret_key: YOUR_SECRET_KEY,
    api_key: YOUR_API_KEY,
    email: YOUR_EMAIL_ADDRESS
});
```

## Metods

### getBalance - Get an available balance on the site
```javascript
let balance = await enot.getBalance();
```
> [Output] { status: 'success', balance: '0.00', balance_freeze: '0.00' }

### withDraw - Withdrawal from the site
```javascript
let result = await enot.withDraw(service, wallet, amount, orderid, card_holder);
```
> [Output] { status: 'success', balance: 0.00, id: 1234}

- service - code of service. Check more [here](https://enot.io/en/knowledge/payment-methods-codes)
- wallet - wallet number for withdrawal
- amount - withdrawal amount. Minimal amount check [here](https://enot.io/en/knowledge/payoff#payoff_service)
- orderid - payout number in your system (unique). Optional
- card_holder - сardholder's name. If the service is a card

### getPay - Payment information by id or orderid
```javascript
let result = await enot.getPay(id/orderid);
```
> [Output] {"transaction_id":52406,"status":"success","service":"qw","wallet":"79192131245","sum":"50.00","commission":"2.00"}
- id - payment number in the payment system service
- orderid - payment number in the your service
### getPaymentMethods - Obtaining information about the available methods of replenishment / withdrawal of your cash register
```javascript
let result = await sender.getPaymentMethods()
```
>[Output] {"status":"success","methods":{"qw":{"cm":"3.00","min":"1.00"},"cd":{"cm":"6.00","min":"45.00"},"ya":{"cm":"3.00","min":"10.00"},"pa":{"cm":"4.00","min":"1.00"},"pm":{"cm":"3.00","min":"1.00"}}}

### generateLink - Generating a link to a payment form
```javascript
let link = sender.generateLink(amount, appointment, payment_id, currency,  webhook, payment_method, redirect, success_url, fail_url);
```
- amount - amount of payment
- appointment - purpose of payment. Default - "Purchase in a shop"
- payment_id - payout number in your system (unique). Default - Date.now()
- currency - Payment currency (RUB, USD, EUR, UAH) (Default RUB)
- webhook - A string that will be returned to notifications after payment (webhook, callback) (Can be passed as an array). Default - null
- payment_method - Initially set the payment method. Default - 0
- redirect - Forwarding directly to the payment system (Currently available only for QIWI). Default - 0
- success_url - Link to redirect on success. Default - null
- fail_url - Link to redirect on fail. Default - null

## License
[MIT](https://choosealicense.com/licenses/mit/)
