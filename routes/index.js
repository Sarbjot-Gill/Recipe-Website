var express = require('express');
var router = express.Router();

var mysql = require("mysql");

const {application, response} = require("express");
const multer = require("multer");
var nodemailer = require('nodemailer');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database: "recipe"
});
router.get("/" ,(req , res ) => {
    res.render("index");
})

connection.connect(function (error) {
  if (error) throw error;
  console.log("Database Connection Created");
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const mimeExtension = {
            'image/jpeg': '.jpeg',
            'image/jpg': '.jpg',
            'image/png': '.png',
            'image/gif': '.gif',
        }
        cb(null, file.fieldname + '-' + Date.now() + mimeExtension[file.mimetype]);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log(file.mimetype)
        if(file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/gif') {
            cb(null, true);
        } else {
            cb(null, false);
            req.fileError = 'File format is not valid';
        }
    }
})




router.get('/login', function(req, res, next){
  res.render('login', {
    title: 'Login',
    email: '',
    password: ''
  })
})

router.get("/about", (req, res) => {
    if (req.session.loggedin) {
        res.render('about', {
            title:"Dashboard",
            name: req.session.name,
        });
    } else {
        req.flash('success', 'Please login first!');
        res.redirect('/login');
    }
})


router.get("/user-recipe", (req, res) => {
    if (req.session.loggedin) {
        res.render('user-recipes', {
            title:"Dashboard",
            name: req.session.name,
        });
    } else {
        req.flash('success', 'Please login first!');
        res.redirect('/login');
    }
})
// router.get('/home', function(req, res, next) {
//   if (req.session.loggedin) {
//       var readData = `SELECT id, username, type, name, recipe FROM upload`;
//       connection.query(readData, function (error , results , fields)  {
//           if (error) throw error
//           else{
//               var data=JSON.parse(JSON.stringify(results))
//               console.log(data)
//
//
//               res.render( 'home', {
//         title: "Dashboard",
//         name: req.session.name,
//
//
//
//     });
//
//     }});
//
//   } else {
//     req.flash('success', 'Please login first!');
//     res.redirect('/login');
//
//   }
// });

router.get('/home', function(req, res, next) {
    if (req.session.loggedin) {

        res.render( 'home', {
            title: "Dashboard",
            name: req.session.name,






        })} else {
        req.flash('success', 'Please login first!');
        res.redirect('/login');

    }
});

// router.get("/get-users-data", (req, res) => {
//     var readData = ` SELECT * FROM upload`;
//     // var readData = `SELECT username, email, address FROM users`;
//     connection.query(readData, (error, data) => {
//         if (error) throw error;
//         res.send(data);
//         console.log(readData);
//     });
// });



router.get("/signup", (req, res) => {
  res.render("signup")
})
router.post("/sign",(req , res) =>{
  console.log(req.body)
  var username = req.body.u_name;
  var email = req.body.email;
  var password = req.body.p_word;
  var confirm_password = req.body.cp_word;


  if (password != confirm_password) {
    // res.send("notsame");
      req.flash('error', 'Password does not match');
    res.redirect("signup")
  } else {
    var checkUserExist = `SELECT * FROM users WHERE username="${username}"`;
    connection.query(checkUserExist, function (error, data) {
      if (error) throw error;
      if (data.length > 0) {
        // res.send("exist");
          req.flash('error', 'user alreadu exits');
          res.redirect('signup');
        // console.log("exist");
      } else {
        var insertSQL = `INSERT INTO users(Username, password, email)
                      VALUES('${username}','${password}','${email}')`;

        connection.query(insertSQL, function (error) {
          if (error) throw error;
          // res.render("login");
          // console.log("done");
            req.flash('success', 'SignUp SuccessFull PLs Login');
            res.redirect('signup');





        });
      }
    });
  }
})



router.post("/log" , (req , res, next ) =>{
    console.log(req.body)

    var username = req.body.u_name;
    var password = req.body.p_word;
    if(username && password) {
        var checkUserExist = `SELECT * FROM users WHERE (Username , password) = ('${username}','${password}')`;
        connection.query(checkUserExist, function (error, data) {
            if (data.length > 0) {

                req.session.loggedin = true;
                req.session.name = username;
                res.redirect('/home');

                }
            else {
                req.flash('error', 'Please correct enter email and Password!')
                res.redirect('/login')
            }
            }
        )}

    });

router.get('/logout', function (req, res) {
    req.session.destroy();

    res.redirect('/login');
});

router.post("/upload",(req , res) => {
    console.log(req.body)
    console.log(req.body);
    const username = req.body.dog;
    const recipeName = req.body.ez;
    const recipeE = req.body.recipe;
    const cat = req.body.ind;


    const insertSQL = `INSERT INTO upload( username, ingredients, name, recipe)
                      VALUES('${username}','${cat}','${recipeName}','${recipeE}')`;
        connection.query(insertSQL, function (error) {
                if (error) throw error;
                res.redirect('/user-recipe');
                console.log("done");
            })

})



// router.post('/upload', function(req, res) {
//     console.log(req.body);
//     const username = req.body.dog;
//     const recipeName = req.body.ez;
//     const recipeE = req.body.recipe;
//     const cat = req.body.cat;
//
//     let sampleFile;
//     let uploadPath;
//
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }
//
//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     sampleFile = req.files.sampleFile;
//     uploadPath = __dirname + '/upload/' + sampleFile.name;
//
//
//     // var insertSQL = `INSERT INTO upload( username, type, name, recipe, file)
//     //                   VALUES('${username}','${cat}','${recipeName}','${recipeE}','${sampleFile.name}')`;
//
//     // Use the mv() method to place the file somewhere on your server
//     sampleFile.mv(uploadPath, function(err) {
//         if (err)
//             return res.status(500).send(err);
//         else {
//             var insertSQL = `INSERT INTO upload( username, type, name, recipe, file)
//                       VALUES('${username}','${cat}','${recipeName}','${recipeE}','${sampleFile.name}')`;
//
//             connection.query(insertSQL, function (error) {
//                 if (error) throw error;
//                 res.redirect('/home');
//                 console.log("done");
//
//
//
//
//             });
//
//
//         }
//
//
//     });
// });
router.get('/admin-login',(req , res) =>{
    res.render('admin-login');
})
router.get('/admin-logout', function (req, res) {
    req.session.destroy();

    res.redirect('/admin-login');
});

