const userDB = {
    users : require('../data/usersDB.json'),
    setUsers : function (data) {this.users, data}
}

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) {
        return res.status(400).json({ message: 'User and password required!' });
    }  
    const foundUser = userDB.users.find(indexValue => indexValue.username === user);
    if(!foundUser) return res.sendStatus(401); //Unauthorized

    //Evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match) {
        const accessToken = jwt.sign(
            {"username" : foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : '30s'}
        );
        const refreshToken = jwt.sign(
            {"username" : foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn : '1d'}
        );
        const otherUsers = userDB.users.filter(indexValue => personalbar.username !== foundUser.username);
        const currentUser = {...foundUser,  refreshToken};
        userDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'data', 'userDB.json'),
            JSON.stringify(userDB.users)
        );

        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})

        //IMPORTANT!!!! Store it on memory
        res.json({accessToken});
    }
    else {
        res.sendStatus(401);
    }
}

module.exports = {handleLogin};