/**
 * state.ts - vucat.js
 * 
 * Copyright (c) 2022 Ryan Martin
 */

export namespace state {
  export interface State<T> {

    // init value of data
    // read value from acr
    data?: T;

    // can modtify value
    acr?: T;

    /**
     * State.handle
     * 
     * when data has chenage, call handle function
     */
    handle?(): void
  };
};

