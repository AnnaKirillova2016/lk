const User = require('../models/user.model')
const UserService = require('../services/user.services')


exports.createUser = async function (req, res, next) {

    let newUser = req.body.newUser
    let user = new User({
        login: newUser.login,
        password: newUser.password,
        isActive: newUser.isActive,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        isActive: false,
        other: '',
        avatar: ''
    })
    try {
        // Calling the Service function with the new object from the Request Body
        let createdUser = await UserService.createUser(user)
        return res.status(201).json({data: createdUser, message: "Succesfully Created User"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.removeUser = async function (req, res, next) {
    let id = req.params.id
    try {
        let deleted = await UserService.deleteUser(id);
        res.status(200).send("Succesfully User Deleted");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }


}


exports.loginUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    let user = {
        email: req.body.user.login,
        password: req.body.user.password
    }
    try {
        // Calling the Service function with the new object from the Request Bodyэ
        await UserService.loginUser(user, answer =>{
            if(! answer.hasOwnProperty('err')) {
                return res.status(200).json(answer)
            }else{
                return res.status(401).send(answer)
            }
        })
        //let loginUser = await UserService.loginUser(user);
        //return res.status(201).json({data: loginUser, message: "Succesfully login"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(401).send({status: 400, message: "Invalid username or password"})
    }
}


exports.getUsers = async function (req, res, next) {
// Check the existence of the query parameters, If doesn't exists assign a default value
    let page = req.query.page ? req.query.page : 1
    let limit = req.query.limit ? req.query.limit : 10;
    try {
        let Users = await UserService.getUsers({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
