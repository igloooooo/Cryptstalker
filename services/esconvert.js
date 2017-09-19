
"use strict";

/**
 * this is the example json response
 * {
    "feedname": "Home",
    "title": "Foster couple's home searched by terror police",
    "author": "",
    "description": "A Surrey home searched by anti-terror police investigating the Parsons Green bombing is owned by an elderly foster couple honoured for their work with child refugees.",
    "link": "http://news.sky.com/story/police-operation-in-surrey-after-parsons-green-11038383",
    "publishedDate": "2017-09-16T13:38:00.000Z",
    "source": null,
    "raw": {},
    "enclosures": [
      {
        "url": "http://e3.365dm.com/17/09/70x70/e877a807de717c02e7448e528a2634e24f5f16e59013aa0dd204116edc980b5e_4102872.jpg?20170916224125",
        "type": "image/jpeg",
        "length": 0
      }
    ],
    "medias": [
      {
        "type": "image/jpeg",
        "reference": "http://e3.365dm.com/17/09/70x70/e877a807de717c02e7448e528a2634e24f5f16e59013aa0dd204116edc980b5e_4102872.jpg?20170916224125"
      }
    ],
    "river": "mtmhp",
    "id": "b6eebe8d-8614-3a0e-8cb9-d6347ac2181c"
  }
 * @param hits
 * @returns {Array}
 */
function parseSubscribe(hits) {
    return hits.map(item => {
        let result = item._source.categories;
        return result;
    })[0];
}
function parseFeed(hits) {
    return hits.map(item => {
        let result = item._source;
        result.id = item._id;
        return result;
    });
}
module.exports = {
    parseFeed,
    parseSubscribe
};