const express = require('express')
const router = express.Router()
const {signup , login} = require('../controllers/userControllers')
const passport = require('passport')

router.route('/signup').post(signup)

router.route('/login').post(login)

router.get('/login/success', (req, res) => {
    console.log('here from success', req.user)
    if (req.user) {
        console.log(`this is req.user ${req.user}`);
        res.status(201).json({ success: true, message: 'Success', currentUser: req.user });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


router.get('/login/failed',(req,res)=>{
    console.log('here from failed')
    res.status(401).json({success : false , meesage : 'Unautharized'})
})

router.get('/logout' , (req , res)=>{
    req.logout()
    res.redirect('http://localhost:5173/login')
})

router.get('/google',passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback' , passport.authenticate('google' ,{
    successRedirect : 'http://localhost:5173/',
    failureRedirect : '/login/failed'
}))

module.exports = router