var ncmb = new NCMB('f8981f796b63b674bd2c30a28e47d30b075842f8399abb1bd6c9593937a3fbe6','fbf1b390ae25bf7805e537e084cb2a353082cdd95f46417a06d394a6398a045c'); 

function send_user(user_name){

  var Datestore = new ncmb.Datestore(users);
  var datestore = new Datestore();
  var user = document.getElementById(user_name).textContent

  datestore.set(user_name,user)
  .save()
  .then(function(gameScore){
    // 保存後の処理
    })
    .catch(function(err){
        // エラー処理
    });
}