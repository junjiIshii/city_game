class Cell{
    constructor(cellId,building){
        this.cellId = cellId;
        this.building = building;
    }
}

class Resource{
    constructor(name,saving,consumer,product,iconClass){
        this.name = name;
        this.saving = saving;
        this.consumer = consumer;
        this.product = product;
        this.iconClass = iconClass;
    }

    setValue($num){

        switch(this){
            case product:
                this.saving =Math.floor($num*(1+powerPlant.support/100));
                break;

            default:
                this.saving = $num;
        }
    }

    usethis($num){
        this.saving -= $num;
    }

    makethis($num){

        switch(this){
            case food:
                this.saving +=Math.floor($num*(1+granary.support/100));
                break;

            case money:
                this.saving +=Math.floor($num*(1+bank.support/100));
                break;

            default:
                this.saving += $num;
                break;
        }
    }

    iconGetter(){
        return this.iconClass;
    }

    removeMinus(){
        if(this.saving<0){
            return this.saving =0;
        }else{
            return this.saving;
        }
    }

    getAnger(){
        if(food.saving<0){
            var flack = -1 *food.saving;
            this.makethis(flack);
            history('食料が不足しています！！不足数：'+ flack,3);
        }

        //この50は人口ハンデ。５０を越えるまでは不満は出ない。
        if((happiness.saving-people.saving)<0 && people.saving>happinesHandi){
            var hlack = -1 *(happiness.saving-people.saving);
            this.makethis(hlack);
            history('福祉支出が十分でなく不満が蓄積しています！不足数'+ hlack,3);
        }else if((happiness.saving-people.saving)>0 && people.saving>happinesHandi){
            var rest = happiness.saving-people.saving;
            this.usethis(Math.floor(rest/people.saving));
        }
    }
        
}

class Building {
    constructor(name,sizeLevel,prodLevel,worker,product,foodComsume,image,available,unlockProd,unlockMoney){
        this.name = name;
        this.sizeLevel = sizeLevel;
        this.prodLevel = prodLevel;
        this.worker = worker;
        this.maxWorker = this.sizeLevel*5;
        this.prodPerWorker = this.prodLevel*product;//一人当たりの生産量
        this.foodComsume = foodComsume;
        this.image = image;
        this.avail = available;
        this.unlockProd=unlockProd;
        this.unlockMoney=unlockMoney;
        this.product=product;
        this.accident_flg =false;

        this.sizeUpMoney = 6;
        this.sizeUpProd = 15;

        this.qualiUpMoney = 8;
        this.qualiUpProd = 40;
    }

    costUp(){
        this.sizeUpMoney = Math.floor(this.sizeLevel*5*this.sizeLevel*0.5)*3;
        this.sizeUpProd = 5*this.sizeLevel*(this.sizeLevel+9)*0.3;

        this.qualiUpMoney = Math.floor(this.prodLevel*5*this.prodLevel*0.5)*4;
        this.qualiUpProd = 5*this.prodLevel*(this.prodLevel+9)*0.8;
    }

    workOut(){
        this.prodPerWorker = 0;
        this.accident_flg =true;
        history(this.name+'が災害によって破壊され5ターンの間使用不能になりました！',3);
    }

    repaired(){
        this.prodPerWorker = (this.prodLevel-1)+this.product;
        this.accident_flg =false;
        history(this.name+'が災害から復旧しました！',2);
    }


    foodConsumeVal(){
        //上流の各マスでの計算命令で弾いているから、this.availの設定はいらないかも。。
        if(this.avail!=0){
            switch(this){
                case residens:
                    food.usethis(0);
                    break;

                default:
                    food.usethis((this.foodComsume)*(this.worker));
            }
        }
    }

    productInfo(){
        $('.info-product').text("生産物");
        var allProd = this.worker * this.prodPerWorker; //今の労働者で作れる総生産量
        //var efficiency = this.prodPerWorker;//今のレベルでの一人当たりの効率
        switch(this){
            case farm:
                $('#product').attr('class',food.iconClass);
                $('.info-efficensyNum').text(this.prodPerWorker);
                break;

            case factory:
                $('#product').attr('class',product.iconClass);
                $('.info-efficensyNum').text(this.prodPerWorker);
                break;

            case residens:
                var allProd = people.saving;
                $('#product').attr('class',people.iconClass);
                $('.info-efficensyNum').text('--');
                break;
        }
        //効率の情報
        $('.info-efficensyNum').text(this.prodPerWorker);

        $('#useItem').attr('class',food.iconClass);
        $('.info-useNum').text((this.foodComsume)*(this.worker));

        $('#useItem2').attr('class',"");
        $('.info-useNum2').text("");

        //全ての生産物
        $('.info-productNum').text(allProd);
    }



    productMake(){
        //console.log(product.saving)
        //workerから得られる生産量は整数なのでMath.floorはいらないが、念の為
        if(this.avail!=0){
            switch(this){
                case farm:
                    food.makethis(Math.floor(this.worker * this.prodPerWorker));
                    break;
    
                case factory:
                    product.setValue(Math.floor(this.worker * this.prodPerWorker));
                    //console.log(product.saving);
                    break;
            }
        }
        
    }

    //生産総数
    productVal(){
        return (this.prodPerWorker)*(this.worker)*this.avail
    }

    incWoker(){
        if(this.worker < this.maxWorker && 0<getFreePeople()){
            this.worker += 1;
        }else if(getFreePeople() == 0){
            history('就業させる労働者がいません。',3);
        }else{
            history('就業できる労働者が最大に達しています。',3);
        }
    }

    decWoker(){
        if(0<this.worker){
            this.worker -= 1;
        }else{
            history('これ以上減らせません。',3)
        }
    }




