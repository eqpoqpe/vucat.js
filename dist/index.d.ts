/**
 * index.ts - vucat.js
 *
 * Copyright (c) 2022 Ryan Martin
 */
import state from "./state";
import Layout from "./layout";
import Render from "./render";
/**
 * createState
 *
 * in Branch Jennie of vucat.js.
 * When o.data has changed, call handle function
 */
export declare function createState<T>(init: state.State<T>): state.State<T>;
export { Layout, Render };
