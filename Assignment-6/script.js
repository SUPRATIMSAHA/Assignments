const inp = document.querySelector('#todo_inp')
const button = document.querySelector('#add_todo')
const ol = document.querySelector('#list')

button.addEventListener("click", function(){
    let todo = inp.value
    let li = document.createElement('li')
    let del = document.createElement('button')
    let edit = document.createElement('button')

    li.innerText = todo
    del.setAttribute('class', 'fas fa-trash-alt')
    del.setAttribute('id', 'delete_todo')
    del.addEventListener("click", function(e){
        e.target.parentElement.remove()
    })

    edit.setAttribute('class', 'fas fa-pencil-alt')
    edit.setAttribute('id', 'edit_todo')
    edit.addEventListener("click", function(e){
        let new_todo = prompt("Enter new todo text")
        if(new_todo){
            let inner = e.target.parentElement
            inner.innerText = new_todo
            inner.append(del)
            inner.append(edit)
        }
    })

    li.append(del)
    li.append(edit)
    ol.append(li)
    inp.value = ""
})