// API key.
var applicationKey    = "3175ddc3c2fa11d0f748f336750ae51023d4a1a1ea1f09d77d3910cbd768d03b";
var clientKey = "50a1429776c8c386c04301ff11b50b555ca71fe1970db72f4e01f1f7257bc9d5";
// SDK initialization.
var ncmb = new NCMB(applicationKey, clientKey);

function startDemo() {
  var TestClass = ncmb.DataStore("TestClass");
  var testClass = new TestClass();
  var key   = "message";
  var value = "Hello, NCMB!";
  testClass.set(key, value);
  testClass.save()
  .then(function() {
    // Save success.
    alert("New object created with objectId: " + testClass.objectId);
    })
    .catch(function(error) {
    // Save failed.
    alert("Failed to create new object, with error code: " + error);
    });
}


function Create(room_name,count,password,comment,max_id){

  var Room = ncmb.DataStore("room");
  var room = new Room();

  var room_id = max_id;

  room.set("room_id",room_id);
  room.set("room_name",room_name);
  room.set("comment",comment);
  room.set("password",password);
  room.set("play_limit",count);
  room.set("delete_flag",2);
  room.save().then(function(room){
    // 保存後の処理
    alert(room);
    })
    .catch(function(err){
     // エラー処理
     alert(err);
    });
   
}

function Delete(){
  var Room = ncmb.DataStore("room");

  var room_id = Number(localStorage.getItem("room_id"));

  Room.equalTo("room_id",room_id).fetchAll().then(function(results){
    var object = results[0];
    alert(object.get("room_id"));
    object.set("delete_flag",1);
    return object.update();
  })
  .catch(function(err){
      // エラー処理
      alert(err);
  });
}

function RoomInTo(user_id,room_id,adminflg){

  var RoomPlayer = ncmb.DataStore("room_player");
  var roomplayer = new RoomPlayer();

   roomplayer.set("admin_flg",adminflg);
   roomplayer.set("user_id",user_id);
   roomplayer.set("room_id",room_id);
   roomplayer.save()
  .then(function(){
    // 保存後の処理
    alert("ルーム作成成功");
    })
    .catch(function(err){
     // エラー処理
     alert(err);
    });
   
}

async function RoomOut(){

  var RoomPlayer = ncmb.DataStore("room_player");
  var roomplayer = new RoomPlayer();

  var user_id = Number(localStorage.getItem("user_id"));
  var room_id = Number(localStorage.getItem("room_id"));
  var admin_flg = null;

  await RoomPlayer.equalTo("room_id",room_id).equalTo("user_id",user_id).fetchAll().then(function(results){
    var object = results[0];
    admin_flg = object.get("admin_flg");
    object.set("room_id",null).set("user_id",null).set("admin_flg",null);
    return object.update();
  
  })
  if(admin_flg == 1){
      Delete();
  }

  location.href='testRoomCreate].html';

}

function RoomChange(){

  var Room = ncmb.DataStore("room");

  var room_name = document.getElementById("room_name").value;
  var room_id = Number(localStorage.getItem("room_id"));


  Room.equalTo("room_id",room_id).fetchAll().then(function(results){
    var object = results[0];
    object.set("room_name",room_name);
    return object.update();
    })
    .then(function(){
      // 保存後の処理
      alert("room変更成功");
      })
      .catch(function(err){
      // エラー処理
      alert(err);
    });
}

async function RoomMaxId(){
  var Room = ncmb.DataStore("room");
  var max_id = null;
  await Room.exists("room_id").order("room_id",true).fetchAll().then(function(results){
    var object = results[0];
     max_id = object.get("room_id")+1;
     
     })
     .catch(function(){
      // エラー処理
    });;
     return max_id;
}

async function AdminFlg(room_id){

  var Room = ncmb.DataStore("room_player");
  var adminflg = 1;

  await Room.equalTo("room_id",room_id).fetchAll().then(function(results){
    if(results.length != 0){
      adminflg = 2;
    }});

    return adminflg;
}

async function RoomSearch(){

  var Room = ncmb.DataStore("room");
  var arr = [];
  var room_name = sessionStorage.getItem("room_name");

  await Room.regularExpressionTo("room_name",".*"+room_name+".*").equalTo("delete_flag",2).order("room_id",true).fetchAll()
  .then(function(results){
    for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var id = object.get("room_id");
              var name = object.get("room_name");
              var comment = object.get("comment");
              var pw = object.get("password");
              var count = object.get("play_limit");
              var arr2 = [name,comment,pw,count,id,null];
              arr.push(arr2);
    }})
      .catch(function(){
      // エラー処理
      alert("2失敗");
    });

  var Room_player = ncmb.DataStore("room_player");
  var u_count = 1;
  var w = null;
  var arr3 = [];
  await Room_player.exists("room_id").order("room_id",true).fetchAll().then(function(results){
    for (var i = 0; i < results.length; i++) {
              var object = results[i];
              if(w == object.get("room_id")){
                u_count++;
              }else if(i != 0){
                arr3.push(u_count);
                u_count = 1;
              }
              w = object.get("room_id");
    }})
      .catch(function(){
      // エラー処理
      alert("2失敗");
    });
  for(var i = 0; i < arr.length; i++){
    arr[i][5] = arr3[i];
  }
  
  return arr;
}

async function AdminCheck(){
  var Room = ncmb.DataStore("room_player");
  var room_id = Number(localStorage.getItem("room_id"));
  var user_id = Number(localStorage.getItem("user_id"));
  var admin_flg = null;
  await Room.equalTo("room_id",room_id).equalTo("user_id",user_id).fetchAll().then(function(results){
              var object = results[0];
              admin_flg = object.get("admin_flg");
              
    });
  return admin_flg;
}

async function UserSearch(){
  var Room = ncmb.DataStore("room_player");
  var room_id = Number(localStorage.getItem("room_id"));
  var arr = [];
  await Room.equalTo("room_id",room_id).fetchAll().then(function(results){
    for (var i = 0; i < results.length; i++) {
              var object = results[i];
              arr.push(object.get("user_id"));
    }});
  return arr;
}

