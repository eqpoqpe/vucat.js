/**
 * index.ts - vucat.js
 *
 * Copyright (c) 2022 Ryan Martin
 */
import state from "./state";
declare namespace vucat {
    /**
     * createState
     *
     * in Branch Jennie of vucat.js.
     * When o.data has changed, call handle function
     */
    function createState<T>(init: state.State<T>): state.State<T>;
    /**
     */
    function Layout(template: string | state.State<any>): void;
}
declare const createState: typeof vucat.createState;
export { createState };
