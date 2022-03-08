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
const isKeyExists = (k, o) => { return (typeof o !== "undefined" && Object.keys(o).includes(k)) ? true : false; };

/**
 * @param eot single events table Cold Array
 * @param recv receive present events
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
			(isKeyExists("bubble", hit)) ? ((typeof hit.bubble !== "boolean") ? false : hit.bubble) : false,

			// toself
			(typeof hit.toself.self !== "boolean") ? false : hit.toself.self,

			// recipient element's ID
			// type is string and size gt 0
			(isKeyExists("aliasID", hit.toself.recipient)) ? ((typeof hit.toself.recipient.aliasID === "string"
				&& String(hit.toself.recipient.aliasID).length !== 0) ? hit.toself.recipient.aliasID : false) : false,

			// recipient element's ID
			(isKeyExists("className", hit.toself.recipient)) ? ((typeof hit.toself.recipient.className === "string"
				&& String(hit.toself.recipient.className).length !== 0) ? hit.toself.recipient.className : false) : false,
		]);
	});
}

// pseudo parent
// pseudo sub

/**
 * @returns Elements | Element and not set yet Events
 * @copyright (c) 2022 Ryan Martin
 */
export default function Layout(s, h) {
	const synthesis = {
		"presentElements": [],
		"persentEvents": []
	};

	const isEmptyObject = (o) => { return (Object.keys(o).length === 0) ? true : false };
	const coldMap = (o, f) => { let c = [...o]; c.map(f); return c };
	const coldLength = (r) => { let c = [...r]; return c; };

	if (s instanceof Object && !isEmptyObject(s)) {

		// aliasID
		// style
		// events
		// elements

		const r = document.createElement(hitOne(s));
		const o = s[hitOne(s)];
		const tag = hitOne(s);

		if (isKeyExists("aliasID", o)) r.setAttribute("id", o.aliasID);

		if (isKeyExists("style", o)
			&& isKeyExists("className", o.style)
			&& o.style.className !== "") {
			r.setAttribute("class", o.style.className);
		}

		if (isKeyExists("events", o), (coldLength(o.events).length !== 0)) {

			// if no aliasID, work to its tagName
			// no aliasID, no events
			// if no aliasID, tagName must be special
			// otherwise, it's going to be crazy
			AnalyzeEventsTable(((isKeyExists("aliasID", o)) ? o.aliasID : tag), o.events, synthesis.persentEvents);
		}

		return { "element": r, "pevents": [] };
		// return { "element": synthesis.presentElements, "pevents": synthesis.persentEvents };
	}

	// when t is a state.State, a eventing render
	// when state.State.data has changed, callback
}
