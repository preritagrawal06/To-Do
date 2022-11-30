const User = require('../models/userModel')


exports.getLogin = (req,res, next)=>{
    res.render('login', {pageTitle: 'Login'})
}

exports.getSignup = (req,res, next)=>{
    res.render('signup', {pageTitle: 'Signup'})
}

exports.postSignup = async (req, res, next)=>{
    const {email, password} = req.body
   

    try{
        const user = await User.signup(email, password);

        res.redirect('/login')

    } catch(error){
        res.redirect('/signup')
    }
}

exports.postLogin = async (req, res, next)=>{
    const {email, password} = req.body


    try{
        const user = await User.login(email, password);

        req.session.user = user;

        res.redirect('/home')

    } catch(error){
        res.redirect('/login')
    }
}

exports.postLogout = (req, res, next)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
}

