const express = require ('express');
const app = express();
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);
var rooms = {};
const cors = require ('cors')
const {v4 : uuid, parse} = require ('uuid');
var roomcounter = 0;
var intervals = {};


app.use(cors ());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static('public'))

// Used for the fetch api request

app.use (express.json());

server.listen(process.env.PORT || 3002, () => {
    
  });

app.get ('/',(req,res)=>{
    res.render ('home');
})

app.get ('/createroom',(req,res)=>{
    res.render ('game',{value : "create",room : "Creating.."});
})

app.get ('/joinroom',(req,res)=>{
    res.render ('game', {value : "join",room : req.query.room});
})


app.post ('/checkroom',(req,res)=>{
    const text = req.body;
    // console.log (text);

    if (!rooms[text.room]){
        res.status (200).json ({"status" : 0});

    }

    else{
        if (rooms[text.room]["counter"] >= 2){
            res.status (200).json ({"status" : 0});
        }
    
        else{
            // rooms[text.room]['counter'] ++;
            res.status(200).json ({"status" : 1});
            // console.log (rooms[text.room]);
        }

    }
})



// Socket Connections 

    io.on ('connection',(socket)=>{
    console.log ('A User Connected !');

    socket.emit('connected',socket.id);

    socket.on ('createroom',()=>{
        roomcounter ++ ;
        rooms[roomcounter] = {};
        rooms[roomcounter]["rid"] = uuid();
        rooms[roomcounter]["counter"] = 1;
        socket.join (rooms[roomcounter]["rid"]);

        socket.emit ('roomcreated',roomcounter);
    })

    socket.on ('disconnect',()=>{
        console.log ('User Disconnected');


    })


    socket.on ('joinroom',(roomno)=>{
        // console.log (roomno)
        // console.log (rooms[roomno])
        socket.join (rooms[roomno]["rid"]);
        socket.emit ('roomjoined');
        rooms[roomno]["counter"] ++;
        
    })

    socket.on ('sendmessage',(data)=>{

        // console.log (data.room);
        socket.broadcast.to(rooms[data.room]["rid"]).emit ('messageaya',data.mes);
    })

    socket.on ('startgame',((data)=>{
        // console.log (data);
        socket.broadcast.to(rooms[data.room]["rid"]).emit ('startinggamenow');
    }))

    socket.on ('setPosition',((data)=>{
        socket.broadcast.to(rooms[data.room]["rid"]).emit ('settingPositionNow',{x : data.x,y : data.y});
    }))

    socket.on ('setDraw',((data)=>{
        socket.broadcast.to (rooms[data.room]["rid"]).emit ('settingDrawNow',{x : data.x,y : data.y,button : data.button});
    }))


    socket.on ('setColor',((data)=>{
        // console.log (data.val);
        socket.broadcast.to(rooms[data.room]["rid"]).emit ('settingColorNow',{val : data.val});
    }))


    socket.on ('setWord',((data)=>{
        socket.broadcast.to(rooms[data.room]["rid"]).emit ('settingWordNow',{word : data.word});
    }))

    socket.on ('clearCanvas',((data)=>{
        socket.broadcast.to(rooms[data.room]["rid"]).emit ('clearingCanvasNow');
    }))

    socket.on ('scoreUpdate',((data)=>{
        socket.broadcast.to(rooms[data.room]["rid"]).emit ('scoreUpdatingNow',{score : data.score, taker : data.taker});
    }))

    socket.on ('changeNotifRound',(data)=>{
        socket.broadcast.to(rooms[data.room]["rid"]).emit ('changingNotifRound',{round : data.round});
    })

    socket.on ('roundend',(data)=>{
        socket.broadcast.to (rooms[data.room]["rid"]).emit ('roundended');
    })

    socket.on ('startTimer',(data)=>{
        c = 0;
        // console.log ('jai' + data.room)
        intervals[data.room] = setInterval(() => {
            c++;
            // console.log (c);
            if (c == 39){
                clearInterval(intervals[data.room]);
                socket.emit ('TimeisUp');
            }
        }, 1000);

        // console.log ('kaka' + intervals[data.room]);

        // socket.to(rooms[data.room]).emit('intervalId',{intid : intervalId});
    })

    socket.on ('stopcounter',(data)=>{

       clearInterval(intervals[data.room]);

        socket.in(rooms[data.room]["rid"]).emit('stoppingcounter');
    })

    socket.on ('winner',(data)=>{
        socket.broadcast.to(rooms[data.room]["rid"]).emit('winningnow',{winn : data.winner});
    })

    socket.on ('newgame',(data)=>{
        socket.broadcast.to (rooms[data.room]["rid"]).emit('preparenewgame');
    })


    socket.on ('startBrandNewgame',(data)=>{
        socket.broadcast.to (rooms[data.room]["rid"]).emit ('Brandnewgamestarting');
    })
})




