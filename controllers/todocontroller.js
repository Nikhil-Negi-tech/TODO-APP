const { v4: uuidv4 } = require('uuid');


let todos = [];

module.exports.getGetTodos = (req, res, next) => {
    res.send(todos);
}

module.exports.postAddTodo = (req, res) => {
    const {name} = req.body;
    todos.push({
        id: uuidv4(),
        name});
    res.redirect('/gettodos');
}

module.exports.postDeleteTodo = (req, res) => {
    const {id} = req.body;
    todos = todos.filter((task)=>{
        if(task.id == id) return false;
        return true;
    })
    res.redirect('/gettodos');
}

module.exports.getIncreasePriority = (req, res) => { 
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
}

module.exports.getDecreasePriority = (req, res) => { 
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
}
