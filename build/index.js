"use strict";
/**
 * index.ts - vucat.js
 *
 * Copyright (c) 2022 Ryan Martin
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushData = exports.pullData = exports.vucat = void 0;
var vucat;
(function (vucat) {
    function createState(o) {
        const acrSet = (o) => {
            Object.defineProperty(o, "acr", {
                value: o.data,
                writable: true,
                enumerable: true,
                configurable: true
            });
        };
        const dataSet = (o) => {
            Object.defineProperty(o, "data", {
                get: function () { return this.acr; },
                set: function (value) {
                    this.acr = value;
                    if (typeof o.handle !== "undefined")
                        o.handle();
                },
                enumerable: true,
                configurable: true
            });
        };
        acrSet(o);
        dataSet(o);
        return o;
    }
    vucat.createState = createState;
})(vucat = exports.vucat || (exports.vucat = {}));
;
function pullData(tableRes, queryURL) {
    var res;
    fetch(queryURL)
        .then(res => res.json())
        .then((result) => {
        tableRes = result;
    }, (error) => {
        console.log(error);
    });
}
exports.pullData = pullData;
function pushData(data, queryURL) {
    fetch(queryURL, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
exports.pushData = pushData;
