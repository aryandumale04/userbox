const express = require("express");
const app = express();
const path= require("path");

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
const userModel = require("./models/user");

app.get('/',(req,res)=>{

    res.render("index");

});
app.get('/read',async (req,res)=>{
    let allUSers= await userModel.find();
    res.render("read",{users : allUSers});

});
app.post('/create', async (req,res)=>{
    let {name, email, image} =req.body;
   let createdUser = await  userModel.create({

        name : name,
        email : email,
        image

    })
    res.redirect("/read");
    

});
app.get('/delete/:id',async (req,res)=>{
   let deletedUSer= await  userModel.findOneAndDelete({_id : req.params.id});
   res.redirect("/read");
});
app.get('/edit/:id',async (req,res)=>{
    let user = await userModel.findOne({_id : req.params.id})
    res.render("edit",{user});
 });
 app.post('/update/:id', async (req,res)=>{
    let {name, email, image} =req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.id},{name,image,email},{new: true})
    res.redirect("/read");
    

});
app.listen(3000);

