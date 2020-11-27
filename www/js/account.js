// API key.
var applicationKey    = "3175ddc3c2fa11d0f748f336750ae51023d4a1a1ea1f09d77d3910cbd768d03b";
var clientKey = "50a1429776c8c386c04301ff11b50b555ca71fe1970db72f4e01f1f7257bc9d5";
// SDK initialization.
var ncmb = new NCMB(applicationKey, clientKey);

function resist(max_id){

  var Users = ncmb.DataStore("users");
  var users = new Users();
  var user_id = max_id+1;
  
  var user = sessionStorage.getItem('data1');

  users.set("user_name",user);
  users.set("user_id",user_id);
  users.save()
  .then(function(){
    // 保存後の処理
    location.href="accountcomplete.html";
    })
    .catch(function(){
        // エラー処理
    });
}
function change(){

  var Datastore = ncmb.DataStore("users");
  Datastore.equalTo("user_id",2).fetchAll().then(function(results){
             results[0].set("user_name",sessionStorage.getItem("change_name"));
             return results[0].update();
          })
    .then(function(gameScore){
    // 保存後の処理
    alert("変更成功");
    })
    .catch(function(err){
        // エラー処理
        alert("変更失敗");
    });
}

function Delete(){
  var Datastore = ncmb.DataStore("users");
  var datastore = Datastore.equalTo("user_id",1)
           .fetchAll()
           .then(function(datastore){
             datastore.set("user_name",document.getElementById(user_name).value);
             return datastore.update();
          })
    .then(function(gameScore){
    // 保存後の処理
    })
    .catch(function(err){
        // エラー処理
    });
}
function MaxId(){
  var Users = ncmb.DataStore("users");
  var user = Users.exists("user_id");

  user.order("user_id",true)
  .fetchAll()
  .then(function(results){
    var object = results[0];
     var max_id = object.get("user_id");
     resist(max_id);
     });
}