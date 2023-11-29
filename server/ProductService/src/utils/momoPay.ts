import axios from "axios";
import * as crypto from 'crypto'

export const momoPay = async (amount, description, userId, invoiceNumber) => {
    try {
        var partnerCode = "MOMO";
        const accessKey = 'F8BBA842ECF85'
        const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz'
        var requestId = partnerCode + new Date().getTime();
        var orderId = requestId;
        var orderInfo = description;
        var redirectUrl = "https://momo.vn/return";
        // var ipnUrl = "https://callback.url/notify";
        var ipnUrl = redirectUrl = `http://localhost:3000/pay-result/${userId}/${invoiceNumber}`;
        var notifiUrl = "http://localhost:8080/api/v1/products/invoices/pay-result";
        // var requestType = "captureWallet"
        var requestType = "payWithMethod"
        var extraData = ""; //pass empty value if your merchant does not have stores

        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
        //signature
        var signature = crypto.createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: requestId,
            amount: amount.toString(),
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            extraData: extraData,
            requestType: requestType,
            signature: signature,
            notifiUrl: notifiUrl,
            lang: 'en'
        });
        //Create the HTTPS objects
        const options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            }
        }
        const result = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            }
        })

        return result.data
    } catch (error) {
        throw error
    }

}