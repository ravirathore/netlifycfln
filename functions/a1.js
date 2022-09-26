const cheerio = require("cheerio");
const ffeed = require("feed").Feed;
const fetchx = require("node-fetch");

exports.handler = async function (event, context) {
  console.log(event.queryStringParameters.a);
  let tempa = event.queryStringParameters.a;
  let tempb = event.queryStringParameters.b;
  let tempc = event.queryStringParameters.c;
  let tempx = "0";
  if (tempb == "gh") {
    if (tempc == "cplus") {
      let tempy = "c++";
      tempx = await gh1(tempy);
    } else if (tempc == "csharp") {
      let tempy = "c%23";
      tempx = await gh1(tempy);
    } else {
      tempx = await gh1(tempc);
    }
  }
  if (tempb == "pti") {
    tempx = await pti1();
  }

  return {
    // tempx;

    statusCode: 200,
    body: tempx,
    //JSON.stringify({ message: "Hello World" })
  };
};

async function gh1(temp1) {
  //	for (var i = 0; i < langs.length; i++) {
  headings = [];
  descriptions = [];
  let temp2;
  console.log("temp1= ", temp1);
  if (temp1 == "all") {
    temp2 = "";
  } else {
    temp2 = temp1;
  }
  let url_string = "https://github.com/trending/" + temp2 + "?since=daily";
  console.log("url_string= ", url_string);
  const data = await fetchx(url_string);
  //	console.log(response.status);
  // console.log(response.statusText);
  console.log(data.url);
  //  console.log(data.type);
  //"https://github.com/trending/html?since=daily");
  const $ = cheerio.load(await data.text());
  //
  //descriptions =
  $("article.Box-row ")
    //$(  " .h3, .lh-condensed").children()
    //.h3, $("p:first-child")
    .get() //.map
    .forEach((repo) => {
      repox = cheerio.load(repo);
      let title = repox("h1");
      //console.log(title.text());

      title = repox("p");
      //console.log(title.text());
      descriptions.push("");
      //	langs_for_sheet.push(langs[i]);
      descriptions[descriptions.length - 1] = title.text();
      title = repox("h1  a[href*='/']");
      //console.log("a--", title.text());
      let attrs = title.attr();
      //console.log(attrs);
      title = attrs.href;
      headings.push(title);
      //console.log(attrs.href);
      //console.log(title.text());
      //	const $repo = $(repo);
      //	const title = $repo.text();
      //	console.log("title= ", title);
      //	return title;
    });
  //	console.log("desc= ", descriptions, "len= ", descriptions.length);
  //	console.log("headings= ", headings, "len= ", headings.length);
  console.log("desc len= ", descriptions.length);
  console.log("headings len= ", headings.length);

  let langx = temp1;
  /*
    if (langs[i] == "") {
      langx = "all";
    } else {
      langx = langs[i];
    }
    */
  const feed = new ffeed({
    title: langx,
    description: "gh",
    author: langx,
    link: "gh",
    date: "gh",
  });
  if (headings.length == descriptions.length) {
    //for (var i = 0; i < langs.length; i++) {

    console.log("equal ");
    let date1 = new Date();
    for (var j = 0; j < headings.length; j++) {
      let linkx = "https://github.com" + headings[j];
      //	let langx = "all";

      console.log("langx= ", langx);

      feed.addItem({
        title: headings[j],
        author: langx,
        link: linkx,
        description: descriptions[j],

        date: date1,
      });
      /*
        fs.writeFile(dirPath, rssdoc, function (err) {
          if (err) {
            return console.log(err);
          }
        });
        */
    }
  }
  var rssdoc = feed.rss2();
  xx22 = rssdoc;
  console.log("rssdoc= ", rssdoc);
  return rssdoc;
}

//ab13();
//ab1();
//(2)

async function pti1() {
  // console.log("hello2");
  const url = "http://engold.ptinews.com/";
  //console.log("hell03");
  //	const url = "https://sheets.googleapis.com/v4/spreadsheets/1lrRMCiWLxLyFPMBWgfhwmIR5sQfruiJ5H0hChYlWfBo/values/pti!A1?key=AIzaSyBmRmnSHMnGfxopt3QwjyuCPnhb4yKNu24";
  //const url = "http://ptinews.com/";

  //	const url = "http://google.com/";
  console.log("hell04", url);
  //let response1;
  //	const data = await fetch(url_string);
  //"https://github.com/trending/html?since=daily");
  //const $ = cheerio.load(await data.text());
  const response = await fetchx(url);
  /*
  fetchx('http://engold.ptinews.com/', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(json => console.log("json ",json))
    .catch(err => console.log(err));
    */
  /*
  fetch2(url)
  .then(res => {
  if (res.status >= 400) {
    throw new Error("Bad response from server");
  }
  return res.json();
  })
  .then(user => {
  console.log(user);
  })
  .catch(err => {
  console.error(err);
  });
  */
  /*
  const response = await fetch(url, {        
    method: "GET",        
    mode: "cors",      
    });      
    */
  //	const response = ky.get(url);

  console.log("hello05", response);
  //.text());
  //let response1 = response.values;
  //[0][0];
  const body = await response.text();
  //const body = await response.json();
  //.text();
  console.log("hell06-body========================", body);

  //	console.log(body.values);

  //	let body1 = body.values[0][0];
  /*
  axios.get(url)
  .then(function (response) {
  // handle success
  response1 = response;
  console.log("====================================",response);
  });
  */
  //	console.log("hell04-r",response1);
  /*
  console.log(response.headers.get('Content-Type'));
  console.log(response.headers.get('Date'));

  console.log(response.status);
  console.log(response.statusText);
  console.log(response.url);
  */
  //   console.log(response.type);
  /*
  const body = await response1.text();
  console.log("hell04-body========================",body);
  let body1;
  */

  //let $ = cheerio.load(body1);
  let $ = cheerio.load(body);

  //let title = $('title');
  //console.log("hello4");
  //const body = await response.text();

  //create new feed
  const feed = new ffeed({
    title: "pt",
    description: "pt",
    author: "pt",
    link: "pt",
    date: "pt",
  });

  // let $ = cheerio.load(body);

  let title = $("title");
  console.log(title.text());
  //let xy1 = $('a[class=catLatestHeadli]').();
  $("a[class=catLatestHeadli]").each((_, e) => {
    let row = $(e).text();

    //  console.log(`${row}`);
    // console.log(row);
    let date1 = new Date();

    feed.addItem({
      title: row,
      description: row,
      author: row,
      link: row,
      date: date1,
    });
  });
  var rssdoc = feed.rss2();
  //xx2 = rssdoc;
  return rssdoc;
}

async function insta(temp1, temp2, temp3) {
  let temp4 = "/" + temp1 + "/" + temp2 + "/" + temp3;
  const feed2 = new ffeed({
    title: temp4,
    description: "PT",
    author: "pt",
    link: "pt",
    pubDate: "pt",
  });
  console.log(temp4);

  let data = await RSSHub.request(temp4);
  //  .then((data) => {
  console.log("data==", data);
  //for it in data.item{
  for (let i = 0; i < data.item.length; i++) {
    feed2.addItem({
      title: data.item[i].title,
      author: data.item[i].author,
      link: data.item[i].link,
      description: data.item[i].description,

      pubdate: data.item[i].pubDate,
    });
    var rssdoc = feed2.rss2();
    //  xx4 = rssdoc;
    return rssdoc;
    //}
    console.log("temp4", xx4);
    // xx3 = data.item;

    //  return xx3;
  }
}
