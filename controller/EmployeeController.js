const { mongo } = require("mongoose");
const mongo_connect = require('../Database_connecticity');
const { name } = require("ejs");

class Employee{
    emp_model = null;
    constructor(){
        this.emp_model = mongo_connect.model('emp', new mongo_connect.Schema({}, {strict : false}), 'Employee')
    }
    Add_Record(req, res){
        // if(req.method == 'GET'){
        //     res.render('home');
        //     res.end();
        // }
        // else{
            // const emp = mongo_connect.model('emp', new mongo_connect.Schema({}, {strict : false}), 'Employee')
            const emp_data = new this.emp_model(
                {
                    name : req.body.name,
                    mobile : req.body.mobile,
                    address : req.body.address
                });
                emp_data.save().then(() => {
                    res.render('home', {message : req.body.name + "Record Saved Successfully"});
                    res.end();
                }).catch(() => {
                    res.render('home', {message : "Record Not Save"});
                    res.end();
                })
        // }
    }

    Delete_Emp(req, res){
        if(req.method == 'GET'){
            res.render('delete');
            res.end();
        }
        else{
            // const emp_model = mongo_connect.model('emp', new mongo_connect.Schema({}, {strict : false}), 'Employee')

            this.emp_model.findOne({name : req.body.name}).then((record) => {
                if(record){
                    return this.emp_model.findOneAndDelete({name : req.body.name});
                }
                else{
                    throw new Error(req.body.name + " Not Exits in Our Database");
                }
            }).then(() => {
                res.render('delete', {message : req.body.name + " Record Deleted Successfully"});
                res.end();
            }).catch((err) => {
                res.render('delete', {message : err.message});
                res.end();
            })

            // this.emp_model.findOne({name : req.body.name}).then((record) => {  //By then catch
            //     if(record){
            //         this.emp_model.findOneAndDelete({name : req.body.name}).then(() => {
            //             res.render('delete', {message : req.body.name + " Record Deleted Successfully"})
            //             res.end();
            //         })
            //     }
            //     else{
            //         return Promise.reject(req.body.name + " Not exits in the Database")
            //     }
            // }).catch((err) => {
            //     res.render('delete', {message : err});
            //     res.end();
            // })

            // this.emp_model.findOneAndDelete({name:req.body.name}).then(() => {  //By simple Code
            //     res.render('delete', {message : req.body.name + " Record Deleted Successfully!"});
            //     res.end();
            // }).catch(() => {
            //     res.render('delete', {message : req.body.name + " Record Not Deleted"});
            //     res.end();
            // })
        }
    }

    async Delete_Emp_Async_Await(req, res){
        if(req.method == 'GET'){
            res.render('delete');
            res.end();
        }
        else{
            const record = await this.emp_model.findOne({name : req.body.name});
            if(record){
               await this.emp_model.findOneAndDelete({name : req.body.name});
                res.render('delete', {message : req.body.name + " Record Deleted Successfully"});
                res.end();
            }
            else{
                 res.render('delete', {message : req.body.name + " Not Exists In Our Database"});
                 res.end();
            }
        }
    }

    Display_Emp_Records(req, res){
        this.emp_model.find({}).then((data) => {
            res.render('display', {record : data});
            res.end();
        }).catch((err) => {
            res.send(err.message);
            res.end();
        })
    }

    async Display_Emp_Recrds(req, res){
        const record = await this.emp_model.find({});
        if(record){
            res.render('display', {record:record});
            res.end();
        }
    }

    Search_Emp_Record(req, res){
        if(req.method == 'GET'){
            res.render('search');
            res.end();
        }
        else{
            const emp_name = req.body.name;
            this.emp_model.find({name : emp_name}).then((data) => {
                res.render('search', {record : data});
                res.end();
            }).c
        }
    }

    async Update_Emp(req, res){
        if(req.method == "GET"){
            res.render('update_record');
            res.end();
        }
        else{
            const {nm, mobile, address} = req.body;
            const record = await this.emp_model.findOne({name : nm});
            // console.log(record);
            if(record){
                res.render('update_record', {message : "Record Found", name : record.name, mobile : record.mobile, address : record.address});
                res.end();
            }
            else{
                res.render('update_record', {message : "Name not Exits to Update the Mobile and Address Record"});
                res.end();
            }
        }
    }

    async Update_Emp_Final(req, res){
        const {nm, mob, addr} = req.body;
        // console.log(req.body);

        const update_data = {
            mobile : mob,
            address : addr
        }

        const myQuery = {name : nm};
        await this.emp_model.findOneAndUpdate(myQuery, {$set : update_data}, {new : true, useFindAndModify : false});
        res.render('update_record', {message : "Record Updated Successfully"});
        res.end();
    }
}

const emp_obj = new Employee();
module.exports = emp_obj;