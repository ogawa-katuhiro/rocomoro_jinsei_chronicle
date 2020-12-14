// This is a JavaScript file
enchant();
window.onload = function() {
    var game = new Game(320, 320); // 表示領域の大きさを設定
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
                 './image/map0.gif');
    var label;
    var RouletteValue = 1000; //初期値1000
    var RouletteV;
    var CurrentTile = 0;

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
            var BackGround = new Sprite(320,320);
            BackGround.image = game.assets['./image/BackGround.jpg'];
            scene.addChild(BackGround);

            //プレイヤーの初期ステータスをlocalStorageに設定
            var Money = 500;  //プレイヤーの所持金
            var FavorabilityR1 = 20;   //ヒロイン1の好感度  ※Favorability Rating == 好感度
            var FavorabilityR2 = 30;   //ヒロイン2の好感度
            var FavorabilityR3 = 40;   //ヒロイン3の好感度
            var FavorabilityR4 = 1;   //ヒロイン4の好感度
            localStorage.setItem('Money', Money); // ローカルストレージに初期所持金を設定
            localStorage.setItem('FR1', FavorabilityR1);  //ローカルストレージにヒロイン1の初期好感度を設定
            localStorage.setItem('FR2', FavorabilityR2);  //ローカルストレージにヒロイン2の初期好感度を設定
            localStorage.setItem('FR3', FavorabilityR3);  //ローカルストレージにヒロイン3の初期好感度を設定
            localStorage.setItem('FR4', FavorabilityR4);  //ローカルストレージにヒロイン4の初期好感度を設定

            localStorage.setItem('G1', 'アイウエオ');
            localStorage.setItem('G2', 'かきくけこ');
            localStorage.setItem('G3', 'さしすせそ');
            localStorage.setItem('G4', 'た');





            scene.addEventListener(Event.ENTER_FRAME, function() {
              FavorabilityR1 = localStorage.getItem('FR1');
            });







            //ルーレットシーンに遷移するボタンを設定
            var RouletteBtn = new Label('ルーレットを回す');
            RouletteBtn.x = 220;
            RouletteBtn.y = 300;
            RouletteBtn.font = '12px Palatino';
            scene.addChild(RouletteBtn);


            RouletteBtn.addEventListener(Event.TOUCH_START, function(e) {
              startTime = new Date().getTime();
              game.pushScene(createRouletteScene());
            });

            //メニューシーンに遷移するボタンを設定
            var Menu = new Label('メニュー');
            Menu.font = '12px Palatino';
            Menu.x = 10;
            Menu.y = 10;
            scene.addChild(Menu);

            Menu.addEventListener(Event.TOUCH_START, function(e) {
              game.pushScene(createMenuScene());
            });

            RouletteV = new Label('');
            RouletteV.x = 220;
            RouletteV.y = 20;
            scene.addChild(RouletteV);

            var backgroundMap = new Map(16, 16);
