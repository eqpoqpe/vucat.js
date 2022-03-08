/**
 * @param pager Array every exec will return Element or Elements
 */
export default function Render(pager, root) {

  // debug
  const print = console.log;
  let page = pager();
  const isHTMLElement = (el) => { return (el instanceof HTMLElement) ? true : false; };
  const ElementAppend = (r, el) => { if (typeof el !== "undefined") r.append(el); };
  const ElementsAppend = (r, els) => { };

  if (isHTMLElement(root)) {
    if ("body" in page) {
      if (Array.isArray(page.body)) {
        let components = [...page.body];

        components.forEach((c) => {
          let r = c();

          if (typeof r !== "undefined") {
            ElementAppend(root, r.element);
          }
        });
        // c => Element or Elements
      }
    }
  } else {
    throw "Type Error: root isn't a HTMLElement can't render page";
  }
}
;
