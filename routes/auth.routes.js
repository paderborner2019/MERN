const {Router} = require("express")
const User = require('../models/user')
const {check,validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const config = require("config")
const bcrypt = require('bcryptjs')
const router = Router()

router.post('/register',
    [
        check("email","invalid email").isEmail(),
        check("password", "min length password os 6 tokens").isLength({min:6})
    ],
    async(req,res)=> {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
                message: "Invalid Parameters" 
            })
        }
        if (validationResult) {
        }
        const {email,password} = req.body
        const candidate = await User.findOne({email:email})
        if (candidate) {
           return res.status(400).json("This email already taken")
        }

        const hashPassword = await bcrypt.hash(password,12)
        const user = new User({email:email,password: hashPassword})
        const result = User.create(user)
        res.status(201).json("User created")
    } catch (e) {
        res.status(500).json("something wrong happen")
    }
})
router.post('/logIn',
[
    check("email","invalid email").normalizeEmail().isEmail(),
    check("password", "min length password os 6 tokens").exists()
],
async(req,res)=> {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
                message: "Invalid Parameters" 
            })
        }
        const {email,password} = req.body
        const user =await User.findOne({email: email})
        if (!user) {
            return res.status(400).json({message: "user not found"})
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message:"invalid password"})
        }
        
        const token = jwt.sign({
            userId:  user.id
        },config.get('jwtSecret'),
        {expiresIn:"1h"}
        )
        res.status(200).json({token,userId: user.id})
    } catch (error) {
        res.status(400).json({message: "something wrong"})
    }
})

module.exports = router