router.post("/adlog" , (req , res, next ) =>{
    console.log(req.body)

    var username = req.body.u_name;
    var password = req.body.p_word;
    if(username && password) {
        var checkUserExist = `SELECT * FROM admin WHERE (Username , password) = ('${username}','${password}')`;
        connection.query(checkUserExist, function (error, data) {
                if (data.length > 0) {

                    req.session.loggedin = true;
                    req.session.name = username;
                    res.redirect('/admin-home');

                }
                else {
                    req.flash('error', 'Please correct enter email and Password!')
                    res.redirect('/admin-login')
                }
            }
        )}

});

router.get('/admin-home', function(req, res, next) {
    if (req.session.loggedin) {

        res.render( 'admin-home', {
                    title: "Dashboard",
                    name: req.session.name,






    })} else {
        req.flash('success', 'Please login first!');
        res.redirect('/admin-login');

    }
});


router.get('/admin-logout', function (req, res) {
    req.session.destroy();

    res.redirect('/admin-login');
});

router.get('/admin-users', function(req, res, next) {
    if (req.session.loggedin) {

        res.render( 'admin-users', {
            title: "Dashboard",
            name: req.session.name,






        })} else {
        req.flash('success', 'Please login first!');
        res.redirect('/admin-login');

    }
});


// router.get('/admin-users', function(req, res, next) {
//     if (req.session.loggedin) {
//         var readData = `SELECT  username,   FROM upload`;
//         connection.query(readData, function (error , results , fields)  {
//             if (error) throw error
//             else{
//
//
//                 res.render( 'admin-users', {
//                     title: "Dashboard",
//                     name: req.session.name,
//                     data: req._results,
//
//
//                 });
//
//             }});
//
//     } else {
//         req.flash('success', 'Please login first!');
//         res.redirect('/admin-login');
//
//     }
// });

router.get("/get-users-data", (req, res) => {
    var readData = `// SELECT * FROM users`;
    var readData = `SELECT username, email FROM users`;
    connection.query(readData, (error, data) => {
        if (error) throw error;
        res.send(data);
    });
});

router.get("/delete-user", (req, res) => {
    // console.log(req.query);
    var username = req.query.abc;

    var deleteSQL = `DELETE FROM users WHERE username="${username}"`;
    connection.query(deleteSQL, (error) => {
        if (error) throw error;
        res.send("1 Row Deleted.");
    });
})


router.post("/update-user-action", (req, res) => {
    console.log(req.body);

    var username = req.body.username;
    var email = req.body.email;


    var updateSQL = `UPDATE users SET email="${email}" WHERE username="${username}"`
    connection.query(updateSQL, (error) => {
        if (error) throw error;
        res.send("Data Updated.");
    });
})

router.get("/get-upload", (req, res) => {
    var readData = `// SELECT * FROM users`;
    var readData = `SELECT id ,username, ingredients, name, recipe FROM upload`;
    connection.query(readData, (error, data) => {
        if (error) throw error;
        res.send(data);
    });
});

router.get("/delete-name", (req, res) => {
    // console.log(req.query);
    var name = req.query.abc;

    var deleteSQL = `DELETE FROM upload WHERE name="${name}"`;
    connection.query(deleteSQL, (error) => {
        if (error) throw error;
        res.send("1 Row Deleted.");
    });
})


router.post("/admin-sign",(req , res) =>{
    console.log(req.body)
    var username = req.body.u_name;
    var email = req.body.email;
    var password = req.body.p_word;
    var confirm_password = req.body.cp_word;


    if (password != confirm_password) {
        // res.send("notsame");
        // res.send("notsame");
        // res.redirect("signup")
        req.flash('error', 'Password does not match');
        res.redirect("admin-signup")
    } else {
        var checkUserExist = `SELECT * FROM admin WHERE username="${username}"`;
        connection.query(checkUserExist, function (error, data) {
            if (error) throw error;
            if (data.length > 0) {
                // res.send("exist");
                // console.log("exist");
                req.flash('error', 'user alreadu exits');
                res.redirect('admin-signup')
            } else {
                var insertSQL = `INSERT INTO admin(Username, password, email)
                      VALUES('${username}','${password}','${email}')`;

                connection.query(insertSQL, function (error) {
                    if (error) throw error;
                    // res.render("admin-login");
                    // console.log("done");
                    req.flash('success', 'SignUp SuccessFull PLs Login');
                    res.redirect('admin-signup');



                });
            }
        });
    }
})

router.get('/admin-signup',(req , res) =>{
    res.render('admin-signup');
})


// router.post('qq', (req ,res) => {
//     const mail = req.body.email;
//     const msg = req.body.tt;
//     var mailTransport = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: "red",
//             pass: ""
//         }
//     });
//
//     var options = {
//         from:"",
//         to: "",
//         subject: "Testing Email",
//         text: "Hello World!!"
//     };
//     mailTransport.sendMail(options, function (error, response) {
//         if (error) {
//             console.log(error);
//             res.send("Error.")
//         } else {
//             console.log(response);
//             res.send("Email Sent.")
//         }
//     })
// })




module.exports = router;

