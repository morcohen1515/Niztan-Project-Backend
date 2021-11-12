const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// this would verify te user's token from header
const verifyToken = require('../middleware/verifytoken').verifyToken;

//this route will return costs of the specific user
// router.route('/').get( verifyToken, async (req, res) => {
//     const decodeToken = req.userid;

//     //find costs by the given decoded token
//     await Cost.find({"userid": decodeToken})
//     .then(costs => {
//         res.json(costs);
//     })
//     .catch(err => res.status(400).json('Error:' + err));

// });

//this endpoint will add a new cost for the specific user in the DB
// router.route('/add').post( verifyToken, async (req, res) => {

//     const category = req.body.category;
//     const title = req.body.title;
//     const price = Number(req.body.price);
//     const description = req.body.description;
//     const date = new Date();
//     const userid = req.userid;
    
//     const newCost = new Cost({ 
//         category,
//         title,
//         price,
//         description,
//         date,
//         userid
//     });

//      await newCost.save()
//     .then(() => res.status(201).json('Cost added!'))
//     .catch(err => res.status(400).json('Error:' + err));
// });


// this endpoint returns the requested user in order to customize personal info (costs)
router.route('/getuser').get(verifyToken, async(req, res) => {

    const userid = req.userid._id;

    // find User in DB
    await User.findOne({"_id": userid}, {password:0})
    .lean()
    .then(user => {  
        res.json(user);
    })
    .catch(err => res.status(400).json('User Not Found:' + err)
    );
});

router.route('/getlistofemployees').post(verifyToken, async(req, res) => {

    const usertype = req.body.usertype;

    //find costs by the given decoded token
    await User.find({"usertype": usertype})
    .then(users => {
        res.json(users);
    })
    .catch(err => res.status(400).json('Error:' + err));
});


router.route('/deleteuser').post( async(req, res) => {

    const userId = req.body.userid;

    //Delete user by user id
    await User.deleteOne({"_id": userId})
    .then(users => {
        res.json(users);
    })
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/register').post( verifyToken, async (req, res) => {

    const usertype = req.body.usertype;
    const id = req.body.id;
    const name = req.body.name;
    const password = req.body.password;
    const bday = req.body.bday;
    const city = req.body.city;
    const phonenumber = req.body.phone;
    const emergencyphonenumber = req.body.emergencyphonenumber;
    const email = req.body.email;
    
    const newUser = new User({ 
        usertype,
        id,
        name,
        password,
        bday,
        city,
        phonenumber,
        emergencyphonenumber,
        email,
    });

     await newUser.save()
    .then(() => res.status(201).json('User added!'))
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/login').post( async (req, res) => {

    const {id, password} = req.body;

    // if(!id || typeof username !== 'string' || !password || typeof password !== 'string'){
    //     return res.json({ formError });
    // }

    //username and password authentication
    await User.findOne({id})
        .lean()
        .then(user => {   

            if(user.password !== password) {

                res.status(401).json({})

            } else {

                let token = jwt.sign(
                    {_id: user._id},
                    process.env.SECRET,
                    {expiresIn: "60mins"}
                    )
                res.json({token: token, usertype: user.usertype});
            }
        })
        .catch(err => res.status(400).json({}));

});

module.exports = router;