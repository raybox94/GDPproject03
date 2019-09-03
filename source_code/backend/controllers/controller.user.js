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
