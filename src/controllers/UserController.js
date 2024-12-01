
const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')
const createUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;
        console.log(req.body);

        console.log(email);
        console.log(password);
        console.log(confirmPassword);
        console.log(imageUrl);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = emailRegex.test(email);


        if (!email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input required'
            })
        }
        else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password in equal'
            })
        }
        const response = await UserService.createUser(req.body, imageUrl)


        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = emailRegex.test(email)
        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input required'
            })
        }
        else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }
        const response = await UserService.loginUser(req.body);

        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;
        console.log(imageUrl);

        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'userId is required'
            })
        }
        const response = await UserService.updateUser(userId, data, imageUrl)

        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'userId is required'
            })
        }
        const response = await UserService.deleteUser(userId)

        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'userId is required'
            })
        }
        const response = await UserService.getDetailsUser(userId)

        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const refreshToken = async (req, res) => {
    try {
        const token = req.headers.Authorization.split(" ")[1];
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenService(token)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken
}