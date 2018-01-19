let id = undefined

function init() {
    if (!localStorage.todo) {
        id = 0
        localStorage.todo = JSON.stringify({
            id: [],
            content: []
        })
    } else {
        console.log()
        id = (read().id.pop() === undefined) ? 0 : read().id.pop() + 1
    }
}

function read() {

    return JSON.parse(localStorage.todo)
}

function create(priority, status, value) {
    let todo = read()
    todo.id.push(id)
    todo.content.push({
        id: id,
        priority: priority,
        status: status,
        value: value
    })

    localStorage.todo = JSON.stringify(todo)
    id++
}

function update(id, priority, status, value) {
    let todo = read()
    let index = todo.id.indexOf(id)
    todo.content[index] = {
        id: id,
        priority: priority,
        status: status,
        value: value
    }
    localStorage.todo = JSON.stringify(todo)
}

function updateItemStatus(id, status) {
    let todo = read()
    let index = todo.id.indexOf(id)
    todo.content[index].status = status
    localStorage.todo = JSON.stringify(todo)
}

function del(id) {
    let todo = read()
    let index = todo.id.indexOf(id)
    todo.id.splice(index, 1)
    todo.content.splice(index, 1)
    localStorage.todo = JSON.stringify(todo)

}

function getItems() {

    return read().content
}

function getItem(id) {
    let todo = read()
    let index = todo.id.indexOf(id)
    return todo.content[index]
}

function getTheOneThing() {
    let items = getItems()
    let result = undefined
    items.map(item => {
        if (item.priority === 2 && item.status === 2) {
            result = item
        }
    })

    return result
}

init()

export default {
    create: create,
    del: del,
    getItem: getItem,
    getItems: getItems,
    getTheOneThing: getTheOneThing,
    update: update,
    updateItemStatus: updateItemStatus
}

