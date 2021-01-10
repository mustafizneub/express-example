const express = require('express');

const router = express.Router();

const saleModel = require('../models/sales');
const { route } = require('./userController');

router.post('/save', async (req,res,next)=>{
    const doc = new saleModel(req.body)
    await doc.save(function (err){
        if(err) next(err)
    })

    res.status(201).json({
        statusCode:201,
        message:'Successfully added',
        body:doc
    })
})

router.get('/:email', async (req, res,next)=>{
    await saleModel.find({email:req.params.email},(err,doc)=>{
        if(err) next(err)
        res.status(200).json({
            statusCode:200,
            message:'Successfully Read',
            body:doc
        })
    }).lean()
})

router.delete('/:id',async (req,res,next)=>{
    await saleModel.findByIdAndDelete(req.params.id,{},(err,doc)=>{
        if(err) next(err)
        res.status(200).json({
            statusCode:200,
            message:'successfully deleted',
            body:doc
        })
    })
})

module.exports = router;