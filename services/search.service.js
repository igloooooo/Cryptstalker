/**
 * Created by nicholaszhu on 18/9/17.
 */
"use strict";

let elasticsearch = require("elasticsearch");
let ESConvert = require("./esconvert.js");
let client = new elasticsearch.Client({
    host: "localhost:9200",
    log: "trace"
});

module.exports = {
    name: "search",

    /**
     * Default settings
     */
    settings: {

    },

    /**
     * Actions
     */
    actions: {

        fulltext: {
            params: {
                p: "string",
                size: {type: "number", convert: true},
                startIndex: {type: "number", convert: true}
            },
            handler(ctx) {
                let p = `${ctx.params.p}` || "";
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
                            query_string: {
                                query: p
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
     * Methods
     */
    methods: {

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