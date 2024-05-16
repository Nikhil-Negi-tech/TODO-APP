const path = require('path');
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let todos = [];

router.get('/gettodos', (req, res, next) => {
    res.send(todos);
});
router.post('/addtodo', (req, res) => {
    const {name} = req.body;
    todos.push({
        id: uuidv4(),
        name});
    res.redirect('/gettodos');
});
router.post('/deletetodo', (req, res) => {
    const {id} = req.body;
    todos = todos.filter((task)=>{
        if(task.id == id) return false;
        return true;
    })
    res.redirect('/gettodos');
});

router.get('/increasepriority', (req, res) => { 
    const {id} = req.query;
    let indx;
    todos.forEach((e,i)=>{
        if(e.id == id){
            indx = i;
        }
    })
    console.log(indx);
    let temp = todos[indx];
    todos[indx] = todos[indx-1];
    todos[indx-1] = temp;
    res.redirect('/gettodos');
   });
router.get('/decreasepriority', (req, res) => { 
    const {id} = req.query;
    let indx;
    todos.forEach((e,i)=>{
        if(e.id == id){
            indx = i;
        }
    })
    console.log(indx);
    let temp = todos[indx];
    todos[indx] = todos[indx+1];
    todos[indx+1] = temp;
    res.redirect('/gettodos');
   });

module.exports = router;
