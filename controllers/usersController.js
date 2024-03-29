const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function signup(req, res) {
    try {
        const { email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
        await User.create({ email, password: hashedPassword }); 
        res.sendStatus(200);
    } catch(err) {
        console.error(err);
        res.sendStatus(400);
    }
}


async function login(req, res) {
    try{
        const{email, password} = req.body;
        const user = await User.findOne({ email });
        // check if user exists
        if (!user) {
                return res.sendStatus(401);}
                // check if passwords match
                const passwordMatch = bcrypt.compareSync(password, user.password);
                if (!passwordMatch) {
                        return res.sendStatus(401);}
        
        // create token that expires in 30 days
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({ sub: user._id, exp : exp }, process.env.SECRET)
        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === "production",
        })
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
    
    
}

function logout(req, res) {
    try{
        res.clearCookie("Authorization");
        res.sendStatus(200)
    } catch(err) {
        console.log(err)
        res.sendStatus(400)
    }
}

function checkAuth(req, res) {
    try{
        res.sendStatus(200);

    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

module.exports = {
    signup: signup,
    login: login,
    logout: logout,
    checkAuth: checkAuth
}