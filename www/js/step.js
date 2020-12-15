var watchID = null;
var count = 0;
// 重力加速度のしきい値
const GRAVITY_MIN = 9.8;
const GRAVITY_MAX = 12.00;
// 歩数
var _step = 0;
// 現在歩いているかどうか
var _isStep = false;

document.addEventListener('deviceready', start, false);
function start(){
  if(watchID == null){
    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
  }
}

function stop(){
  if(watchID != null){
    navigator.accelerometer.clearWatch(watchID);
    watchID = null;
  }
}

//センサ取得成功時
function onSuccess(acceleration) {
    var ag = acceleration;
    // 重力加速度ベクトルの大きさを取得
    var acc = Math.sqrt(ag.x*ag.x + ag.y*ag.y + ag.z*ag.z);

    if (_isStep) {
        // 歩行中にしきい値よりも低ければ一歩とみなす
        if (acc < GRAVITY_MIN) {
            _step++;
            _isStep = false;
        }
    } else {
        // しきい値よりも大きければ歩いているとみなす
        if (acc > GRAVITY_MAX) {
            _isStep = true;
            localStorage.setItem('totalStep', _step);
            if(_step % 10 == 0 && _step != 0){
              count++;
              localStorage.setItem('count', count);
            }
        }
    }
}
//センサ取得失敗時
function onError() {
    console.log('watchAcceleration on Error!');
}

//0.2sごとにセンサの値を取得
var options = { frequency: 200 };
