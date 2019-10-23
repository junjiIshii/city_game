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
        <link rel="stylesheet" href="style.css" >
        <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
    </head>

    <body>
            <div class="game-area-conteiner">

                <div class="mainwrapper">
                    

                    <div class="start-menu">
                        ゲームを始める？
                        <input class="stat-btn" type="button" name="gameStart" value="ゲームを始める">
                        
                    </div>
                    
                    
                
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

                        <div class="info-unit" id="term">
                            <h4></h4><p>ターン目</p>
                        </div>

                        <div class="info-unit" id="nextTerm">
                            <input class="next-btn" type="button" name="nextTerm" value="次のターンへ">
                            <input class="stat-btn" type="button" name="gameStart" value="リセット">
                        </div>

                        
                            
                        
                        
                            
                    </div>


                    <div class="gamearea-wrapper">

                        <div class="usersetting-area">
                        <p></p>
                        </div>

                        <div class="center-box">
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


                            
                        </div>

                        <div class="game-setting-area">
                            <h3>建物情報</h3>
                            <div class="buildInfo">
                                <div class="icon-wrap">
                                    <img src="" alt="">
                                </div>
                                <h4 class="info-buildName" ></h4>
                                <h4 class="info-worker" >労働者</h4>
                                <p class="info-workerNum"></p>

                                <i class="fas fa-plus-circle" id="inc-worker"></i>
                                <i class="fas fa-minus-circle" id="dec-worker"></i>

                                <h4 class="info-product" >生産物</h4>
                                <i class="" id="product"></i>
                                <span class="info-productNum"></span>

                                <h4 class="info-upsize" ></h4>
                                <i class="fas fa-arrow-circle-up"></i>

                                    <i class="fas fa-hammer"></i>
                                    <span class="prod-cost">5</span>

                                    <i class="fas fa-money-bill-wave"></i>
                                    <span class="money-cost">5</span>

                                <h4 class="info-upquality" ></h4>
                                <i class="fas fa-arrow-circle-up"></i>

                                    <i class="fas fa-hammer"></i>
                                    <span class="prod-cost">15</span>

                                    <i class="fas fa-money-bill-wave"></i>
                                    <span class="money-cost">15</span>
                            </div>
                        </div>
                        
                    </div>


                </div>
                
            </div>

        <footer>
            <script type="text/javascript" src="jquery-3.4.1.min.js"></script>
            <!--<script type="text/javascript" src="tank_setting.js"></script>-->
            <script type="text/javascript" src="game_operate.js"></script>
            <script type="text/javascript" src="animation.js"></script>
        </footer>
    
    </body>
</html>