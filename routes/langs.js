const express = require('express')
const router = express.Router()
const FUNCs = require('../functions/langs')


router.get('/',FUNCs.all)
router.get('/q',FUNCs.q)
router.get('/:id',FUNCs.id)


module.exports = router