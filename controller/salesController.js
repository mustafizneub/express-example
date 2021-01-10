const { json } = require('express');
const express = require('express');

const router = express.Router();

const saleModel = require('../models/sales');
const { route } = require('./userController');

router.post('/save', async (req, res, next) => {
    const doc = new saleModel(req.body)
    doc.doc = doc._id
    await doc.save(function (err) {
        if (err) next(err)
    })

    res.status(201).json({
        statusCode: 201,
        message: 'Successfully added',
        body: doc
    })
})

router.get('/:email', async (req, res, next) => {
    await saleModel.find({ email: req.params.email }, (err, doc) => {
        if (err) next(err)
        res.status(200).json({
            statusCode: 200,
            message: 'Successfully Read',
            body: doc
        })
    }).lean()
})

router.delete('/:id', async (req, res, next) => {
    await saleModel.findByIdAndDelete(req.params.id, {}, (err, doc) => {
        if (err) next(err)
        res.status(200).json({
            statusCode: 200,
            message: 'successfully deleted',
            body: doc
        })
    })
})

router.get('/total/:email', async (req, res, next) => {
    await saleModel.aggregate([
        {
            $match: { email: req.params.email }
        },
        {
            $project:{products:1}
        }
    ]).exec((err, result) => {
        if (err) next(err)
        else {
            let sum = 0;
            for(i=0;i<result[0].products.length;i++){
                sum= sum+ result[0].products[i].quantity*result[0].products[i].price
            }
            result[0].total = sum
            res.status(200).json({
                statusCode: 200,
                message: "read successfully",
                body: result
            })
        }
    })


})

module.exports = router;