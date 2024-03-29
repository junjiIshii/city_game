<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <!--CSS-->
        <title>CITY GAME TUTORIAL</title>
        <link rel="shortcut icon" href="pictures/large-store.ico">
        <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
        <style>
            *{
            margin:0px;
            padding:0px;
            box-sizing:border-box;
            }

            .tutorial-conteiner{
                width:50%;
                margin:10px auto;
                min-width:750px;

            }

            .index{
                margin: 25px 0px;
            }

            .index li{
                list-style: none;
                margin:5px 0px 5px 10px;
                cursor:pointer;
            }

            .index li:hover{
                color:blue;
            }

            .firstUnit{
                margin-bottom:50px;
                
            }

            .secondLi{
                list-style: none;
                margin-bottom: 35px;
            }

            .items{
                border-left: 5px solid lightseagreen;
                padding:5px;
                margin-bottom:5px;
            }

            .items .fas{
                margin-right:5px;
            }

            .icon-conteiner{
                width:30px;
                height: 30px;
                display:inline-block;
                margin-right: 5px;
            }

            .icon-conteiner img{
                object-fit: cover;
                width:100%;
                vertical-align: bottom;
            }

            .caption{
                margin-bottom: 10px;
                width: 50%;
                display: inline-block;
                background: lightseagreen;
                padding: 5px;
                color: white;
                
            }
        </style>
    </head>

    <body>
        <div class="tutorial-conteiner">
            <h2 class="main-caption">ルールと解説</h2>
            <div class="index">
                <h3 class="caption">目次（クリックでジャンプします。）</h3>
                <ul>
                    <li class="indexLi" data-jamp="purpose">ゲームの目的とゲームオーバー</li>
                    <li class="indexLi" data-jamp="howToPlay">ゲームの進め方</li>
                    <li class="indexLi" data-jamp="howToView">各画面の見方</li>
                    <li class="indexLi" data-jamp="aboutResource">資源について</li>
                    <li class="indexLi" data-jamp="aboutBuilding">建物について</li>
                    <li class="indexLi" data-jamp="howToBuilInfo">建物情報の見方</li>
                    <li class="indexLi" data-jamp="aboutHint">ターンイベントとヒント</li>
                    <li class="indexLi" data-jamp="myMesage">あとがき</li>
                </ul>
            </div>
            <div class="parentUl">
                <div class="firstUnit" id="purpose">
                    <h3 class="caption">ゲームの目的とゲームオーバー</h3>
                    <p>CITY GAMEへようこそ！
                    CITY GAMEは自動的に人口が増えていく中、
                    食糧不足や市民達のわがままな不満を回避しつつ、
                    出来るだけ長いターン生き延びるエンドレスゲームです。
                    このゲームでは「不満」が100を越えるとゲームオーバーになります。
                </p>
                </div>

                <div class="firstUnit" id="howToPlay">
                    <h3 class="caption">ゲームの進め方</h3>
                    <p>
                    最初の画面で「ゲームを始める」をクリックするとゲーム画面が現れます。
                    <br><br>
                    このゲームは上の「資源情報バー」の「右側」にある【次のターンへ】を押すとターンが進みます。
                    ターンが進むと資源を生産したり消費していきます。国民達は
                    商業区ではお金を稼ぎ、工場では生産力を作り、農場では食料を作ります。
                    そして生産の代価として食料を必ず消費します。（働いていない国民も食料を消費する。）
                    食料の備蓄が0になると「食料不足」が発生して不足分の不満が蓄積されます。
                    そうならないように食料の確保や、建物のレベルアップを通じて規模や生産性を
                    上げていきましょう。「建設・改善→生産→消費」を繰り返していくのがゲームの主な流れです。
                    <br><br>
                    ゲームをリセットしたい時は「リセット」をダブルクリックしてください。誤クリック防止のためダブルクリックでリセットします。
                </p>
                </div>

                <div class="firstUnit" id="howToView">
                    <h3 class="caption">各画面の見方</h3>
                        <div class="secondLi">
                            <p>一番上のバーは「資源情報」です。各資源の備蓄や生産性が
                            どれほどなのかを示しています。
                            </p>
                        </div>

                        <div class="secondLi">
                            <p>左側に「ゲームスタート！」と書いてある場所は「ゲーム内の情報」を
                            示しています。ターンで起きた情報や、不足情報などを表示しています。
                            </p>
                        </div>

                        <div class="secondLi">
                            <p>真ん中なの黒い画面では「操作する建物を選択」します。暗くなっている建物は
                            始めからは利用できず、生産力とお金を使って「建設」することで利用できます。
                            </p>
                        </div>

                        <div class="secondLi">
                            <p>一番右側は「建物情報」を表しています。その建物の生産性の把握、労働者の調整、レベルアップ操作などが
                                可能です。詳しくは『建物の情報の見方』を参照してください。
                            </p>
                        </div>
                </div>

                <div class="firstUnit" id="aboutResource">
                    <h3 class="caption">資源について</h3>
                        <div class="secondLi" id="aboutPeople">
                            <h4 class="items"><i class="fas fa-user-friends"></i>人口</h4>
                            <p>人口は発展に必要不可欠であり、ゲームオーバーの第一の要因です。
                            各建物で「労働者」として働いて生産を行ってくれます。
                            見方は「（アイコン）（暇な労働者）/（総人口）」です。「暇な労働者」は
                            各建物で働かせることができます。しかし暇な労働者がいない場合は、各建物で
                            雇用できる労働者の空きがあっても、補充することができません。「人口」は必ず
                            「食料」を消費します。（暇な労働者）と（農場で働いでる労働者）は１つ、商業区や
                            工場の労働者は一人当たり２つ消費します。各建物で消費される労働者の食料は「建物情報」の
                            「消費物」から見ることもできます。
                            <br><br>資源バーの見方は　<i class="fas fa-user-friends"></i>【働いていない人】/【総人口】
                            </p>
                        </div>

                        <div class="secondLi" id="aboutFood">
                            <h4 class="items"><i class="fas fa-apple-alt"></i>食料</h4>
                            <p>このゲームで一番大切なものです。国民達は毎ターン必ず消費します。
                            食料の備蓄が0を下回って、不足すると不足分だけ「不満」が蓄積されていきます。食料は備蓄する
                            ことができます。例えば消費量が15に対して生産量が20の場合、ターンを進める
                            ごとに食料は＋５ずつ増えていきます。逆に消費量が多い場合は減っていきます。
                            人口に応じた食料生産と労働者の調整を行って消費分を確保しましょう。
                            <br><br>資源バーの見方は　<i class="fas fa-apple-alt"></i>【現在の備蓄】（【次のターンの増減】）
                            </p>
                        </div>

                        <div class="secondLi" id="aboutProduct">
                            <h4 class="items"><i class="fas fa-hammer"></i>生産力</h4>
                            <p>主に工場から得られます。生産力は他の資源と違って「備蓄されません」。例えば工場で「生産力」を10作れ、
                                現在の備蓄が10あったとします。食料や資金であれば次のターンは備蓄に加えて20と
                                なりますが生産力は追加されず、次のターンも「10」のままです。そのため生産力が
                                150必要になった時、毎ターン30の生産力を5ターンかけて貯まるのを待つのでなく、一気に150分作れる
                                だけの労働者を働かせる必要があります。生産力は建物のレベルアップや商業区で資金を得るのに消費されます。
                                <br><br>資源バーの見方は　<i class="fas fa-hammer"></i>【現在の備蓄】/【商業区で必要な量】（【次のターン生産力】）
                            </p>
                        </div>

                        <div class="secondLi" id="aboutMoney">
                            <h4 class="items"><i class="fas fa-money-bill-wave"></i>資金</h4>
                            <p>金です。主に商業区から得ることができます。食料と同様に備蓄されていきます。建物のレベルアップや公共支出に消費されます。
                            お金は基本的に「生産力」を売ることで得ることができます。詳しくは「商業区」の説明を参照してください。
                            <br><br>資源バーの見方は　<i class="fas fa-money-bill-wave"></i>【現在の備蓄】（【次のターンの増減】）
                            <br><br>【次のターンの増減】は「商用港」で得られる分は入ってません。資金はマイナス（借金状態）になることがあります。
                            </p>
                        </div>

                        <div class="secondLi" id="aboutComplication">
                            <h4 class="items"><i class="fas fa-angry"></i>不満</h4>
                            <p>
                                資源ではないですが、この数値が100を越えるとゲームオーバーになります。食料不足と福祉支出の不整備で貯まります。
                                不満は「福祉施設」の取扱量が総人口の2倍を越えると減り始めます。例として、取扱量が100,人口が50の時は1減ります。
                                更に取扱量を増やして200（人口の4倍）にすると不満は2ずつ減っていきます。
                                しかしこのように不満を減らすことは大変なので、如何に不満を貯めないかが重要です。
                                <br><br>
                                資源バーでの見方は　<i class="fas fa-angry"></i>【不満の蓄積数】
                                <br>
                                
                            </p>
                        </div>

                        <div class="secondLi" id="aboutHappines">
                            <h4 class="items"><i class="fas fa-smile"></i>幸福度</h4>
                            <p>
                                幸福度は人口が50以上になると影響し始めます。幸福度は「福祉施設」の「取扱量」と「総人口」との差によって決まります。
                                総人口に対して取扱量が上回ってる場合は幸福度はプラス、下回っている場合はマイナスとなり不足分の不満がたまります。
                                例えば取扱量が50,総人口が60の時は不足しているので、ターンが進むごとに不満が10たまります。不足を解消するためには、福祉施設の取扱量を総人口以上にしなければなりません。
                                福祉施設の取扱量が総人口の2倍になると不満が減り始めます。
                                <br><br>
                                資源バーでの見方は　<i class="fas fa-smile"></i>【現在の幸福度】（【不満の減少量】）
                                <br>
                                【現在の幸福度】が余っている時はその数が表示され、不足している時はマイナスが表示されます。
                            </p>
                        </div>
                    </div>

                <div class="firstUnit">
                    <h3 class="caption" id="aboutBuilding">建物について</h3>
                        
                        <div class="secondLi" id="aboutResidence">
                            <h4 class="items"><span class="icon-conteiner"><img src="pictures/town.png"></span>住居</h4>
                            <p>
        住居は人口を資源を用いて増やすことができます。ゲームでは人口はターンを経るごとに増えていきますが、戦略的に今すぐに労働力が欲しい時があると思います。住宅はその時に資源を用いて人口を10増加させることができます。増加のために必要なコストは回数を得るたびに増えていきます。
                            </p>
                        </div>


                        <div class="secondLi" id="aboutStore">
                            <h4 class="items"><span class="icon-conteiner"><img src="pictures/middle-store.png"></span>商業区</h4>
                            <p>
        商業区では資金を得ることができます。労働者1人につき1つの生産力を売却して資金を獲得します。そのため生産力が売却分確保できていないと、資金を得ることができません。
        規模レベルでは労働者数、生産性レベルでは1生産力あたりの売却レートを0.5づつあげることができます。商業区では労働者は1人あたり2食料を消費します。
                            </p>
                        </div>


                        <div class="secondLi" id="aboutStore">
                            <h4 class="items"><span class="icon-conteiner"><img src="pictures/middle_factory.png"></span>工場</h4>
                            <p>
                                工場は生産力を作ります。就業している労働者の分だけ作れる生産力が増加します。
                                生産力は備蓄をすることができない資源です。必要な分の生産力を作れるほどの労働者を
                                就業させておく必要があります。規模レベルでは労働者数、生産性レベルでは1人あたりの生産性を
                                1づつあげることができます。工場では労働者は1人あたり2食料を消費します。
                            </p>
                        </div>



                        <div class="secondLi" id="aboutFarm">
                            <h4 class="items"><span class="icon-conteiner"><img src="pictures/farm.png"></span>農場</h4>
                            <p>
                                農場は食料を生産します。就業している労働者の分だけ得られる食料が増加します。
                                規模レベルでは労働者数、生産性レベルでは1人あたりの生産性を
                                1づつあげることができます。農場では労働者は1人あたり1食料を消費します。
                            </p>
                        </div>


                        <div class="secondLi" id="aboutPort">
                            <h4 class="items"><span class="icon-conteiner"><img src="pictures/port.png"></span>商用港</h4>
                            <p>
                                商用港は食料と生産力を売買することができます。最初からは利用できず、建設コストが必要です。
                                売買したい量を入力してボタンをクリックすると、レートに応じた資金や食料・生産力を得ることができます。
                                ただし貯蔵量をオーバーしての売却・購入はできません。
                                <br><br>商用港は1ターンあたりに売買できる資源の量（取扱量）があります。
                                労働者を増やすことで1ターンあたりの取扱量を増やすことができます。
                                例えば、取扱量が50の時は売買合わせて50個分の資源しか取扱できません。50食料を購入したらそのターンはもう売買はできません。
                                <br><br>「余った生産力を全て売却する」にチェックを入れると、ターンを進める時に自動的に商業区の使用分を引いた生産力を全て売却してくれます。
                                例えば生産力が100作り、商業区で20消費した時、80の生産力があまります。その時その80の生産力を全て売却してくれます。
                                ただし余った生産力を売却できるほどの取扱量が残っている必要があります。
                                80の生産力を売却しようとした時、取扱量が20しかない時は20しか売ってくれません。逆に取扱量が90の場合は80全ての生産力を売却してくれます。
                            </p>
                        </div>


                        <div class="secondLi" id="aboutPlant">
                            <h4 class="items"><span class="icon-conteiner"><img src="pictures/power_plant.png"></span>発電所</h4>
                            <p>
                                発電所は生産力の量を増加させることができます。労働者1にあたり5%生産力を増加させます。
                                5人雇用した場合、25%生産力の量を増加させます。この時に100生産力を工場で作っている時は25%増加して125の生産力を得ることができます。
                                発電所では規模レベルしかあげられません。規模レベル1Lvあげるにつれ、最大労働者数が1増加します。
                            </p>
                        </div>

                        <div class="secondLi" id="aboutGranary">
                            <h4 class="items"><span class="icon-conteiner"><img src="pictures/granary.png"></span>穀物庫</h4>
                            <p>
                                穀物庫は食料の量を増加させることができます。労働者1にあたり5%食料を増加させます。
                                5人雇用した場合、25%食料を増加させます。この時に100食料を農場で作っている時は25%増加して125の食料を得ることができます。
                                穀物庫では規模レベルしかあげられません。規模レベル1Lvあげるにつれ、最大労働者数が1増加します。
                            </p>
                        </div>

                        <div class="secondLi" id="aboutBank">
                            <h4 class="items"><span class="icon-conteiner"><img src="pictures/bank.png"></span>銀行</h4>
                            <p>
                                銀行は商業区で得られる資金の量を増加させることができます。労働者1にあたり5%増加させます。
                                5人雇用した場合、25%増加させます。この時に100資金を商業区から得られる時は25%増加して125の資金を得ることができます。
                                銀行は規模レベルしかあげられません。規模レベル1Lvあげるにつれ、最大労働者数が1増加します。また商用港で得られる資金に補正はかかりません。
                            </p>
                        </div>

                        <div class="secondLi" id="aboutHospital">
                            <h4 class="items"><span class="icon-conteiner"><img src="pictures/hospital.png"></span>福祉施設</h4>
                            <p>
                                福祉施設は幸福度をあげて不満を増やさないようしたり、減らすことができます。
                                人口が50を越えると「人口増加による不満」が溜まってきます。
                                福祉施設では労働者とお金を使ってその不満を取り除きます。
                                労働者数と効率に応じて、取扱量が決まります。その取扱量が不満をカバーできる限界です。
                                人口の増加に合わせて調整しましょう。取扱量が人口を上回っている場合は、不満はたまりません。
                                <br><br>
                                そして取扱量が人口の2倍の値になると、今まで貯めた不満を減らすことができます。
                                福祉施設は1労働者あたり、1食料と2資金を必要とします。
                                福祉施設は最初からは利用できません。人口が50人になる前に建設とアップグレードをしておくことをお勧めします。
                            </p>
                        </div>
                </div>


                <div class="firstUnit">
                    <h3 class="caption" id="howToBuilInfo">建物情報の見方</h3>
                    <p class="secondLi">
                        画面右側の「建物情報」ではその建物で働く労働者の調整やレベルアップができます。商用港では数値を入力して資源の売買ができます。
                    </p>

                    <div class="secondLi">
                        <h4 class="items" id="aboutEffici">効率</h4>
                        <p>
                            「効率」と書かれた場所の数値は「1労働者あたりの生産量」を表しています。効率レベルを上げると数値が増加して、より多くの資源を生み出せます。
                        </p>
                    </div>


                    <div class="secondLi">
                        <h4 class="items" id="aboutWorker">労働者</h4>
                        <p>
                            「労働者」と書かれた場所の数値は「実際に働いている労働者数」/「最大労働者数」　を示しています。
                            1/5とあれば、最大5人働ける場所に1人働いている。という意味になります。
                            最大労働者数を超えて労働者を増やすことはできません。規模レベルを上げると最大労働者数が増えます。
                            <br><br>
                            下の
                            <i class="fas fa-plus-circle" id="inc-port-worker"></i>
                            <i class="fas fa-minus-circle" id="inc-port-worker"></i>
                            のボタンをクリックすると労働者の増減ができます。
                        </p>
                    </div>


                    <div class="secondLi">
                        <h4 class="items" id="aboutItems">生産物</h4>
                        <p>
                            「生産物」と書かれた場所の数値は「その建物の総生産量」を表しています。
                            効率と労働者数を掛け合わせた値と等しいです。
                            <br><br>
                            農場、商業区、工場ではその「生産物」の値が作られます（穀物庫などによる増加補正なしの値です。）。
                            穀物庫、銀行、発電所では生産物のパーセンテージだけ農場、商業区、工場の生産量を増加させます。
                        </p>
                    </div>


                    <div class="secondLi">
                        <h4 class="items" id="aboutConsume">消費物</h4>
                        <p>
                            「消費物」と書かれた場所の数値は「その建物の総生産量」を表しています。
                            住居を除く全ての建物では必ず食料を消費します。この値はターンイベントによって増加することがあります。
                        </p>
                    </div>


                    <div class="secondLi">
                        <h4 class="items" id="aboutSize">規模レベル</h4>
                        <p>
                            「規模レベル」は「建物の最大労働者数を上げるのに必要な資源」を示し、またレベルを示してます。
                            左の
                            <i id="port-upSize-btn" class="fas fa-arrow-circle-up"></i>
                            をクリックして資源が足りる場合はレベルを挙げられます。数値の色が「緑の場合は現在のターンでレベルアップ可能」、
                            「紫の場合は次のターンでレベルアップ可能（生産力のみ）」、「赤の場合は現在のターンではレベルアップ不可能」を示します。
                        </p>
                    </div>


                    <div class="secondLi">
                        <h4 class="items" id="aboutEfficiLev">効率レベル</h4>
                        <p>
                            「効率レベル」は「建物の効率を上げるのに必要な資源」を示し、またレベルを示してます。
                            左の
                            <i id="port-upSize-btn" class="fas fa-arrow-circle-up"></i>
                            をクリックして資源が足りる場合はレベルを挙げられます。数値の色が「緑の場合は現在のターンでレベルアップ可能」、
                            「紫の場合は次のターンでレベルアップ可能（生産力のみ）」、「赤の場合は現在のターンではレベルアップ不可能」を示します。
                        </p>
                    </div>


                    <div class="secondLi">
                        <h4 class="items" id="aboutportWorker">商用港：労動者</h4>
                        <p>
                            商用港の「労働者」と書かれた場所の数値は「商用港で働いている労働者」と「1労働者あたりの取扱量」を示してます。
                            <br><br>
                            「10 X 1/5」と書いてある場合は、「1人あたり10の取扱量で、最大労働者数5人のうちで1人が働いている」という意味です。
                            <br><br>
                            売買をするとその取扱量が減っていき、そのターンで売買できる量が減っていきます。売買をした場合取扱量に応じて労働者の減員ができないときがあります。
                            資源を売買して取り扱った労働者分の食料は必ず消費されます。
                        </p>
                    </div>



                    <div class="secondLi">
                        <h4 class="items" id="aboutPortSell">商用港；売却・購入</h4>
                        <p>
                            売却・購入ではフォームをクリックして、売却・購入数を入力できます。半角数字で入力するとその量に応じた資金が表示されます。
                            資金を見て良ければ、ボタンを押すと売買ができます。真ん中の数図は「レート」を示してます。
                            例えば売却レート0.5の時に20生産力を売ると、0.5x20＝4 の資金を得ます。
                            <br><br>
                            売却レートが購入レートを上回ることはなく、基本的にプレイヤー側は損をします。またこのレートは5の倍数ターン毎に変動するので注意してください。
                        </p>
                    </div>


                    <div class="secondLi">
                        <h4 class="items" id="aboutHospitalHandle">福祉施設：取扱量</h4>
                        <p>
                            福祉施設での「取扱量」は「不満をカバーできる量」を示しています。
                            取扱量が150であれば人口が150を越えるまで不満はたまりません。
                            しかし取扱量が150で人口が200の時など、取扱量が人口を下回っているとその差分だけ不満が増加します。
                            この場合は 150-200=50 となり、50の不満が毎ターンたまります。
                        </p>
                    </div>


                </div>


                <div class="firstUnit">
                    <h3 class="caption" id="aboutHint">ターンイベントとヒント</h3>
                    <p class="secondLi">
                        ターンを進めると何かしらの（悪い）イベントが起きることがあります。
                        ターンイベントはあるターンをすぎると発生確率が上昇してきます。
                        災害で建物が使えなくなったり、食料が消えたり、など様々です。
                        資源がたくさんあって、供給が潤っていても油断は禁物です。
                    </p>


                    <div class="secondLi">
                        <h4 class="items">１：人口50までのヒント</h4>
                        <p>
                            最初のうちは労働者も資源も足りません。
                            人口増加もそれほど多くないので一気に生産量を増加させることは難しいです。
                            そのため各建物の「効率レベル」を上げることを優先しましょう。
                            その時は『どの建物のレベルを上げるか？』という上げる順番をよく考えるといいです。
                        </p>
                    </div>


                    <div class="secondLi">
                        <h4 class="items">２：生産力の仕組みをよく知る</h4>
                        <p>
                            工場で作られる「生産力」は他の資源と違って貯蓄できません。
                            レベルアップに50必要なら、次のターンで50作れるほどの労働者を働かせないといけません。
                            そして生産力は商業区で売却されてお金になります。ですが全ての生産力が売却されることは稀です。
                            生産力が50作られて5つ売るとすれば、45あまります。しかしこの45は特に何も使われずロスとなります。
                            生産力は必要になった時に、必要な分だけあれば十分です。工場の労働者をこまめに調子して無駄な食料消費をカットしましょう。
                        </p>
                    </div>

                    <div class="secondLi">
                        <h4 class="items">３：食料ばかりに気を取られない</h4>
                        <p>
                            食料の量が少ないと心配になってどうしても農場のレベルアップに資源を使いがちです。
                            しかしレベルアップに必要な資金と生産力は農場では作れません。食料はあくまで0以下になって不足しなければ別に減っても大丈夫です。
                            時には農場の労働者を別の建物に移動して、別の資源を集中的に増やすという戦略もたまには必要です。
                        </p>
                    </div>

                    <div class="secondLi">
                        <h4 class="items">４：商用港が先か、穀物庫が先か</h4>
                        <p>
                            ターンがある程度進むと新しい建物が建てられるようになります。その時は商用港か穀物庫のどちらかを早めに立てるといいです。
                            商用港があると今までロスしていた余りの生産力を売ることができます。そのため資金の増加が期待できます。
                            一方で穀物庫は食料の生産性をパーセンテージで上げることができるため、食料に余裕ができやすいです。
                            資金と食料は貯蓄型です。どちらの生産量を上げるかはその状況次第です。
                        </p>
                    </div>

                    <div class="secondLi">
                        <h4 class="items">５：悪いことが重なっても諦めない</h4>
                        <p>
                            人口が多いのにも関わらず農場が使えなくなって、毎ターン食料-350！？
                            苦しい状況なのに追い討ちをかけるように食料消費が増加した！
                            人口が２倍になってしまった！。いろんなイベントが予想外に起きて国の危機に会うときがあるでしょう。
                            しかしそこでも諦めず以下のことを確かめてみましょう。きっと突破口が見えるはずです。
                        </p>
                        <ul>
                            <li>商用港で食料や必要な資源の補充ができないか？</li>
                            <li>労働者を減らしてなんとか持ちこたえられる食料消費にならないか？</li>
                            <li>どの建物のレベルをあげればいいか？</li>
                        </ul>
                    </div>

                    <div class="secondLi">
                        <h4 class="items">６：資金ジリ貧エンドにならないように</h4>
                        <p>
                            商業区の効率は他の建物と比べてゆっくり上がります。
                            そのため農場や工場ばかりに集中していると次第に資金が思うようにたまらないときがあります。
                            特に人口50を越えると福祉施設に資金を取られます。
                            するとさらに資金が足りなくなり、そしてレベルアップできず、せっかくレベルアップできてもすぐ人口増加、、、滅亡。
                            ということになります。資金は食料より溜まりにく事に留意してください。
                        </p>
                    </div>


                    <div class="secondLi">
                        <h4 class="items">７：人口増加時は必ず幸福度チェック</h4>
                        <p>
                            順調に進むと漫然になり、ひたすら「次のターンへ」を押す時期があるでしょう。
                            「人口増加ぁ？無駄無駄！」と思ってササット進んだら不満が100溜まってGameOverなんてことがたまにあります。
                            漫然に進めると「幸福度」の存在を忘れていることがあります。人口増加したら福祉施設で取扱量の調整をしましょう。
                        </p>
                    </div>
                </div>

                <div class="firstUnit" id="myMesage">
                    <h3 class="caption">あとがき</h3>
                        <p>
                            CITY GAMEをプレイしていただきありがとうございます。このゲームはJavaScriptでのオブジェクト指向練習用に作ったものです。
                            ゲームを設計していく中で次第にオブジェクト指向と基礎的なSPAの仕組みがわかってきたのがとても勉強になりました。
                            最初はPHPで動かそうとしましたが、SESSIONにオブジェクト積むのが上手くいかないというか、不適だったのでSPA方式で必要な部分だけをJSで変えるようにしました。
                            無事なんとかゲームとして完成させることができました。
                            <br><br>
                            しかし課題としては、オブジェクト指向は理解できたものの実際に組んだコードが本当に保守性が高いものか？ということです。
                            オブジェクト指向でインスタンスを作って、そのインスタンスの情報を書き換え、またそのプロパティから計算してゲームを進行させるという流れはできたものの、
                            今回のコードの保守性が高いものか謎です。
                            <br><br>
                            そしてSPAと言っても、一部分をdispley,noneで隠したりしているだけなのでそれほど高度ではりません。
                            開発の段階でもメッセージが更新されなかった理、どの関数がその要素を弄っているのか分からなくなって混乱したりしました。
                            <br><br>
                            このゲームのコードをGitHubに置いてあるので良ければ見たり、ダウンロードして改造して遊んでも大丈夫です。
                        </p>
                        <a href="https://github.com/junjiIshii/city_game.git">コードはこちら（GitHubへ）</a>
                </div>

                
        </div>

        <script type="text/javascript" src="jquery-3.4.1.min.js"></script>
        
        <script type="text/javascript">
            $('.indexLi').on('click',function(){
                var toJamp = $(this).data('jamp');
                var positionJamp = $('#'+toJamp).offset();

                $(window).scrollTop(positionJamp.top-15);
            })
        </script>
    </body>
</html>
