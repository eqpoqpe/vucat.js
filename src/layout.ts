/**
 * layout.ts - vucat.js
 * 
 * Rendering entry
 * 
 * open-source under MIT license
 * 
 * Copyright (c) 2022 Ryan Martin
 */

import { state } from "./state";

namespace layout {
  export function Layout(t: string | state.State<any>) {

    // when t is a state.State, a eventing render
    // <div>{data}<div>
    // when state.State.data has changed, callback

    // Layout(createState({handle: Layout(Menu)}))
  }
};

export default layout;