/**
 * index.ts - vucat.js
 *
 * Copyright (c) 2022 Ryan Martin
 */
import Layout from "./layout";
import Render from "./render";
/**
 * createState
 *
 * in Branch Jennie of vucat.js.
 * When o.data has changed, call handle function
 */
export function createState(init) {
    var acrSet = function (o) {
        Object.defineProperty(o, "acr", {
            value: o.data,
            writable: true,
            enumerable: true,
            configurable: true
        });
    };
    var dataSet = function (o) {
        Object.defineProperty(o, "data", {
            get: function () { return this.acr; },
            set: function (value) {
                if (typeof o.cmpv !== "undefined" && o.cmpv(value)) {
                    this.acr = value;
                    if (typeof o.handle !== "undefined")
                        o.handle(value);
                }
                else {
                    this.acr = value;
                    if (typeof o.handle !== "undefined")
                        o.handle();
                }
            },
            enumerable: true,
            configurable: true
        });
    };
    acrSet(init);
    dataSet(init);
    return init;
}
export { Layout, Render };
