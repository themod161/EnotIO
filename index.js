const request = require("request-promise")
const crypto = require("crypto")
let url = `https://enot.io/request/`

const PaySystem = Object.freeze({
    QIWI: "qw",
    BANK_CARD: "cd",
    UMONEY: "ya",
    Advcash: "ad",
    PERFECT_MONEY: "pm"
})
const S = [
    "amount", "oa",
    "payment_id", "o",
    "currency", "cr",
    "appointment", "c",
    "webhook", "cf",
    "payment_method", "p",
    "redirect", "ap",
    "success_url", "success_url",
    "fail_url", "fail_url"
]
class WithdrawRequest {
    constructor() {
        this.service = undefined
        this.wallet = undefined
        this.amount = undefined
        this.orderid = undefined
        this.card_holder = undefined
        this.api_key = undefined
        this.email = undefined
    }
}
class GenerateForm {
    constructor() {
        this.amount = 1.0
        this.payment_id = null
        this.currency = "RUB"
        this.appointment = "Purchase in shop"
        this.webhook = 0
        this.payment_method = 0
        this.redirect = 0
        this.success_url = 0
        this.fail_url =  0
    }
}
class EnotIO {
    constructor(params) {
        this.baseUrl = `https://enot.io/request`;
        this.enot = params
        this.secret_key = this.enot.secret_key
        this.merchant_id = this.enot.merchant_id
        this.api_key = this.enot.api_key
        this.email = this.enot.email
    }
    async _callGetApi(url, query) {
        let response = JSON.parse(await request({
            url: url,
            qs: query
        }))
        if (response.status === "error" || response.status === "fail")
            throw `Error: ${response.message}`
        return response
    }
    async getBalance() {
        return this._callGetApi(`${this.baseUrl}/balance`,
            {api_key: this.api_key, email: this.email}
        )
    }
    /**
     *
     * @param {WithdrawRequest} withdrawRequest
     * @return {Promise<*>}
     */
    async withDraw(withdrawRequest) {

        withdrawRequest.api_key = this.api_key;
        withdrawRequest.email = this.email;

        return await this._callGetApi(
            `${this.baseUrl}/payoff`,
            withdrawRequest
        )
    }
    /**
     * @param id : number
     * @return {Promise<*>}
     */
    async getPaymentById(id) {
        return await this._callGetApi(
            `${url}payoff`,
            {
                api_key: this.api_key,
                email: this.email,
                id: id
            }
        )
    }
    /**
     * @param orderid : number
     * @return {Promise<*>}
     */
    async getPaymentByOrderId(orderid) {
        return await this._callGetApi(
            `${url}payoff`,
            {
                api_key: this.api_key,
                email: this.email,
                orderid: orderid
            }
        )
    }
    async getPaymentMethods() {
        return JSON.parse(await request({
            url: `${url}payment-methods`,
            qs: {merchant_id: this.merchant_id, secret_key: this.secret_key}
        }))
    }
    /**
     * @param {GenerateForm} GenerateForm
     * @return {Promise<*>}
     */
    async generateLink(GenerateForm) {
        if (GenerateForm.payment_id === undefined) GenerateForm.payment_id = Date.now();
        if (GenerateForm.currency === undefined) GenerateForm.currency = "RUB";
        let hash = crypto.createHash("md5").update(`${this.merchant_id}:${GenerateForm.amount}:${this.secret_key}:${GenerateForm.payment_id}`).digest("hex");
        let str = Object.keys(GenerateForm).map(k => `${S[S.findIndex(x=> `${x}` === `${k}`)+1]}=${encodeURIComponent(GenerateForm[k])}`).join('&');
        return `https://enot.io/pay?m=${this.merchant_id}&s=${hash}&`+str;
    }
}
module.exports = {EnotIO, PaySystem}