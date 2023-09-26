require("dotenv").config( );
const express = require('express');
const app = express( );
const PORT = process.env.PORT || 3000;
const Fruit = require("./models/fruit");
const Vegetable = require("./models/vegetable");
const mongoose = require("mongoose");
const methodOverride = require('method-override');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", ( ) =>{
  console.log("connected to mongo");
});


const jsxViewEngine = require('jsx-view-engine');

app.set('view engine', 'jsx')
app.set("views", './views');

app.engine('jsx', jsxViewEngine( )); 

app.use(express.static("public"));

app.use((req, res, next) => {
  console.log('Middleware: I run for all routes, 1');
  next( );
});

app.use(methodOverride('_method'));

app.use(express.urlencoded( {extended: false} ) ) 

app.get('/fruits/seed', async (req,res) => {
  try {
    await Fruit.create([
        {
          name:'apple',
          color:'green',
          readyToEat:true
      },
      {
          name:'soursop',
          color:'yellow',
          readyToEat:false
      },
      {
          name:'asparagus',
          color:'green',
          readyToEat:false
      },
      {
        name:'banana',
        color:'yellow',
        readyToEat:true
      },
      {
        name:'mango',
        color:'yellow',
        readyToEat:true
      }

      
    ]);
    res.redirect('/fruits');
  }catch(err) {
    res.status(400).send(err);
  }
})


  app.get('/fruits', async (req, res) => {
    try {

 
      const foundFruits = await Fruit.find({ })
      res.status(200).render('fruits/Index', {
        fruits: foundFruits,
      });
    } catch (err) {
      res.status(400).send(err)
    }
  });
  

  app.get('/vegetables', async (req, res) => {
    try {
      const foundVegetables = await Vegetable.find({ })
      res.status(200).render('vegetables/Index', {
        vegetables:foundVegetables,
      });
    } catch (err){
      res.status(400).send(err)
    }
  });


app.get("/fruits/new", (req,res) => {
  console.log('New controller');
  res.render("Fruits/New");
})

app.get("/vegetables/new", (req,res) => {
  console.log('New controller');
  res.render("Vegetables/New");
})


app.delete("/fruits/:id", async (req, res) => {
  try {
    await Fruit.findByIdAndDelete(req.params.id);
    res.status(200 ).redirect('/fruits' );
  } catch (err) {
    res.status(400).send(err);
  }
} )


app.put('/fruits/:id', async (req, res) => {
  try {
  
    if (req.body.readyToEat === 'on') {
      req.body.readyToEat = true;
    }
    else{
      req.body.readyToEat = false;
    }
    const updatedFruit = await Fruit.findByIdAndUpdate(
     
      req.params.id,
      
      req.body, 
     
      {new: true})

      res.redirect(`/fruits/${req.params.id}`);
  } catch (err) {
    res.status(400).send(err);
  }

});


app.post("/fruits", async (req, res)=> {
  try {
    req.body.readyToEat = req.body.readyToEat === "on"; 
    const createdFruit = await Fruit.create(req.body)
    res.status(201).redirect('/fruits');
  }   catch (err){
    res.status(400).send(err)    
  }
});

app.get('/vegetables/seed', async (req,res) => {
  try {
    await Vegetable.create([
        {
          name:'apple',
          color:'green',
          readyToEat:true
      },
      {
          name:'soursop',
          color:'yellow',
          readyToEat:false
      },
      {
          name:'asparagus',
          color:'green',
          readyToEat:false
      },
      {
        name:'banana',
        color:'yellow',
        readyToEat:true
      },
      {
        name:'mango',
        color:'yellow',
        readyToEat:true
      }

      
    ]);
    res.redirect('/vegetables');
  }catch(err) {
    res.status(400).send(err);
  }
})

app.post("/vegetables", async (req, res)=> {
  try {
    req.body.readyToEat = req.body.readyToEat === "on"; 
    const createdVegetable = await Vegetable.create(req.body)
    res.status(201).redirect('/vegetables');
  } catch(err) {
    res.status(400).send(err)
  } 
});

app.get( '/fruits/:id/edit', async(req, res) => {
  try {
   
    const foundFruit = await Fruit.findById(req.params.id);
    res.render('fruits/Edit',{
      fruit: foundFruit 
  })
  }catch(err){
  res.send(400).send(err);
  }
})


  
  app.get('/fruits/:id', async (req, res) => {
    try {
      const foundFruit = await Fruit.findById(req.params.id)
      res.render('fruits/Show', {
        fruit: foundFruit
      });
    }catch(err){
      res.status(400).send(err)
    }
  });


  app.get('/vegetables/:id', async (req, res) => {
    try {
      const foundVegetable = await Vegetable.findById(req.params.id)
      res.render("vegetables/Show", {
        vegetable:foundVegetable
      });
    } catch (err){
      res.status(400).send(err)
    }
  });


  app.listen(PORT, ( ) => {
    console.log(`Listening on port: ${PORT}`);
  });