const express = require("express");

const { signup, getBill,smsMessage,smsOtp} = require("../controllers/appController.js");

const router = express.Router();

// /api/user/signup
router.post("/user/signup", signup);

router.post("/user/otp",smsMessage);
router.get("/user/otp/:MobNo",smsOtp);


// /api/product/get-the-bill
router.post("/product/get-the-bill", getBill);

// router.post('/firebase/notification',firebasenotif);
router.get('/',(req,res)=>{
    res.send('We are legion')
});
module.exports = router;