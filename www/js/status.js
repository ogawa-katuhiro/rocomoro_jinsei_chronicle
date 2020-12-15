// APIキーの設定とSDK初期化
var ncmb = new NCMB("3175ddc3c2fa11d0f748f336750ae51023d4a1a1ea1f09d77d3910cbd768d03b","50a1429776c8c386c04301ff11b50b555ca71fe1970db72f4e01f1f7257bc9d5");
//ステータス
async function plyerStatusA(){
var users = ncmb.DataStore("users");
const url = new URL(location.href);
var user_id = url.searchParams.get("user_id");
var statusA = [];
count = 0;
await users.order("all_money",true).fetchAll().then(
  function(results){
    for(var i=0; i<results.length; i++){
    var object = results[i];
     statusA.push(object.get("user_id"));
    if(user_id==object.get("user_id")){
        statusA.unshift(object.get("user_name"));
        statusA.unshift(object.get("all_money"));
        statusA.unshift(count = i + 1);
    }
    }
  });
  return statusA;
}
async function plyerStatusB(){
var users = ncmb.DataStore("users");
const url = new URL(location.href);
var user_id = url.searchParams.get("user_id");
var user_id = Number(localStorage.getItem("user_id"));
var statusB = [];
count = 0;
await users.order("max_money",true).fetchAll().then(
  function(results){
    for(var i=0; i<results.length; i++){
    var object = results[i];
     statusB.push(object.get("user_id"));
    if(user_id==object.get("user_id")){
        statusB.unshift(object.get("max_money"));
        statusB.unshift(count = i + 1);
    }
    }
  });
  return statusB;
}

async function plyerStatusC(){
const url = new URL(location.href);
var user_id = url.searchParams.get("user_id");
var user_id = Number(localStorage.getItem("user_id"));
var statusC = [];
count = 0;
await users.order("min_money",true).fetchAll().then(
  function(results){
    for(var i=0; i<results.length; i++){
    var object = results[i];
     statusC.push(object.get("user_id"));
    if(user_id==object.get("user_id")){
        statusC.unshift(object.get("min_money"));
        statusC.unshift(count = i + 1);
    }
    }
  });
  return statusC;
}