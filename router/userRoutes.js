const express = require('express')
const router = express.Router();
const db = require('../models')

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