/**
 * layout.ts - vucat.js
 *
 * Rendering entry
 *
 * open-source under MIT license
 *
 * Copyright (c) 2022 Ryan Martin
 */

// debug
const print = console.log;

const hitOne = (o) => { return Object.keys(o)[0] };
const coldMap = (o, f) => { let c = [...o]; c.map(f); return c };
const isKeyExists = (k, o) => {
  return (typeof o !== "undefined"
    && Object.keys(o).includes(k)) ? true : false;
};
const isEmptyObject = (o) => { return (Object.keys(o).length === 0) ? true : false };

/**
 * aliasID
 * 
 * style
 * 
 * @param {HTMLElement} el
 * @param {Object} po property object
 */
const attribute = (el, po) => {
  if (isKeyExists("aliasID", po)) {
    if (typeof po.aliasID === "string" && po.aliasID !== "")
      el.setAttribute("id", po.aliasID);
  }

  if (isKeyExists("src", po)) {
    if (typeof po.src === "string" && po.src !== "")
      el.setAttribute("src", po.src);
  }

  if (isKeyExists("className", po.style)) {
    if (typeof po.style.className === "string" && po.style.className !== "")
      el.setAttribute("class", po.style.className);
  };
}

/**
 * @param {string} truth
 * @param {Array} eot single events table Cold Array
 * @param {Array} recv receive present events
 * @returns array
 */
function AnalyzeEventsTable(truth, [...eot], recv) {

  // {eventsType: "click", bubble: false, self: false, recipient: ["#id", ".class"]}
  //  id | tag   event bubble, self, recipient
  // ["",      , "",   "",     "",   ""]
  coldMap(eot, (t) => {
    const hit = ((_t) => { return t[hitOne(_t)]; })(t);
    const toself = isKeyExists("toself", ((_t) => { return t[hitOne(_t)]; })(t));

    recv.push([
      truth, // id | tag
      `${hitOne(t)}`,  // event

      // bubble
      (isKeyExists("bubble", hit)) ?
        ((typeof hit.bubble !== "boolean") ? false : hit.bubble) : false,

      // toself
      (typeof hit.toself.self !== "boolean") ? false : hit.toself.self,

      // recipient element's ID
      // type is string and size gt 0
      (isKeyExists("aliasID", hit.toself.recipient)) ?
        ((typeof hit.toself.recipient.aliasID === "string"
          && String(hit.toself.recipient.aliasID).length !== 0) ?
          hit.toself.recipient.aliasID : false) : false,

      // recipient element's ID
      (isKeyExists("className", hit.toself.recipient)) ?
        ((typeof hit.toself.recipient.className === "string"
          && String(hit.toself.recipient.className).length !== 0) ?
          hit.toself.recipient.className : false) : false,
    ]);
  });
}

/**
 * @param {HTMLElement} pr pseudo root
 * @param {Array} eot elements table
 * @param {Array} recv receive present events
 */
function AnalyzeElementsTable(pr, [...eot], recv, who) {
  const coldLength = ([...r]) => { return r; };

  // aliasID
  // style
  // events
  // elements
  if (eot.length > 0) {

    // topmost presentProot of scope
    eot.forEach((ot) => {
      if (!isEmptyObject(ot)) {
        let o = ot[hitOne(ot)];
        let tag = hitOne(ot);
        let _ppr = document.createElement(tag);

        // pseudo parent root
        attribute(_ppr, o);
        pr.append(_ppr);

        if (isKeyExists("events", o) && coldLength(o.events).length !== 0) {
          AnalyzeEventsTable(
            ((isKeyExists("aliasID", o)
              && typeof o.aliasID === "string"
              && o.aliasID !== "") ? o.aliasID : tag),
            o.events,
            recv
          );
        }

        if (isKeyExists("elements", o)) {
          AnalyzeElementsTable(_ppr, o.elements, recv, who += 1);
        }
      }
    });
  }
}

// pseudo parent
// pseudo sub

/**
 * @returns Elements | Element and not set yet Events
 * @copyright (c) 2022 Ryan Martin
 */
export default function Layout(s, h) {
  const synthesis = {
    "presentProot": null,
    "persentEvents": []
  };

  const coldMap = (o, f) => { let c = [...o]; c.map(f); return c };
  const coldLength = ([...r]) => { return r; };

  if (s instanceof Object && !isEmptyObject(s)) {

    // aliasID
    // style
    // events
    // elements

    const o = s[hitOne(s)];
    const tag = hitOne(s);
    synthesis.presentProot = document.createElement(tag);

    if (isKeyExists("aliasID", o)) {
      if (typeof o.aliasID === "string" && o.aliasID !== "")
        synthesis.presentProot.setAttribute("id", o.aliasID);
    }

    if (isKeyExists("className", o.style)) {
      if (typeof o.style.className === "string" && o.style.className !== "")
        synthesis.presentProot.setAttribute("class", o.style.className);
    }

    if (isKeyExists("events", o) && coldLength(o.events).length !== 0) {

      // if no aliasID, work to its tagName
      // no aliasID, no events
      // if no aliasID, tagName must be special
      // otherwise, it's going to be crazy
      AnalyzeEventsTable(
        ((isKeyExists("aliasID", o)
          && typeof o.aliasID === "string"
          && o.aliasID !== "") ? o.aliasID : tag),
        o.events,
        synthesis.persentEvents
      );
    }

    if (isKeyExists("elements", o)) {
      AnalyzeElementsTable(
        synthesis.presentProot,
        o.elements,
        synthesis.persentEvents,
        0
      );
    }

    return { "element": synthesis.presentProot, "pevents": synthesis.persentEvents };
  }

  return false;

  // when t is a state.State, a eventing render
  // when state.State.data has changed, callback
}
