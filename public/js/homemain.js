var socket = io();
var id = document.getElementById('sid');
var room = document.getElementById('via').value;
var roomNo = document.getElementById('room');
var rn = document.getElementById('roomNo');

socket.on ('connected',(data)=>{
    id.value = data;
})


// Creating a room page

if (room == "create"){
    socket.emit ('createroom',"a");

    socket.on ('roomcreated',(roomno)=>{
        // console.log (roomno)
        roomNo.innerText = "Room Number : " + roomno;
        // console.log ('room number alloted !');
        document.getElementById('actualroom').value = roomno;
    })

}

else{
    socket.emit ('joinroom',rn.value);
    document.getElementById('actualroom').value = rn.value;

    socket.on ('roomjoined',()=>{
        // console.log ('Room joined successfully !');
        socket.emit ('startgame',{room : document.getElementById('actualroom').value});
    })


}

socket.on ('messageaya',(data)=>{
    // console.log ('mes');
    getmessage(data);
})




// Create wale ko

socket.on ('startinggamenow',(()=>{
    turn = 1;
    selection_show();
    showCanvasOptions ();

}))



// Opponent

socket.on ('settingPositionNow',((data)=>{
    let val = {clientX : data.x, clientY : data.y}
    setpos(val);
}))


socket.on ('settingDrawNow',((data)=>{
    let val = {clientX : data.x, clientY : data.y,buttons : data.button}
    draw (val);
}))

socket.on ('settingColorNow',((data)=>{
    let x = {value : data.val};
    settingcolor (x);
}))

socket.on ('settingWordNow',((data)=>{
    setwordField(data.word);
    runtimer();
}))

socket.on ('clearingCanvasNow',()=>{
    clearingcanvas();
})

socket.on ('scoreUpdatingNow',((data)=>{
    score_updater (data.score,data.taker);
}))

socket.on ('changingNotifRound',(data)=>{
    changeRound (data.round);
})

socket.on ('roundended',()=>{
    console.log (document.getElementById('via').value);
    turn = 1;
    clearingcanvas();
    selection_show();
    showCanvasOptions ();
})

socket.on ('TimeisUp',()=>{
    document.getElementById('wordhide').value = "";
    resettimer();
    changingTurn();
})

socket.on ('stoppingcounter',()=>{
    document.getElementById('wordhide').value = "";
    clearInterval(timerInterval);
    // console.log ('chala');
    resettimer();

    changingTurn();
})


socket.on ('winningnow',(data)=>{
    console.log ('chalgya');
    if (data.winn == "draw"){
        Gamedraw();
    }

    else{
        victory (data.winn)
    }
})

socket.on ('preparenewgame',()=>{
    color = "black";
    turn = 0;
    score = 0;
    round = 1;

    document.getElementById('host_score').innerText = "Host : 00";
    document.getElementById('user_score').innerText = "User : 00";
    document.getElementsByClassName('winner')[0].style.display = "none";
    document.getElementById('notification').innerText = "Welcome to Skribble !";
    document.getElementById('wintext').innerHTML = `<span id="winnerName">Host</span> Won the Game`;
    document.getElementById('words').innerText = "Waiting For Player .... ";

    socket.emit('startBrandNewgame',{room : document.getElementById('actualroom').value});
})


socket.on ('Brandnewgamestarting',()=>{
    console.log ('starting new game');
    turn = 1;
    selection_show();
    showCanvasOptions ();
})