const express = require('express');
const router = express.Router();
const Model = require('../models/model');


// Post
router.post('/add',async (req,res)=>{
    const newPost = new Model({
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        contact : req.body.contact
    })

    try{
        const result =  await newPost.save();
        res.status(200).json(result)
    }catch(error){
        res.status(400).json({message : error.message})
    }
})

// Get
router.get('/get',async (req,res)=>{
    try{
        const result =  await Model.find();
        res.status(200).json(result)
    }catch(error){
        res.status(400).json({message : error.message})
    }
})

router.get('/get/:id',async (req,res)=>{
    const id = req.params.id
    try{
        const result =  await Model.findById(id);
        res.status(200).json(result)
    }catch(error){
        res.status(400).json({message : error.message})
    }
})

// Patch
router.put('/edit/:id',async (req,res)=>{
    const id = req.params.id
    try{
        const body = req.body;
        const options = {new : true};
        const result =  await Model.findByIdAndUpdate(id,body,options);
        res.send(result)
    }catch(error){
        res.status(400).json({message : error.message})
    }
})

// Delete
router.delete('/delete/:id',async (req,res)=>{
    const id = req.params.id
    try{
        const result =  await Model.findByIdAndDelete(id);
        res.status(200).json(result)
        res.send(`Deleted Post with id ${id}`)
    }catch(error){
        res.status(400).json({message : error.message})
    }
})


module.exports = router;