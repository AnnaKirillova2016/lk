const User = require('../models/user.model')
const config = require('../config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    let salt = bcrypt.genSaltSync(10)
    let hashedPassword = bcrypt.hashSync(user.password, salt);
    let newUser = new User({
        login: user.login,
        isActive: user.isActive,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        regDate: new Date(),
        password: hashedPassword,
        other: '',
        avatar: ''
    })

    try {
        // Saving the User
        let savedUser = await User.Create(newUser);
        let token = jwt.sign({user: savedUser}, config.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason
        throw Error("Error while Creating User")
    }
}

exports.loginUser = async function (user, answer) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User

        await User.findByEmail(user.email, _details =>{
            if(!_details.hasOwnProperty('err')){
            let passwordIsValid = bcrypt.compareSync(user.password, _details.password)
            if (!passwordIsValid) {
                answer({err:'user not found'})
                return
            }
            let token = jwt.sign({user: _details}, config.SECRET, {
                expiresIn: 86400 // expires in 24 hours
            })
           // console.log(token)
            _details.password =''
            answer({token: token,user: _details})
            }else{
                answer(_details)
            }
        })
    } catch (e) {
        // return a Error message describing the reason
        throw Error("Error while Login User")
    }
}

exports.deleteUser = async function (id) {
    // Delete the User
    try {
        let deleted = await User.remove({_id: id})
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}

// Async function to get the User List
exports.getUsers = async function (query, page, limit, result) {

    // Try Catch the awaited promise to handle the error
    try {
        let users = await User.getAllUsers(res => {
            if (res.hasOwnProperty('result')) {
                result(res)

            } else{
                result(res)
            }
        return
        })
        // Return the User list
        } catch (e) {
        // return a Error message describing the reason
        throw Error('Error while getting Users')
    }
}
