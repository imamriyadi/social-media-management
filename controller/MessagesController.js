// @ts-nocheck
const { FormatNumberId } = require('../helpers/FormatNumberId');
require("../app");
const checkRegisteredNumber = async function (number) {
    const isRegistered = await client.isRegisteredUser(number);
    return isRegistered;
}

class MessagesController {
    static createMessages(req, res, next) {
        const { phone_number, messages } = req.body;
        const number = FormatNumberId(phone_number);
        if (checkRegisteredNumber(phone_number)) {
            client.sendMessage(number, messages).then((response) => {
                if (response.id.fromMe) {
                    res.send({ status: 'success', message: 'Message successfully sent to ' + number, client: client.info })
                }
            }).catch((err) => {
                res.status(500).send({ status: 'error', message: err.message });
            })
        } else {
            return res.status(422).json({
                status: 'error',
                message: 'The number is not registered'
            });
        }
    }

}


module.exports = MessagesController;