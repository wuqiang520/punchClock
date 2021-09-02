var express = require('express');
var router = express.Router();
const {
  app
} = require('../config');
const HMAC = require('../common/hmac');
const request = require('request')
/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', {
    title: 'express'
  });
});
router.get('/clock', function (req, res, next) {
  let appId = req.query.appId;
  let appSecrt = '';

  let timeStamp = req.query.timeStamp;
  let number = req.query.number;
  let sign = req.query.sign;
  let str = 'appId=' + appId + '&number=' + number + '&timeStamp=' + timeStamp;
  if (number && appId && sign && timeStamp) {
    app.forEach((item, index) => {
      if (item.appId == appId) {
        appSecrt = item.appSecrt
      }
    })
    if (!appSecrt) {
      res.json({
        result: -5,
        msg: 'appid not exit'
      })
      return;
    }
    let sign2 = HMAC.HmacSHA1(str, appSecrt);
    let ts = new Date().getTime();
    let camId = '10075';
    if (Math.abs(ts - parseInt(timeStamp)) > 1000 * 60) { //链接一分钟内有效
      res.json({
        result: -4,
        msg: '当前链接已失效'
      })
      return;
    }
    if (sign == sign2) {
      request.get({
        url: 'https://fim-s.21cn.com:84/api/checkNumber?number=' + number + '&ts=' + ts + '&camId=' + camId
      }, function (error, httpResponse, body) {
        if (error) {
          res.json({
            result: -3,
            msg: '请求失败'
          });
        }
        let data = JSON.parse(body)
        if(data.result == '200'){
          res.json({
            result: 0,
            msg:'success',
            detail: data.detail
          })
        }else{
          res.end(body)
        }
      })
    } else {
      res.json({
        result: -2,
        msg: 'sign-error'
      })
    }
  } else {
    res.json({
      result: -1,
      msg: '缺少参数'
    })
  }

});

module.exports = router;