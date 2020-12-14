// APIキーの設定とSDK初期化
var ncmb = new NCMB("5bb4191edbddd8eb4c6370dc1af546ad5963492bca7f72e08d56debf9ab743c0","e50c1b0ac940fc95648268ed858b958799da56ae70e561af6e9a94423c14e743");
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