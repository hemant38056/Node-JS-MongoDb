const { render } = require('ejs');
const express = require('express');
const emp_obj = require('./controller/EmployeeController');
const user_obj = require('./controller/UserController');
const router = express.Router();

// router.get('/', (req, res) => {
//     res.render('home');
//     res.end();
// })

router.get("/", (req, res) => {
    res.render('home');
    res.end();
})

router.post('/', (req, res) => {
    emp_obj.Add_Record(req, res);
})

// router.use('/delete_record', (req, res) => {{
//     emp_obj.Delete_Emp(req, res);
// }})

router.use('/delete_record', (req, res) => {
    emp_obj.Delete_Emp_Async_Await(req, res);
})

// router.use('/display_records', (req, res) => {
//     emp_obj.Display_Emp_Records(req, res);
// })

router.use('/display_records', (req, res) => {
    emp_obj.Display_Emp_Recrds(req, res);
})


router.use('/search_record', (req, res) => {
    emp_obj.Search_Emp_Record(req, res);
})

router.use('/update_record', (req, res) =>{
    emp_obj.Update_Emp(req, res);
})

router.use('/update_records', (req, res) => {
    emp_obj.Update_Emp_Final(req, res);
})

router.use('/login', (req, res) => {
    user_obj.Login_Check(req, res);
})

router.use('/new_user', (req, res) => {
    user_obj.Create_Account(req, res);
})

router.use('/dashboard', (req, res) => {
    if(req.session.user_emailid != null){
        res.render('welcome');
        res.end();
    }
    else{
        res.render('login', {message : "Login Here..."});
        res.end();
    }
})

router.use('/logout', (req, res) => {
    req.session.destroy();
    res.render('login', {message : "Logout Successfully"})
})

module.exports = router;