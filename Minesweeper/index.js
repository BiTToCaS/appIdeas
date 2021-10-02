//Initial global variables
var gamemode = -1;
var cell_counter = -1;
var first_cell = false;
document.getElementById("timer").value = 0;
var timer_counters = 0;

//////////////////////////////////////////////////////////////////// 
//
//GAME CREATION
//
////////////////////////////////////////////////////////////////////

function create_game(value) {
    document.getElementById("title").style.display = 'none';
    document.getElementById("btn_box").style.display= 'none';
    document.getElementById("back").style.display= 'block';
    document.getElementById("container").style.display= 'block';
    var minesPositions = generateMinesPositions(parseInt(value));
    create_grid(parseInt(value), minesPositions);
}

function generateMinesPositions(gamemode){
    var noMines = 0;
    var dimensions = 0;
    minesPositions = []
    switch(gamemode){
        case 0:
            noMines = 10;
            dimensions = 8;
            break;
        case 1:
            noMines = 40;
            dimensions = 14;
            break;  
        case 2:
            noMines = 99;
            dimensions = 20;
            break;
    }

    while( minesPositions.length < dimensions){
        pos = { "x":parseInt(Math.random()*(dimensions - 1)) , "y":parseInt(Math.random()*(dimensions - 1)) };
        if(!listContains(minesPositions,pos))
            minesPositions.push(pos);
    }

    return minesPositions;
}

function listContains(l , dict){
    return l.some(e => e.x == dict.x && e.y == dict.y); 
}

////////////////////////////////////////////////////////////////////
//
//Grid Manipulation
//
////////////////////////////////////////////////////////////////////

function create_grid(gamemode, minesPos){
    first_cell = false;
    var dimension = 0;
    var grid = document.getElementById("grid");
    var container = document.getElementById("container");
    checkClassList(grid.classList);
    document.getElementById("timer").innerHTML = "0 0 0";
    document.getElementById("timer").value = 0;
    switch(gamemode){
        case 0:
            dimension = 8;
            document.getElementById("mines_left").innerHTML = "1 0"
            document.getElementById("mines_left").value = 10;
            document.getElementById("restart_btn").style.marginLeft = "45px";
            container.style.width = "210.8px";
            grid.value = 0;
            grid.classList.add('grid-container-easy')
            break;
        case 1:
            dimension = 14;
            document.getElementById("mines_left").innerHTML = "4 0"
            document.getElementById("mines_left").value = 40;
            document.getElementById("restart_btn").style.marginLeft = "117px";
            container.style.width = "366.8px";
            grid.value = 1;
            grid.classList.add('grid-container-med')
            break;  
        case 2:
            dimension = 20;
            container.style.width = "522.8px";
            document.getElementById("mines_left").innerHTML = "9 9"
            document.getElementById("mines_left").value = 99;
            document.getElementById("restart_btn").style.marginLeft = "190px";
            grid.value = 2;
            grid.classList.add('grid-container-hard')
            break;
        default: 
            break;
    }
    
    for( i = 0; i < dimension; i++){
        for ( j = 0; j< dimension; j++){
            var cell = document.createElement('div');
            console.log(minesPos);
            console.log( {x: i, y: j});
            console.log(listContains(minesPos, {x: i, y: j}));
            if(listContains(minesPos, {x: i, y: j})){
                console.log("control");
                cell.value = 0;}
            else
                cell.value = 1;
            cell.id = ++cell_counter;
            cell.className = 'grid-item';
            //cell.value = false;
            
            cell.onmouseup = function (){
                check_cell();
            }

            cell.addEventListener("contextmenu", e => e.preventDefault());  //Disable right click menu

            document.getElementById('grid').appendChild(cell);
        }
    }

    document.getElementById('grid').style.display = 'inline-grid';

}

function deleteDivs(mainDiv){
    while (mainDiv.firstChild) {
        mainDiv.removeChild(mainDiv.firstChild);
    }
}

function checkClassList(cl){
    if( cl.contains('grid-container-hard')){
        cl.remove('grid-container-hard');
    }
    else if(cl.contains('grid-container-med')){
        cl.remove('grid-container-med');
    }
    else if(cl.contains('grid-container-easy')){
        cl.remove('grid-container-easy');
    }
}

