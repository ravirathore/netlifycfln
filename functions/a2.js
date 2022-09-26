



/*
RSSHub.init({
    // config
});
console.log(RSSHub);
RSSHub.request('/twitter/user/historyinmemes')
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e);
    });
//
*/

    exports.handler = async () => {
        const RSSHub = require('rsshub');
        RSSHub.init({
            // config
        });
        console.log(RSSHub);
       let x = await RSSHub.request('/twitter/user/historyinmemes')
      //  const RSSHub = require('rsshub');

//RSSHub.init({   // config });
    //    let x = await RSSHub.request('/twitter/user/historyinmemes')
        return {
          statusCode: 200,
          body: x.title,
        };
      };