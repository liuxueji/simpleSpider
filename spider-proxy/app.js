var request = require('superagent');
require('superagent-proxy')(request);

var fs = require('fs');

// 需要本地开启代理
var proxy = 'http://127.0.0.1:10809';

// 请求头(可以利用Google浏览器打开youtube首页，点击network 查看请求头，把相关信息复制过来即可)
var header = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Encoding': 'gzip, deflate, sdch, br',
  'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.6',
  'Cache-Control': 'max-age=0',
  'Cookie': '_ga=GA1.2.1653214693.1476773935; VISITOR_INFO1_LIVE=T3BczuPUIQo; SID=5QR6XEldVgveXzFtqjIcD480cHE18gBRd3xPo398vndcc5JNxOAZ-TgVp5jQx3CR-ePvgA.; HSID=APr2I8UwM-A-Lypbd; SSID=Ap4H3Td1nrV__-9tN; APISID=8bHyFV90pNBU5Z9p/A2DlJa2MyJLL4-RKP; SAPISID=4tZf4GDX7Dt5bNAt/A5vhaZe_DLzn-ECul; CONSENT=YES+CN.zh-CN+20160904-14-0; YSC=XVHk_pArWhE; PREF=cvdm=grid&f1=50000000&f6=1&f5=30&al=zh-CN&gl=HK',
  'Upgrade-insecure-requests': '1',
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36',
  'X-Chrome-Uma-Enabled': '1',
  'X-Client-Data': 'CJa2yQEIorbJAQjBtskBCKmdygE=',
  'Connection': 'keep-alive'
};

request
  .get('https://www.youtube.com')
  .set('header', header)
  .proxy(proxy)
  .end(onresponse);

function onresponse(err, res) {
  // res.setEncoding('utf-8'); //防止中文乱码
  if (err) {
    console.log(err);
  } else {
    console.log('status:' + res.status);
    //console.log(res.headers);
    console.log(res.text);
    //将res.text写入json文件
    fs.writeFile(__dirname + '/data/home.json', JSON.stringify({
      status: 0,
      data: res.text
    }), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('完成');
    });
  }
}