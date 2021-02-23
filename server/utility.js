let listOfUser = [];

// add a user to list
// if success, return added user
// if already exist then return error
const addUser = (id, name, room) => {
    // format user input to lower case and rm space
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Check if user name and room already exist, not allowed
    const prevUser = listOfUser.find((user) => user.name === name && user.room === room);
    const newUser = { id, name, room };

    if (prevUser) return { error: "username already exist in selected room" };
    else listOfUser.push(newUser);
    return { user: newUser };
};

const removeUser = (id) => {
    listOfUser = listOfUser.filter((user) => user.id !== id);
};

const getUser = (id) => {
    console.log(listOfUser);
    const matchUser = listOfUser.find((user) => user.id === id);
    console.log(matchUser);
    return matchUser;
}

const getUsersInRoom = (room) => {
    return listOfUser.filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };