const admin = require('../firebase');

exports.authCheck = async (req, res, next) => {
    console.log("request headers: ", req.headers);  // we should have here the token that we sent from front end
    try {
         
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);        
        req.user = firebaseUser;
        next();
    }
    catch (err){
        console.log("err",err)
        res.status(401).json({
            err: "Invalid or expired Token"
        })
    }
};

