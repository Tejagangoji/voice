let express = require('express')
let bodyParser = require('body-parser')
const cors = require('cors');
let mongo = require("./db.js");
let app = express();
app.use(bodyParser.json())
app.options("*", cors());
app.use(cors());
let PORT = 8001
app.get('/test',(req,res)=>{
    return res.send('server is running')
})

app.put("/updateFaq", async (req, res) => {
 
    const { question, answer,id } = req.body; 
    try {
      const db = await mongo.connect();
      let  FaqsTb = await db.collection('faqs');
      let response = await FaqsTb.findOneAndUpdate({"id":id},{$set:{"question":question,"answer":answer}})
      return res.status(200).json({ message: "FAQ updated successfully!",response:response,status:true });
    } catch (error) {
      console.error("Error updating FAQ:", error);
      res.status(500).json({ error: "Failed to update FAQ" });
    }
  });

  app.get('/getFaqs',async (req,res)=>{
    try{
        const db = await mongo.connect();
       let  FaqsTb = await db.collection('faqs');
        let FaqsResponse =  await FaqsTb.find({}).toArray();
        return res.status(200).json({ message: "FAQ Data Getting successfully!",response:FaqsResponse,status:true });

    }catch(error){
        console.error("Error updating FAQ:", error);
        res.status(500).json({ error: "Failed to update FAQ" });
    }
  })

app.listen(PORT,function(err){
    console.log(`server is running on ${PORT}`)
})







