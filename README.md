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
    merchant_id: 4519,
    api_key: "37296e97e4971073e9d3392feeba762a",
    email: "deadim03123@gmail.com"
});
```

## Metods

getBalance() - Get an available balance on the site
```javascript
let balance = await enot.getBalance();
[Output] { status: 'success', balance: '0.00', balance_freeze: '0.00' }
```



withDraw(service, wallet, amount, orderid, card_holder) - Withdrawal from the site
```javascript
let result = await enot.withDraw(service, wallet, amount, orderid, card_holder);
[Output] { status: 'success', balance: 0.00, id: 1234}
```
- service - code of service. Check more [here](https://enot.io/en/knowledge/payment-methods-codes)
- wallet - wallet number for withdrawal
- amount - withdrawal amount. Minimal amount check [here](https://enot.io/en/knowledge/payoff#payoff_service)
- orderid - payout number in your system (unique). Optional
- card_holder - сardholder's name. If the service is a card



getPay(id/orderid) - Payment information by id or orderid
```javascript
let balance = await enot.withDraw(service, wallet, amount, orderid, card_holder);
[Output] { status: 'success', balance: 0.00, id: 1234}
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
