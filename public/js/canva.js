let canva = document.getElementById('canva');
let cnv = canva.getContext ('2d');
let color = "black";
var turn = 0;
var score = 0;
var timerInterval;
let round = 1;

let wordsListArray = ["Abjure",	"Future",	"Picnic",
    "Agonistic",	"Garland",	"Protect",
    "Airline",	"Gigantic",	"Publish",
    "Bandit",	"Goofy",	"Quadrangle",
    "Banquet",	"Government",	"Recount",
    "Binoculars",	"Grandnieces",	"Redoubtable",
    "Biologist",	"Handbook",	"Reflection",
    "Blackboard",	"Himself",	"Reporter",
    "Board",	"Indulge",	"Ring",
    "Bookworm",	"Inflatable",	"Salesclerk",
    "Butterscotch",	"Inimical",	"Snapshot",
    "Camera",	"Interim",	"Shellfish",
    "Campus",	"Invest",	"Ship",
    "Catfish",	"Jackpot",	"Significance",
    "Carsick",	"Kitchenette",	"Sometimes",
    "Celebrate",	"Law",	"Sublime",
    "Celery",	"Life",	"Tabletop",
    "Citizen",	"Lifeline",	"Teamwork",
    "Coloring",	"Love",	"Tennis",
    "Compact",	"Magnificent",	"Timesaving",
    "Dark",	"Malevolence",	"Tree",
    "Damage",	"Man",	"Termination",
    "Dangerous",	"Mascot",	"Underestimate",
    "Decorum",	"Marshmallow",	"Vineyard",
    "Endorse",	"Mine",	"War",
    "Engender",	"Moonwalk",	"Way",
    "Erratic",	"Near",	"Wealth",
    "Envelope",	"Nephogram",	"Wednesday",
    "Etymology",	"Newborn",	"World",
    "Eyewitness",	"Noisome",	"Xerox",
    "Eulogy",	"Owl",	"You",
    "Fish",	"Parenthesis",	"Zestful",
    "Food",	"Perpetrator",	
    "Foreclose",	"Phone"]

let pos = {x : 0,y : 0};

canva.addEventListener('mouseenter',setpos_turn);
canva.addEventListener('mousemove',draw_turn);

function setpos (e){

    canva.style.cursor = "crosshair"
    pos.x = e.clientX;
    pos.y = e.clientY;
}

function setpos_turn (e){
    if (turn){
        setpos(e);

        socket.emit ('setPosition',{x : e.clientX, y : e.clientY ,room : document.getElementById('actualroom').value});
    }
}

function draw_turn (e){
    if (turn){
        draw (e);

        socket.emit ('setDraw',{x : e.clientX, y : e.clientY,button : e.buttons, room : document.getElementById('actualroom').value});
    }
}

function draw (e){
    
    if (e.buttons  == 1){
        let bounds = canva.getBoundingClientRect();
        pos.x = e.clientX -bounds.left;
        pos.y = e.clientY-bounds.top;

        cnv.beginPath ();
        
        cnv.lineWidth = 5;
        cnv.lineCap = "round";
        cnv.strokeStyle = color;
        // console.log (pos);
        cnv.moveTo (pos.x,pos.y);
        // pos.x = e.clientX;
        // pos.y = e.clientY;
        // setpos(e);
        cnv.lineTo (pos.x,pos.y);   
    
        cnv.stroke();
    }

}

// draw ();


function sending (e){
}

function sendmessage (){
    

    if (document.getElementById('mes').value != ""){
        let chats = document.getElementById('chats');
        
        let a = document.createElement('div');
        a.setAttribute('class','cb');
        a.innerText = "YOU : " +  document.getElementById('mes').value;
        
        chats.prepend(a);
        
        socket.emit ('sendmessage',{mes : document.getElementById('mes').value , room : document.getElementById('actualroom').value});

        if (turn == 0){
            if (document.getElementById('wordhide').value.toLowerCase() == document.getElementById('mes').value.toLowerCase()){
                a = document.createElement('div');
                a.setAttribute('class','cb');
                a.innerText = "You Guessed the Word Correct !";
                a.style.backgroundColor = "rgb(65 228 41)";
                chats.prepend(a);
                score = score + 100;

                score_updater(score,document.getElementById('via').value);
                socket.emit ('scoreUpdate' , {room : document.getElementById('actualroom').value, score : score, taker : document.getElementById('via').value});
                socket.emit ('sendmessage',{mes : "Guessed The Word Correct !" , room : document.getElementById('actualroom').value});

                socket.emit ('stopcounter', {room : document.getElementById('actualroom').value});

                clearInterval(timerInterval)
                resettimer();
            }
        }
        document.getElementById('mes').value = "";


    }

}



function getmessage (mes){

        let chats = document.getElementById('chats');
    
        let a = document.createElement('div');
        a.setAttribute('class','cb');

        if (mes == "Guessed The Word Correct !"){
            a.style.backgroundColor = "rgb(65 228 41)";
        }

        else{

            a.style.backgroundColor = "#ff6f00";
        }

        if (document.getElementById('via').value == "join"){
            a.innerText = "HOST : " + mes;
            
        }
        
        else{
            
            a.innerText = "USER : " + mes;
        }
    
        chats.prepend(a);
    

        document.getElementById('mes').value = "";


    
}


