function parseXml (str) {
    const parse = new DOMParser();
    return parse.parseFromString(str, "text/xml") //feldolgozás fomrátumát adom meg
}

function parseHtml (str) {
    const parse = new DOMParser();
    return parse.parseFromString(str, "text/html")
}

function renderFeed (feed) {//az XMLből kifacsartuk az adatokat
    const news = document.getElementById("news");
    const items = feed.getElementsByTagName("item");
    for (const item of items) { //bejáró ciklus, mindannyiszor, ahány elemem van
        const title = item.getElementsByTagName("title")[0].textContent;
        const description = item.getElementsByTagName("description")[0].textContent;
        const link = item.getElementsByTagName("link")[0].textContent;
        //most display a felhasználóknak: XMLből kiolvastunk, htmlt létrehozunk, majd beállítjuk a tulajdonságait
        const article = document.createElement("article");
        const titleElement = document.createElement("h1");
        const descriptionElement = document.createElement("p");
        const linkElement = document.createElement("a");
        const shortDescription = parseHtml(description).body.textContent.substring(0, 200)+"...";
        titleElement.textContent=title;
        descriptionElement.textContent=shortDescription;
        linkElement.textContent=link;
        linkElement.href=link;
        article.append(titleElement, descriptionElement, linkElement);
        news.append(article);
    }
}
fetch("https://dev.to/feed").then(r => r.text()).then(parseXml).then(renderFeed);