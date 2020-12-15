// APIキーの設定とSDK初期化
var ncmb = new NCMB("3175ddc3c2fa11d0f748f336750ae51023d4a1a1ea1f09d77d3910cbd768d03b","50a1429776c8c386c04301ff11b50b555ca71fe1970db72f4e01f1f7257bc9d5");
//自分のランク
async function userStatus(){
var users = ncmb.DataStore("users");
var user_id = Number(localStorage.getItem("user_id"));
var obj = document.getElementById("select");
var idx = obj.selectedIndex;
var scr = obj.options[idx].value;
var status = [];
var A = scr + "_money";

await users.equalTo("user_id",user_id).fetchAll().then(
  function(results){
    for(var i=0; i<results.length; i++){
    var object = results[i];
        status.push(object.get("user_name"));
        status.push(object.get(A));
        status.push(object.get("user_id"));
    }
  });
  return status;
}

async function allUserStatus(){
  var users = ncmb.DataStore("users");
  var user_id = Number(localStorage.getItem("user_id"));
  var obj = document.getElementById("select");
  var idx = obj.selectedIndex;
  var scr = obj.options[idx].value;
  var all_status = [];
  var A = scr +"_money";
  var count = 0;
  await users.order(A,true).fetchAll().then(
    function(results){
          for(var i=0; i<results.length; i++){
    var object = results[i];
        all_status.push(object.get("user_name"));
        all_status.push(object.get(A));
        all_status.push(object.get("user_id"));
        if(user_id==object.get("user_id")){
          all_status.unshift(count = i + 1);
        }
    }
  });
  return all_status;
}