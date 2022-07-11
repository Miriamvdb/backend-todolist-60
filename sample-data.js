const TodoItem = require("./models").todoItem;

const createSampleTodoItems = async () => {
  try {
    const todo1 = await TodoItem.create({
      task: "Bring paper to container",
      important: false,
    });

    const todo2 = await TodoItem.create({
      task: "Cleaning kitchen",
      important: true,
    });

    return [todo1, todo2].map((todoitem) => todoitem.toJSON());
  } catch (e) {
    console.log(e);
  }
};

createSampleTodoItems().then((todos) => console.log(todos));
