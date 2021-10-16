const {EnotIO, PaySystem} = require('./index');
let enot = new EnotIO({
    merchant_id: YOUR_MERCHANT_ID,
    secret_key: YOUR_SECRET_KEY,
    api_key: YOUR_API_KEY,
    email: YOUR_EMAIL_ADDRESS
});

describe("EnotIO tests", () => {

    it("Get Balance",  () => {
        enot.getBalance().then(balance => {
            console.log(balance)
        }).catch(error => {
            console.log(error)
        })
    })

    it('WithDraw', async () => {
        let res = await enot.withDraw({service: PaySystem.QIWI, wallet: "79196211213", amount: 2.52, orderid: 123}).catch(err => {
            console.log(err)
        })
        console.log(res)
    });
    it('getPaymentById', async () => {
        let res = await enot.getPaymentById(YOUR_PAYMENT_ID).catch().catch(err => {
            console.log(err)
        })
        console.log(res)
    });
    it('getPaymentById', async () => {
        let res = await enot.getPaymentByOrderId(YOUR_PAYMENT_ORDER_ID).catch(err => {
            console.log(err)
        })
        console.log(res)
    });
    it('getPaymentMethods', async () => {
        let res = await enot.getPaymentMethods().catch(err => {
            console.log(err)
        })
        console.log(res)
    });
    it('Generate Link', async () => {
        let link = await enot.generateLink({
            amount: YOUR_AMOUNT
        }).catch(err => {
            console.log(err)
        })
        console.log(link);
    });
})

