// Seleção de elementos
const todoForm = document.querySelector('#todo-form')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')
const searchInput = document.querySelector('#search-input')
const eraseBtn = document.querySelector('#erase-button')
const filterBtn = document.querySelector('#filter-select')

let oldinputValue

// Funções
const saveTodo=(text, done = 0, save = 1) =>{
    const todo = document.createElement('div')
    todo.classList.add('todo')

    const todoTitle = document.createElement('h3')
    todoTitle.innerHTML = text
    todo.appendChild(todoTitle)
    
    const doneBtn= document.createElement('button')
    doneBtn.classList.add('finish-todo')
    doneBtn.innerHTML='<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn= document.createElement('button')
    editBtn.classList.add('edit-todo')
    editBtn.innerHTML='<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deletBtn= document.createElement('button')
    deletBtn.classList.add('remove-todo')
    deletBtn.innerHTML='<i class="fa-solid fa-close"></i>'
    todo.appendChild(deletBtn)

    // Utilizando dados da localStorege
    if(done){
        todo.classList.add('done')
    }
    if(save){
        saveTodoLocalStorage({text, done})
    }

    todoList.appendChild(todo)

    todoInput.value=''
    todoInput.focus()
}

const toggleForms =()=>{
    editForm.classList.toggle('hide')
    todoForm.classList.toggle('hide')
    todoList.classList.toggle('hide')
}

const updateTodo = (text) =>{
    const todo = document.querySelectorAll('.todo')

    todo.forEach((todo) =>{
        let todoTitle = todo.querySelector('h3')

        if(todoTitle.innerText === oldinputValue){
            todoTitle.innerText = text

            updateTodosLocalStorage(oldinputValue , text)
        }
    })
}

const getSerachTodos = (search) => {
    const todos = document.querySelectorAll('.todo')

    todos.forEach((todo) =>{
        let todoTitle = todo.querySelector('h3').innerText.toLowerCase()
        const normalizedSearch = search.toLowerCase()

        todo.style.display = 'flex'
        if(!todoTitle.includes(normalizedSearch)){
            todo.style.display = 'none'
        }

        
    })
}

const filterTodos = (filterValue) =>{

    const todos = document.querySelectorAll('.todo')

    switch(filterValue){
        case 'all':
            todos.forEach((todo) => (todo.style.display = 'flex'))
        break
        case 'done':
            todos.forEach((todo) => (todo.classList.contains('done') 
            ? (todo.style.display = 'felx') 
            : (todo.style.display = 'none') ))
        break
        case 'todo':
            todos.forEach((todo) => (!todo.classList.contains('done') 
            ? (todo.style.display = 'felx') 
            : (todo.style.display = 'none') ))
        break
        default:
            break
       
        
    }
}

// Eventos
todoForm.addEventListener('submit', (e)=>{
    e.preventDefault(e)
    const inputValue = todoInput.value

    if(inputValue){
        saveTodo(inputValue)

        
    }
    
})
document.addEventListener('click' ,(e)=>{
    const targetEl= e.target
    const paretEl = targetEl.closest('div')
    let todoTitle

    if (paretEl && paretEl.querySelector('h3')) {
        todoTitle = paretEl.querySelector('h3').innerHTML
    }

    if(targetEl.classList.contains('finish-todo')){
        paretEl.classList.toggle('done')

        updateTodosStatusLocalSotrage(todoTitle)
    }
    if(targetEl.classList.contains('remove-todo')){
        paretEl.remove()

        removeTodoLaocalSotrafe(todoTitle)
    }
    if(targetEl.classList.contains('edit-todo')){
        toggleForms()
        console.log(editInput)
        editInput.value = todoTitle
        oldinputValue= todoTitle
    }

})

cancelEditBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    toggleForms()
})

editForm.addEventListener('submit',(e) =>{
    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue)
    }
    
    toggleForms()
})

searchInput.addEventListener('keyup', (e) => {
    const search = e.target.value
    getSerachTodos(search)
})

eraseBtn.addEventListener('click', (e)=> {
    e.preventDefault()
    searchInput.value= ''

    searchInput.dispatchEvent(new Event('keyup'))
})

filterBtn.addEventListener('change',(e) =>{
    const filterValue = e.target.value

    filterTodos(filterValue)
})

//  Local Storege
const getTodosLocalStorage = () =>{
    const todos = JSON.parse(localStorage.getItem('todos')) || []

    return todos
}

const loadTodos = () =>{
    const todos = getTodosLocalStorage()

    todos.forEach((todo) => {
        saveTodo(todo.text , todo.done, 0)
    })
}

const saveTodoLocalStorage = (todo) =>{
    const todos = getTodosLocalStorage()
    
    todos.push(todo)

    localStorage.setItem('todos' ,JSON.stringify(todos))
}

const removeTodoLaocalSotrafe = (todoText) => {
    const todos = getTodosLocalStorage()

    const filteredTodos = todos.filter((todo) => todo.text !== todoText)

    localStorage.setItem('todos',JSON.stringify(filteredTodos))
}

const updateTodosStatusLocalSotrage = (todoText) => {
    const todos = getTodosLocalStorage()

    todos.map((todo) => 
    todo.text === todoText ? (todo.done = !todo.done): null)
    localStorage.setItem('todos' , JSON.stringify(todos))

    
}
const updateTodosLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage()

    todos.map((todo) => 
    todo.text === todoOldText ? (todo.text = todoNewText): null)

    localStorage.setItem('todos' , JSON.stringify(todos))

    
}
loadTodos()
