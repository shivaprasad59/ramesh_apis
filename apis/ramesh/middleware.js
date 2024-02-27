const express = require("express");
const { User } = require("./ramesh/connect");
const app = express();

app.use(express.json());

// const sample_data = [
//     {
//         "id": 1,
//         "name": "Ramesh",
//         "email": "manginapallyshiva@gmail.com",
//         "department": "CSE"
//     },
//     {
//         "id": 2,
//         "name": "Shiva",
//         "email": "manginapallyshiva59@gmail.com",
//         "department": "CSE4"
//     }
// ];

app.get("/getDetails/:id", async (req, res) => {
    const userId = String(req.params.id);
    try {
        const response = await User.findOne({ id: userId });
        console.log(response);
        if (response) {
            res.json(response);
        } else {
            res.send("No user found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

app.get("/getDetails", async (req, res) => {
    // const userId = String(req.params.id);
    try {
        const response = await User.find();
        console.log(response);
        if (response) {
            res.json(response);
        } else {
            res.send("No user found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});


app.post("/getDetails", async (req, res) => {
    console.log(req.body);
    try {
        const newUser = new User({
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            department: req.body.department
        });
        await newUser.save();
        res.send("Posted data successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error posting data");
    }
});

app.put("/getDetails/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const existingUser = await User.findOne({ id: userId });
        if (existingUser) {
            await User.updateOne({ id: userId }, {
                name: req.body.name,
                email: req.body.email,
                department: req.body.department
            });
            res.send("Updated successfully");
        } else {
            res.send("No user found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

app.delete("/getDetails/:id",async(req,res)=>{
    const userId=req.params.id;
    try{
        const response=await User.find({id:userId})
        if(response.length>0){
            console.log(response)
            await User.deleteOne({id:userId});
            // User.save();
            res.json({
                "message":"Deleted Successfully the following data",
                "payload":{response}
            });
        }
        else{
            res.send("No usr found")
        }
    }
    catch(err){
        console.log(err);
    }
})

app.listen(4564, () => {
    console.log("app is listening on port 4564");
});
