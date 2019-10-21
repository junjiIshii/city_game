const $buildBtn = $('.build');
const $selectBuil = $('.buildings');
const $stopBtn = $('.stop');
const $cells = $('.cell');
const rows = $('.row').length;
const $cellNum = $('.cell').length;
const $lineNum = $cellNum / rows;

class Geo {
    constructor(name,id,imageFile){
        this.name = name;
        this.id = id;
        this.cssbg = imageFile;
    }
}

class Buildings{
    constructor(name,id,imageFile){
        this.name = name;
        this.id = id;
        this.cssbg = imageFile;
    }

    buildup(){
        $cells.on('click',function(){

            if($(this).hasClass('sea')||$(this).hasClass('mountain')||$(this).hasClass('forest')){
                alert('ここには建物を作れません！')
                $cells.off('click')
            }else{
                $(this).addClass(this.name);
                $(this).addClass('has-build');

                $cells.off('click')
            }
            
        })
    }
}

var village = new Buildings('village','village','pictures/village.png');
var s_factory = new Buildings('s_factory','smallfactory','pictures/small_factory.png');
var s_store = new Buildings('s_store','smallstore','pictures/small_store.png');
var farm = new Buildings('farm','farm','pictures/farm.png');




var hexCell = function($cell){

    $taeget = $cell.attr('id');
    $taeget = Number($taeget);

    $right = $taeget+1;
    $left = $taeget-1;
    $upper = $taeget-$lineNum;
    $under = $taeget+$lineNum;

}


$selectBuil.on('click',function(){
    $buildig = $(this).attr('id');
    console.log($buildig);
    $cells.on('click',function(){

        if($(this).hasClass('sea')||$(this).hasClass('mountain')||$(this).hasClass('forest')){
            alert('ここには建物を作れません！')
            $cells.off('click')
        }else{
            $(this).addClass($buildig);
            $(this).addClass('has-build');

            //$cellId = $(this).attr('id');
            $(this).find('input').attr('value',$buildig);

            //console.log($cellId);
            //$('#input'+$cellId).attr('value',"aiueo");

            $cells.off('click')
        }
        
    })
})



$stopBtn.on('click',function(){
    $cells.off('click');
})

$('.map-edit').on('click',function(){
    

    
    $cells.on('click',function(){
        $(this).addClass("forest");
    })
    
    
})
