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
    alert("Failed to create new object, with error code: " + error.text);
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
  room.save()
  .then(function(){
    // 保存後の処理
    })
    .catch(function(){
     // エラー処理
    });
    

   
}

function Delete(){
  
  var Room = ncmb.DataStore("room");

  var room_id = Number(localStorage.getItem("room_id"));
  Room.equalTo("room_id",room_id);
  Room.fetch().then(function(results){
    var object = results;
    alert(object.get("delete_flag"));
    object.set("delete_flag",1);
    return object.update();
    })
    .then(function(){
      // 保存後の処理
      alert("room削除成功");
      })
      .catch(function(){
      // エラー処理
      alert("room削除失敗");
    });
}

function roomInTo(user_id,room_id,adminflg){

  var RoomPlayer = ncmb.DataStore("room_player");
  var roomplayer = new RoomPlayer();

  alert("qawsedrftgy");

   roomplayer.set("admin_flg",adminflg);
   roomplayer.set("user_id",Number(user_id));
   roomplayer.set("room_id",room_id);
   roomplayer.save()
  .then(function(){
    // 保存後の処理
    alert("ok");
    })
    .catch(function(){
     // エラー処理
     alert("ng");
    });
   
}

async function roomOut(){

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
  });
  return admin_flg;
}

function Change(){

  var Room = ncmb.DataStore("room");

  var room_name = document.getElementById("room_name").value;
  var room_id = Number(sessionStorage.getItem("room_id"));
  var room = Room.equalTo("room_id",room_id)
  room.fetchAll().then(function(results){
    var object = results[0];
    object.set("room_name",room_name);
    return object.update();
    })
    .then(function(){
      // 保存後の処理
      alert("room変更成功");
      })
      .catch(function(){
      // エラー処理
      alert("room変更失敗");
    });
}

async function MaxId(){
  var Room = ncmb.DataStore("room");
  var max_id = null;
  await Room.exists("room_id").order("room_id",true).fetchAll().then(function(results){
    var object = results[0];
     max_id = object.get("room_id")+1;
     
     });
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

async function roomSearch(){
  var Room = ncmb.DataStore("room");

  var arr = [];

  var room_name = sessionStorage.getItem("search_name");

  await Room.regularExpressionTo("room_name",".*"+room_name+".*").fetchAll().then(function(results){
    for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var name = object.get("room_name");
              var pw = object.get("password");
              var arr2 = [name,pw];
              arr.push(arr2);
    }}).then(function(){
      // 保存後の処理
      alert("成功");
      })
      .catch(function(){
      // エラー処理
      alert("失敗");
    });
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

async function userSearch(){
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