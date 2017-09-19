"use strict";

let elasticsearch = require("elasticsearch");
let ESConvert = require("./esconvert.js");
let client = new elasticsearch.Client({
    host: "localhost:9200",
    log: "trace"
});

module.exports = {
    name: "tops",

    /**
     * Default settings
     */
    settings: {

    },

    /**
     * Actions
     */
    actions: {

        /**
         * Say a 'Hello'
         *
         * @returns
         */
        listTopTen() {
            let promise;
            promise = client.search({
                index: "mtmhp",
                type: "page",
                size: 10,
                sort: ["publishedDate:desc"]
            }).then(function (body) {
                let hits = body.hits.hits;
                return ESConvert.parseFeed(hits);
            }, function (error) {
                console.trace(error.message);
            });
            return Promise.resolve(promise);
        },

        listTop: {
            params: {
                size: {type: "number", convert: true},
                startIndex: {type: "number", convert: true}
            },
            handler(ctx) {
                let size = `${ctx.params.size}` || 10;
                let startIndex = `${ctx.params.startIndex}` || 0;
                let promise = client.search({
                    index: "mtmhp",
                    type: "page",
                    size: size,
                    from: startIndex,
                    sort: ["publishedDate:desc"]
                }).then(function (body) {
                    let hits = body.hits.hits;
                    return ESConvert.parseFeed(hits);
                }, function (error) {
                    console.trace(error.message);
                });
                return Promise.resolve(promise);
            }
        },

        /**
         * Welcome a username
         *
         * @param {String} name - User name
         */
        category: {
            params: {
                name: "string",
                size: {type: "number", convert: true},
                startIndex: {type: "number", convert: true}
            },
            handler(ctx) {
                let feedName = `${ctx.params.name}` || "";
                let size = `${ctx.params.size}` || 10;
                let startIndex = `${ctx.params.startIndex}` || 0;
                let promise = client.search({
                    index: "mtmhp",
                    type: "page",
                    size: size,
                    from: startIndex,
                    sort: ["publishedDate:desc"],
                    body: {
                        query: {
                            match: {
                                "feedname": feedName
                            }
                        }

                    }
                }).then(function (body) {
                    let hits = body.hits.hits;
                    return ESConvert.parseFeed(hits);
                }, function (error) {
                    console.trace(error.message);
                });
                return Promise.resolve(promise);
            }
        }
    },

    /**
     * Events
     */
    events: {

    },

    /**
     *     hods
     */
        hods: {

    },

    /**
     * Service created lifecycle event handler
     */
    created() {

    },

    /**
     * Service started lifecycle event handler
     */
    started() {

    },

    /**
     * Service stopped lifecycle event handler
     */
    stopped() {

    }
};