////////////////////////////////// 
//
//Cell Events
//
//////////////////////////////////

function check_cell(){

    if (first_cell == false){
        document.getElementById("timer").value = 0;
        timer_counters++;
        var time = setInterval(function() {            
            timerIncrements();
            if(first_cell == false || timer_counters > 1){
                timer_counters--;
                clearInterval(time);
                document.getElementById("timer").innerHTML = "0 0 0";
                document.getElementById("timer").value = 0;
            }    
        }, 1000);
        first_cell = true;
    }

    //Check wich mouse key was used
    isRight = -1;
    if ("which" in window.event)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRight = window.event.which == 3; 
    else if ("button" in window.event)  // IE, Opera 
        isRight = window.event.button == 2; 
    
    if (isRight)
        right_click(event.target);
    else
        left_click(event.target);
}

function left_click(cell){
    cell.style.borderColor = "rgb(190, 187, 187)";
    cell.style.backgroundColor = "rgb(190, 187, 187)";

    cell.style.fontSize =  "18px";

    cell.onmouseup = function (){ }
    
    number = cell.value;
    console.log(cell.value);
    cell.innerHTML = number;

    switch(number){
        case 1:
            cell.style.color = "blue";
            break;
        case 2:
            cell.style.color = "green";
            break;
        case 3:
            cell.style.color = "red";
            break;
        case 4:
            cell.style.color = "darkviolet";
            break;
        case 5:
            cell.style.color = "red";
            break;
        case 6:
            cell.style.color =  "orange";
            break;
        case 0:
            cell.innerHTML = "🗿";
            break;
    }
}

function right_click(cell){
    if (cell.value == false){
        if(document.getElementById("mines_left").value > 0){
            cell.style.fontSize= "15px";

            cell.innerHTML = "🚩";
            cell.value = true;
            sub_mine(); 
        }
    }
    else{
        cell.innerHTML = "";
        cell.style.fontSize= "18px";
        cell.value = false; 
        sum_mine()
    }
}

////////////////////////////////// 
//
// Restart and Back Buttons Events
//
//////////////////////////////////

function restart_down(){
    document.getElementById("restart_btn").style.borderColor = "rgb(239, 239, 239)";
}

function restart_up(){
    document.getElementById("restart_btn").style.borderColor = "rgb(58, 57, 57)";
    deleteDivs(document.getElementById('grid'))
    create_game(document.getElementById("grid").value);
}

function back(){
    document.getElementById("title").style.display = 'block';
    document.getElementById("btn_box").style.display= 'block';
    document.getElementById('container').style.display = 'none';
    document.getElementById('back').style.display = 'none';
    deleteDivs(document.getElementById('grid'))
    gamemode = -1;
    cell_counter = -1;
}


////////////////////////////////// 
//
// Mines Counter
//
//////////////////////////////////

function sub_mine(){
    counter = document.getElementById("mines_left");
    counter.value = counter.value - 1 ;

    if (counter.value.toString().length > 1){
        counter.innerHTML = counter.value.toString()[0] + " " + counter.value.toString()[1];
    }
    else
        counter.innerHTML = "0 " + counter.value;
}


function sum_mine(){
    counter = document.getElementById("mines_left");
    counter.value = counter.value + 1;
    
    if (counter.value > 9 ){
        counter.innerHTML = counter.value.toString()[0] + " " + counter.value.toString()[1];
    }
    else
        counter.innerHTML = "0 " + counter.value;
}

////////////////////////////////// 
//
// Timer Updates
//
//////////////////////////////////

function timerIncrements(){
    time = (document.getElementById("timer").value++ + 1).toString();
    switch(time.length){
        case 1:
            document.getElementById("timer").innerHTML = "0 0 " + time[0];
            break;
        case 2:
            document.getElementById("timer").innerHTML = "0 " + time[0] + " " + time[1];
            break;
        case 3:
            document.getElementById("timer").innerHTML = time[0] + " " + time[1] + " " + time[2];
            break;
    }
}

// 🌋 🚬 🗿	