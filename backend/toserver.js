const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

const MONGO_URI = "mongodb+srv://nitharjude:nitharjude1906@cluster0.lfd5f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(bodyparser.json());
app.use(cors());




mongoose.connect("mongodb://nitharjude:nitharjude1906@cluster0-shard-00-01.lfd5f.mongodb.net:27017,cluster0-shard-00-00.lfd5f.mongodb.net:27017,cluster0-shard-00-02.lfd5f.mongodb.net:27017/?ssl=true&retryWrites=true&w=majority&appName=Cluster0&authSource=admin&replicaSet=atlas-lcqk7a-shard-0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: { w: "majority" } 
})
.then(() => console.log(" MongoDB Connected!"))
.catch(err => console.error(" MongoDB Connection Error:", err));


const roomRouter = require('./routes/roomRouter');


app.use('/api/rooms', roomRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});