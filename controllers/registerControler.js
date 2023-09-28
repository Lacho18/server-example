const userDB = {
    users : require('../data/userDB.json'),
    setUsers : function (data) {this.users, data}
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) {
        return res.status(400).json({ message: 'User and password required!' });
    }   

// Check for duplication of usernames
    const duplicate = userDB.users.find((indexValue) => indexValue.username === user);
    if (duplicate) {
        return res.status(409).json({ message: 'Conflict' });
    }

    try {
        const hashedPassword = await bcrypt.hash(pwd, 10);
        // Set the new user
        const newUser = { username: user, password: hashedPassword };
        userDB.users.push(newUser); // Push the new user into the 'users' array

        // Write the updated 'users' array into the userDB json file
        await fsPromises.writeFile(
        path.join(__dirname, '..', 'data', 'userDB.json'),
        JSON.stringify(userDB.users)
    );
    console.log(userDB.users);
    res.status(201).json({ message: `New user ${user} created` });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {handleNewUser};