    sizeUp(){
        
        if(this.sizeUpMoney <= money.saving && this.sizeUpProd <= product.saving){
            product.usethis(this.sizeUpProd);
            money.usethis(this.sizeUpMoney);
            this.sizeLevel += 1;
            this.costUp();

            if(this==residens){
                //10ずつ増えていく
                people.makethis(10);
                history('人口が10増えました！',2);
            }else{
                this.maxWorker=this.sizeLevel*5;
                history(this.name+'の規模レベルが上がりました！',2);
            }
            
        }else{
            history('レベルアップに必要な資源が足りません。',3);
        }
    }

    efficiUp(){
        //console.log('現在：'+this.prodLevel);
        if(this.qualiUpMoney <= money.saving && this.qualiUpProd <= product.saving && !this.accident_flg){
            product.usethis(this.qualiUpProd);
            money.usethis(this.qualiUpMoney);

            //prodPerWorkerにはコンストラクタでプロパティ出ないproductによって初期値が決まっているので
            var past = this.prodPerWorker;
            this.prodLevel += 1;
            this.prodPerWorker=past + 1;
            this.costUp();
            history(this.name+'の効率レベルが上がりました！',2);
        }else if(this.accident_flg){
            history('現在災害から復旧中です。',3);
        }else{
            history('レベルアップに必要な資源が足りません。',3);
        }
    }

    htmlConvert(){
        if(this == residens){
            $('.noNeed-residens').css({'display':'none'});
            $('.product-info').css({'justify-content':'flex-start'});
        }else{
            $('.noNeed-residens').css({'display':'inline-block'});
            $('.product-info').css({'justify-content':'space-around'});
        }
    }


    unlockBld(cellId){
        if(this.unlockMoney <= money.saving && this.unlockProd <= product.saving){
            this.avail = 1;
            product.usethis(this.unlockProd);
            money.usethis(this.unlockMoney);

            $('#'+cellId).removeClass('unavailable');
            history(this.name+'が建設されました。',2);
        }else{
            history(this.name+'の建設に必要な資源が足りません！',3);
        }
    }


    //建物情報を取得する
    showBuldInfo(){
        //基本的にはunlock情報は見えなくしておく。
        $('.unlock-info').css({'display':'none'});
        $('.buildInfo-port').css({'display':'none'});
        $('.buildInfo').css({'display':'block'});

        if(this == residens){
            $('.buildInfo').find('img').attr('src',this.image);
            $('.info-buildName').text(this.name);
            $('.info-product').text('人口');
            $('.info-productNum').text(this.productInfo());

            $('.info-upsize').text("人口を10増加("+this.sizeLevel+"回目)");
            this.colorChangeProd('.prod-cost-sizeUp',this.sizeUpProd);
            this.colorChangeProd('.money-cost-sizeUp',this.sizeUpMoney);
        }else if(this.avail==0){
            //利用不可の建物を選択した場合
            $('.unlock-info').css({'display':'block'});
            $('.buildInfo').css({'display':'none'});

            $('.unlock-info').find('img').attr('src',this.image);
            $('.info-buildName').text(this.name);

            this.colorChangeProd('.prod-cost-unlock',this.unlockProd);
            this.colorChangeMoney('.money-cost-unlock',this.unlockMoney);
        }else{
            
            $('.buildInfo').find('img').attr('src',this.image);
            $('.info-buildName').text(this.name);

            //労働者が何人働いているかを表示
            $('.info-workerNum').text(this.worker + "/" +this.maxWorker);

            //現在の生産品がどれほどか表示
            $('.info-product').text('生産物');
            $('.info-productNum').text(this.productInfo());

            //console.log(this.sizeUpProd);
            this.liveNeedRes();

        }
    }
    liveNeedRes(){
        $('.info-upsize').text("規模レベル:Lv." + this.sizeLevel);
        this.colorChangeProd('.prod-cost-sizeUp',this.sizeUpProd);
        this.colorChangeMoney('.money-cost-sizeUp',this.sizeUpMoney);


        $('.info-upquality').text("効率レベル:Lv." + this.prodLevel);
        this.colorChangeProd('.prod-cost-qualityUp',this.qualiUpProd);
        this.colorChangeMoney('.money-cost-qualityUp',this.qualiUpMoney);

        this.colorChangeProd('.prod-cost-unlock',this.unlockProd);
        this.colorChangeMoney('.money-cost-unlock',this.unlockMoney);
    }

    //レベルアップ可能なのかを判断しやすくするために文字色を変える
    colorChangeProd(className,inst){
        //効率
        if(product.saving < inst && liveProdMake() < inst){
            $(className).text(inst).css({'color':'red'});
        }else if(product.saving >= inst && liveProdMake() > inst){
            $(className).text(inst).css({'color':'green'});
        }else if(product.saving < inst && liveProdMake() >= inst ){
            $(className).text(inst).css({'color':'purple'});
        }else{
            $(className).text(inst).css({'color':'green'});
        }
    }

    colorChangeMoney(className,inst){
        //生産性
        if(money.saving < inst){
            $(className).text(inst).css({'color':'red'});
        }else if(money.saving >= inst){
            $(className).text(inst).css({'color':'green'});
        }
    }
    
}



class StoreBuilding extends Building{
    constructor(name,sizeLevel=1,prodLevel=1,worker=0,product,foodComsume,image,available,unlockProd,unlockMoney,raito){
        super(name,sizeLevel,prodLevel,worker,product,foodComsume,image,available,unlockProd,unlockMoney);
        this.raito = raito;
        this.accident_flg = false;
    }

    //店系の建物は売るものが必要
    productMake(){
                if(this.worker <= product.saving){
                    //売るものが実際に売る量を上回っている。（在庫ある）
                    money.makethis(Math.floor(this.worker * this.raito));
                    product.usethis(this.worker);
                }else{
                    //売るものが実際に売る量を下回っている。（在庫が足りない）
                    //売る分だけ売る。
                    money.makethis(Math.floor(product.saving * this.raito));
                    product.usethis(product.saving);
                    history(this.name+':売却に必要な生産力が足りませんでした。',3);
                }

                //ここにこれがないと自動売却ができない
                port.autoProdSell();

    }

