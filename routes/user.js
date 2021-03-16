const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);
// router.get('/logout', userController.logout);

// router.get('/kakao', passport.authenticate('kakao'));
// router.get('/kakao/callback', passport.authenticate('kakao', {
//     failureRedirect: '/',
// }), (req, res) => {
//     res.redirect('/');
// });

module.exports = router;