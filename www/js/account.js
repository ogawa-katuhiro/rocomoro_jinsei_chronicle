// API key.
var applicationKey = "3175ddc3c2fa11d0f748f336750ae51023d4a1a1ea1f09d77d3910cbd768d03b";
var clientKey = "50a1429776c8c386c04301ff11b50b555ca71fe1970db72f4e01f1f7257bc9d5";
// SDK initialization.
var ncmb = new NCMB(applicationKey, clientKey);

function SendUser(user_name){

  var Datestore = ncmb.Datestore("users");
  var datestore = new Datestore();
  var user = document.getElementById(user_name).value;

  datestore.set(user_name,user)
  datestore.save()
  .then(function(){
    // 保存後の処理
    })
    .catch(function(){
        // エラー処理
    });
}
function UpdateUser(user_name){

  var Datestore = new ncmb.Datestore(users);
  var datestore = Datestore.equalTo("user_id",1)
           .fetchAll()
           .save()
           .then(function(datestore){
             datestore.set("user_name",document.getElementById(user_name).value);
             return datestore.update();
          })
    .then(function(gameScore){
    // 保存後の処理
    })
    .catch(function(err){
        // エラー処理
    });
}

function Delete(){
  var Datestore = new ncmb.Datestore("users");
  var datestore = Datestore.equalTo("user_id",1)
           .fetchAll()
           .save()
           .then(function(datestore){
             datestore.set("user_name",document.getElementById(user_name).value);
             return datestore.update();
          })
    .then(function(gameScore){
    // 保存後の処理
    })
    .catch(function(err){
        // エラー処理
    });
}