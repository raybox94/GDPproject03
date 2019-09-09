var _ = require('lodash');
var bcrypt = require('bcryptjs');
var { UserModel } = require('../model/model.user');

var signUp = (req,res) => {
    console.log('working')
    var body = _.pick(req.body,['firstName','lastName','email','password','instructor']);
    // var gen_token = jwt.sign({email: body.email },'codewordnwmsu',{expiresIn:  1* 300 }).toString();
    // body.token = gen_token;
    var date = new Date()
    console.log("controller signup"+ body.email+" "+body.password+" "+body.instructor);
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(body.password,salt,(err,hash) => {
            body.password = hash;
            var userModel = new UserModel({
                first_name: body.firstName.trim(),
                last_name: body.lastName.trim(),
                email_id: body.email,
                password: body.password,
                is_active: !body.instructor,
                role: body.instructor?'instructor':'student',
                create_at: date.toISOString(),
                updated_at: date.toISOString()
            });
            userModel.save().then((user) => {
                if(user)
                return res.json({ code: 200, message: true});           
            }).catch((e) => {
                console.log(e);
                return res.json({ code: 400, message: e});        
            })
        })
    })
}
module.exports.signUp = signUp;
var signIn = (req,res) => {
    console.log('signIn working')
    var body = _.pick(req.body,['email','password']);
    console.log(body.email+"Controller user signin");
    UserModel.findOne({email_id: body.email}, function (err, User) {
        if(User == null){
            return res.json({ code: 401, message: 'Email id not registered!!'});
        }
        //console.log(User.role+"Instructor status signIn controller user");
        return bcrypt.compare(body.password,User.password,(err,result) => {
            console.log(result)
            if(result){
                var newToken = jwt.sign({email: body.email, id: User.id },'codewordnwmsu',{expiresIn:  10000 * 3000 }).toString();
                console.log(newToken)
                UserModel.updateOne({emailKey: body.email},{$set: {token: newToken}}, (err) =>{
                    if(err){
                        return res.json({ code: 401, message: 'Unable to generate and update Token'});
                    }
                    return res.json({ code: 200, message: 'Signed in successfully. Redirecting.', token: newToken, role: User.role });
                })
            }else{
                return res.json({ code: 401, message: 'Invalid Password'})
            }
        })
    })
}
module.exports.signIn = signIn;

var details = (req,res) => {    
    console.log('email'+ req.session.id);
    UserModel.findOne({_id: req.session.id}).then((user) => {
    if(!user){
        return  res.status(400).send("User details not found!!");
    }
    console.log('user'+user);        
    return res.send({email_id: user.email_id, 
        name: user.first_name + ' '+ user.last_name, 
        role:user.role});
    });
}

module.exports.details = details;
