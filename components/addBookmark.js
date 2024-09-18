import { e } from "/gram.js";
import { addBookmark } from "../store.js";
import { crawlUrl } from "../src/crawl.js";
import { convertToUrl } from "../src/url.js";

export function addBookmarkCom(props){
    function emitClose(){
        if(props.emitClose) props.emitClose();
    }

    let formElm;

    function formSubmit(e){
        e.preventDefault();

        const url = e.target.elements["url"].value
        const title = e.target.elements["title"].value
        const description = e.target.elements["description"].value

        if(!url){
            return;
        }

        addBookmark(url, title, description)

        emitClose();
        return false;
    };

    async function enterUrl(e){
        let url = e.target.value;

        // auto convert url for user
        url = convertToUrl(url)
        formElm.elements["url"].value = url;

        const dataWeb = await crawlUrl(url)

        formElm.elements["title"].value = dataWeb.title;
        formElm.elements["description"].value = dataWeb.description;

        console.log(dataWeb);
    }

    return e("div", {className: "overlay", onclick: emitClose},
        e("div", {className: "container", onclick: (e) => {e.stopPropagation()}},
            // e("h1", {text: "add bookmark"})
            e("form", {className: "form", onsubmit: formSubmit, onmounted: (elm)=>{formElm = elm}}, 
                e("h3", {text: "Add Bookmark"}),
                e("label", {text: "Url"}),
                e("input", {id: "url", type: "url", placeholder: "Enter Url", autocomplete: "url", onchange: enterUrl}),
                e("div", {className: "error"}),

                e("label", {text: "Title"}),
                e("input", {id: "title", type: "text", placeholder: "Enter Title"}),
                e("div", {className: "error"}),

                e("label", {text: "Description"}),
                e("input", {id: "description", type: "text", placeholder: "Enter Description"}),
                e("div", {className: "error"}),

                e("div", {className: "action"},
                    e("button", {text: "Save", type: "submit"})
                )
            )
        )
    )
}