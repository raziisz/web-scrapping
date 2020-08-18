const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://am.olx.com.br/regiao-de-manaus');
  
  const titlesAndImg = await page.evaluate(() => {
    //toda essa função será executada no browser

    // vamos pegar todas as imagens que estão na parte de posts
    const nodeList = document.querySelectorAll('#ad-list li a')
    const nodeListImg = document.querySelectorAll('#ad-list li a div div div img');
    //transformar o NodeList em array
    const titlesList = [...nodeList]
    const listImgs = [...nodeListImg]
    // transformar os nodes (elementos html) em objetos JS
    const imgs = listImgs.map( html => ({ src: html.dataset.src !==  undefined ? html.dataset.src : html.src}));
    const titlesAndImg = titlesList
      .filter(({title}) => title !== "")
      .map( ({title}, index) => ({
      title,
      src: imgs[index].src || ''
    }));
    
    // colocar para fora da função
    return titlesAndImg

  })

  // escrever os dados em um arquivo local (json)
  fs.writeFile('olx.json', JSON.stringify(titlesAndImg, null, 2), err => {
    if (err) throw new Error( 'something went wrong');

    console.log('well done!');
  })
  await browser.close();
})();