backgroundMap.image = game.assets['./image/map0.gif'];
backgroundMap.loadData([
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,0,3,1,2,4,5,0,0,2,2,1,-1,-1,-1,-1,-1],
    [-1,-1,-1,2,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,1,-1,-1,-1,-1],
    [-1,-1,2,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,-1,-1,-1],
    [-1,-1,0,-1,-1,-1,-1,0,3,1,4,0,0,-1,-1,-1,0,-1,-1,-1],
    [-1,-1,3,-1,-1,-1,4,2,-1,0,-1,-1,2,1,-1,-1,3,-1,-1,-1],
    [-1,-1,4,-1,-1,0,1,-1,-1,0,-1,-1,-1,1,0,4,2,-1,-1,-1],
    [-1,-1,1,-1,-1,0,-1,-1,-1,3,-1,-1,-1,3,-1,-1,1,-1,-1,-1],
    [-1,-1,0,2,4,3,-1,-1,-1,0,-1,-1,-1,0,-1,-1,0,-1,-1,-1],
    [-1,-1,1,-1,-1,0,-1,-1,-1,0,-1,-1,-1,0,-1,-1,0,-1,-1,-1],
    [-1,-1,0,-1,-1,3,2,-1,-1,2,-1,-1,1,2,-1,-1,3,-1,-1,-1],
    [-1,-1,0,-1,-1,-1,1,1,0,1,4,3,0,-1,-1,-1,2,-1,-1,-1],
    [-1,-1,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,-1,-1,-1],
    [-1,-1,2,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,-1,-1,-1],
    [-1,-1,-1,3,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,-1,-1,-1,-1],
    [-1,-1,-1,-1,4,2,0,0,1,0,3,0,4,2,0,-1,-1,-1,-1,-1],
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
                     rValue--;
                     RouletteValue --;
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
                   rValue--;
                   RouletteValue--;
                 }
                }
               if(game.input.down && rValue != 0){
                   if (backgroundMap.hitTest(this.x+16 ,this.y + 32 )) {




                   }else if (workY == this.y + 16) {



                   }else {
                       workX = this.x;
                       workY = this.y;
                       this.y += 16;
                    rValue--;
                    RouletteValue--;



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
                       rValue--;
                       RouletteValue --;
                   }
             }
             //console.log(workX + ' ' + workY + ' ' + this.x + ' ' + this.y + '残り' + rValue);
             if(rValue == 0 && flg == 0){
               CurrentTile = backgroundMap.checkTile(Player.x + 10, Player.y + 16);
               console.log(CurrentTile);
               MasuEvent(CurrentTile);
               flg ++;
             }else if(rValue != RouletteValue && flg != 0){
               flg = 0;
             }
             rValue = RouletteValue;
             console.log(rValue);
            });

            //ゲームパッドを設定(ゲームシーンを作るメソッド内に)
            var pad = new Pad();
            pad.x = 0;
            pad.y = 220;
            scene.addChild(pad);

            // この関数内で作ったシーンを呼び出し元に返します(return)
            return scene;
        };

        /*
        **ルーレットシーンを作り、返す関数
        **
        */

      var createRouletteScene = function() {
          var scene = new Scene();
          var RouletteBG = new Sprite(140, 180);  //ルーレットシーンの背景画像を設定
          var RouletteModel = new Sprite(100,100);  //ルーレットのgifを設定
          RouletteModel.image = game.assets['./image/RouletteModel.gif']; //ルーレットシーンの背景画像を設定
          RouletteBG.image = game.assets['./image/RouletteBG.png'];  //ルーレットのgifを設定
          RouletteBG.x = 80;  //縦軸
          RouletteBG.y = 80;  //横軸
          scene.addChild(RouletteBG); //シーンにルーレットの背景画像を登場させる

          //ルーレットを回すボタンを設定する
          var Route = new Label('ルーレットを回す');
          Route.x = 100;
          Route.y = 120;
          Route.font = '12px Palatino';
          scene.addChild(Route);

          //ルーレットを回すボタンにタッチイベントを設定する
          Route.addEventListener(Event.TOUCH_START, function(e) {
            RouletteModel.x = 80;
            RouletteModel.y = 40;
            scene.addChild(RouletteModel);
          });

          // ルーレットのgifにタッチイベントを設定する
          RouletteModel.addEventListener(Event.TOUCH_START, function(e) {
            RouletteValue = RouletteC();
            game.popScene();
          });


          //戻るボタンを設定する
          var Cancel = new Label('戻る');
          Cancel.x = 100;
          Cancel.y = 180;
          Cancel.font = '12px Palatino';
          scene.addChild(Cancel);

          Cancel.addEventListener(Event.TOUCH_START, function(e) {
            game.popScene();
          });

          return scene;
        };



        /*
        **メニューシーンを作り、返す関数
        **
        */
        var createMenuScene = function() {
          var scene = new Scene();

          //メニューのポップアップ背景に表示する画像を設定
          var MenuBG = new Sprite(120, 120);
          MenuBG.image = game.assets['./image/MenuBG.jpg'];
          MenuBG.x = 20;
          MenuBG.y = 20;
          scene.addChild(MenuBG);

          //現在所持しているアイテムを表示するシーンに遷移するボタンを設定
          var Item = new Label('アイテム');
          Item.font = '12px Palatino';
          Item.x = 50;
          Item.y = 40
          scene.addChild(Item);
          //アイテムシーンへ遷移するボタンにタッチイベントを登録
          Item.addEventListener(Event.TOUCH_START, function(e) {
            game.popScene();
            game.pushScene(createItemScene());
          });

          //プレイヤーの現在ステータスを確認するシーン
          var Status = new Label('ステータス');
          Status.font = '12px Palatino';
          Status.x = 50;
          Status.y = 60;
          scene.addChild(Status);
          //ステータスシーンへ遷移するボタンにタッチイベントを追加
          Status.addEventListener(Event.TOUCH_START, function(e) {
            game.popScene();
            game.pushScene(createStatusScene());
          });

          //メニューシーンからゲーム画面に戻るボタンを設定しイベントリスナを登録
          var Cancel = new Label('戻る');
          Cancel.font = '12px Palatino';
          Cancel.x = 50;
          Cancel.y = 80;
          scene.addChild(Cancel);
          Cancel.addEventListener(Event.TOUCH_START, function(e) {
            game.popScene();
          });

          //現在のシーンを返す
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
          Cancel.font = '12px Palatino';
          scene.addChild(Cancel);

          Cancel.addEventListener(Event.TOUCH_START, function(e) {
              game.popScene();
          });


          //現在のシーンを返す
          return scene;
        };

        /*
        *ステータスシーンを作り、返す関数
        */
        var createStatusScene = function() {
          var scene = new Scene();

          //背景画像を設定
          var StatusBG = new Sprite(240, 240);
          StatusBG.image = game.assets['./image/MenuBG.jpg'];
          StatusBG.x = 42;
          StatusBG.y = 42;
          scene.addChild(StatusBG);

          //プレイヤーの現在所持金額を表示する
          var CurrentMoney = new Label('現在の所持金： ¥' + localStorage.getItem('Money'));
          CurrentMoney.x = 60;
          CurrentMoney.y = 70;
          scene.addChild(CurrentMoney);

          //プレイヤーへのヒロイン1好感度
          var CurrentFR1 = new Label('ヒロイン1からの好感度： ' + localStorage.getItem('FR1') + '/100');
          CurrentFR1.x = 60;
          CurrentFR1.y = 110;
          scene.addChild(CurrentFR1);

          //プレイヤーへのヒロイン2好感度
          var CurrentFR2 = new Label('ヒロイン2からの好感度： ' + localStorage.getItem('FR2') + '/100');
          CurrentFR2.x = 60;
          CurrentFR2.y = 150;
          scene.addChild(CurrentFR2);


          //プレイヤーへのヒロイン3好感度
          var CurrentFR3 = new Label('ヒロイン3からの好感度： ' + localStorage.getItem('FR3') + '/100');
          CurrentFR3.x = 60;
          CurrentFR3.y = 190;
          scene.addChild(CurrentFR3);

          //プレイヤーへのヒロイン4好感度
          var CurrentFR4 = new Label('ヒロイン4からの好感度： ' + localStorage.getItem('FR4') + '/100');
          CurrentFR4.x = 60;
          CurrentFR4.y = 230;
          scene.addChild(CurrentFR4);

          //ゲーム画面に戻るボタンを設定する
          var Cancel = new Label('ゲーム画面に戻る');
          Cancel.font = '12px Palatino';
          Cancel.x = 115;
          Cancel.y = 265;
          scene.addChild(Cancel);

          //ゲーム画面に戻るボタンにタッチイベントを設定する
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

    game.start(); // ゲームをスタートさせます
};

        /*
        **
        ** 関数置き場
        **
        */

        //ルーレットを回し、値を取得する関数
        function RouletteC() {
         var Atai = Math.floor(Math.random() * 8);
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
          }else{
            console.log('Un');
          }
        };

        //Goodマスに止まった時の関数
        function Good() {
          console.log('Good');
          var G = Math.floor(Math.random() * 3) + 1;
          console.log(G);
          var X = localStorage.getItem('G' + G);
          console.log(X);
        };


        //Workマスに止まった時の関数
        function Work() {
          console.log('Work');
        };

        //Loveマスに止まった時の関数
        function Love() {
          console.log('Love');
        };

        //Badマスに止まった時の関数
        function Bad() {
          console.log('Bad');
        };

        //Otherマスに止まった時の関数
        function Other() {
          console.log('Other');
        };
