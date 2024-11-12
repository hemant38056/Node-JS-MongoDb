const mongo_connect = require('../Database_connecticity');
class User{

    user_model = null;
    constructor(){
        this.user_model = mongo_connect.model('user_data', new mongo_connect.Schema({}, {strict:false}), 'User');
    }

    async Login_Check(req, res){
        if(req.method == 'GET'){
            res.render('login');
            res.end();
        }
        else{
            const record = this.user_model.findOne({email : req.body.email, password : req.body.password});
            if(record){
                req.session.user_emailid = req.body.email;
                res.redirect('/dashboard');
            }
            else{
                res.render('login', {message : "Incorrect Credentials"});
                res.end();
            }
        }

    }

   async Create_Account(req, res){
        if(req.method == 'GET'){
            res.render('newuser');
            res.end();
        }
        else{
            const user_record = new this.user_model({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                gender : req.body.gender,
                address : req.body.address
            });

            await user_record.save();
            res.render('newuser', {message : "Signup Successfully"});
            res.end();
    }
}
}

const user_obj = new User();
module.exports = user_obj;