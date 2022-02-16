/**
 * index.ts - vucat.js
 *
 * Copyright (c) 2022 Ryan Martin
 */
import { state } from "./state";
export declare namespace vucat {
    function createState<T>(o: state.State<T>): state.State<T>;
}
export declare function pullData(tableRes: any, queryURL: string): void;
export declare function pushData(data: any, queryURL: string): void;
