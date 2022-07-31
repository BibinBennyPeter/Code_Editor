const express = require('express')
const dotenv = require("dotenv");


const connectDB = require("./config/db");
const userRoutes =require('./routes/userRoutes');
const {notFound,errorHandler}  = require('./middleware/errorMiddleware')
const path = require("path");

var request = require('request-promise');
var cors=require('cors');
const { protect } = require('./middleware/authMiddleware');
const { authUser } = require('./controller/userController');

dotenv.config();
connectDB();
const app = express()

// const cors = require('cors')
const http = require('http').createServer(app)

app.use(express.json());
app.use(cors());

app.use("/home",protect)
app.use("/home/code/",protect)

app.use("/api/user",userRoutes);

//const io = require('socket.io')(http) // Socket 
const io = require("socket.io")(http, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        // credentials: true,
    },
});




const PORT = process.env.PORT || 8000

//  app.use(express.static(__dirname + ''))
// app.options('*', cors())
// app.use(cors())

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })
app.use(express.static(path.join( __dirname,"../frontend/build")));
app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'..','frontend','build','index.html'))
})

app.post('/home/code',async(req, res)=>{
    const code =await req.body.code;

    console.log(code);
    let program = {
        script : code,
        language : 'python3',
        stdin : req.body.stdin,
        versionIndex :"3",
        clientId : "dc6f958081f15940b2dde34b4150c2f4",
        clientSecret : "b1f57362d4071ed2dd8db85a65dd66590e5ca17f2d84330de38fa8145717a858",
    
    };
    // console.log(program);
    
    request({
            url:'https://api.jdoodle.com/v1/execute',
            method: "POST",
            json: program,
        },(error,response,body) => (
            res.json({
                "output":body.output,
            })
        )
    )
});


io.on('connection', (socket) => {
    //npm console.log('Connected..')
    socket.on('message',(roomId)=>{
        socket.join(roomId);
        //console.log(roomId)
    }
    )
     socket.on('chat',(roomId)=>{
        socket.join(roomId);   
        //console.log(roomId)
    }
    )
    socket.on('new',(roomId)=>{
        socket.to(roomId).emit('newconn');
    })
    
    socket.on('message', (msg) => {
        if(msg.message!=undefined)
        {
            // console.log(msg.user)
            //console.log(msg.room)
            socket.to(msg.room).emit('message', msg);
           //console.log(msg.message)
            // socket.to(msg.room).emit('typing',msg);
        }
    })

    socket.on('chat', (cmsg) => {
        if(cmsg.message!=undefined)
        {
            console.log('backend ---- onoonon ')
            //console.log(msg.room)
            socket.to(cmsg.room).emit('chat', cmsg);
            // console.log(cmsg.message)
            // socket.to(msg.room).emit('typing',msg);
        }
    })

})


app.use(notFound)
app.use(errorHandler)

http.listen(PORT, () => {
    console.log(`Listening on  http://localhost:${PORT}`)
})