var jwt = require('jwt-simple');
module.exports = function(req, res) {

    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'Neces razbojnice'
        });

    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, "secret");
    if (!payload.sub) {
        res.status(401).send({
            message: 'Niste autorizirani'
        });
    }


    res.json(bonovi);
}
var bonovi = [
    'VIP',
    'Tele2',
    'Simpa'
];