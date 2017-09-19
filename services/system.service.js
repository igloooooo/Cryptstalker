/**
 * Created by nicholaszhu on 19/9/17.
 */
"use strict";

const { ServiceBroker } = require("moleculer");
const broker = new ServiceBroker();

module.exports = {
    name: "statistics",

    /**
     * Default settings
     */
    settings: {

    },

    /**
     * Actions
     */
    actions: {

        info: {
            handler(ctx) {
                let infoPromise = broker.call("$node.stats").then(res => res);
                return Promise.resolve(infoPromise);
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