gamemode = -1;
cell_counter = -1;

function create_game(value) {
    document.getElementById("title").style.display = 'none';
    document.getElementById("btn_box").style.display= 'none';
    document.getElementById("back").style.display= 'block';
    create_grid(parseInt(value));
}

function create_grid(gamemode){
    dimension = 0;
    grid = document.getElementById("grid");
    checkClassList(grid.classList);
    switch(gamemode){
        case 0:
            dimension = 8;
            grid.classList.add('grid-container-easy')
            break;
        case 1:
            dimension = 14;
            grid.classList.add('grid-container-med')
            break;  
        case 2:
            dimension = 20;
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
            document.getElementById('grid').appendChild(cell);
        }
    }

    document.getElementById('grid').style.display = 'inline-grid';

}

function back(){
    document.getElementById("title").style.display = 'block';
    document.getElementById("btn_box").style.display= 'block';
    document.getElementById('grid').style.display = 'none';
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
    console.log("verga");
}