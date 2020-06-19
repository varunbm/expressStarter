const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../mock_Data');
//APIs
// 1) To get all members
router.get('/',(req,res)=>{
    res.json(members);
});

// 2) To get single member
router.get('/:id', (req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        console.log("Error : 400 ")
        res.status(400).json({message:`Requested id ${req.params.id} not found.`})
    }
});

router.post('/',(req,res)=>{
    // res.send(req.body);
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }
    if(!newMember.name || !newMember.email){
        return res.status(400).json({message:'Please include name or email'})
    }
    members.push(newMember);
    res.json(members);
})
module.exports = router;