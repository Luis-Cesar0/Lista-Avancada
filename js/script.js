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
const saveTodo=(text) =>{
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
    }
    if(targetEl.classList.contains('remove-todo')){
        paretEl.remove()
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