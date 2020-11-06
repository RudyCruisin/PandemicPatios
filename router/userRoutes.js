const express = require('express')
const router = express.Router();
const db = require('../models')


//sends back a user with a specific auth ID
//only works with twitter for now
router.get('/reviewUser/:authID/:strat', async (req, res)=> {
    const authId = req.params.authID
    const authStrat = req.params.strat

    const user = await db.User.findAll({
        where: {
            authId,
            authStrat
        }
    })
    res.send(user)
})


module.exports = router