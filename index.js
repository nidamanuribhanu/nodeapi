let express=require('express');
let app = express();
let dotenv=require("dotenv");
dotenv.config();
let PORT=process.env.PORT || 9870;
let mongo=require('mongodb');
let cors=require('cors');
const { query, request } = require('express');
let MongoClient=mongo.MongoClient;
let bodyparser=require('body-parser');
let mongoUrl="mongodb+srv://Bhanu05:Bhanu123456@cluster0.uqzkfiq.mongodb.net/?retryWrites=true&w=majority";
let data;
let KEY="bec994e3eb0121077d6bb1ad33468db6";

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send("hii from unknow")
})
// function auth(key){
//   if(process.env.KEY==key){
//     return true;
//   }else{
//     return false;
//   }
// }
app.get('/location',(req,res)=>{
  let key=req.header("x-location-token");
  if(process.env.KEY|| KEY==key){
  data.collection('location').find({state_id:1},{}).toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
  })
}else{
  res.send("unauthorized")
}
  
})
app.get('/restaurants',(req,res)=>{
  let quary={};
  let stateid=Number(req.query.stateId);
  let mealid=Number(req.query.mealid);
  let cuisineid=Number(req.query.cuisineid);
  if(stateid){
    quary={"state_id":stateid}
  }else if(mealid){
    quary={"mealTypes.mealtype_id":mealid}
  }else if(cuisineid){
    quary={"cuisines.cuisine_id":cuisineid}
  }else{
    quary={}
  }

  data.collection('zomato').find(quary).toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
  })
  
})
app.get("/filter/:mealid",(req,res)=>{
  let quary={}
  let sort={cost:1}
  let mealid=Number(req.params.mealid);
  let cuisineid=Number(req.query.cuisineid);
  let lcost=Number(req.query.lcost);
  let hcost=Number(req.query.hcost);
  if(req.query.sort){
    sort={cost:req.query.sort}
  }
  if(cuisineid && lcost && hcost){
    quary={
      "mealTypes.mealtype_id":mealid,
       "cuisines.cuisine_id":cuisineid,
       $and:[{cost:{$gt:lcost,$lt:hcost}}]}
  }
  else if(cuisineid){
    quary={
      "mealTypes.mealtype_id":mealid,
       "cuisines.cuisine_id":cuisineid}


  }else if(lcost && hcost){
   quary={ "mealTypes.mealtype_id":mealid,$and:[{cost:{$gt:lcost,$lt:hcost}}]}
}
  else{
    quary={"mealTypes.mealtype_id":mealid}
  }
  data.collection('zomato').find(quary).sort(sort).toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
  }
  )
})
app.get('/mealtype',(req,res)=>{
  let id=Number(req.query.mealtype);
  data.collection('mealtype').find({mealtype_id:id}).toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
  })
  
})
app.get("/details/:id",(req,res)=>{
  let id=Number(req.params.id)
  data.collection('zomato').find({restaurant_id:id}).toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
  }
  )
})
app.get("/menu/:id",(req,res)=>{
  let id=Number(req.params.id)
  data.collection('menu').find({restaurant_id:id}).toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
  }
  )
})
app.post("/menulist",(req,res)=>{
  if(Array.isArray(req.body.id)){
    data.collection('menu').find({menu_id:{$in:req.body.id}}).toArray((err,result)=>{
      if(err) throw err;
      res.send(result);
    })
    
  }
  else{
    res.send("invalid request")
  }
  
})
app.post("/placeOrder",(req,res)=>{
  data.collection("orders").insert(req.body,(err,result)=>{
     if (err) throw err;
     res.send("order placed")
  })
})
app.get("/Order",(req,res)=>{
  let email=req.query.email
  let quary={}
  if(email){
    quary={email}
  }
  data.collection('orders').find(quary).toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
  }
  )
})
app.put("/update/:id",(req,res)=>{
  let oid=Number(req.params.id)
  data.collection("orders").updateOne(
    {orderid:oid},
    {
       $set:{
        "status":req.body.status,
        "bank_deatails":req.body.bank_deatails,
        "date":req.body.date,
       }
    },(err,result)=>{
      if (err) throw err;
      res.send("order updated successfully");
    }
  )
})
app.delete("/deleteOrder/:id",(req,res)=>{
  let _id=mongo.ObjectId(req.params.id)
  data.collection("orders").remove({_id},(err,result)=>{
    if (err) throw err;
    res.send("order deleted ");
  })
})
MongoClient.connect(mongoUrl,(err,client)=>{
   if(err) console.log("error while connecting")
   data=client.db('apidata')
   app.listen(PORT,()=>{
    console.log('listening on port '+PORT);
});
})



