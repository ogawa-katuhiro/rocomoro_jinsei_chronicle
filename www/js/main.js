// ニフクラのキー
var apikey = "3175ddc3c2fa11d0f748f336750ae51023d4a1a1ea1f09d77d3910cbd768d03b";
var clientkey = "50a1429776c8c386c04301ff11b50b555ca71fe1970db72f4e01f1f7257bc9d5";
// SDK initialization.
var ncmb = new NCMB(apikey, clientkey);

enchant();
window.onload = function() {
    var game = new Game(320, 750); // 表示領域の大きさを設定
    game.fps = 30;    // ゲームの進行スピードを設定
    game.preload('./image/Bad.png',   //preload=前もって読み込んでおく
                 './image/Good.png',
                 './image/Love.png',
                 './image/Other.png',
                 './image/start.png',
                 './image/Work.png',
                 './image/BackGround.jpg',
                 './image/RouletteBG.png',
                 './image/RouletteModel.gif',
                 './image/MenuBG.jpg',
                 './image/charaSheet.png',
                 './image/map0.gif',
                 './image/Minata.png',
                 './image/Nagino.png',
                 './image/Takezawa.png',
                 './image/Iyori.png',
                 './image/Kyoshitsu.jpg',
                 './image/box_blue.png',
                 './image/button_blue.png',
                 './image/Syokudo.jpg',
                 './image/okujyou.jpg',
                 './image/koubai.jpg',
                 './image/Rouka.jpg',
                 './image/toukou.jpg',
                 './image/shop.jpg',
                 './image/Rouka.jpg',
                 './image/Kousyaura.jpg',
                 './image/Shokoguchi.jpg',
                 './image/roulette.png',
                 './image/end_button.png',
                 './image/hukidasi1.png',
                 './image/hukidasi2.png',
                 './image/hukidasi3.png',
                 './image/workBG.png',
                 './image/goodBG.png',
                 './image/badBG.png',
                 './image/imageBG.png',
                 './image/modoru.png',
                 './image/rBtn.png',
                 './Sound/Game.mp3',
                 './Sound/Move.mp3',
                 './Sound/Decision.mp3');
    var label;
    var RouletteValue = 0; 
    var RouletteV;
    var CurrentTile = 0;
    getEndTime();


    game.onload = function() {     // ゲームの準備が整ったらメインの処理を実行します
        /**
        * タイトルシーンを作り、返す関数
        */
        var createTitleScene = function() {
            var scene = new Scene();                // 新しいシーンを作る
            var StartBtn = new Sprite(236, 48);
            StartBtn.x = 48;
            StartBtn.y = 96;
            StartBtn.image = game.assets['./image/start.png'];
            scene.addChild(StartBtn);                  // シーンにラベルに追加
            scene.backgroundColor = '#ffffff';      // シーンの背景色を設定
            StartBtn.addEventListener(Event.TOUCH_START, function(e) { // シーンにタッチイベントを設定
                //現在表示しているシーンをゲームシーンに置き換えます
                var sound = game.assets['./Sound/Decision.mp3'].clone();
                sound.play();
                game.replaceScene(createGameScene());
            });


            // この関数内で作ったシーンを呼び出し元に返します(return)
            return scene;
        };
	/**
        * ゲームシーンを作り、返す関数
        */
        var createGameScene = function() {
            var scene = new Scene();    // 新しいシーンを作る
            
            //ゲームシーンに背景画像を設定
            var BackGround = new Sprite(320,740);
            BackGround.image = game.assets['./image/BackGround.jpg'];
            scene.addChild(BackGround);
            
            var music = new Audio('./Sound/Game.mp3');
              music.play();
              music.addEventListener("ended", function() {
              music.currentTime = 0;
              music.play();
            }, false);
            

            //プレイヤーの初期ステータスをlocalStorageに設定
            var Money = 0;  //プレイヤーの所持
            var myJob = '無職';
            var mySalary = '0円';
            var FavorabilityR1 = 10;   //皆田なつひの好感度  ※FavorabilityR(Rating) == 好感度
            var FavorabilityR2 = 10;   //薙野吉乃の好感度
            var FavorabilityR3 = 10;   //武沢加帆の好感度
            var FavorabilityR4 = 10;   //伊与田英利の好感度
            localStorage.setItem('Money', Money);  // ローカルストレージに初期所持金を設定
            localStorage.setItem('myJob', myJob);
            localStorage.setItem('mySalary', mySalary);
             
            localStorage.setItem('1', FavorabilityR1);  //ローカルストレージに皆田なつひの初期好感度を設定
            localStorage.setItem('2', FavorabilityR2);  //ローカルストレージに薙野吉乃の初期好感度を設定
            localStorage.setItem('3', FavorabilityR3);  //ローカルストレージに武沢加帆の初期好感度を設定
            localStorage.setItem('4', FavorabilityR4);  //ローカルストレージに伊与田英利の初期好感度を設定





            scene.addEventListener(Event.ENTER_FRAME, function() {
              FavorabilityR1 = localStorage.getItem('FR1');
            });

        
        
        // 制限時間の表示

        var timeUI = new MutableText(10,10);
        scene.addChild(timeUI);

        // 制限時間が減るようにしよう
        var flag = false;
        timeUI.addEventListener('enterframe',async function(){
          //現在時刻を取得
          var now = new Date();
          //終了時刻を取得
          var end = new Date(localStorage.getItem('endTime'));
          diff = end.getTime() - now.getTime();
          //HH部分取得
          var diffHour = diff / (1000 * 60 * 60);
          //MM部分取得
          var diffMinute = (diffHour - Math.floor(diffHour)) * 60;
          //SS部分取得
          var diffSecond = (diffMinute - Math.floor(diffMinute)) * 60;

          timeUI.time = ('00' + Math.floor(diffHour)).slice(-2) + ':' + ('00' + Math.floor(diffMinute)).slice(-2) + ':' + ('00' + Math.round(diffSecond)).slice(-2);
          timeUI.text = 'TIME:' + timeUI.time;
             if(diff <= 0){
               var myMoney = Number(localStorage.getItem('Money'));
               var totalStep = Number(localStorage.getItem('totalStep'));
               if(!flag){
                 flag = true;
                 setScore(myMoney, totalStep);
                 var arr = await EndView();
                 console.log(arr);
               }
               game.popScene();					//mainSceneシーンを外す
               game.pushScene(endScene);

               //ゲームオーバー後のテキスト表示
               gameOverText.text = 'GAME END 記録';				//テキストに文字表示
               endButton.image = game.assets['./image/end_button.png'];
               resultBG1.image = game.assets['./image/hukidasi3.png'];
               resultBG2.image = game.assets['./image/hukidasi3.png'];
               resultBG3.image = game.assets['./image/hukidasi3.png'];
               resultBG4.image = game.assets['./image/hukidasi3.png'];

               rank1.text = '1位';
               rank2.text = '2位';
               rank3.text = '3位';
               rank4.text = '4位';

               resultMoney1.text = '資産額: ' + arr[0][1] + '円';
               resultStep1.text = '歩数: ' + arr[0][2] + '歩';
               playerName1.text = 'プレイヤー: ' + arr[0][3];

               resultMoney2.text = '資産額: ' + arr[1][1] + '円';
               resultStep2.text = '歩数: ' + arr[1][2] + '歩';
               playerName2.text = 'プレイヤー: ' + arr[1][3];

               resultMoney3.text = '資産額: ' + arr[2][1] + '円';
               resultStep3.text = '歩数: ' + arr[2][2] + '歩';
               playerName3.text = 'プレイヤー: ' + arr[2][3];

               resultMoney4.text = '資産額: ' + arr[3][1] + '円';
               resultStep4.text = '歩数: ' + arr[3][2] + '歩';
               playerName4.text = 'プレイヤー: ' + arr[3][3];


             }
        });

			//ルーレット残り回数取得
			var stepCount = localStorage.getItem('count');
		      if(stepCount != 0){
		        stepCount = 0;
		        localStorage.setItem('count', stepCount);
		      }
      
      var viewImage = new Sprite(56, 30);
      viewImage.image = game.assets['./image/hukidasi2.png'];
      viewImage.x = 260;
      viewImage.y = 260;
      scene.addChild(viewImage);

			var rouletteCount = new Label('あと' + stepCount + '回');
			rouletteCount.font = '12px Meiryo';
			rouletteCount.x = 266;
			rouletteCount.y = 270;
			scene.addChild(rouletteCount);

			//ルーレット残り回数更新
			 rouletteCount.addEventListener(Event.ENTER_FRAME, function(){
			 stepCount = localStorage.getItem('count');
			 this.text = 'あと' + stepCount + '回';
			 })

            //ルーレットシーンに遷移するボタンを設定
            var RouletteBtn = new Sprite(185, 200);
            RouletteBtn.image = game.assets['./image/roulette.png'];
            RouletteBtn.scale(0.5, 0.5);
            RouletteBtn.x = 180;
            RouletteBtn.y = 245;
            scene.addChild(RouletteBtn);


            RouletteBtn.addEventListener(Event.TOUCH_START, function(e) {
              var sound = game.assets['./Sound/Decision.mp3'].clone();
              sound.play();
              //条件を満たしたら回せる
              if(count <= 0 && RouletteValue == 0){
                swal('歩いてルーレット残り回数を増やしてください！');
              }else if(RouletteValue != 0){
                swal('あと' + RouletteValue + 'マス進んでください！');
              }else{
                count--;
                localStorage.setItem('count', count);
                RouletteValue = RouletteC();
              }
            });

            var backgroundMap = new Map(16, 16);
backgroundMap.image = game.assets['./image/map0.gif'];
backgroundMap.loadData([
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,0,3,1,2,3,5,0,0,2,2,1,-1,-1,-1,-1,-1],
    [-1,-1,-1,2,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,-1,-1,-1,-1],
    [-1,-1,2,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,-1,-1,-1],
    [-1,-1,0,-1,-1,-1,-1,0,3,1,0,0,0,-1,-1,-1,0,-1,-1,-1],
    [-1,-1,3,-1,-1,-1,3,2,-1,0,-1,-1,2,1,-1,-1,3,-1,-1,-1],
    [-1,-1,3,-1,-1,0,1,-1,-1,0,-1,-1,-1,1,0,0,2,-1,-1,-1],
    [-1,-1,1,-1,-1,0,-1,-1,-1,3,-1,-1,-1,3,-1,-1,1,-1,-1,-1],
    [-1,-1,0,2,2,3,-1,-1,-1,0,-1,-1,-1,0,-1,-1,0,-1,-1,-1],
    [-1,-1,1,-1,-1,0,-1,-1,-1,0,-1,-1,-1,0,-1,-1,0,-1,-1,-1],
    [-1,-1,0,-1,-1,3,2,-1,-1,2,-1,-1,1,2,-1,-1,3,-1,-1,-1],
    [-1,-1,0,-1,-1,-1,1,1,0,1,3,3,0,-1,-1,-1,2,-1,-1,-1],
    [-1,-1,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,-1,-1],
    [-1,-1,2,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,-1,-1,-1],
    [-1,-1,-1,3,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,-1,-1,-1,-1],
    [-1,-1,-1,-1,0,2,0,0,1,0,3,0,3,2,0,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
],[
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
]);
backgroundMap.collisionData = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],
    [0,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0],
    [0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0],
    [0,1,0,1,1,1,1,0,0,0,0,0,0,1,1,1,0,1,0,0],
    [0,1,0,1,1,1,0,0,1,0,1,1,0,0,1,1,0,1,0,0],
    [0,1,0,1,1,0,0,1,1,0,1,1,1,0,0,0,0,1,0,0],
    [0,1,0,1,1,0,1,1,1,0,1,0,1,0,1,1,0,1,0,0],
    [0,1,0,0,0,0,1,0,1,0,1,0,1,0,1,1,0,1,0,0],
    [0,1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1,0,0],
    [0,1,0,1,1,0,0,1,1,0,1,1,0,0,1,1,0,1,0,0],
    [0,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,0,0],
    [0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0],
    [0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0],
    [0,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0],
    [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

  scene.addChild(backgroundMap);


            //プレイヤーのスプライトを設定
            var Player = new Sprite(20,20);
            Player.image = game.assets['./image/charaSheet.png'];
            Player.x = 142;
            Player.y = 38;
            scene.addChild(Player);

            //プレイヤーの移動を検知するイベントリスナーを登録
            var rValue = RouletteValue;
            var workX = 142;
            var workY = 38;
            var flg = 0;



            var chkFlg = 0;

            var viewImage2 = new Sprite(70, 54);
            viewImage2.image = game.assets['./image/hukidasi1.png'];
            viewImage2.x = 240;
            viewImage2.y = 5;
            scene.addChild(viewImage2);

           //プレイヤーが残り何マス進むことができるか表示する
            var RouletteValueVier = new Label('あと' + RouletteValue + 'マス');
            RouletteValueVier.x = 247;
            RouletteValueVier.y = 23;
            RouletteValueVier.font = '12px Meiryo';
            scene.addChild(RouletteValueVier);

             RouletteValueVier.addEventListener(Event.ENTER_FRAME, function() {
              this.text = 'あと' + RouletteValue + 'マス';
            });

            //プレイヤーの移動を検知するイベントリスナーを登録
            Player.addEventListener(Event.ENTER_FRAME, function() {


                chkFlg++;
                chkFlg %= 3;
                if(chkFlg != 0 ){
                    return;
                }



               if(game.input.up && rValue != 0){
                   if(backgroundMap.hitTest(this.x+16 , this.y + 8)){
                   }else if (workY == this.y - 16) {



                   }else{
                       workX = this.x;
                       workY = this.y;
                       Player.frame = 0;
                     this.y -= 16;
                     var sound = game.assets['./Sound/Move.mp3'].clone();
                     sound.play();
                     RouletteValue --;
                     rValue--;

                   }
               }
               if(game.input.right && rValue != 0){
                 if(backgroundMap.hitTest(this.x+32 , this.y + 17)){



                }else if (workX == this.x + 16) {



                 }else{
                     workX = this.x;
                     workY = this.y;
                     Player.frame = 0;
                   this.x += 16;
                   var sound = game.assets['./Sound/Move.mp3'].clone();
                  sound.play();
                   RouletteValue --;
                   rValue--;

                 }
                }
               if(game.input.down && rValue != 0){
                   if (backgroundMap.hitTest(this.x+16 ,this.y + 32 )) {




                   }else if (workY == this.y + 16) {



                   }else {
                       workX = this.x;
                       workY = this.y;
                       this.y += 16;
                       var sound = game.assets['./Sound/Move.mp3'].clone();
                  sound.play();
                    RouletteValue --;
                    rValue--;



                   }
               }
               if(game.input.left && rValue != 0) {
                   if (backgroundMap.hitTest(this.x-1 ,this.y + 17 )) {



                   }else if (workX == this.x - 16) {



                   }else {
                       workX = this.x;
                       workY = this.y;
                       Player.frame = 4
                       this.x -= 16;
                       var sound = game.assets['./Sound/Move.mp3'].clone();
                  sound.play();
                       RouletteValue --;
                       rValue--;

                   }
             }
          

             if(Player.x == 142 && Player.y == 38){

             }else if(rValue == 0 && flg == 0  ){
               CurrentTile = backgroundMap.checkTile(Player.x + 10, Player.y + 16);


               MasuEvent(CurrentTile);
               flg ++;

             }else if(rValue != RouletteValue && flg != 0){
               flg = 0;
             }
             rValue = RouletteValue;
            });

            //ゲームパッドを設定(ゲームシーンを作るメソッド内に)
            var pad = new Pad();
            pad.x = 5;
            pad.y = 300;
            scene.addChild(pad);

            //ステータスを表示する場所に背景画像を設定
          var StatusBG = new Sprite(320, 320);
          StatusBG.image = game.assets['./image/imageBG.png'];
          StatusBG.x = 3;
          StatusBG.y = 420;
          scene.addChild(StatusBG);

          var status = new Label('ステータス');
          status.x = 112;
          status.y = 450;
          status.font = '22px Meiryo';
          scene.addChild(status);

          //プレイヤーの現在所持金額を表示する
          var CurrentMoney = new Label('現在の所持金： ' + localStorage.getItem('Money') + '円');
          CurrentMoney.x = 30;
          CurrentMoney.y = 490;
          CurrentMoney.font = '18px Meiryo';
          scene.addChild(CurrentMoney);

          //所持金を更新するイベントリスナ
          CurrentMoney.addEventListener(Event.ENTER_FRAME, function() {
            this.text = '現在の所持金： ' + localStorage.getItem('Money') + '円';
          });

          //プレイヤーの現在職業を表示する
          var CurrentJob = new Label('現在の職業：' + localStorage.getItem('myJob'));
          CurrentJob.x = 30;
          CurrentJob.y = 530;
          CurrentJob.font = '18px Meiryo';
          scene.addChild(CurrentJob);

          //プレイヤーの職業を更新するイベントリスナ
          CurrentJob.addEventListener(Event.ENTER_FRAME, function() {
            this.text = '現在の職業：' + localStorage.getItem('myJob');
          });

          //プレイヤーへの皆田なつひの好感度
          var CurrentFR1 = new Label('皆田 なつひの好感度： ' + localStorage.getItem('1') + '/100');
          CurrentFR1.x = 30;
          CurrentFR1.y = 570;
          CurrentFR1.font = '18px Meiryo';
          scene.addChild(CurrentFR1);

          //皆田なつひの好感度を更新するイベントリスナ
          CurrentFR1.addEventListener(Event.ENTER_FRAME, function() {
            this.text = '皆田 なつひの好感度： ' + localStorage.getItem('1') + '/100';
          });

          //プレイヤーへの薙野吉乃の好感度
          var CurrentFR2 = new Label('薙野 吉乃の好感度    ： ' + localStorage.getItem('2') + '/100');
          CurrentFR2.x = 30;
          CurrentFR2.y = 610;
          CurrentFR2.font = '18px Meiryo';
          scene.addChild(CurrentFR2);

          //薙野吉乃の好感度を更新するイベントリスナ
          CurrentFR2.addEventListener(Event.ENTER_FRAME, function() {
            this.text = '薙野 吉乃の好感度    ： ' + localStorage.getItem('2') + '/100';
          });


          //プレイヤーへの武沢加帆の好感度
          var CurrentFR3 = new Label('武沢 加帆の好感度    ： ' + localStorage.getItem('3') + '/100');
          CurrentFR3.x = 30;
          CurrentFR3.y = 650;
          CurrentFR3.font = '18px Meiryo';
          scene.addChild(CurrentFR3);

          //武沢加帆の好感度を更新するイベントリスナ
          CurrentFR3.addEventListener(Event.ENTER_FRAME, function() {
            this.text = '武沢 加帆の好感度    ： ' + localStorage.getItem('3') + '/100';
          });

          //プレイヤーへの伊与田英利の好感度
          var CurrentFR4 = new Label('伊与田 英利の好感度： ' + localStorage.getItem('4') + '/100');
          CurrentFR4.x = 30;
          CurrentFR4.y = 690;
          CurrentFR4.font = '18px Meiryo';
          scene.addChild(CurrentFR4);

          //伊与田英利の好感度を更新するイベントリスナ
          CurrentFR4.addEventListener(Event.ENTER_FRAME, function() {
            this.text = '伊与田 英利の好感度： ' + localStorage.getItem('4') + '/100';
          });

            // この関数内で作ったシーンを呼び出し元に返します(return)
            return scene;
        };

        /*
        **アイテムシーンを作り、返す関数
        **
        */
        var createItemScene = function() {
          var scene = new Scene();

          //アイテムシーンの背景に設置するスプライトを設定する
          var ItemBG = new Sprite(240,240);
          ItemBG.image = game.assets['./image/MenuBG.jpg'];
          ItemBG.x = 50;
          ItemBG.y = 50;
          scene.addChild(ItemBG);

          var Cancel = new Label('戻る');
          Cancel.x = 80;
          Cancel.y = 80;
          scene.addChild(Cancel);

          Cancel.addEventListener(Event.TOUCH_START, function(e) {
              game.popScene();
          });


          //現在のシーンを返す
          return scene;
        };



        // ゲームの_rootSceneをタイトルシーンに置き換えます
        game.replaceScene(createTitleScene());
        // このようにcreateTitleScene() と書くと、シーンが関数内で作成されて
        // createTitleScene()と書かれた場所に代入されます

}

        //結果画面
		var endScene = new Scene();
		endScene.backgroundColor = 'rgba(255, 255, 204,1)';

		//GAMEOVER
		var gameOverText = new Label(); 					//テキストはLabelクラス
    gameOverText.textAlign = "center";
		gameOverText.font = '30px Meiryo';				//フォントはメイリオ 20px 変えたかったらググってくれ
    gameOverText.x = 10;
    gameOverText.y = 30;

		endScene.addChild(gameOverText);						//endSceneシーンにこの画像を埋め込む

    var resultBG1 = new Sprite(300, 105);
    resultBG1.x = 10;
    resultBG1.y = 110;

    endScene.addChild(resultBG1);

    var resultBG2 = new Sprite(300, 105);
    resultBG2.x = 10;
    resultBG2.y = 210;

    endScene.addChild(resultBG2);

    var resultBG3 = new Sprite(300, 105);
    resultBG3.x = 10;
    resultBG3.y = 310;

    endScene.addChild(resultBG3);

    var resultBG4 = new Sprite(300, 105);
    resultBG4.x = 10;
    resultBG4.y = 410;

    endScene.addChild(resultBG4);

    var rank1 = new Label();
    rank1.font = '25px Meiryo';
    rank1.x = 30;
    rank1.y = 150;

    endScene.addChild(rank1);

    var rank2 = new Label();
    rank2.font = '25px Meiryo';
    rank2.x = 30;
    rank2.y = 250;

    endScene.addChild(rank2);

    var rank3 = new Label();
    rank3.font = '25px Meiryo';
    rank3.x = 30;
    rank3.y = 350;

    endScene.addChild(rank3);

    var rank4 = new Label();
    rank4.font = '25px Meiryo';
    rank4.x = 30;
    rank4.y = 450;

    endScene.addChild(rank4);

    var playerName1 = new Label();
    playerName1.font = '20px Meiryo';
    playerName1.x = 70;
    playerName1.y = 130;

    endScene.addChild(playerName1);

    var playerName2 = new Label();
    playerName2.font = '20px Meiryo';
    playerName2.x = 70;
    playerName2.y = 230;

    endScene.addChild(playerName2);

    var playerName3 = new Label();
    playerName3.font = '20px Meiryo';
    playerName3.x = 70;
    playerName3.y = 330;

    endScene.addChild(playerName3);

    var playerName4 = new Label();
    playerName4.font = '20px Meiryo';
    playerName4.x = 70;
    playerName4.y = 430;

    endScene.addChild(playerName4);

    var resultMoney1 = new Label();
    resultMoney1.font = '20px Meiryo';
    resultMoney1.x = 70;
    resultMoney1.y = 150;

    endScene.addChild(resultMoney1);

    var resultMoney2 = new Label();
    resultMoney2.font = '20px Meiryo';
    resultMoney2.x = 70;
    resultMoney2.y = 250;

    endScene.addChild(resultMoney2);

    var resultMoney3 = new Label();
    resultMoney3.font = '20px Meiryo';
    resultMoney3.x = 70;
    resultMoney3.y = 350;

    endScene.addChild(resultMoney3);

    var resultMoney4 = new Label();
    resultMoney4.font = '20px Meiryo';
    resultMoney4.x = 70;
    resultMoney4.y = 450;

    endScene.addChild(resultMoney4);

    var resultStep1 = new Label();
    resultStep1.font = '20px Meiryo';
    resultStep1.x = 70;
    resultStep1.y = 170;

    endScene.addChild(resultStep1);

    var resultStep2 = new Label();
    resultStep2.font = '20px Meiryo';
    resultStep2.x = 70;
    resultStep2.y = 270;

    endScene.addChild(resultStep2);

    var resultStep3 = new Label();
    resultStep3.font = '20px Meiryo';
    resultStep3.x = 70;
    resultStep3.y = 370;

    endScene.addChild(resultStep3);

    var resultStep4 = new Label();
    resultStep4.font = '20px Meiryo';
    resultStep4.x = 70;
    resultStep4.y = 470;

    endScene.addChild(resultStep4);



    var endButton = new Sprite(150, 75);
    endButton.x = 80;
    endButton.y = 650;
    endScene.addChild(endButton);

    //ゲーム終了するボタンにタッチイベントを設定する
    endButton.addEventListener(Event.TOUCH_START, function(e) {
      location.href = 'HTML/Menu.html';
    });
    

        //就職、転職、ランクアップイベントシーン
        var workEventScene = function() {
          var eName = localStorage.getItem('eName');
          var eType = localStorage.getItem('eType');
          var eText = localStorage.getItem('eText');
          var myJob = localStorage.getItem('myJob');
          var mySalary = localStorage.getItem('mySalary');
          var sound = game.assets['./Sound/Decision.mp3'].clone();
          sound.play();

          var scene = new Scene();
          var EventBG = new Sprite(300,244);
          EventBG.image = game.assets['./image/workBG.png'];
          EventBG.x = 10;
          EventBG.y = 40;
          scene.addChild(EventBG);

          var eventType = new Label(eType + 'イベント');
          eventType.textAlign = "center";
          eventType.y = 75;
          scene.addChild(eventType);

          var eventName = new Label(eName);
          eventName.textAlign = "center";
          eventName.y = 90;
          scene.addChild(eventName);

          var eventText = new Label(eText);
          eventText.x = 40;
          eventText.y =130;
          eventText.width = 250;
          eventText.font = '12px Meiryo';
          scene.addChild(eventText);

          var myJob = new Label('職業: ' + myJob);
          myJob.x = 40;
          myJob.y = 200;
          myJob.font = '15px Meiryo';
          scene.addChild(myJob);

          var mySalary = new Label('給料: ' + mySalary + '円');
          mySalary.x = 40;
          mySalary.y = 220;
          mySalary.font = '15px Meiryo';
          scene.addChild(mySalary);

          if(eName == 'ランクアップ'){
            var btn = new Sprite(150, 117);
            btn.image = game.assets['./image/rBtn.png'];
            btn.x = 85;
            btn.y = 280;
            scene.addChild(btn);

            btn.addEventListener(Event.TOUCH_START, function(e){
            var value = Math.floor(Math.random() * 6) + 1;
            if(value % 2 == 0){
              swal(value + 'が出た、ランクアップ成功！');
              rankUp();
            }else{
              swal(value + 'が出た、ランクアップ失敗');
            }       
            game.popScene();
            });
          }

          var Cancel = new Sprite(30, 30);
          Cancel.image = game.assets['./image/modoru.png'];
          Cancel.x = 250;
          Cancel.y = 215;
          scene.addChild(Cancel);

          Cancel.addEventListener(Event.TOUCH_START, function(e) {
            game.popScene();
          });

          return scene;
        };

        //給料日イベントシーン
        var salaryEventScene = function() {
          var eName = localStorage.getItem('eName');
          var eType = localStorage.getItem('eType');
          var eText = localStorage.getItem('eText');
          var mySalary = localStorage.getItem('mySalary');
          var myMoney = localStorage.getItem('Money');
          var sound = game.assets['./Sound/Decision.mp3'].clone();
          sound.play();

          var scene = new Scene();
          var EventBG = new Sprite(300,244);
          EventBG.image = game.assets['./image/workBG.png'];
          EventBG.x = 10;
          EventBG.y = 40;
          scene.addChild(EventBG);

          var eventType = new Label(eType + 'イベント');
          eventType.textAlign = "center";
          eventType.y = 75;
          scene.addChild(eventType);

          var eventName = new Label(eName);
          eventName.textAlign = "center";
          eventName.y = 90;
          scene.addChild(eventName);

          var eventText = new Label(eText);
          eventText.x = 40;
          eventText.y =130;
          eventText.width = 250;
          eventText.font = '12px Meiryo';
          scene.addChild(eventText);

          var mySalary = new Label('お金: +' + mySalary + '円');
          mySalary.x = 40;
          mySalary.y = 200;
          mySalary.font = '15px Meiryo';
          scene.addChild(mySalary);

          var myMoney = new Label('総資産: ' + myMoney + '円');
          myMoney.x = 40;
          myMoney.y = 220;
          myMoney.font = '15px Meiryo';
          scene.addChild(myMoney);

          var Cancel = new Sprite(30, 30);
          Cancel.image = game.assets['./image/modoru.png'];
          Cancel.x = 250;
          Cancel.y = 215;
          scene.addChild(Cancel);

          Cancel.addEventListener(Event.TOUCH_START, function(e) {
            game.popScene();
          });



          return scene;
        };

//イベントを表示するシーンを作る
        var createEventScene = function() {
          var eName = localStorage.getItem('eName');
          var eType = localStorage.getItem('eType');
          var eMoney = localStorage.getItem('eMoney');
          var eText = localStorage.getItem('eText');
          var sound = game.assets['./Sound/Decision.mp3'].clone();
          sound.play();

          var sing = null;
          
          var scene = new Scene();
          var EventBG = new Sprite(300,244);
          if(eType == 'グッド'){
            EventBG.image = game.assets['./image/goodBG.png'];
            sing = '+';
          }else if(eType == 'バッド'){
            EventBG.image = game.assets['./image/badBG.png'];
            sing = '-';
          }
          EventBG.x = 10;
          EventBG.y = 40;
          scene.addChild(EventBG);

          var eventType = new Label(eType + 'イベント');
          eventType.textAlign = "center";
          eventType.y = 75;
          scene.addChild(eventType);

          var eventName = new Label(eName);
          eventName.textAlign = "center";
          eventName.y = 90;
          scene.addChild(eventName);

          var eventText = new Label(eText);
          eventText.x = 40;
          eventText.y =130;
          eventText.width = 250;
          eventText.font = '12px Meiryo';
          scene.addChild(eventText);

          if(sing != null){
            var eventMoney = new Label('お金: ' + sing + eMoney + '円');
            eventMoney.x = 40;
            eventMoney.y = 200;
            eventMoney.font = '15px Meiryo';
            scene.addChild(eventMoney);
          }

          var Cancel = new Sprite(30, 30);
          Cancel.image = game.assets['./image/modoru.png'];
          Cancel.x = 250;
          Cancel.y = 215;
          scene.addChild(Cancel);

          Cancel.addEventListener(Event.TOUCH_START, function(e) {
            game.popScene();
          });



          return scene;
        };

        var createLoveEventScene = function() {
          var sound = game.assets['./Sound/Decision.mp3'].clone();
          sound.play();
          var scene = new Scene();
          
          var e_title = localStorage.getItem('e_title');
          var e_text = localStorage.getItem('e_text');
          var c_id = localStorage.getItem('c_id');
          var Select1 = localStorage.getItem('s_1');
          var Select1Value = Number(localStorage.getItem('s_1V'));
          var Select2 = localStorage.getItem('s_2');
          var Select2Value = Number(localStorage.getItem('s_2V'));
          var Select3 = localStorage.getItem('s_3');
          var Select3Value = Number(localStorage.getItem('s_3V'));
          var EventID = Number(localStorage.getItem('e_id'));
          

          //イベント毎に対応した背景画像を設定する
          var lEventBG = new Sprite(240, 240);
          lEventBG.x = 42;
          lEventBG.y = 42;
          //イベントを判定して対応した背景画像を割り当てる
          if(EventID == 1 || EventID == 10){
            lEventBG.image = game.assets['./image/Kyoshitsu.jpg'];
          }else if(EventID == 2){
            lEventBG.image = game.assets['./image/toukou.jpg'];
          }else if(EventID == 3){
            lEventBG.image = game.assets['./image/okujyou.jpg'];
          }else if(EventID == 4){
            lEventBG.image = game.assets['./image/koubai.jpg'];
          }else if(EventID == 5 || EventID == 7){
            lEventBG.image = game.assets['./image/Rouka.jpg'];
          }else if(EventID == 6){
            lEventBG.image = game.assets['./image/Shokoguchi.jpg'];          
          }else if(EventID == 8){
            lEventBG.image = game.assets['./image/Syokudo.jpg'];
          }else if(EventID == 9){
            lEventBG.image = game.assets['./image/shop.jpg'];
          }else if(EventID == 11){
            lEventBG.image = game.assets['./image/Kousyaura.jpg'];
          }

          scene.addChild(lEventBG);
          

          //イベントに応じたキャラクター画像を表示する
          var CharaImage = new Sprite(180, 200);
          CharaImage.x = 70;
          CharaImage.y = 42;
          //イベント毎にキャラ画像を設定する
          if(c_id == 1){
            CharaImage.image = game.assets['./image/Minata.png'];
          }else if(c_id == 2){
            CharaImage.image = game.assets['./image/Nagino.png'];
          }else if(c_id ==3){
            CharaImage.image = game.assets['./image/Takezawa.png'];
          }else{
            CharaImage.image = game.assets['./image/Iyori.png'];
          }
          scene.addChild(CharaImage);

          //テキストウィンドウを設定する
          var TextWindow = new Sprite(230, 50);
          TextWindow.image = game.assets['./image/box_blue.png'];
          TextWindow.x = 47;
          TextWindow.y = 240;
          scene.addChild(TextWindow);

          //イベントテキストを設定する
          var EventText = new Label(e_text);
          EventText.x = 55;
          EventText.y = 245;
          EventText.width = 200;
          EventText.color = 'White';
          EventText.font = '10px Palatino';
          scene.addChild(EventText);

          //初回確定イベント時の判定
          if(EventID == 1){
            //初回確定イベント時の選択肢1のウィンドウを設定する
            var FirstEventWindow = new Sprite(200, 46);
            FirstEventWindow.image = game.assets['./image/button_blue.png'];
            FirstEventWindow.x = 72;
            FirstEventWindow.y = 120;
            scene.addChild(FirstEventWindow);

            FirstEventWindow.addEventListener(Event.TOUCH_START, function(e) {
              var sound = game.assets['./Sound/Decision.mp3'].clone();
          sound.play();
              likeProcess(c_id, Select1Value);
              game.popScene();
            });

            //初回確定イベント時の選択肢1のテキストを設定する
            var FirstSelectLabel = new Label(Select1);
            FirstSelectLabel.x = 90;
            FirstSelectLabel.y = 140;
            FirstSelectLabel.color = 'White';
            scene.addChild(FirstSelectLabel);

            

            //初回確定イベント時の選択肢2のウィンドウを設定する
            var FirstEventWindow2 = new Sprite(200, 46);
            FirstEventWindow2.image = game.assets['./image/button_blue.png'];
            FirstEventWindow2.x = 72;
            FirstEventWindow2.y = 160;
            scene.addChild(FirstEventWindow2);

            //選択肢のウィンドウに好感度増減関数を呼び出すタッチリスナを登録する
            FirstEventWindow2.addEventListener(Event.TOUCH_START, function(e) {
              var sound = game.assets['./Sound/Decision.mp3'].clone();
          sound.play();
              likeProcess(c_id, Select2Value);
              game.popScene();
            });

            //初回確定イベント時の選択肢2のテキストを設定する
            var FirstSelectLabel2 = new Label(Select2);
            FirstSelectLabel2.x = 90;
            FirstSelectLabel2.y = 180;
            FirstSelectLabel2.color = 'White';
            scene.addChild(FirstSelectLabel2);
          }else{

          //選択肢1のウィンドウを設定する
          var SelectWindow1 = new Sprite(200, 46);
          SelectWindow1.image = game.assets['./image/button_blue.png'];
          SelectWindow1.x = 72;
          SelectWindow1.y = 100;
          scene.addChild(SelectWindow1);

          //選択肢１のテキストを設定する
          var SelectLabel1 = new Label(Select1);
          SelectLabel1.x = 90;
          SelectLabel1.y = 120;
          SelectLabel1.color = 'White';          
          scene.addChild(SelectLabel1);

          //選択肢1を選んだ時対象の好感度を増減する関数を呼び出すイベントを登録する
          SelectWindow1.addEventListener(Event.TOUCH_START, function(e) {
            var sound = game.assets['./Sound/Decision.mp3'].clone();
          sound.play();
            likeProcess(c_id, Select1Value);
            game.popScene();
          });

          //選択肢2のウィンドウを設定する
          var SelectWindow2 = new Sprite(200, 46);
          SelectWindow2.image = game.assets['./image/button_blue.png'];
          SelectWindow2.x = 72;
          SelectWindow2.y = 140;
          scene.addChild(SelectWindow2);

          //選択肢２のテキストを設定する
          var SelectLabel2 = new Label(Select2);
          SelectLabel2.x = 90;
          SelectLabel2.y = 160;
          SelectLabel2.color = 'White';
          scene.addChild(SelectLabel2);

          //選択肢2を選んだ時対象の好感度を増減する関数を呼び出すイベントを登録する
          SelectWindow2.addEventListener(Event.TOUCH_START, function(e) {
            var sound = game.assets['./Sound/Decision.mp3'].clone();
          sound.play();
            likeProcess(c_id, Select2Value);
            game.popScene();
          });

          //選択3のウィンドウを設定する
          var SelectWindow3 = new Sprite(200, 46);
          SelectWindow3.image = game.assets['./image/button_blue.png'];
          SelectWindow3.x = 72;
          SelectWindow3.y = 180;
          scene.addChild(SelectWindow3);

          //選択肢3のテキストを設定する
          var SelectLabel3 = new Label(Select3);
          SelectLabel3.x = 90;
          SelectLabel3.y = 200;
          SelectLabel3.color = 'White';
          scene.addChild(SelectLabel3);

          //選択肢3を選んだ時対象の好感度を増減する関数を呼び出すイベントを登録する
          SelectWindow3.addEventListener(Event.TOUCH_START, function(e) {
            var sound = game.assets['./Sound/Decision.mp3'].clone();
          sound.play();
            likeProcess(c_id, Select3Value);
            game.popScene();
          });
          }

                   
          return scene;
        };

    game.start(); // ゲームをスタートさせます


        /*
        **
        ** 関数置き場
        **
        */

        //ルーレットを回し、値を取得する関数
        function RouletteC() {
        var Atai = Math.floor(Math.random() * 6) + 1;
        swal('ルーレットを回して' + Atai + 'が出た！');
        return Atai;
        };

        //イベントの種類を判定しそれぞれのイベント関数を呼び出す関数
      function MasuEvent(CurrentTile) {
          if(CurrentTile == 0){
            Good();
          }else if(CurrentTile == 1){
            Work();
          }else if(CurrentTile == 2){
            Love();
          }else if(CurrentTile == 3){
            Bad();
          }else if(CurrentTile == 4){
            Other();
          }

        };
        //追加///////////////////////////////////////////////////////
        //Goodマスに止まった時の関数
        function Good() {
          var id = Math.floor(Math.random() * 9) + 1;
          eventGet('G', id);
        };

        var wFlag = 0;
        var wCount = 0;
        //Workマスに止まった時の関数
        function Work() {
        var eValue;
          if(wFlag == 0){
            eValue = eventGet('W', 1);
            wFlag = 1;
          }else if(wCount % 3 == 0){
            eValue = eventGet('W', 2);
          }else if(wCount % 5 == 0){
            eValue = eventGet('W', 3);
          }else{
            eValue = eventGet('W', 4);
          }
          wCount++;
        };
        

        var LFlag = 0;
        //Loveマスに止まった時の関数
        function Love() {
          var eValue;
          var id = Math.floor(Math.random() * 10) + 2;
          if(LFlag == 0){
            eValue = LeventGet(1);
            LFlag++;
          }else{
            eValue = LeventGet(id);
          }

        };

        //Badマスに止まった時の関数
        function Bad() {
          var id = Math.floor(Math.random() * 2) + 1;
          var eValue = eventGet('B', id);
        };

        //Otherマスに止まった時の関数
        function Other() {
          var id = Math.floor(Math.random() * 2) + 1;
          var eValue = eventGet('O', id);
        };

        //ゲーム終了時刻を取得
        function getEndTime(){
          var roomId = Number(localStorage.getItem('room_id'));
          var getTime = ncmb.DataStore("room");
          getTime.equalTo("room_id", roomId)
          .fetch()
          .then(function(results){
            var object = results;

            var endTime = object.get("end_time");

            localStorage.setItem('endTime', endTime);
          })
         }

         //プレイヤーのスコアをニフクラに保存
        function setScore(myMoney, totalStep){
          var allMoney;
          var count;
          var maxMoney;
          var minMoney;
          var userValue;
          var userId = Number(localStorage.getItem("user_id"));
          var UserScore = ncmb.DataStore("users");
          var userScore = new UserScore();

          UserScore.equalTo("user_id", userId)
         .fetch()
         .then(function(results){
            console.log("Successfully retrieved " + results.length + " scores.");
            var object = results; 

            userValue = [object.get("all_money"), object.get("max_money")
            , object.get("min_money"), object.get("count")];

            allMoney = myMoney + userValue[0];
            count = totalStep + userValue[3];

            if(myMoney >= userValue[1]){
              maxMoney = myMoney;
            }
            if(myMoney <= userValue[2] || userValue[2] == null){
              minMoney = myMoney;
            }

            results.set("all_money", allMoney);
            results.set("max_money", maxMoney);
            results.set("min_money", minMoney);
            results.set("count", count);
            return results.update();
            })
         .catch(function(err){
            console.log(err);
          });
        }

        //全プレイヤーのスコアをニフクラから取得
        async function EndView(){
          var Room_player = ncmb.DataStore("room_player");
          var room_id = Number(localStorage.getItem("room_id"));
          console.log(room_id);
          var user_id = Number(localStorage.getItem("user_id"));
          console.log(user_id);
          var arr = [];
          await Room_player.equalTo("room_id",room_id)
          .order("room_id",true)
          .fetchAll()
          .then(function(results){
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var player = object.get("user_id");
              var arr2 = [player,null,null,null];
              arr.push(arr2);
            }
          });

          var user = ncmb.DataStore("users");

          var users = [];

          for(var i = 0; i < arr.length;i++){
            users.push(arr[i][0]);
          }
          await user.in("user_id",users)
          .order("game_money",true)
          .fetchAll()
          .then(function(results){
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              arr[i][0] = object.get("user_id");
              arr[i][1] = object.get("game_money");
              arr[i][2] = object.get("game_count");
              arr[i][3] = object.get("user_name");
            }
          });
          console.log(arr);
          return arr;
        }

        //ゲーム中のスコアをニフクラに保存
        // var EndResist = function(){
        //   console.log('動いてる');
        //   var user = ncmb.DataStore("users");
        //   var user_id = Number(localStorage.getItem("user_id"));
        //   var money = Number(localStorage.getItem("Money"));
        //   var totalstep = Number(localStorage.getItem("totalStep"));

        //   user.equalTo("user_id",user_id)
        //   .fetch()
        //   .then(function(results){
        //     var object = results;
        //     object.set("game_money",money);
        //     object.set("game_count",totalstep);
        //     return object.update();
        //   });
        // }
        // setInterval(EndResist, 60000);

        setInterval((function EndResist() {
          // ここに処理を記述
          var user = ncmb.DataStore("users");
          var user_id = Number(localStorage.getItem("user_id"));
          var money = Number(localStorage.getItem("Money"));
          var totalstep = Number(localStorage.getItem("totalStep"));

          user.equalTo("user_id",user_id)
          .fetch()
          .then(function(results){
            var object = results;
            object.set("game_money",money);
            object.set("game_count",totalstep);
            return object.update();
          });
        }()), 60000);

        //イベントをニフクラから取ってくる
        function eventGet(eType, id){
          var eId = eType + id;
          var eventValues;
          var gEvent = ncmb.DataStore("event");
          gEvent.equalTo("event_id", eId)
          .fetch()
          .then(function(results){
              console.log("Successfully retrieved " + results.length + " scores.");
              var object = results;
              eventValues = [object.get("event_name"), object.get("event_type")
              , object.get("money"), object.get("text")];

              localStorage.setItem('eName', eventValues[0]);
              localStorage.setItem('eType', eventValues[1]);
              localStorage.setItem('eMoney', eventValues[2]);
              localStorage.setItem('eText', eventValues[3]);

              //選択したイベントごとに処理を変える
              if(eventValues[0] == '就職' || eventValues[0] == '転職'){
                recruitment();
              }else if(eventValues[0] == 'ランクアップ'){
                game.pushScene(workEventScene());
              }else if(eventValues[0] == '給料日'){
                moneyProcess(0, Number(localStorage.getItem('mySalary')));
                game.pushScene(salaryEventScene());
              }else if(eventValues[1] == 'グッド'){
                moneyProcess(0, eventValues[2]);
                game.pushScene(createEventScene());
              }else{
                moneyProcess(1, eventValues[2]);
                game.pushScene(createEventScene());
              }
            })
          .catch(function(err){
              console.log(err);
            });
        }

        
        //恋愛マスに止まった時、イベントを判別する関数
        function LeventGet(id) {  
          var eventValues;
          var lEvent = ncmb.DataStore("loveevent");
          lEvent.equalTo("event_id", id)
        .fetchAll()
        .then(function(results){
          var object = results[0];                                    
              eventValues = [object.get("event_title"), object.get("event_text")
              , object.get("chara_id"), object.get("Select_1"), object.get("Select_1Value")
              , object.get("Select_2"), object.get("Select_2Value")
              , object.get("Select_3"), object.get("Select3_Value")
              , object.get("event_id") ];
              localStorage.setItem('e_title', eventValues[0]);
              localStorage.setItem('e_text', eventValues[1]);
              localStorage.setItem('c_id', eventValues[2]);
              localStorage.setItem('s_1', eventValues[3]);    ///選択肢1のテキストを登録する
              localStorage.setItem('s_1V', eventValues[4]);  ///選択肢1で増減する好感度の値を登録する
              localStorage.setItem('s_2', eventValues[5]);    ///選択肢2のテキストを登録する
              localStorage.setItem('s_2V', eventValues[6]);   ///選択肢2で増減する好感度の値を登録する
              localStorage.setItem('s_3', eventValues[7]);    ///選択肢3のテキストを登録する
              localStorage.setItem('s_3V', eventValues[8]);   ///選択肢3で増減する好感度の値を登録する
              localStorage.setItem('e_id', eventValues[9]);   ///イベントを判別するIDを登録する
              game.pushScene(createLoveEventScene());
        })
        .catch(function(err){
              console.log(err);
            });
            return eventValues;
        }

        //ランクアップ処理
        function rankUp(){
          var myJob = localStorage.getItem('secondJob');
          var mySalary = localStorage.getItem('secondSalary');

          localStorage.setItem('myJob', myJob);
          localStorage.setItem('mySalary', mySalary);
        }

        //お金を増減
        function moneyProcess(mFlag, moneyValue){
          var money = Number(localStorage.getItem('Money'));
          if (mFlag == 0) {
            money += moneyValue;
          }else if (mFlag == 1) {
            money -= moneyValue;
          }
          localStorage.setItem('Money', money);
        }

        //好感度増減
        function likeProcess(charaId, likeValue){
          var lValue = Number(localStorage.getItem(charaId));
            lValue =  lValue + likeValue;
        //好感度の増減の結果が0を下回っていたら0に再設定する(好感度下限は0)
         if(lValue < 0){
          lValue = 0;
         }else{
            localStorage.setItem(charaId, lValue);
         }

        }

        //仕事をランダムで決める
        function recruitment(flag){
          var id = Math.floor(Math.random() * 9) + 1;
          var jobValues;
          var gEvent = ncmb.DataStore("job");
          gEvent.equalTo("job_id", id)
          .fetchAll()
          .then(function(results){
              console.log("Successfully retrieved " + results.length + " scores.");
              var object = results[0];
              jobValues = [object.get("1st_job"), object.get("1st_salary")
              , object.get("2nd_job"), object.get("2nd_salary")];

              //職業情報をローカルストレージに保存する
              localStorage.setItem('firstJob', jobValues[0]);
              localStorage.setItem('firstSalary', jobValues[1]);
              localStorage.setItem('secondJob', jobValues[2]);
              localStorage.setItem('secondSalary', jobValues[3]);

              //職業をステータスに保存する
              localStorage.setItem('myJob', jobValues[0]);
              localStorage.setItem('mySalary', jobValues[1]);

              game.pushScene(workEventScene());
            })
          .catch(function(err){
              console.log(err);
            });
            return eventValues;
        }
};
