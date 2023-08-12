const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers/UserController');
const { userUpdateAdapter } = require('../middlewares/userUpdateAdapter');
const { userCreationAdapter } = require('../middlewares/userCreationAdapter');
const { userLoginAdapter } = require('../middlewares/userLoginAdapter');

router.get('/users/:email', async (req, res) => {
    const { email } = req.params;
    console.log(email);
    try {
        

        const selectedUser = await UserController.findByEmail(email);
        
        if (!selectedUser) {
            throw new Error();
        }

        return res.status(200).json(selectedUser);
    } catch (error) {
        console.log(error);
        return res.status(404).end();
    }
});

router.post('/login/:email', userLoginAdapter, async (req, res) => {
    const user = req.user;
    return res.status(200).json(user);
});

router.post('/users', userCreationAdapter, async (req, res) => {
    const encryptedUser = req.encryptedUser;

    try {
        if(!encryptedUser) throw new Error();
        if(await UserController.findByEmail(encryptedUser.email))
            return res.status(400).end();
        
        const result = await UserController.createUser(encryptedUser);        
        createdUser = result.dataValues;
        console.log("Req: \n",encryptedUser,"\nEND\n")
        console.log("Created:\n",createdUser,"\nEND\n")
        return res.status(201).json(createdUser);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
});

router.put('/users/:id', userUpdateAdapter, async (req, res) => {
    const { id } = req.params;
    const updatedUser = req.updatedUser;    
    try {                
        await UserController.updateUserInfo(id,updatedUser);
        return res.status(202).end();
    } catch (error) {
        console.log(error);
        return res.status(404).end();
    }
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {

        result = await UserController.findById(id);
        if(result===null){
            throw new Error();
        }
        await UserController.deleteUser(result.dataValues.id);
        return res.status(204).end();
    } catch (error) {
        console.log(error);
        return res.status(404).end();
    }
});

module.exports = router
