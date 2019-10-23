class Cell{
    constructor(cellId,building){
        this.cellId = cellId;
        this.building = building;
    }
}

class Resource{
    constructor(name,saving=0,consumer,product,iconClass){
        this.name = name;
        this.saving = saving;
        this.consumer = consumer;
        this.product = product;
        this.iconClass = iconClass;
    }

    setValue($num){
        this.saving = $num;
    }

    incCons($num){
        this.consumer += $num;
    }

    incProd($num){
        this.product += $num;
    }

    iconGetter(){
        return this.iconClass;
    }

    termEndCal(){
        if(this !=product){
            var result =  this.saving - (this.consumer)+(this.product);
        }else{
            var result = this.product;
        }
        
        if(result>0){
            this.setValue(result);
        }else{
            this.setValue(0);
        }
    }

    restConsProd(){
        this.consumer=0;
        this.product=0;
    }
}

class Building {
    constructor(name,sizeLevel=1,prodLevel=1,worker=0,product,consume,image){
        this.name = name;
        this.sizeLevel = sizeLevel;
        this.prodLevel = prodLevel;
        this.worker = worker;
        this.maxWorker = this.sizeLevel*5;
        this.product = this.prodLevel*product;
        this.comsume = consume;
        this.image = image;
    }


    consumeVal(){
        if(this.name!='住居'){
            return (this.comsume)*(this.worker)
        }else{
            return 0;
        }
    }

    productVal(){
        return (this.product)*(this.worker)
    }

    incWoker(){
        if(this.worker < this.maxWorker && 0<getFreePeople()){
            this.worker += 1;
        }
    }

    decWoker(){
        if(0<this.worker){
            this.worker -= 1;
        }
    }

    getConsumption(){
        switch(this){
            case store:
                food.incCons(this.consumeVal());
                break;
    
            case factory:
                food.incCons(this.consumeVal());
                break;
    
            case farm:
                food.incCons(this.consumeVal());
                break;
        }
    }

    getProduct(){
        switch(this){
            case store:
                money.incProd(this.productVal());
                break;
    
            case factory:
                product.incProd(this.productVal());
                break;
    
            case farm:
                food.incProd(this.productVal());
                break;
        }
    }


    showBuldInfo(){
        
        if(this == residens){
            $('.buildInfo').find('img').attr('src',this.image);
            $('.info-buildName').text(this.name);
            $('.info-workerNum').text("--");
            $('.info-productNum').text(people.saving + "人が住んでいる");
            $('.info-product').text('人口')
        }else{
            $('.buildInfo').find('img').attr('src',this.image);
            $('.info-buildName').text(this.name);
            $('.info-workerNum').text(this.worker + "/" +this.maxWorker);
            $('.info-productNum').text(this.product);
            $('.info-upsize').text("規模レベル:Lv." + this.sizeLevel);
            $('.info-upquality').text("生産性レベル:Lv." + this.prodLevel);
            $('.info-product').text('生産物');
            console.log(this.sizeLevel);

        }
    }

    
}




//資源インスタンス

const people = new Resource('労働者',0,0,0,'fas fa-user-friends');
const food = new Resource('食料',0,0,0,'fas fa-apple-alt');
const product = new Resource('生産力',0,0,0,'fas fa-hammer');
const money = new Resource('資金',0,0,0,'fas fa-money-bill-wave');
const anger = new Resource('不満',0,0,0,'fas fa-angry');


//建物インスタンス
const residens = new Building('住居',0,0,0,10,0,'pictures/town.png');
const store = new Building('商業区',1,1,1,5,2,'pictures/middle-store.png');
const factory = new Building('工場',1,1,1,10,2,'pictures/middle_factory.png');
const farm = new Building('農場',1,1,1,3,1,'pictures/farm.png');


var cellData = [];
cellData[1]= new Cell(1,residens);
cellData[2]= new Cell(2,store);
cellData[3]= new Cell(3,factory);
cellData[4]= new Cell(4,farm);
console.log(cellData);

//初期設定
var term = 1;
function inti(){
    term = 1;
    people.setValue(10);
    food.setValue(50);
    product.setValue(10);
    money.setValue(100);
    anger.setValue(0);

    $('#people-info').children('p').text(getFreePeople()+"/"+people.saving);
    $('#food-info').children('p').text(food.saving);
    $('#product-info').children('p').text(product.saving);
    $('#money-info').children('p').text(money.saving);
    $('#anger-info').children('p').text(anger.saving);
    $('#term').children('h4').text(term);

}



function showNext(){
    goNext();
    $('#people-info').children('p').text(getFreePeople()+"/"+people.saving);
    $('#food-info').children('p').text(food.saving);
    $('#product-info').children('p').text(product.saving);
    $('#money-info').children('p').text(money.saving);
    $('#anger-info').children('p').text(anger.saving);
    term += 1;
    $('#term').children('h4').text(term);
}

function getFreePeople(){

    var freePeople = people.saving;
    cellData.forEach(val => {
        freePeople -= val.building.worker;
    });

    //console.log(freePeople);
    return freePeople;
}

function randomNum(max,min){
    return Math.floor(Math.random()*(max-min)+min);
}




function goNext(){
    //まず全ての建物における消費を計算する。
    //var foodcons = 0;

    //それぞれの建物の消費と生産物を計算する。
    cellData.forEach(val => {
        var bld = val.building;
        bld.getProduct();
        bld.getConsumption();
    });

    //フリーな労働者の分の食料消費を追加
    food.incCons(getFreePeople());
    
    //全ての資源で消費と生産の計算を行う。
    food.termEndCal();
    product.termEndCal();
    money.termEndCal();

    //次のターンのために消費と生産の量のプロパティを0にリセットしておく。
    food.restConsProd();
    product.restConsProd();
    money.restConsProd();
}

$(".stat-btn").on('click',inti);
$(".next-btn").on('click',showNext);


$('.building-unit').on('click',function(){
    $('#inc-worker').off('click');
    $('#dec-worker').off('click');

    $selected = $(this).attr('id');
    Number($selected);
    var hasBuild = cellData[Number($selected)].building;
    hasBuild.showBuldInfo();

    $('#inc-worker').on('click',function(){
        hasBuild.incWoker();
        hasBuild.showBuldInfo();
        $('#people-info').children('p').text(getFreePeople()+"/"+people.saving);
    })

    $('#dec-worker').on('click',function(){
        hasBuild.decWoker();
        hasBuild.showBuldInfo();
        $('#people-info').children('p').text(getFreePeople()+"/"+people.saving);
    })
})

