/**
 * Created by nicholaszhu on 19/9/17.
 */
"use strict";

let elasticsearch = require("elasticsearch");
let ESConvert = require("./esconvert.js");
let client = new elasticsearch.Client({
    host: "localhost:9200",
    log: "trace"
});

module.exports = {
    name: "subscribe",

    /**
     * Default settings
     */
    settings: {

    },

    /**
     * Actions
     */
    actions: {
        listTop: {
            handler(ctx) {
                let size = `${ctx.params.size}` || 10;
                let startIndex = `${ctx.params.startIndex}` || 0;
                let subscribes = ctx.params.categories || [];
                let promise = client.search({
                    index: "mtmhp",
                    type: "page",
                    size: size,
                    from: startIndex,
                    sort: ["publishedDate:desc"],
                    body:{
                        "query" : {
                            "constant_score" : {
                                "filter" : {
                                    "terms" : {
                                        "feedname" : subscribes
                                    }
                                }
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