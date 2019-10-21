<?php
    error_reporting(E_ALL);
    ini_set('display_errors','On');
    ini_set('log_errors','On');
    ini_set('error_log','debug.log');

    session_save_path("/Applications/MAMP/tmp/php");
    ini_set('session.gc_maxlifetime',60*60*24*30);
    ini_set('session.cookie_lifetime',60*60*24*30);
    session_start();
    session_regenerate_id();



    $row = 11;//左右
    $line = 11;//上下
    $allCell = $row*$line;

    $hqrow = ceil($row/2);
    $hqline = ceil($line/2);

    $hqCell = ceil($allCell/2);


    $debug_flg = true;
    

    function debug($str){
        global $debug_flg;
        
        if($debug_flg){
            error_log("\n"."DEBUG:".$str,3,'debug.log');
        }
    }

    function init_game(){
        $_SESSION['people']=10;
        $_SESSION['food']=100;
        $_SESSION['product']=10;
        $_SESSION['money']=100;
        $_SESSION['term']=1;
    }

Class Cell{
    private $cellId;
    protected $building;
    
    public function __construct($cellId,$building)
    {
        $this->cellId = $cellId;
        $this->building = $building;
    }

        public function getCellId(){
            return $this->cellId;
        }

        public function getbuilding(){
            return $this->building;
        }

        public function setCellId($num){
            $this->building = filter_var($num,FILTER_VALIDATE_INT);
        }

        public function setbuilding($bld){
            $this->building = (string)$bld;
        }
}

Class Buildings extends Cell{
    private $buildName;
    private $intro;
    private $cost;
    private $product;
    
    public function __construct($name,$intro,$cost,$prod)
    {
        $this->buildName =$name;
        $this->intro =$intro;
        $this->cost = $cost;//連想配列で入力する。
        $this->product = $prod;//連想配列で出力する。
    }
}

$residence = new Buildings('住居区','人口を増やすことができる。',['monery'=>20,'product'=>20],['people'=>10]);

Class Resources {
    private $resourceName;
    public function __construct($name)
    {
        $this->resourceName =$name;
    }

}

$people = new Resources('人口');
$food = new Resources('食料');
$product = new Resources('生産力');
$money = new Resources('財貨');


    function mapSetting($line,$nowline,$geo){
        if($nowline==$line){
            return $geo;
        }
    }




    //HQの設定
    
    //なぜかインスタンスが作られない。
    function setAllCell(){
        global $cellData;
        global $allCell;
        $cellData = array();

        for($l=1; $l<=$allCell  ; $l++){
            ${"cell".$l} = new Cell($l,"");
            $cellData[$l] = ${"cell".$l};
            
            global ${"cell".$l} ;
        }
    }


    
    if(!empty($_POST)){
        //リセット＝スタート
        $start_flg = (!empty($_POST['gameStart']))?true:false;
        $goNext = (!empty($_POST['nextTerm']))?true:false;

        if($start_flg){
            setAllCell();
            //初期設定にあとで置いておく
            $cellData= array();

            //Cellインスタンスの設定。それぞれのCellの情報はここに格納する。
            for($l=1; $l<=$allCell  ; $l++){
                ${"cell".$l} = new Cell($l,"");
                $_SESSION["cell{$l}"] = ${"cell".$l};
                //$cellData[$l] = ${"cell".$l};
            }

            ${"cell".$hqCell}->setbuilding("hq");

            init_game();
        }else{
            //次のターンを押した。
            
            //セルの状態を更新する。
            for($i=1; $i<=$allCell; $i++){
                
                ${"cell".$i} = $_SESSION["cell{$l}"];
                if(!empty($_POST["cellData{$i}"])){
                    
                    ${"cell".$i}->setbuilding($_POST["cellData{$i}"]);
                }
            }
            
        }
    }
    


?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <!--CSS-->
        <title>CITY GAME</title>
        <link rel="stylesheet" href="style.css" >
    </head>

    <body>
            <div class="game-area-conteiner">

                <div class="mainwrapper">
                    <?php if(empty($_SESSION)){?>

                    <div class="start-menu">
                        ゲームを始める？
                        <form method="post">
                            <input type="submit" name="gameStart" value="ゲームを始める">
                        </form>
                    </div>
                    <?php }else{?>
                    
                
                    <div class="info-area">
                        <div class="info-unit" id="poeple-info">
                            <div class="icon-wrap">
                                <img src="pictures/people.png" alt="">
                            </div>
                            <p>10/10</p>
                        </div>

                        <div class="info-unit" id="food-info">
                            <div class="icon-wrap">
                                <img src="pictures/food.png" alt="">
                            </div>
                            <p>100&#040-20&#041</p>
                        </div>

                        <div class="info-unit" id="product-info">
                            <div class="icon-wrap">
                                <img src="pictures/hammer.png" alt="">
                            </div>
                            <p>10/10</p>
                        </div>

                        <div class="info-unit" id="money-info">
                            <div class="icon-wrap">
                                <img src="pictures/money.png" alt="">
                            </div>
                            <p>100&#040-20&#041</p>
                        </div>

                        <div class="info-unit" id="money-info">
                            <h4>1</h4><p>ターン目</p>
                        </div>
                        
                            
                    </div>


                    <div class="gamearea-wrapper">

                        <div class="usersetting-area">
                        <p></p>
                        </div>

                        <div class="center-box">
                            <table border="1">
                                <form method="post">
                                    <?php for($l=1; $l<=$line; $l++){?>
                                        <tr class="row">
                                            <?php for($i=1; $i<=$row; $i++){?>
                                                <td align="center" 
                                                    class="cell <?php echo ${"cell".($i+($l-1)*$row)}->getbuilding();?>" 
                                                    id="<?php echo $i+($l-1)*$row?>" 
                                                    data-cell="" data-build="">
                                                    <input type="hidden" name="<?php echo 'cellData'.($i+($l-1)*$row)?>" value=""></td>
                                            <?php }?>
                                        </tr>
                                    <?php }?>
                            </table>

                        </div>

                        <div class="game-setting-area">
                            <ul>
                                <li class="action-btn build">建設する
                                    <ul>
                                        <li class="sub-selector buildings" id="village">村</li>
                                        <li class="sub-selector buildings" id="farm">農場</li>
                                        <li class="sub-selector buildings " id="factory">工場</li>
                                        <li class="sub-selector buildings " id="store">商業区</li>
                                    </ul>
                                </li>

                                <li>調べる</li>
                                <li class="map-edit">sea</li>
                                <li class="action-btn stop">stop</li>
                            </ul>
                            
                                <input type="submit" name="nextTerm" value="次のターンへ">
                                <input type="submit" name="gameStart" value="リセット">
                            </form>
                        </div>
                        
                    </div>
                    <?php }?>

                </div>
                
            </div>

        <footer>
            <script type="text/javascript" src="jquery-3.4.1.min.js"></script>
            <!--<script type="text/javascript" src="tank_setting.js"></script>-->
            <script type="text/javascript" src="game_operate.js"></script>
            <script type="text/javascript" src="animation.js"></script>
        </footer>
        <pre>
            <?php var_dump($_POST);?>
            <?php var_dump($_SESSION);?>
        </pre>
    </body>
</html>