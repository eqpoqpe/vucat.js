/**
 * state.ts - vucat.js
 *
 * Copyright (c) 2022 Ryan Martin
 */
export declare namespace state {
    interface State<T> {
        data?: T;
        acr?: T;
        /**
         * State.handle
         *
         * when data has chenage, call handle function
         */
        handle?(): void;
    }
}
