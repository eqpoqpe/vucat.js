/**
 * index.ts - vucat.js
 * 
 * Copyright (c) 2022 Ryan Martin
 */

import { state } from "./state";

export namespace vucat {
  export function createState<T>(o: state.State<T>): state.State<T> {
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
          this.acr = value;
          if (typeof o.handle !== "undefined") o.handle();
        },
        enumerable: true,
        configurable: true
      })
    };

    acrSet(o);
    dataSet(o);

    return o;
  }
};

export function pullData(tableRes: any, queryURL: string): void {
  var res: any;

  fetch(queryURL)
    .then(res => res.json())
    .then(
      (result) => {
        tableRes = result;
      },
      (error) => {
        console.log(error);
      }
    );
}

export function pushData(data: any, queryURL: string) {
  fetch(queryURL, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
