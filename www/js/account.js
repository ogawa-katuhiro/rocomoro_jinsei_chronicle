// API key.
var applicationKey    = "3175ddc3c2fa11d0f748f336750ae51023d4a1a1ea1f09d77d3910cbd768d03b";
var clientKey = "50a1429776c8c386c04301ff11b50b555ca71fe1970db72f4e01f1f7257bc9d5";
// SDK initialization.
var ncmb = new NCMB(applicationKey, clientKey);

function resist(max_id){

  var Users = ncmb.DataStore("users");
  var users = new Users();
  var user_id = max_id+1;
  var date = new Date();
  var mobile = ""+date.getFullYear()+date.getMonth()+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds()+user_id;
  localStorage.setItem("mobile",mobile);
  
  var user = sessionStorage.getItem('data1');

  users.set("user_name",user);//"");alert("a"
  users.set("user_id",user_id);
  users.set("all_money",0);
  users.set("count",0);
  users.set("game_money",0);
  users.set("game_count",0);
  users.set("mobile",mobile);
  users.set("max_money",0);
  users.set("min_money",null);
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

function userDelete(){
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

  user.order("user_id",true).fetchAll().then(function(results){
    var object = results[0];
     var max_id = object.get("user_id");
     resist(max_id);
     });
}

function takeover(code){

  var Users = ncmb.DataStore("users");
  
  var user = Number(localStorage.getItem('user_id'));

  Users.equalTo("user_id",user).fetchAll().then(function(results){
    var object = results[0];
    if(object.get("takeover_code") !== null){
      object.set("takeover_code",code);
      return object.update();
    }else{
      object.set("takeover_code",code);
      object.save();
    }})
    .then(function(gameScore){
    // 保存後の処理
    alert("保存成功");
    })
    .catch(function(err){
        // エラー処理
        alert("保存失敗");
    });
}
function takeoverEntry(){

  var Users = ncmb.DataStore("users");

  var code = document.getElementById("code").value;

  Users.equalTo("takeover_code",code).fetch().then(function(results){
    var object = results;

    if(object != null){

      var date = new Date();
      var mobile = ""+date.getFullYear()+date.getMonth()+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds()+object.get("user_id");

      localStorage.setItem("mobile",mobile);

      object.set("mobile",mobile);
      return object.update();
    }
    })
    .then(function(){
    // 保存後の処理
    location.href="codecomplete.html";
    })
    .catch(function(err){
        // エラー処理
        alert("保存失敗");
    });
}

function login(){
  
  var Users = ncmb.DataStore("users");
  
  var mobile = localStorage.getItem('mobile');

  Users.equalTo("mobile",mobile).fetchAll().then(function(results){
    var object = results[0];
    if(object != null){
      var user_id = object.get("user_id");
      console.log(user_id);
      localStorage.setItem('user_id',user_id);
      alert("ログイン成功");
      location.href="Menu.html";
    }else{
      alert("ログイン失敗");
    }});
}

sanitaize = {
  encode : function (str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  },

  decode : function (str) {
    return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&amp;/g, '&');
  }
};