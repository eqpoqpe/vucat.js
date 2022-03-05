/**
 * index.ts - vucat.js
 *
 * Copyright (c) 2022 Ryan Martin
 */
var vucat;
(function (vucat) {
    /**
     * createState
     *
     * in Branch Jennie of vucat.js.
     * When o.data has changed, call handle function
     */
    function createState(init) {
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
                    this.acr = value;
                    if (typeof o.handle !== "undefined")
                        o.handle();
                },
                enumerable: true,
                configurable: true
            });
        };
        acrSet(init);
        dataSet(init);
        return init;
    }
    vucat.createState = createState;
    /**
     */
    function Layout(template) {
        // return layout.Layout();
        console.log(template);
    }
    vucat.Layout = Layout;
})(vucat || (vucat = {}));
;
var createState = vucat.createState;
export { createState };
var obj = createState({});
obj.data = "new";
console.log(obj.acr);
