const todoSchema = require('../Models/todo.model');

const insertTodo = async(body, userId) => {
    const create = new todoSchema({
        ...body,
        userId
    });
    const created = await create.save();

    return created._doc;

}

const updateTodo = async(body, userId) => {
    const id = body.id;
    delete body.id;
    const update = await todoSchema.findOneAndUpdate({_id: id, userId: userId}, body);
    return update;
}

const selectTodo = async(type, userId) => {
    const resultArr = [];
    const todo = await todoSchema.find({ userId: userId });
    const today = new Date().toDateString();
    if (type === 'myDay') {
        todo.map(item => {
            if (new Date(item.createdAt).toDateString() == today) {
                resultArr.push(item)
            }
        })
    }
    else if (type === 'important') {
        todo.map(item => {
            if (item.important) {
                resultArr.push(item);
            }
        })
    }
    else if (type === 'planned') {
        todo.map(item => {
            if (item.type === 'planned'){
                resultArr.push(item);
            }
        })
    }
    else if (type === "tasks") {
        return todo;
    }
    return resultArr
}

module.exports = {
    insertTodo,
    updateTodo,
    selectTodo
}