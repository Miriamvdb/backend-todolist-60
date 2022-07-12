const { user, todoList, todoItem } = require("./models");

// 1. Getting all the lists with related user (complete user)
const listsWithUsers1 = async () => {
  const lists = await todoList.findAll({
    include: [user],
  });
  return lists.map((list) => list.toJSON());
};

// listsWithUsers1().then((lists) => console.log(lists));

// 2. Getting all the lists with related user (only name of user)
const listsWithUsers2 = async () => {
  const lists = await todoList.findAll({
    include: [{ model: user, attributes: ["name"] }],
  });
  return lists.map((list) => list.toJSON());
};

// listsWithUsers2().then((lists) => console.log(lists));

// 3. Getting all the users with related list (only name of list)
const getUsers = async () => {
  const allUsersWithList = await user.findAll({
    include: [{ model: todoList, attributes: ["name"] }],
  });
  return allUsersWithList.map((user) => user.get({ plain: true }));
};

// getUsers().then((users) => console.log(users));

// 4. Get one user by id with his list
const getUserWithList = async (id) => {
  const userByPk = await user.findByPk(id, {
    include: [todoList],
  });
  return userByPk.get({ plain: true });
};

// getUserWithList(1).then((user) => console.log(user));

// 5. Get important todoItem with the name of the list
const getImportantTodoItems = async () => {
  const getTodoItems = await todoItem.findAll({
    where: { important: true },
    include: { model: todoList, attributes: ["name"] },
  });
  return getTodoItems.map((todos) => todos.get({ plain: true }));
};

// getImportantTodoItems().then((todos) => console.log(todos));

// 6. Get one user by id with his list what also contain their belonging todoItems task attribute
const getUserWithList2 = async (id) => {
  const userByPk = await user.findByPk(id, {
    include: [
      {
        model: todoList,
        attributes: ["name"],
        include: { model: todoItem, attributes: ["task"] },
      },
    ],
  });
  return userByPk.get({ plain: true });
};

getUserWithList2(3).then((user) => console.log(user));
