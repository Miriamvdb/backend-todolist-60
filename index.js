// import express
const express = require("express");
// create the app (server)
const app = express();
// create port
const PORT = 4000;

// import User/TodoList from models-directory
const User = require("./models").user;
const TodoList = require("./models").todoList;

// use it above the rest of the code
app.use(express.json());

// 0. to test your setup, add the following route
// http POST :4000/test hello=world
// confirm that the JSON body it returned
app.post("/test", (req, res) => {
  res.json(req.body);
});

// 1. CREATE NEW USER
// make a post request to /users with an email and confirm
// that the data (incl id) is returned in the response
// http POST :4000/users name="Miriam van den Bosch" email="m@m.com"
app.post("/users", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (e) {
    next(e);
  }
});

// 2. READ A USER BY ID
// Add a route definition that will respond to GET requests to /users/:userId
// Use the User.findByPk() method along with the userId route param.
// Fetch the correct user from the database and return it as a JSON response
// http GET :4000/users/1
app.get("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const userByPk = await User.findByPk(userId);
    if (!userByPk) {
      res.status(404).send("This user is not found!");
    } else {
      res.json(userByPk);
    }
  } catch (e) {
    next(e);
  }
});

// 3. UPDATE A USER
// http PUT :4000/users/5 name="Mirrie" email="m@b.com" password="1234"
app.put("/users/:userId", async (req, res, next) => {
  try {
    // get the user's id from the params
    const userId = parseInt(req.params.userId);
    // find the user you wanna update, by id
    const userToUpdate = await User.findByPk(userId);
    // when user doesn't exist:
    if (!userToUpdate) {
      res.status(404).send("This user is not found!");
      // when user is found, update it in the body:
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.json(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});

// 4. READ ALL TODOLISTS
// http GET :4000/todolists
app.get("/todolists", async (req, res, next) => {
  try {
    const allTodoLists = await TodoList.findAll();
    res.json(allTodoLists);
  } catch (e) {
    next(e);
  }
});

// 5. CREATE A NEW TODOLIST
// http POST :4000/todolists/5 name="Play soccergame"
app.post("/todolists", async (req, res, next) => {
  try {
    const newTodoList = await TodoList.create(req.body);
    res.json(newTodoList);
  } catch (e) {
    next(e);
  }
});

// 6. UPDATE A TODOLIST
// http PUT :4000/todolists/5 name="Join soccertraining"
app.put("/todolists/:listId", async (req, res, next) => {
  try {
    // get the todolists id from the params
    const listId = parseInt(req.params.listId);
    // find the todoList you wanna update, by id
    const listToUpdate = await TodoList.findByPk(listId);
    if (!listToUpdate) {
      // when the list doesn't exist
      res.status(404).send("This todoList is not found!");
    } else {
      const updatedList = await listToUpdate.update(req.body);
      res.json(updatedList);
    }
  } catch (e) {
    next(e);
  }
});

// 7. READ A USERS LIST
// http GET :4000/users/3/lists
app.get("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const userWithList = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (userWithList) {
      res.send(userWithList.todoLists);
    } else {
      res.status(404).send("This user is not found!");
    }
  } catch (e) {
    next(e);
  }
});

// 8. CREATE A USERS LIST
app.post("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const findUser = await User.findByPk(userId);
    if (!findUser) {
      res.status(404).send("This user is not found!");
    } else {
      const newUsersList = await TodoList.create({ userId, ...req.body });
      res.json(newUsersList);
    }
  } catch (e) {
    next(e);
  }
});

// 9. DELETE A USERS LIST
// http DELETE :4000/users/3/lists/3
app.delete("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const listToDelete = await TodoList.findByPk(listId);
    if (!listToDelete) {
      res.status(404).send("This list is not found!");
    } else {
      const deletedList = await listToDelete.destroy();
      res.json("List deleted!");
    }
  } catch (e) {
    next(e);
  }
});

// 10. DELETE ALL USERS LISTS
// http DELETE :4000/users/2/lists
app.delete("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const usersListsToDelete = await User.findByPk(userId, {
      include: [TodoList],
    });
    console.log(usersListsToDelete);
    if (!usersListsToDelete) {
      res.status(404).send("This user is not found!");
    } else {
      usersListsToDelete.todoLists.forEach(
        async (list) => await list.destroy()
      );
      res.status(204).send();
    }
  } catch (e) {
    next(e);
  }
});

// start the server
app.listen(PORT, () => console.log(`Listening to PORT :${PORT}`));