    workOut(){
        this.raito = 0;
        this.accident_flg=true;
        history(this.name+'が災害によって破壊され5ターンの間使用不能になりました！',3);
    }

    repaired(){
        this.raito = this.prodLevel*0.5;
        this.accident_flg=false;
        history(this.name+'が災害から復旧しました！',2);
    }


    productInfo(){
        $('.info-product').text("生産物");
        var allProd = (Math.floor(this.worker * this.raito)); //今の労働者で作れる総生産量
        //var efficiency = this.prodPerWorker;//今のレベルでの一人当たりの生産性

        //効率の表示
        $('.info-efficensyNum').text(this.raito);
        $('.info-product').text("生産物");

        //生産物のお金アイコン
        $('#product').attr('class',money.iconClass);
        
        //消費物の表示
        $('#useItem').attr('class',product.iconClass);
        $('.info-useNum').text(this.worker);
        

        $('#useItem2').attr('class',food.iconClass);
        $('.info-useNum2').text((this.foodComsume)*(this.worker));

        //生産数の表示
        $('.info-productNum').text(allProd);
    }

    efficiUp(){
        if(this.qualiUpMoney <= money.saving && this.qualiUpProd <= product.saving && !this.accident_flg){
            product.usethis(this.qualiUpProd);
            money.usethis(this.qualiUpMoney);

            this.prodLevel += 1;
            //prodPerWorkerにはコンストラクタでプロパティ出ないproductによって初期値が決まっているので
            this.raito += 0.5;
            history(this.name+'の効率レベルが上がりました！',2);
            this.costUp();
        }else if(this.accident_flg){
            history('現在災害から復旧中です。',3);
        }else{
            history('レベルアップに必要な資源が足りません。',3);
        }
    }
}

class wealthBuilding extends Building{
    constructor(name,sizeLevel=1,prodLevel=1,worker=0,product,foodComsume,image,available,unlockProd,unlockMoney,raito){
        super(name,sizeLevel,prodLevel,worker,product,foodComsume,image,available,unlockProd,unlockMoney);
        
        this.raito = raito;
        this.budget = 2;
        this.accident_flg =false;
    }

    productMake(){
        var medicBill = this.worker*this.budget;
        money.usethis(medicBill);
        happiness.setValue(this.worker*this.raito);
    }


    productInfo(){

        if(this.avail==0){
            //利用不可の建物を選択した場合
            $('.unlock-info').css({'display':'block'});
            $('.buildInfo').css({'display':'none'});

            $('.unlock-info').find('img').attr('src',this.image);
            $('.info-buildName').text(this.name);

            this.colorChangeProd('.prod-cost-unlock',this.unlockProd);
            this.colorChangeMoney('.money-cost-unlock',this.unlockMoney);
        }else{
        var allProd = (Math.floor(this.worker * this.raito)); //今の労働者で作れる総生産量
        //var efficiency = this.prodPerWorker;//今のレベルでの一人当たりの生産性


        //生産物のリスクアイコン
        $('.info-efficensyNum').text(this.raito);

        $('.info-product').text("取扱量");
        $('.info-productNum').text(allProd);
        $('#product').attr('class',people.iconClass);

        $('#useItem').attr('class',food.iconClass);
        $('.info-useNum').text(this.worker);
        
        $('#useItem2').attr('class',money.iconClass);
        $('.info-useNum2').text(this.worker*this.budget);

        //生産数の表示
        $('.info-productNum').text(allProd);
        }
    }

    efficiUp(){
        //console.log('現在：'+this.prodLevel);
        if(this.qualiUpMoney <= money.saving && this.qualiUpProd <= product.saving && !this.accident_flg){
            product.usethis(this.qualiUpProd);
            money.usethis(this.qualiUpMoney);

            this.prodLevel += 1;
            this.raito +=1;
            this.costUp();
            history(this.name+'の効率レベルが上がりました！',2);
        }else if(this.accident_flg){
            history('現在災害から復旧中です。',3);
        }else{
            history('レベルアップに必要な資源が足りません。',3);
        }
    }
}


class SupportBuilding extends Building{
    constructor(name,sizeLevel=1,prodLevel=1,worker=0,product,foodComsume,image,available,unlockProd,unlockMoney,raito){
        super(name,sizeLevel,prodLevel,worker,product,foodComsume,image,available,unlockProd,unlockMoney);
        this.raito = raito;
        this.support = this.raito * this.worker;
        this.accident_flg =false;

    }

    showBuldInfo(){
            //基本的にはunlock情報は見えなくしておく。
            $('.unlock-info').css({'display':'none'});
            $('.buildInfo-port').css({'display':'none'});
            $('.buildInfo').css({'display':'block'});
    
            if(this.avail==0){
                //利用不可の建物を選択した場合
                $('.unlock-info').css({'display':'block'});
                $('.buildInfo').css({'display':'none'});
    
                $('.unlock-info').find('img').attr('src',this.image);
                $('.info-buildName').text(this.name);
    
                this.colorChangeProd('.prod-cost-unlock',this.unlockProd);
                this.colorChangeMoney('.money-cost-unlock',this.unlockMoney);
            }else{
                $('.buildInfo').find('img').attr('src',this.image);
                $('.info-buildName').text(this.name);
    
                //労働者が何人働いているかを表示
                $('.info-workerNum').text(this.worker + "/" +this.maxWorker);
    
                //現在の生産品がどれほどか表示
                $('.info-product').text('生産物');
                this.productInfo();
    
                //console.log(this.sizeUpProd);
                this.liveNeedRes();
        }
        
    }

