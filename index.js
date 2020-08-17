const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://instagram.com/rocketseat_oficial');
  
  const imgList = await page.evaluate(() => {
    //toda essa função será executada no browser

    // vamos pegar todas as imagens que estão na parte de posts
    const nodeList = document.querySelectorAll('article img')
    //transformar o NodeList em array
    const imgArray = [...nodeList]
    // transformar os nodes (elementos html) em objetos JS
    const imgList = imgArray.map( ({src}) => ({
      src
    }))
    // colocar para fora da função
    return imgList
  })

  // escrever os dados em um arquivo local (json)
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
    if (err) throw new Error( 'something went wrong');

    console.log('well done!');
  })
  await browser.close();
})();
