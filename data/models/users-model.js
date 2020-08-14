const db = require("../db-config");

async function findUsers() {
  const users = await db("users");
  return users;
}

async function findUserByUsername(username) {
  const user = await db("users").where({ username }).first();
  return user;
}

async function findUserById(id) {
  const user = await db("users").where({ id }).first();
  return user;
}

async function add(user) {
  const [id] = await db("users").insert(user);
  const returnedUser = findUserById(id);
  return returnedUser;
}

async function update(user) {
  const userUpdate = await db("users").update(user);
  return userUpdate;
}

module.exports = {
  findUserByUsername,
  findUserById,
  findUsers,
  add,
};