    productInfo(){

        
            $('.info-upquality-wrap').css({'display':'none'});
            var allProd = (Math.floor(this.worker * this.raito)); //今の労働者で出せる効率
            
            //生産性の表示
            $('.info-efficensyNum').text(this.raito+"％");
            $('.info-productNum').text(allProd+"％");
            
            switch(this){
                case granary:
                    //生産物のお金アイコン
                    $('#product').attr('class',food.iconClass);
                    break;

                case powerPlant:
                    //生産物のお金アイコン
                    $('#product').attr('class',product.iconClass);
                    break;

                case bank:
                    //生産物のお金アイコン
                    $('#product').attr('class',money.iconClass);
                    break;


            }
            //生産数の表示
            $('.info-useNum').text(this.worker);
            //消費物の表示
            $('#useItem').attr('class',food.iconClass);
            $('.info-useNum').text((this.foodComsume)*(this.worker));

            $('#useItem2').attr('class',"");
            $('.info-useNum2').text("");

        }

    workOut(){
        this.raito = 0;
        this.accident_flg =true;
        history(this.name+'が災害によって破壊され5ターンの間使用不能になりました！',3);
    }

    repaired(){
        this.raito = (this.sizeLevel-1)+5;
        this.accident_flg =false;
        history(this.name+'が災害から復旧しました！',2);
    }

    sizeUp(){
        
        if(this.sizeUpMoney <= money.saving && this.sizeUpProd <= product.saving){
            product.usethis(this.sizeUpProd);
            money.usethis(this.sizeUpMoney);
            this.sizeLevel += 1;
            this.costUp();

            this.maxWorker+=1;
                history(this.name+'の規模レベルが上がりました！',2);
            
            
        }else{
            history('レベルアップに必要な資源が足りません。',3);
        }
    }

    incWoker(){
        if(this.worker < this.maxWorker && 0<getFreePeople()){
            this.worker += 1;
            this.support = this.raito * this.worker;
        }else if(getFreePeople() == 0){
            history('就業させる労働者がいません。',3);
        }else{
            history('就業できる労働者が最大に達しています。',3);
        }
    }

    decWoker(){
        if(0<this.worker){
            this.worker -= 1;
            this.support = this.raito * this.worker;
        }else{
            history('これ以上減らせません。',3)
        }
    }
}

class PortBuilding extends Building{
    constructor(name,sizeLevel=1,prodLevel=1,worker=0,product,foodComsume,image,available,unlockProd,unlockMoney,sellraito,buyraito){
        super(name,sizeLevel,prodLevel,worker,product,foodComsume,image,available,unlockProd,unlockMoney);
        
        this.product = product;
        this.sellraito = sellraito;
        this.buyraito = buyraito;
        this.accident_flg =false;

        this.sellProd=0;
        this.sellFood=0;
        this.buyProd=0;
        this.buyFood=0;

        this.prodPerWorker = product*sizeLevel
        this.carry= this.prodPerWorker*this.worker;
        this.carryNum = 0;

        this.sizeUpMoney = 30;
        this.sizeUpProd = 25;

    }

    showBuldInfo(){
        //基本的にはunlock情報は見えなくしておく。
        $('.unlock-info').css({'display':'none'});
        //$('.buildInfo-port').css({'display':'none'});
        $('.buildInfo').css({'display':'block'});

        if(this.avail==0){
            //利用不可の建物を選択した場合
            $('.unlock-info').css({'display':'block'});
            $('.buildInfo').css({'display':'none'});

            $('.unlock-info').find('img').attr('src',this.image);
            $('.info-buildName').text(this.name);

            this.colorChangeProd('.prod-cost-unlock',this.unlockProd);
            this.colorChangeMoney('.money-cost-unlock',this.unlockMoney);
        }else{
            $('.buildInfo').css({'display':'none'});
            $('.buildInfo-port').css({'display':'block'});

            $('.buildInfo-port').find('img').attr('src',this.image);
            $('.info-buildName').text(this.name);

            $('.port-worker-habdle').text(this.prodPerWorker);
            $('.port-workerNum').text(this.worker+"/"+this.maxWorker);

            
            $('.max-items').text(this.showcarryNum() + "/MAX"+this.maxWorker*this.prodPerWorker);
            $('.info-useNum').text(this.foodComsume*this.worker);

            $('.sellRaito').text("X"+this.sellraito);
            $('.earn-money-prod').text("+"+Math.floor(this.sellraito*this.sellProd));
            $('.earn-money-food').text("+"+Math.floor(this.sellraito*this.sellFood));

            $('.buyRaito').text("X"+this.buyraito);
            $('.spend-money-prod').text("-"+Math.floor(this.buyraito*this.buyProd));
            $('.spend-money-food').text("-"+Math.floor(this.buyraito*this.buyFood));

            this.liveNeedRes();
        }
    }

    workOut(){
        this.prodPerWorker = 0;
        this.accident_flg =true;
        history(this.name+'が災害によって破壊され5ターンの間使用不能になりました！',3);
    }

    repaired(){
        this.prodPerWorker = this.product;
        this.accident_flg =false;
        history(this.name+'が災害から復旧しました！',2);
    }

    carryItem(num){
        this.carry -= num;
        this.carryNum +=num;
    }

    showcarryNum(){
        if(this.carry <0){
            return 0;
        }else{
            return this.carry;
        }
    }

    

    portfoodCons(){
        var sys = this.carryNum/this.prodPerWorker;
        if(this.carryNum%this.prodPerWorker==0){
            return sys;
        }else if(0<sys && sys<=1){
            return 1;
        }else if(1<sys){
            return Math.floor(sys)+1;
        }

        
    }

    resethandle(){
        this.carry= this.prodPerWorker*this.worker;
        this.carryNum=0;
    }

