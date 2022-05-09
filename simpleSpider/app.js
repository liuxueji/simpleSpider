const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');
(async function () {
  let res = await axios.get('http://127.0.0.1:5500/index.html');
  let html = res.data;
  let $ = cheerio.load(html);
  $('a').each(async (index, element) => {
    let res = await axios.get($(element).attr('href'));
    let $html = res.data
    let $$ = cheerio.load($html);
    const $img = await axios.get($$('img').attr('src'), {
      responseType: 'stream'
    });
    const ws = fs.createWriteStream(`./image/${index}.jpg`);
    $img.data.pipe(ws);
  })
})();