gamemode = -1;
cell_counter = -1;

function create_ez() {
    document.getElementById("title").style.display = 'none';
    document.getElementById("btn_box").style.display= 'none';
    document.getElementById("back").style.display= 'block';
    gamemode = 0;
    create_grid(gamemode);
}

function create_med() {
    document.getElementById("title").style.display = 'none';
    document.getElementById("btn_box").style.display= 'none';
    document.getElementById("back").style.display= 'block';
    gamemode = 1;
    create_grid(gamemode);
}

function create_hard() {
    document.getElementById("title").style.display = 'none';
    document.getElementById("btn_box").style.display= 'none';
    document.getElementById("back").style.display= 'block';
    gamemode = 2;
    create_grid(gamemode);
}

function create_grid(gamemode){
    dimension = 0;
    grid = document.getElementById("grid");
    checkClassList(grid);
    console.log(gamemode);
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
            //cell.innerHTML = cell_counter;
            //cell.innerHTML = "1";
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