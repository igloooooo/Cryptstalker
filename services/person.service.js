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
    name: "person",

    /**
     * Default settings
     */
    settings: {

    },

    /**
     * Actions
     */
    actions: {
        create: {
            handler(ctx) {
                client.create({
                    index: "mtmhp",
                    type: "person",
                    id: ctx.params.id,
                    body: {
                        "id": ctx.params.id,
                        "categories":ctx.params.categories
                    }
                }).then(function (body) {
                    console.trace(body);
                }, function (error) {
                    console.trace(error.message);
                });
                return ctx.params.id;
            }
        },
        update: {
            handler(ctx) {
                client.update({
                    index: "mtmhp",
                    type: "person",
                    id: ctx.params.id,
                    body: {
                        doc: {
                            "categories": ctx.params.categories
                        }
                    }
                }).then(function (body) {
                    console.trace(body);
                }, function (error) {
                    console.trace(error.message);
                });
                return ctx.params.id;
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