    sellthis(item){
        switch(item){
            case product:
                if(this.sellProd<= this.carry){
                    product.usethis(this.sellProd);
                    this.carryItem(this.sellProd);

                    var getmoney = (Math.floor(this.sellraito*this.sellProd));
                    money.makethis(getmoney);
                    history('貿易:生産力を'+this.sellProd+'単位売却をし、'+getmoney+'の資金を得ました。',2)
                }else{
                    history('売却数が取扱量をオーバーしているため売却できません。売却量を調整してください。',3)
                }
                break;

            case food:
                //console.log(this.sellFood);
                if(this.sellFood<= this.carry){
                    food.usethis(this.sellFood);
                    this.carryItem(this.sellFood);

                    var getmoney = (Math.floor(this.sellraito*this.sellFood));
                    money.makethis(getmoney);
                    history('貿易:食料を'+this.sellFood+'単位売却をし、'+getmoney+'の資金を得ました。',2)
                }else{
                    history('売却数が取扱量をオーバーしているため売却できません。売却量を調整してください。',3)
                }
                break;
        }
    }

    buythis(itme){
        switch(itme){
            case product:
                if(this.buyProd<= this.carry){
                    product.makethis(this.buyProd);
                    this.carryItem(this.buyProd);

                    var paymoney = (Math.floor(this.buyraito*this.buyProd));
                    money.usethis(paymoney);
                    history('貿易:'+paymoney+'の資金を払い、生産力を'+this.buyProd+'購入しました。',2)
                }else{
                    history('売却数が取扱量をオーバーしているため売却できません。売却量を調整してください。',3)
                }
                break;

            case food:
                if(this.buyFood<= this.carry){
                    food.makethis(this.buyFood);
                    this.carryItem(this.buyFood);

                    var paymoney = (Math.floor(this.buyraito*this.buyFood));
                    money.usethis(paymoney);
                    history('商用港:'+paymoney+'の資金を払い、食料を'+this.buyFood+'購入しました。',2);
                }else{
                    history('商用港:売却数が取扱量をオーバーしているため売却できません。売却量を調整してください。',3)
                }
                    break;
        }
    }

    incWoker(){
        if(this.worker < this.maxWorker && 0<getFreePeople()){
            this.worker += 1;
            this.carry += this.prodPerWorker;
        }else if(getFreePeople() == 0){
            history('就業させる労働者がいません。',3);
        }else{
            history('就業できる労働者が最大に達しています。',3);
        }
    }

    decWoker(){
        if(this.portfoodCons()<=this.worker-1 ){
            this.carry -= this.prodPerWorker;
            this.worker -= 1;
        }else if(this.worker==0){
            history('これ以上減らせません。',3);
        }else{
            history('すでに荷物を取り扱った分の労働者数は減らせません。',3);
        }
    }

    liveNeedRes(){
        $('.info-upsize').text("規模レベル:Lv." + this.sizeLevel);
        this.colorChangeProd('.prod-cost-sizeUp',this.sizeUpProd);
        this.colorChangeMoney('.money-cost-sizeUp',this.sizeUpMoney);


        $('.info-upquality').text("効率レベル:Lv." + this.prodLevel);
        this.colorChangeProd('.prod-cost-qualityUp',this.qualiUpProd);
        this.colorChangeMoney('.money-cost-qualityUp',this.qualiUpMoney);

        this.colorChangeProd('.prod-cost-unlock',this.unlockProd);
        this.colorChangeMoney('.money-cost-unlock',this.unlockMoney);

        $('.max-items').text(this.showcarryNum() + "/MAX"+this.maxWorker*this.prodPerWorker);
    }

    efficiUp(){
        if(this.qualiUpMoney <= money.saving && this.qualiUpProd <= product.saving && !this.accident_flg){
            product.usethis(this.qualiUpProd);
            money.usethis(this.qualiUpMoney);

            this.prodLevel += 1;
            this.prodPerWorker = this.product*this.prodLevel;

            //効率をあげた後の挙動がおかしい
            this.carry = (this.prodPerWorker*this.worker)-this.carryNum;

            history(this.name+'の効率レベルが上がりました！',2);
            this.costUp();
        }else if(this.accident_flg){
            history('現在災害から復旧中です。',3);
        }else{
            history('レベルアップに必要な資源が足りません。',3);
        }

    }

    autoProdSell(){
        if($(".productAutoSell").prop('checked')){
            if(product.saving<= this.carry && product.saving!=0){
                //生産力が0でなく、取扱量が生産力全てを売れる分だけ残っている場合。
                var getmoney = (Math.floor(this.sellraito*product.saving));

                money.makethis(getmoney);
                history('商用港:余った生産力'+product.saving+'を売却をし、'+getmoney+'の資金を得ました。',2)
            }else if(product.saving!=0 && this.carry <=0){
                //生産力は余っているが、取扱量がない場合
                history('商用港での取扱量が不足していたため、余った生産物を売却できませんでした。',3);
            }else if(product.saving==0){
                //生産力がない場合
                history('商用港:売却可能な生産力が余っていませんでした。',3);
            }else if(product.saving > this.carry && product.saving!=0 && this.carry >0){
                //生産力が0でなく、売れる生産力が取扱量を上回っている場合（しかし取扱量は0出ない。）。
                var sell = this.carry;

                product.usethis(sell);
                this.carryItem(sell);

                var getmoney = (Math.floor(this.sellraito*sell));
                money.makethis(getmoney);
                history('商用港:取扱量が不足し、余った生産力全てを売却できませんでした。'+sell+'単位売却をし、'+getmoney+'の資金を得ました。',2)
            }
        }
    }
}

//資源インスタンス

const people = new Resource('労働者',0,0,0,'fas fa-user-friends');
const food = new Resource('食料',0,0,0,'fas fa-apple-alt');
const product = new Resource('生産力',0,0,0,'fas fa-hammer');
const money = new Resource('資金',0,0,0,'fas fa-money-bill-wave');
const anger = new Resource('不満',0,0,0,'fas fa-angry');
const happiness = new Resource('幸福度',0,0,0,'fas fa-smile');

var resourceData = [people,food,product,money,anger];

