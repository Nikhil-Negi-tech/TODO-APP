const addtask = document.getElementById('addtask');
const newtask = document.getElementById('newtask');
const taskList = document.querySelector('.taskList');

function addToDom(todos) {
    taskList.innerText = '';
    todos.forEach(element => {
        // 1. Create a new li element
        let li = document.createElement('li');
        // 2. Update the innerHTML of the li element
        li.innerHTML = `
            <span class="taskname">${element.name}</span>
            <button atrid=${element.id} class="upBtn">↑</button>
            <button atrid=${element.id} class="dwnBtn">↓</button>
            <button atrid=${element.id} class="delBtn">❌</button>
            `
        // 3. Append the li element to the tasklist
        taskList.appendChild(li);
    });
}

axios.get('/gettodos')
    .then((res) => {
        let todos = res.data;
        addToDom(todos);
    })
    .catch((err) => {
        console.log(err);
    });

addtask.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log(`You tried to submit a task`);
    axios.post('/addtodo',{
        name: newtask.value
    })
    .then((res) => {
        let todos = res.data;
        newtask.value = '';
        console.log(todos);
        addToDom(todos);
    })
    .catch((err) => {
        console.log(err);
    });
})

// axios.get('/gettodos')
//     .then((todos) => {
//         console.log(todos);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

function deleteTodo(atrid){
    axios.post('/deletetodo',{
        id: atrid
    })  
    .then((res) => {
        let todos = res.data;
        addToDom(todos);
    })
    .catch((err) => {
        console.log(err);
    });
}

taskList.addEventListener('click', (event) => { 
    // console.log(event);
    // console.log(ev.target);
    let atrid = event.target.getAttribute('atrid');
    let btnName = event.target.className;
    console.log(atrid);
    console.log(btnName);
    if(btnName === 'delBtn') {
        deleteTodo(atrid);
    }
    else if(btnName === 'upBtn') {
        axios.get(`/increasepriority?id=${atrid}`)
        .then((res) => {
            let todos = res.data;
            addToDom(todos);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    else if(btnName === 'dwnBtn') {
        axios.get(`/decreasepriority?id=${atrid}`)
        .then((res) => {
            let todos = res.data;
            addToDom(todos);
        })
        .catch((err) => {
            console.log(err);
        });
    }
})
