const express = require('express')
const router = express.Router();
const db = require('../models')


//sends back a user with a specific auth ID
//only works with twitter for now
router.get('/reviewUser/:authID', async (req, res)=> {
    const authID = req.params.authID

    const user = await db.User.findAll({
        where: {
            TWIT_ID: authID
        }
    })
    res.send(user)
})


module.exports = router