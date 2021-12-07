const admin = require('../firebase');

exports.authCheck = (req, res, next) => {
    console.log(req.headers);  // we should have here the token that we sent from front end
};

