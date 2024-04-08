var express = require('express');
var router = express.Router();

// router.post("/log" , (req , res, next ) =>{
//     console.log(req.body)
//
//     var username = req.body.u_name;
//     var password = req.body.p_word;
//     if(username && password) {
//         var checkUserExist = `SELECT * FROM users WHERE (username , password) = ('${username}','${password}')`;
//         connection.query(checkUserExist, function (error, data) {
//             if (data.length > 0) {
//                 for (var count = 0; count < data.length; count++) {
//                     if (data[count].password == password) {
//                         request.session.user_id = data[count].user_id;
//
//                         response.redirect("/");
//                     }
//                 }
//             }
//         });
//     });
router.get('/users/admin-login',(req , res) =>{
    res.render('admin-login');
})



module.exports = router;
