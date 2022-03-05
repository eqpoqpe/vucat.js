/**
 * state.ts - vucat.js
 *
 * Copyright (c) 2022 Ryan Martin
 */
declare namespace state {
    interface State<T> {
        data?: T;
        acr?: T;
        handle?(tmp?: string): void;
        cmpv?(expect: T): boolean;
    }
}
export default state;
