const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// const user = new mongoose.model('users', userSchema);
router.post('/save', async (req, res, next) => {
    const doc = new userModel(req.body)
    doc.userID = doc._id
    await doc.save((err, doc)=>{
        if (err) next(err)
        res.status(201).json({
            statusCode: 201,
            message: 'Successfully added data',
            body:doc
        })
    })

})

router.get('/:id', async (req, res, next) => {
    await userModel.findOne({ _id: req.params.id }, function (err, person) {
        if (err) {
            next(err);
        }
        res.status(200).json({
            statusCode: person ? 200 : 204,
            body: person ? person : 'No Content Found'
        });
    }).lean();
})

router.delete('/:id', async (req, res, next) => {
    if (!req.params.id) {
        res.status(404).json({
            statusCode: 404,
            message: 'Id must be given',
        })
    } else {
        await userModel.deleteOne({ _id: req.params.id }, function (err, obj) {
            if (err) {
                next(err)
            }
            res.status(200).json({
                statusCode: 200,
                message: 'Deleted Successfully',
                body: obj
            })
        })
    }

})

router.patch('/update/:id', async (req, res, next) => {
    await userModel.updateOne({ _id: req.params.id }, req.body, function (err, result) {
        if (err) {
            next(err)
        }
        res.status(200).json({
            statusCode: 200,
            message: 'Successfuly Updated',
            body: result
        })
    })
})

module.exports = router;