//建物インスタンス
const residens = new Building('住居',1,0,0,10,0,'pictures/town.png',1,0,0);
const store = new StoreBuilding('商業区',1,1,1,5,2,'pictures/middle-store.png',1,0,0,1.0);
const factory = new Building('工場',1,1,1,10,2,'pictures/middle_factory.png',1,0,0);
const farm = new Building('農場',1,1,1,2,1,'pictures/farm.png',1,0,0);
const port = new PortBuilding('商用港',1,1,0,10,3,'pictures/port.png',0,120,80,0.5,1.5,5);
const powerPlant = new SupportBuilding('発電所',1,1,0,2,2,'pictures/power_plant.png',0,70,50,5);
const granary = new SupportBuilding('穀物庫',1,1,0,1,1,'pictures/granary.png',0,60,60,5);
const bank = new SupportBuilding('銀行',1,1,0,2,2,'pictures/bank.png',0,50,70,5);
const hospital = new wealthBuilding('福祉施設',1,1,0,2,1,'pictures/hospital.png',0,50,30,5);



var cellData = [];
cellData[1]= new Cell(1,residens);
cellData[2]= new Cell(2,store);
cellData[3]= new Cell(3,factory);
cellData[4]= new Cell(4,farm);
cellData[5]= new Cell(5,port);
cellData[6]= new Cell(6,powerPlant);
cellData[7]= new Cell(7,granary);
cellData[8]= new Cell(8,bank);
cellData[9]= new Cell(9,hospital);

//初期設定
const happinesHandi = 50;
var cheat_flg = false;
var tutorialMode = false;
var term = 1;
function inti(){
    
    $('.playwrapper').css({'display':'inline-block'});
    $('.gameOver').css({'display':'none'});

    term = 1;
    people.setValue(10);
    food.setValue(50);
    product.setValue(10);
    money.setValue(20);
    anger.setValue(0);

    showResData();
    $('.start-menu').css({'display':'none'});
    $('#term').children('h4').text(term);
    history('ゲームスタート！',2);
    history(term+'ターン目',1);

}

function debugCheat(){
    if(cheat_flg){
        food.setValue(50000);
        product.setValue(50000);
        money.setValue(50000);
        //anger.setValue(60);
    }

}

function gameOver(){
    if(anger.saving>=100){
        $('.building-unit').css({'display':'none'});
        $('.gameOver').css({'display':'inline-block'});
        $('.buildInfo').css({'display':'none'});
        $(".next-btn").off('click');
    }
}

//===========
//ターンイベント
//===========
function autoInc(){
    if(term%10==0){
        people.makethis((term/10)*2);
        history('人口が自然増加しました！(人口＋'+((term/10)*2)+')',1);
    }
}

//悪いイベントの発生率ががターンを進むごとに0.01増える。最大10%
function termRaise(start){
    if(term >= start){
        var raise =  0.01*(term-start)

        if(raise >= 10){
            return 10;
        }else{
            return raise;
        }
        
    }else{
        return 0;
    }
}

//不満が貯まると悪いイベントの発生率が8%から1ずつ増える。最大20%
function angerRise(min){
    if(anger.saving >= min){
        var raise =  8+(anger.saving-min)

        if(raise >= 20){
            return 20;
        }else{
            return raise;
        }
        
    }else{
        return 0;
    }
}

//0.5%の確率で人口が2倍になる
function babyBoom(){
if(randomSet(0.1+termRaise(200))){
    people.saving *=2;
    history('爆発的ベビーブーム発生！！人口が２倍になってしまった！！',3);
}
}

//食料が９割消える
function bagsPanic(){
    if(randomSet(3+termRaise(150))){
        food.saving = Math.floor(food.saving*0.1);
        history('バッタの大量発生により9割の食料が食い尽くされてしまった！',3);
    }
}

//資金が９割消える
function moneyCrisis(){
    if(randomSet(3+termRaise(150))){
        money.saving = Math.floor(money.saving*0.1);
        history('経済危機が発生！対処のために9割の資金が歳出されてしまった！',3);
    }
}

//住宅を覗く任意の建物の食料消費を１増加
function foodConsUp(){
    var x = Math.floor(Math.random()*8+2);
    var selected = cellData[x];

    if(selected.building.avail !=0 && randomSet(5+termRaise(150)+angerRise(50)) && term>=100){
        selected.building.foodComsume +=1;
        history('労働者のデモによって'+selected.building.name+'の食料消費が1増加しました！',3);
    }
}


//福祉施設の資金を１増加
function hopitalBudgetUp(){
    if(hospital.avail !=0 && randomSet(5+termRaise(150)+angerRise(70)) && term>=100){
        hospital.budget +=1;
        history('労働者のデモによって福祉施設の必要資金が1増加しました！',3);
    }
}


//災害によって一つの建物の使用を不可能にする
var accidentTerm = 0;//災害が発生したターンを記録
var aciidentBld = '';//災害に被災した建物のIDを記録
function accident(){

    cellData.forEach(val => {
        //先ずは直せる建物があるかを確認する。
        if(val.building.accident_flg && accidentTerm+4<term){
            val.building.repaired()
            accidentTerm = 0;
        }
    })

    var x = Math.floor(Math.random()*7+2);
    var selected = cellData[x];

    if(!selected.building.accident_flg && accidentTerm == 0){
    
        if(selected.building.avail !=0 && randomSet(2+termRaise(150))){ //2
            selected.building.workOut();
            aciidentBld = selected;
            accidentTerm = term;
        }
    }
}


//売値、買値の変動（5ターンごと）
var pastSell = port.sellraito;
var pastBuy = port.buyraito;
function sellRaitoChange(){
    if(port.avail != 0 && term%5 == 0){
        port.sellraito = (Math.random()*(0.50 - 0.01)+0.01).toFixed(2);
        port.buyraito = (Math.random()*(2.0 - 1.40)+1.40).toFixed(2);

        if(port.sellraito > pastSell){
            history('売却価格が上昇しました!（'+pastSell+'→'+port.sellraito+'）',2);
        }else if(port.sellraito == pastSell){
            history('売却価格は変化しませんでした。',2);
        }else{
            history('売却価格が下落しました!（'+pastSell+'→'+port.sellraito+'）',3);
        }


        if(port.buyraito > pastBuy){
            history('購入価格が上昇しました!（'+pastBuy+'→'+port.buyraito+'）',3);
        }else if(port.buyraito == pastBuy){
            history('売却価格は変化しませんでした。',2);
        }else{
            history('購入価格が下落しました!（'+pastBuy+'→'+port.buyraito+'）',2);
        }

        pastSell = port.sellraito; //新しい値に更新
        pastBuy = port.buyraito; //新しい値に更新
        port.showBuldInfo();
    }
}

