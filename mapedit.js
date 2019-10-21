document.addEventListener("DOMContentLoaded", function(){

var cells = document.getElementsByClassName('cell');

    for(var i=0; i<cells.length; i++){
        const thisCell = cells[i];
        cells[i].addEventListener('click',function(){
            thisCell.style.background = "red";

        })
    }
        
    },false);