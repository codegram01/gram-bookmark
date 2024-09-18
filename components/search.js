import { searchBookmarks } from "../store.js";
import { e } from "/gram.js";

export function searchCom() {
    function search(e){
        const key = e.target.value;
        
        searchBookmarks(key)
    }

    return e("div", {className: "search-ctn"}, 
        e("input", {type: "text", oninput: search,placeholder: "Search bookmark"}),
    )
}