//ターンイベントを起こす
function termEvent(){
    oneTimeMes();
    babyBoom();
    bagsPanic();
    sellRaitoChange();
    foodConsUp();
    hopitalBudgetUp();
    moneyCrisis()
    accident();
}


//===========
//===========


//ワンタイムメッセージ
var pandemic_flg = true;
var notify_hospital = true;

//特定のタイミングでのワンタイムメッセージ
function oneTimeMes(){

    if(people.saving>=50 && pandemic_flg){
        history('人口増加によって国民全体が不満を抱いている。福祉施設に投資して不満を解消しよう。',3);
        pandemic_flg = false;
    }

    if(people.saving>15 && notify_hospital){
        history('人口が50を越えると福祉による不満が発生します。早めに福祉施設を建てておくといいです。',1);
        notify_hospital = false;
    }
}


//仕事をしていない労働者を計算する。
function getFreePeople(){

    var freePeople = people.saving;
    cellData.forEach(val => {
        if(val.building.avail !=0){
            freePeople -= val.building.worker;
        }
    });

    //console.log(freePeople);
    return freePeople;
}

//任意の確率を生成
function randomSet(percent){
    var x = Math.random();
    //console.log(x);

    if(x<percent/100){
        return true;
    }else{
        return false;
    }
}

//資源バーの表示を更新する。（主にターン内での行動による値変化）
function showResData(){
    $('#people-info').children('p').text(getFreePeople()+"/"+people.saving);
    $('#food-info').children('p').text(food.saving+"("+liveFoodCons()+")");
    $('#product-info').children('p').text(product.saving+"/"+store.worker+"(次:"+liveProdMake()+")");
    $('#money-info').children('p').text(money.saving+"("+liveMoneyget()+")");
    $('#anger-info').children('p').text(anger.saving);
    $('#infectRisk-info').children('p').text(livehappinessget());
}


//次のターンに行く時の、食料消費や各建物の生産物を計算する。
function goNext(){
    
    cellData.forEach(val => {
        var bld = val.building;
        if(bld.avail !=0){
            bld.productMake();
            bld.foodConsumeVal();
        }
    });

    //フリーな労働者の分の食料消費を引く
    food.usethis(getFreePeople());
    port.resethandle();


}


//メッセージ生成関数
var mesCount = 1;
var lastMes = 1
function history(mes,style=0){

    var clasName = "newMes"+" mes"+mesCount;
    $('.message-area-wrapper').append('<p class="'+clasName+'">'+mes+'</p>');
    
    switch(style){
        case 1:
            $('.mes'+mesCount).css({"font-weight":"bold"});
            break;

        case 2:
            $('.mes'+mesCount).css({"font-weight":"bold" ,"color":"green"});
            break;

        case 3:
            $('.mes'+mesCount).css({"font-weight":"bold" ,"color":"red"});
            break;
    }

    mesCount += 1;

    //新しいメッセージが追加した時にメッセージエリアを自動スクロール
    var mesArea = $('.message-area');
    mesArea.scrollTop($('.message-area-wrapper').innerHeight());
}



//次のターンの食料増減を表示
function liveFoodCons(){
    var foodUsed=0;
    cellData.forEach(val => {
        var bld = val.building;
        
        if(bld.avail !=0){
            foodUsed += bld.foodComsume*bld.worker;
        }
        });
    foodUsed += getFreePeople();
    //ここに効率の影響を入れておく
    var foodsupply = Math.floor(farm.worker*farm.prodPerWorker*(1+granary.support/100));
    var result = foodsupply-foodUsed;

    if(result<0){
        return result;
    }else{
        return '+'+result;
    }
}

//次のターンの生産力を表示
function liveProdMake(){
    var productMake = 0;
    productMake = Math.floor(factory.worker*factory.prodPerWorker*(1+powerPlant.support/100));
    return productMake;
}

//次のターンの資金を表示
function liveMoneyget(){
    var moneyMake = 0;
    var moneyMake = Math.floor(store.worker*store.raito*(1+bank.support/100)-(hospital.worker*hospital.budget));
    //var medicBill = hospital.woker*hospital.budget;
    

    if(moneyMake<0){
        return moneyMake;
    }else{
        return '+'+moneyMake;
    }
}

//リスクの値を表示
function livehappinessget(){
    if(people.saving<=happinesHandi){
        return 0+'(+'+0+')';
    }else{
        var supply = (hospital.worker*hospital.raito) - people.saving
        var repaire = Math.floor(supply/people.saving);

        if(repaire>=0){
            return supply +'(+'+repaire+')';
        }else{
            return supply +'(+'+0+')';
        }
    }
    
}


//イベント
$(".stat-btn").on('click',inti);
$(".next-btn").on('click',showNext);
$(".reset-btn").on('dblclick',function(){
    location.reload()
});

$(".gameOver-btn").on('click',function(){
    location.reload()
});




