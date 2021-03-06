"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	// More info about settings: http://moleculer.services/docs/moleculer-web.html
	settings: {
		port: process.env.PORT || 3000,

		routes: [{
			path: "/",
            aliases: {

                // Restrict the request method
                "POST person": "person.create",
                "PUT person": "person.update",
                "POST subscribe": "subscribe.listTop",
                "GET statistics": "statistics.info",

            },
			whitelist: [
				// Access to any actions in all services
                "search.*",
				"tops.*",
				"person.*",
                "subscribe.*",
				"statistics.*"
			]
		}]

	},

    /**
     * Events
     */
    events: {
        "metrics.trace.span.finish"(payload) {
            console.info("Full text search:", payload);
            // Do something
        }
    },
};
