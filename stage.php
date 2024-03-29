<?php
    error_reporting(E_ALL);
    ini_set('display_errors','On');
    ini_set('log_errors','On');
    ini_set('error_log','debug.log');

    session_save_path("/Applications/MAMP/tmp/php");
    ini_set('session.gc_maxlifetime',60*60*24*30);
    ini_set('session.cookie_lifetime',60*60*24*30);

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <!--CSS-->
        <title>CITY GAME</title>
        <link rel="shortcut icon" href="pictures/large-store.ico">
        <link rel="stylesheet" href="style.css" >
        <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
    </head>

    <body>
        <div class="game-area-conteiner">

            <div class="mainwrapper">
                

                <div class="start-menu">
                    <p>ゲームを始める？</p>
                    <button class="stat-btn" type="button" name="gameStart">ゲームを始める</button>
                    <button class="tutorial-btn" type="button" name="gameStart">チュートリアルモード</button>
                    <a href="tutorialInfo.php" target="_blank">説明書</a>
                </div>
                
                
                <div class="playwrapper">
                    <div class="info-area">
                        <div class="info-unit" id="people-info">
                            <i class="fas fa-user-friends"></i>
                            <p id="free-people"></p>
                        </div>

                        <div class="info-unit" id="food-info">
                            <i class="fas fa-apple-alt"></i>
                            <p></p>
                        </div>

                        <div class="info-unit" id="product-info">
                            <i class="fas fa-hammer"></i>
                            <p></p>
                        </div>

                        <div class="info-unit" id="money-info">
                            <i class="fas fa-money-bill-wave"></i>
                            <p></p>
                        </div>

                        <div class="info-unit" id="anger-info">
                            <i class="fas fa-angry"></i>
                            <p></p>
                        </div>

                        <div class="info-unit" id="infectRisk-info">
                        <i class="fas fa-smile"></i>
                            <p style="font-weight:bold;"></p>
                        </div>

                        <div class="info-unit" id="term">
                            <h4></h4><p>ターン目</p>
                        </div>

                        <div class="info-unit" id="nextTerm">
                            <button class="next-btn" type="button" name="nextTerm">次のターンへ</button>
                            <a class="manual-link" href="tutorialInfo.php" target="_blank">説明書</a>
                            <button class="reset-btn" type="button" name="gamerest" title="最初からやり直します。ダブルクリックでリセットします。">リセット</button>
                            
                        </div>

                            
                    </div>


                    <div class="gamearea-wrapper">

                        <div class="message-area">
                            <div class="message-area-wrapper">

                            </div>
                        </div>

                        <div class="center-box">
                            
                            <div class="gameOver">
                                <p>GAME OVER</p>
                                <button class="gameOver-btn" type="button" name="gamerest">もう一度プレイする</button>
                            </div>

                            <div class="building-unit" id="1">
                                <div class="icon-wrap">
                                    <img src="pictures/town.png" alt="">
                                </div>
                                <p>住宅</p>
                            </div>

                            <div class="building-unit" id="2">
                                <div class="icon-wrap">
                                    <img src="pictures/middle-store.png" alt="">
                                </div>
                                <p>商業区</p>
                            </div>

                            <div class="building-unit" id="3">
                                <div class="icon-wrap">
                                    <img src="pictures/middle_factory.png" alt="">
                                </div>
                                <p>工場</p>
                            </div>

                            <div class="building-unit" id="4">
                                <div class="icon-wrap">
                                    <img src="pictures/farm.png" alt="">
                                </div>
                                <p>農場</p>
                            </div>

                            <div class="building-unit unavailable" id="5">
                                <div class="icon-wrap">
                                    <img src="pictures/port.png" alt="">
                                </div>
                                <p>商用港</p>
                            </div>

                            <div class="building-unit unavailable" id="6">
                                <div class="icon-wrap">
                                    <img src="pictures/power_plant.png" alt="">
                                </div>
                                <p>発電所</p>
                            </div>

                            <div class="building-unit unavailable" id="7">
                                <div class="icon-wrap">
                                    <img src="pictures/granary.png" alt="">
                                </div>
                                <p>穀物庫</p>
                            </div>

                            <div class="building-unit unavailable" id="8">
                                <div class="icon-wrap">
                                    <img src="pictures/bank.png" alt="">
                                </div>
                                <p>銀行</p>
                            </div>

                            <div class="building-unit unavailable" id="9">
                                <div class="icon-wrap">
                                    <img src="pictures/hospital.png" alt="">
                                </div>
                                <p>福祉施設</p>
                            </div>


                            
                        </div>

                        <div class="game-setting-area" data-showing="">
                            <h3>建物情報</h3>
                            <div class="unlock-info">
                                <div class="icon-wrap">
                                    <img src="" alt="">
                                </div>
                                <h4 class="info-buildName"></h4>

                                <p>建設に必要な資源</p>
                                <i class="fas fa-hammer"></i>
                                <span class="prod-cost-unlock"></span>

                                <i class="fas fa-money-bill-wave"></i>
                                <span class="money-cost-unlock"></span>

                                <button id="unlock-btn" type="button" name="newbuild">建設する！</button>
                            </div>


                            <!-- 港用-->
                            <div class="buildInfo-port">
                                <div class="baseInfo">
                                    <div class="icon-wrap">
                                        <img src="" alt="">
                                    </div>
                                    <h4 class="info-buildName" ></h4>
                                </div>
                                

                                <div class="port-worker">
                                        
                                    
                                        <span>労働者</span>
                                        <span class="port-worker-habdle"></span>
                                        <span>X</span>
                                        <span class="port-workerNum"></span>
                                        <i class="fas fa-plus-circle" id="inc-port-worker"></i>
                                        <i class="fas fa-minus-circle" id="inc-port-worker"></i>
                                    

                                    <div class="handleitem">
                                        <span>ターン取扱量</span>
                                        <span class="max-items"></span>
                                    </div>

                                    <div class="port-foodCons">
                                        <span>食料消費</span>
                                        <i class="fas fa-apple-alt"></i><span class="info-useNum"></span>
                                    </div>
                                    

                                </div>

                                <div class="sellingArea">
                                    <div class="sellingwrapper">

                                        <h4 class="info-worker" >売却</h4>
                                        <p><input type="checkbox" class="productAutoSell" name="productAutoSell" value="Yes">ターン終了時に余った生産力を全て売却する。</p>
                                        <div class="seller">
                                            <div class="foodSeller">
                                                <i class="fas fa-apple-alt"></i>
                                                <input type="number" class="foodSellNum" name="foodSellNum" min="0" max="1"><span class="sellRaito">X0.5</span>
                                                <span>=</span><i class="fas fa-money-bill-wave"></i><span class="earn-money-food"></span>
                                                <button type="button" class="sellFood-btn" name="sellFood">売却する</button>
                                            </div>

                                            <div class="ProductSeller">
                                            <i class="fas fa-hammer"></i>
                                                <input type="number" class="productSellNum" name="productSellNum" min="0" max="1"><span class="sellRaito">X0.5</span>
                                                <span>=</span><i class="fas fa-money-bill-wave"></i><span class="earn-money-prod"></span>
                                                <button type="button" class="sellProduct-btn" name="sellProduct">売却する</button>
                                            </div>
                                        </div>

                                        <h4 class="info-worker" >購入</h4>
                                        <div class="buyer">
                                            <div class="foodBuyer">
                                                <i class="fas fa-apple-alt"></i>
                                                <input type="number" class="foodBuyNum" name="foodBuyNum" min="0" max="1"><span class="buyRaito">X0.5</span>
                                                <span>=</span><i class="fas fa-money-bill-wave"></i><span class="spend-money-food"></span>
                                                <button type="button" class="BuyFood-btn" name="BuyFood">購入する</button>
                                            </div>

                                            <div class="ProductBuyer">
                                            <i class="fas fa-hammer"></i>
                                                <input type="number" class="productBuyNum" name="productBuyNum" min="0" max="1"><span class="buyRaito">X0.5</span>
                                                <span>=</span><i class="fas fa-money-bill-wave"></i><span class="spend-money-prod"></span>
                                                <button type="button" class="BuyProduct-btn" name="BuyProduct" >購入する</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                


                                <div class="info-upsize-wrap">
                                    <h4 class="info-upsize"></h4>
                                    <i id="port-upSize-btn" class="fas fa-arrow-circle-up"></i>

                                    <i class="fas fa-hammer"></i>
                                    <span class="prod-cost-sizeUp"></span>

                                    <i class="fas fa-money-bill-wave"></i>
                                    <span class="money-cost-sizeUp"></span>
                                </div>
                                
                                <div class="info-upquality-wrap noNeed-residens">
                                    <h4 class="info-upquality" ></h4>
                                    <i class="fas fa-arrow-alt-circle-up"></i>

                                    <i class="fas fa-hammer"></i>
                                    <span class="prod-cost-qualityUp"></span>

                                    <i class="fas fa-money-bill-wave"></i>
                                    <span class="money-cost-qualityUp"></span>
                                </div>
                            </div>


                            <!-- 通常-->
                            <div class="buildInfo">
                                <div class="icon-wrap">
                                    <img src="" alt="">
                                </div>
                                <h4 class="info-buildName" ></h4>

                                <div class="product-info">

                                    <div class="info-efficensy-wrap noNeed-residens">
                                        <h4 class="info-efficensy" >効率</h4>
                                        <p class="info-efficensyNum"></p>
                                    </div>

                                    <span class="symbol noNeed-residens">X</span>

                                    <div class="worker-info noNeed-residens">
                                        <h4 class="info-worker" >労働者</h4>
                                        <p class="info-workerNum"></p>

                                        <div class="worker-btn-wrapper noNeed-residens">
                                            <i class="fas fa-plus-circle" id="inc-worker"></i>
                                            <i class="fas fa-minus-circle" id="dec-worker"></i>
                                        </div>
                                    </div>

                                    <span class="symbol noNeed-residens">=</span>

                                    <div class="info-product-wrap">
                                        <h4 class="info-product" >生産物</h4>
                                        <i class="" id="product"></i>
                                        <span class="info-productNum"></span>
                                    </div>

                                    <div class="info-ues-wrap noNeed-residens">
                                        <h4 class="info-use" >消費物</h4>
                                        <i class="" id="useItem"></i>
                                        <span class="info-useNum"></span>

                                        <i class="" id="useItem2"></i>
                                        <span class="info-useNum2"></span>
                                    </div>
                                </div>   

                                <div class="info-upsize-wrap">
                                    <h4 class="info-upsize"></h4>
                                    <i id="upSize-btn" class="fas fa-arrow-circle-up"></i>

                                    <i class="fas fa-hammer"></i>
                                    <span class="prod-cost-sizeUp"></span>

                                    <i class="fas fa-money-bill-wave"></i>
                                    <span class="money-cost-sizeUp"></span>
                                </div>
                                
                                <div class="info-upquality-wrap noNeed-residens">
                                    <h4 class="info-upquality" ></h4>
                                    <i class="fas fa-arrow-alt-circle-up"></i>

                                    <i class="fas fa-hammer"></i>
                                    <span class="prod-cost-qualityUp"></span>

                                    <i class="fas fa-money-bill-wave"></i>
                                    <span class="money-cost-qualityUp"></span>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>

        <footer>
            <script type="text/javascript" src="jquery-3.4.1.min.js"></script>
            <!--<script type="text/javascript" src="tank_setting.js"></script>-->
            <script type="text/javascript" src="game_operate.js"></script>
        </footer>
    
    </body>
</html>