$('.building-unit').on('click',function(){
    $('.fa-plus-circle').off('click');
    $('.fa-minus-circle').off('click');
    $('.fa-arrow-circle-up').off('click');
    $('.fa-arrow-alt-circle-up').off('click');
    $('#unlock-btn').off('click');
    $('.foodSellNum').off('keyup');
    $('.productSellNum').off('keyup');
    $('.foodBuyNum').off('keyup');
    $('.productBuyNum').off('keyup');
    

    $selected = $(this).attr('id');
    Number($selected);
    var hasBuild = cellData[Number($selected)].building;
    $('.buildInfo').css({'display':'block'});

    $('.game-setting-area').data('showing',$selected);

    hasBuild.htmlConvert();
    hasBuild.showBuldInfo();

    $('.fa-plus-circle').on('click',function(){
        hasBuild.incWoker();
        hasBuild.showBuldInfo();
        showResData();
    })

    $('.fa-minus-circle').on('click',function(){
        hasBuild.decWoker();
        hasBuild.showBuldInfo();
        showResData();
    })

    $('.fa-arrow-circle-up').on('click',function(){
        hasBuild.sizeUp();
        hasBuild.showBuldInfo();
        showResData();
    })

    $('.fa-arrow-alt-circle-up').on('click',function(){
        hasBuild.efficiUp();
        hasBuild.showBuldInfo();
        showResData();
    })

    $('#unlock-btn').on('click',function(){
        //console.log('pushrd')
        hasBuild.unlockBld(Number($selected));
        hasBuild.showBuldInfo();
        showResData();
    })



    sellFood(hasBuild,food,'.foodSellNum','.sellFood-btn');
    sellProd(hasBuild,product,'.productSellNum','.sellProduct-btn');
    buyfood(hasBuild,food,'.foodBuyNum','.BuyFood-btn');
    buyProd(hasBuild,product,'.productBuyNum','.BuyProduct-btn');
})

function showNext(){
    //removeMinusはマイナスを0に変えるか、0以上なら普通に残数を表示する(お金を除く)。
    //建物の計算処理と不満判定
    
    goNext();
    anger.getAnger();
    console.log(anger.saving)
    termEvent();
    debugCheat();
    gameOver();

    //イベント
    autoInc();


    if($('.game-setting-area').data('showing')){
        var seeing = cellData[$('.game-setting-area').data('showing')];
        seeing.building.liveNeedRes();
        seeing.building.showBuldInfo();
    }

    
    $('#people-info').children('p').text(getFreePeople()+"/"+people.saving);
    $('#food-info').children('p').text(food.removeMinus()+"("+liveFoodCons()+")");
    $('#product-info').children('p').text(product.removeMinus()+"/"+store.worker+"(次:"+liveProdMake()+")");
    $('#money-info').children('p').text(money.saving+"("+liveMoneyget()+")");
    $('#anger-info').children('p').text(anger.removeMinus());
    $('#infectRisk-info').children('p').text(livehappinessget());
    term += 1;
    $('#term').children('h4').text(term);
    
    history('=================',0);
    history(term+'ターン目',1);
}

function sellFood(inst,prop,inputClass,btnClass){

    $(inputClass).on('keyup',function(){
        
        setTimeout(function(){
            
            //小数点を排除する
            var $num = Math.floor($(inputClass).val());
            $(inputClass).val($num);
        
            
            if(!isNaN($num)){
                $(btnClass).off('click');
                            
                inst.sellFood = $num;
                inst.showBuldInfo();

                $(btnClass).on('click',function(){
                    console.log('食料売却:'+$num);
                    if(0 < $num && $num <= food.saving){
                        inst.sellthis(prop);
                        showResData();
                        inst.showBuldInfo();
                    }else if($num > food.saving){
                        history('売却量が備蓄量を超えています。',3);
                    }else{
                        history('０、負の数は扱えません',3);
                    }
                })
                
            }
        },700)
    })
}

function sellProd(inst,prop,inputClass,btnClass){
    $('.productSellNum').on('keyup',function(){
        
        setTimeout(function(){
            
            //小数点を排除する
            var $num = Math.floor($(inputClass).val());
            $(inputClass).val($num);
        
            
            if(!isNaN($num)){
                $(btnClass).off('click');
                    
                    inst.sellProd = $num;
                    inst.showBuldInfo();

                    $(btnClass).on('click',function(){
                        console.log('生産売却:'+$num);
                        if(0 < $num && $num <= product.saving){
                            inst.sellthis(prop);
                            showResData();
                            inst.showBuldInfo();
                        }else if($num > product.saving){
                            history('売却量が備蓄量を超えています。',3);
                        }else{
                            history('０、負の数は扱えません',3);
                        }
                    })
                    
            }
        },700)
    })
}

function buyfood(inst,prop,inputClass,btnClass){
    
    $(inputClass).on('keyup',function(){
        setTimeout(function(){
            //小数点を排除する
            var $num = Math.floor($(inputClass).val());
            $(inputClass).val($num);
        
            if(!isNaN($num)){
                $(btnClass).off('click');
                    
                    inst.buyFood = $num;
                    inst.showBuldInfo();

                    $(btnClass).on('click',function(){
                        console.log('食料購入:'+$num);
                        if(0 < $num && $num <= money.saving){
                            inst.buythis(prop);
                            showResData();
                            inst.showBuldInfo();
                        }else if($num > money.saving){
                            history('購入に必要な資金が足りません。',3);
                        }else{
                            history('０、負の数は扱えません',3);
                        }

                    })
                    inst.showBuldInfo();
            }
        }, 800);
    })
    
}

function buyProd(inst,prop,inputClass,btnClass){
    
    $(inputClass).on('keyup',function(){
        setTimeout(function(){
            //小数点を排除する
            var $num = Math.floor($(inputClass).val());
            $(inputClass).val($num);
        
            if(!isNaN($num)){
                $(btnClass).off('click');
                    
                    inst.buyProd = $num;
                    inst.showBuldInfo();

                    $(btnClass).on('click',function(){
                        if(0 < $num && $num <= money.saving){
                            inst.buythis(prop);
                            showResData();
                            inst.showBuldInfo();
                        }else if($num > money.saving){
                            history('購入に必要な資金が足りません。',3);
                        }else{
                            history('０、負の数は扱えません',3);
                        }

                    })
                    inst.showBuldInfo();
            }
        }, 800);
    })
    
}