function setcolor (e){
    if (turn){
        settingcolor(e);
        socket.emit ('setColor', {val : e.value, room : document.getElementById('actualroom').value});
    }    
}

function settingcolor (e){
    color = e.value;
}

function clearcanvas(){
    if (turn){
        clearingcanvas();
        socket.emit ('clearCanvas', {room : document.getElementById('actualroom').value});
    }
}

function clearingcanvas (){
    cnv.clearRect (0,0,canva.width,canva.height);
}


// For Selection Box


function selection_show (){
        console.log ('round ' + round);
        if (round < 4){

            if (document.getElementById('via').value == "create"){
                socket.emit ('changeNotifRound', {room : document.getElementById('actualroom').value, round : round});
                changeRound (round);
                round ++ ;
            }

            let num = Math.floor(Math.random() * (99 - 0) + 0);
            document.getElementById('o1').innerText = wordsListArray[num];
    
            num = Math.floor(Math.random() * (99 - 0) + 0);
            document.getElementById('o2').innerText = wordsListArray[num];
    
            num = Math.floor(Math.random() * (99 - 0) + 0);
            document.getElementById('o3').innerText = wordsListArray[num];
    
    
            document.getElementById('selectionOptionid').style.display = "flex";

        }

        else{
            console.log ('jai');
            showwinner();
        }
    

}

function selection_hide (){
    document.getElementById('selectionOptionid').style.display = "none";
}


function selection_clicked (e){
    let value = "";

    let x = e.innerText;
    document.getElementById('wordhide').value = x;
    


    document.getElementById('words').innerText = x;

    socket.emit ('setWord', {room : document.getElementById('actualroom').value, word : x});
    selection_hide();

    socket.emit ('startTimer',{room : document.getElementById('actualroom').value});

    runtimer();

}


function setwordField (word){
    let value = "";

    let x = word;
    document.getElementById('wordhide').value = x;

    if (x.length > 2){
        value = value + x[0];

        for (i=1;i<x.length-1;i++){
            value = value + " _ ";
        }

        value = value + x[x.length-1];
    }

    else{
        for (i=0;i<x.length;i++){
            value = value + " _ ";
        }
    }


    document.getElementById('words').innerText = value;
}



// Canvas Options

function showCanvasOptions (){
    document.getElementById('color').style.display = "block";
    document.getElementById('clear').style.display = "block";
}

function hideCanvasOptions (){
    document.getElementById('color').style.display = "none";
    document.getElementById('clear').style.display = "none";
}

hideCanvasOptions();



// Winner

function showwinner (){
    let hostS = parseInt( document.getElementById('host_score').innerText.slice(6));
    let userS =parseInt(document.getElementById('user_score').innerText.slice(6));

    console.log ('a');
    console.log (hostS + "   " + userS);

    if (hostS > userS){
        victory ('Host')
        socket.emit ('winner',{ room : document.getElementById('actualroom').value, winner : "Host"});
    }
    
    else if (hostS < userS){
        victory ('User');
        socket.emit ('winner',{ room : document.getElementById('actualroom').value, winner : "User"});
    }
    
    else{
        Gamedraw();
        socket.emit ('winner',{ room : document.getElementById('actualroom').value, winner : "draw"});
    }

}

function victory (a){
    document.getElementsByClassName('winner')[0].style.display = "flex";
    document.getElementById('winnerName').innerText = a;
    
}

function Gamedraw (){
    document.getElementsByClassName('winner')[0].style.display = "flex";
    document.getElementById('wintext').innerText = "This Game is a DRAW !";
    
}


// Function run timer

function runtimer (){
    let c = 0;
    
    timerInterval = setInterval(() => {
        t = 40-c-1;
        c++;
        document.getElementById('timer').innerText = t + " Seconds";

        if (c == 39){
            clearInterval(timerInterval);
        }
    }, 1000);
}


// Score Updater

function score_updater (a,b){
    if (b == "join"){
        document.getElementById('user_score').innerHTML = " <h3>User : " + a + "</h3>";
    }

    else{
        document.getElementById('host_score').innerHTML = "<h3>Host : " + a + "</h3>";
    }
}


// Round Chager

function changeRound (a){
    document.getElementById('notification').innerText = "Round : " + a;
}

function changingTurn (){
    if (turn){
        turn = 0;
        clearingcanvas();
        hideCanvasOptions();
        document.getElementById('words').innerText = "Wating for the Player ....";
        socket.emit ('roundend',{room : document.getElementById('actualroom').value});
    }
}


function resettimer (){
    document.getElementById('timer').innerText = 00 + " Seconds";
}


function newgame(){
    console.log ('chalao');
    color = "black";
    turn = 0;
    score = 0;
    round = 1;
    document.getElementById('notification').innerText = "Round : 1";

    document.getElementById('host_score').innerText = "Host : 00";
    document.getElementById('user_score').innerText = "User : 00";
    document.getElementsByClassName('winner')[0].style.display = "none";
    document.getElementById('wintext').innerHTML = `<span id="winnerName">Host</span> Won the Game`;
    document.getElementById('words').innerText = "Waiting For Player .... ";

    socket.emit ('newgame',{room : document.getElementById('actualroom').value});
}