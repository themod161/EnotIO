# Description

Library for using the EnotIO payment system for NodeJS

## Installation

```bash
npm i @themod/enot-io
```

## Usage
```javascript
const {EnotIO, PaySystem} = require('@themod/enot-io');

let enot = new EnotIO({
    merchant_id: YOUR_MERCHANT_ID,
    secret_key: YOUR_SECRET_KEY,
    api_key: YOUR_API_KEY,
    email: YOUR_EMAIL_ADDRESS
});
```
>PaySystem - Needed to choose a payment system. Example: 
> ```javascript
> enot.withDraw({
>   service: PaySystem.QIWI,
>   wallet: `79196211213`,
>   amount: 10
> });
>
> Withdraw to Qiwi system.
>```
> 

## Metods

### getBalance - Get an available balance on the site
```javascript
enot.getBalance();
```
> [Output] { status: 'success', balance: '0.00', balance_freeze: '0.00' }

### withDraw - Withdrawal from the site

```javascript
enot.withDraw({
  service: service, 
  wallet: wallet, 
  amount: amount, 
  orderid: orderid, 
  card_holder: card_holder
});
```
> [Output] { status: 'success', balance: 0.00, id: 1234}

- service - code of service. Check more [here](https://enot.io/en/knowledge/payment-methods-codes). You can also choose from the list if you connect PaySystem
- wallet - wallet number for withdrawal
- amount - withdrawal amount. Minimal amount check [here](https://enot.io/en/knowledge/payoff#payoff_service)
- orderid - payout number in your system (unique). Optional
- card_holder - сardholder's name. If the service is a card

### getPaymentById/getPaymentByOrderId - Payment information by id/orderid
```javascript
enot.getPaymentById(id);
enot.getPaymentByOrderId(orderid);
```
> [Output] {"transaction_id":52406,"status":"success",
> "service":"qw","wallet":"79192131245","sum":"50.00","commission":"2.00"}
> 
- id - payment number in the payment system service
- orderid - payment number in the your service
### getPaymentMethods - Obtaining information about the available methods of replenishment / withdrawal of your cash register
```javascript
enot.getPaymentMethods()
```
>[Output] {"status":"success","methods":{"qw":{"cm":"3.00","min":"1.00"},"cd":{"cm":"6.00","min":"45.00"},"ya":{"cm":"3.00","min":"10.00"},"pa":{"cm":"4.00","min":"1.00"},"pm":{"cm":"3.00","min":"1.00"}}}

### generateLink - Generating a link to a payment form
```javascript
enot.generateLink({amount: YOUR_AMOUNT, appointment: YOUR_APPOINTMENT, payment_id: YOUR_PAYMENT_ID, currency: YOUR_CURRENCY, webhook: YOUR_WEBHOOK_URL, payment_method: YOUR_PAYMENT_METHOD, redirect: 0/1, success_url: YOUR_SUCCESS_URL, fail_url: YOUR_FAIL_URL});
```
- amount - amount of payment. (required)
- appointment - purpose of payment. 
- payment_id - payout number in your system (unique). Default - Date.now()
- currency - Payment currency (RUB, USD, EUR, UAH) (Default RUB)
- webhook - A string that will be returned to notifications after payment (webhook, callback) (Can be passed as an array). Default - null
- payment_method - Initially set the payment method. Default - 0
- redirect - Forwarding directly to the payment system (Currently available only for QIWI). Default - 0
- success_url - Link to redirect on success. Default - null
- fail_url - Link to redirect on fail. Default - null


# Important
## If you use async function use `await`. Example:
```javascript
let result = await enot.getPaymentMethods().catch(error => {
    console.log(error)
})
```
## Else use `then` and `catch`. Example:
```javascript
enot.withDraw({
  service: service,
  wallet: wallet,
  amount: amount,
  orderid: orderid,
  card_holder: card_holder
}).then(response => {
    console.log(response)
}).catch(error => {
    console.log(error)
})
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
