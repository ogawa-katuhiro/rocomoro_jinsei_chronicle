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


function Create(max_id){

  var Room = ncmb.DataStore("room");
  var room = new Room();

  var room_id = max_id+1;
  var roomName = document.getElementById("room_name").value;
  
  room.set("room_id",room_id);
  room.set("room_name",roomName);
  room.set("comment","test");
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
  var room_id = Number(sessionStorage.getItem("room_id"));
  var room = Room.equalTo("room_id",room_id)
  room.fetchAll().then(function(results){
    var object = results[0];
    object.set("dlete_flag",1);
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

function roomInTo(adminflg){

  var RoomPlayer = ncmb.DataStore("room_player");
  var roomplayer = new RoomPlayer();

  var user_id = Number(sessionStorage.getItem("user_id"));
  var room_id = Number(sessionStorage.getItem("room_id"));

   roomplayer.set("admin_flg",adminflg)
   .set("user_id",user_id)
   .set("room_id",room_id);
   roomplayer.save()
  .then(function(){
    // 保存後の処理
    location.href='room.html';
    alert("seikou")
    })
    .catch(function(){
     // エラー処理
    });

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

function MaxId(){
  var Room = ncmb.DataStore("room");
  var roomSelect = Room.exists("room_id");

  roomSelect.order("room_id",true)
  .fetchAll()
  .then(function(results){
    var object = results[0];
     var max_id = object.get("room_id");
     Create(max_id);
     });
}

 function AdminFlg(){

  var Room = ncmb.DataStore("room_player");
  var adminflg = 2;
  var room_id = Number(sessionStorage.getItem("room_id"));
  var roomSelect = Room.equalTo("room_id",room_id)
  roomSelect.fetchAll().then(function(results){
    if(results.length !== 0){
      roomInTo(adminflg);
    }else{
      adminflg = 1;
      roomInTo(adminflg);
    }});
}

function roomSearch(){
  var Room = ncmb.DataStore("room");
  var room_name = sessionStorage.getItem("search_name");
  alert(room_name);
  var roomSearch = Room.regularExpressionTo("room_name",".*"+room_name+".*");
  roomSearch.fetchAll().then(function(results){
    for (var i = 0; i < results.length; i++) {
              var object = results[i];
              (object.get("room_id"));
    }});
}

async function AdminCheck(){
  var Room = ncmb.DataStore("room_player");
  var room_id = Number(sessionStorage.getItem("room_id"));
  var user_id = Number(sessionStorage.getItem("user_id"));
  var admin_flg = null;
  await Room.equalTo("room_id",room_id).equalTo("user_id",user_id).fetchAll().then(function(results){
              var object = results[0];
              admin_flg = object.get("admin_flg");
              
    });
  return admin_flg;
}

async function userSearch(){
  var Room = ncmb.DataStore("room_player");
  var room_id = Number(sessionStorage.getItem("room_id"));
  var arr = [];
  await Room.equalTo("room_id",room_id).fetchAll().then(function(results){
    for (var i = 0; i < results.length; i++) {
              var object = results[i];
              arr.push(object.get("user_id"));
    }});
  return arr;
}