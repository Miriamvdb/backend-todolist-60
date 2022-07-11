const User = require("./models").user;
const TodoItem = require("./models").todoItem;

// 1. Searches for all the users and logs them
const getAllUsers = async () => {
  try {
    const allUsers = await User.findAll();
    return allUsers;
  } catch (e) {
    console.log(e);
  }
};
// getAllUsers().then((allUsers) => console.log(allUsers));

// 2. Searches for all the TodoItems and logs them, use .toJSON() or { raw: true } in the query
const getAllTodoItems = async () => {
  try {
    const allTodoItems = await TodoItem.findAll({ raw: true });
    return allTodoItems;
  } catch (e) {
    console.log(e);
  }
};

// getAllTodoItems().then((allTodoItems) => console.log(allTodoItems));

// 3. Searches for a user by primary key
const getUserByPk = async () => {
  try {
    const userByPk = await User.findByPk(1);
    return userByPk;
  } catch (e) {
    console.log(e);
  }
};

// getUserByPk().then((userByPk) => console.log(userByPk));

// 4. Create a new user
const createNewUser = async () => {
  try {
    const newUser = await User.create({
      name: "Britt de Jong",
      email: "britt@dejong.com",
      phone: 698765432,
      password: "myanklehurtsitsmerelsfault",
    });
    return newUser;
  } catch (e) {
    console.log(e);
  }
};

// createNewUser().then((newUser) => console.log(newUser));

// 5. Search only for "important todoItems"
const getImportantTodoItems = async () => {
  try {
    const todos = await TodoItem.findAll({ where: { important: true } });
    return todos.map((todo) => todo.get({ plain: true }));
  } catch (e) {
    console.log(e);
  }
};

// getImportantTodoItems().then((todos) => console.log(todos));
