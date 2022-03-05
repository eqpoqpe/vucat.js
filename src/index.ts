/**
 * index.ts - vucat.js
 * 
 * Copyright (c) 2022 Ryan Martin
 */

import state from "./state";

namespace vucat {

  /**
   * createState
   * 
   * in Branch Jennie of vucat.js.
   * When o.data has changed, call handle function
   */
  export function createState<T>(init: state.State<T>): state.State<T> {
    const acrSet = (o: state.State<T>): void => {
      Object.defineProperty(o, "acr", {
        value: o.data,
        writable: true,
        enumerable: true,
        configurable: true
      });
    };

    const dataSet = (o: state.State<T>): void => {
      Object.defineProperty(o, "data", {
        get: function () { return this.acr; },
        set: function (value) {
          if (typeof o.cmpv !== "undefined" && o.cmpv(value)) {
            this.acr = value;

            if (typeof o.handle !== "undefined") o.handle(value);
          } else {
            this.acr = value;

            if (typeof o.handle !== "undefined") o.handle();
          }
        },
        enumerable: true,
        configurable: true
      })
    };

    acrSet(init);
    dataSet(init);

    return init;
  }

  /**
   */
  export function Layout(template: string | state.State<any>): void {

    // return layout.Layout();
    console.log(template);
  }
};

const createState = vucat.createState;

export { createState };