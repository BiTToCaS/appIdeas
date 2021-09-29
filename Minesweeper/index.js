gamemode = -1;
cell_counter = -1;

function create_game(value) {
    document.getElementById("title").style.display = 'none';
    document.getElementById("btn_box").style.display= 'none';
    document.getElementById("back").style.display= 'block';
    document.getElementById("container").style.display= 'block';
    create_grid(parseInt(value));
}

function create_grid(gamemode){
    dimension = 0;
    grid = document.getElementById("grid");
    container = document.getElementById("container");
    checkClassList(grid.classList);
    switch(gamemode){
        case 0:
            dimension = 8;
            document.getElementById("mines_left").innerHTML = "1 0"
            document.getElementById("mines_left").value = 10;
            document.getElementById("restart_btn").style.marginLeft = "45px";
            container.style.width = "210.8px";
            grid.classList.add('grid-container-easy')
            break;
        case 1:
            dimension = 14;
            document.getElementById("mines_left").innerHTML = "4 0"
            document.getElementById("mines_left").value = 40;
            document.getElementById("restart_btn").style.marginLeft = "117px";
            container.style.width = "366.8px";
            grid.classList.add('grid-container-med')
            break;  
        case 2:
            dimension = 20;
            container.style.width = "522.8px";
            document.getElementById("mines_left").innerHTML = "9 9"
            document.getElementById("mines_left").value = 99;
            document.getElementById("restart_btn").style.marginLeft = "190px";
            grid.classList.add('grid-container-hard')
            break;
        default: 
            break;
    }
    
    console.log(dimension);
    for( i = 0; i < dimension; i++){
        for ( j = 0; j< dimension; j++){
            var cell = document.createElement('div');
            cell.id = ++cell_counter;
            cell.className = 'grid-item';
            
            cell.onmouseup = function (){
                check_cell();
            }

            cell.addEventListener("contextmenu", e => e.preventDefault());  //Disable right click menu

            document.getElementById('grid').appendChild(cell);
        }
    }

    document.getElementById('grid').style.display = 'inline-grid';

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

function check_cell(){
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
    cell.style.borderColor = "rgb(148, 145, 145)";
     
    number = 2;


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

function restart_down(){
    document.getElementById("restart_btn").style.borderColor = "rgb(239, 239, 239)";
}

function restart_up(){
    document.getElementById("restart_btn").style.borderColor = "rgb(58, 57, 57)";
}

function right_click(cell){
    if (cell.value == false){
        cell.style.fontSize= "15px";

        cell.innerHTML = "🚩";
        cell.value = true;
        sub_mine(); 
    }
    else{
        cell.innerHTML = "";
        cell.style.fontSize= "18px";
        cell.value = false; 
        sum_mine()
    }

}


function sub_mine(){
    counter = document.getElementById(mines_left);
    counter.value = counter.value -1 ;

    if (length(toString(counter.value)) > 1){
        counter.innerHTML = toString(counter.value)[0] + " " + toString(counter.value)[1];
    }
}


function sum_mine(){
    counter = document.getElementById(mines_left);
    counter.value = counter.value + 1;
    
    if (length(toString(counter.value)) > 1){
        counter.innerHTML = toString(counter.value)[0] + " " + toString(counter.value)[1];
    }
}



// 🌋 🚬 🗿	