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
  users.set("delete_flag",1);
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
function change(text){

  var Datastore = ncmb.DataStore("users");
  var user_id = Number(localStorage.getItem("user_id"));
  Datastore.equalTo("user_id",user_id).fetchAll().then(function(results){
             
             results[0].set("user_name",text);
             return results[0].update();
          })
    .then(function(){
    // 保存後の処理
    alert("変更成功");
    })
    .catch(function(err){
        // エラー処理
        alert("変更失敗");
    });
}

async function userDelete(){
  var Datastore = ncmb.DataStore("users");
  var user_id = Number(localStorage.getItem("user_id"));
  await Datastore.equalTo("user_id",user_id).fetch().then(function(datastore){
             datastore.set("delete_flag",2);
             return datastore.update();
          })
    .then(function(){
    // 保存後の処理
    alert("削除成功");
    location.href="title.html";
    })
    .catch(function(err){
        // エラー処理
    alert("削除失敗");
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

  Users.equalTo("mobile",mobile).equalTo("delete_flag",1).fetchAll().then(function(results){
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

async function playdate(){
  var Users = ncmb.DataStore("users");
  
  var user_id = Number(localStorage.getItem('user_id'));
  var arr = [];

  await Users.equalTo("user_id",user_id).fetch().then(function(results){
    var object = results;
    arr.push(object.get("user_name"));
    arr.push(object.get("all_money"));
    arr.push(object.get("max_money"));
    var min = object.get("min_money");
    if(min == null){
      min = "記録なし";
    }
    arr.push(min);
    arr.push(object.get("count"));
  });
  return arr;
}

sanitaize = {
  encode : function (str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  },

  decode : function (str) {
    return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&amp;/g, '&');
  }
};
