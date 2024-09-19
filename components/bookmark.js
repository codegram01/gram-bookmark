import { e, ref } from "/gram.js";
import { addBookmark, removeBookmark, updateBookmark } from "../store.js";
import { crawlUrl } from "../src/crawl.js";
import { convertToUrl } from "../src/url.js";

export function bookmarkCom(props){
    const bookmarkProp = props.bookmark;
    function isUpdate(){
        return bookmarkProp ? true : false
    }
    function emitClose(){
        if(props.emitClose) props.emitClose();
    }

    const url = ref("");
    const title = ref("");
    const description = ref("");
    if(isUpdate()){
        url.value = bookmarkProp.url;
        title.value = bookmarkProp.title;
        description.value = bookmarkProp.description;
    }

    function formSubmit(e){
        e.preventDefault();

        if(!url.value){
            return;
        }

        if(isUpdate()){
            updateBookmark(bookmarkProp.id, url.value, title.value, description.value);
        } else {
            addBookmark(url.value, title.value, description.value)
        }

        emitClose();
        return false;
    };

    async function enterUrl(e){
        url.value = convertToUrl(url.value)

        const dataWeb = await crawlUrl(url.value)

        title.value = dataWeb.title;
        description.value = dataWeb.description;
    }

    function callRemoveBookmark() {
        const c = confirm("Do you want to delete this bookmark?");
        if (c) {
          removeBookmark(bookmarkProp.id);
        }

        emitClose();
    }

    function onmounted(){
    }

    return e("div", {className: "overlay", onclick: emitClose, onmounted: onmounted},
        e("div", {className: "container", onclick: (e) => {e.stopPropagation()}},
            // e("h1", {text: "add bookmark"})
            e("form", {className: "form", onsubmit: formSubmit}, 
                e("h3", {text: isUpdate() ? "Update bookmark" : "Add Bookmark"}),
                e("label", {text: "Url"}),
                e("input", {id: "url", value: url, type: "url", placeholder: "Enter Url", autocomplete: "url", onchange: enterUrl}),
                e("div", {className: "error"}),

                e("label", {text: "Title"}),
                e("input", {id: "title", value: title, type: "text", placeholder: "Enter Title"}),
                e("div", {className: "error"}),

                e("label", {text: "Description"}),
                e("input", {id: "description", value: description, type: "text", placeholder: "Enter Description"}),
                e("div", {className: "error"}),

                e("div", {className: "action"},
                    e("button", {text: "Save", type: "submit"}),
                    e("button", {show: isUpdate(), type: "button", onclick: callRemoveBookmark ,className: "btn btn-black"},
                        e("img", {src: "/static/icons/trash.svg"})
                    ),
                    
                )
            )
        )
    )
}