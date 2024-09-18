import { bookmarksCom } from "./bookmarks.js";
import { searchCom } from "./search.js";
import { e, ref } from "/gram.js";

export function appCom(){
    return e("div", {className: "app-ctn-wrap"},
        searchCom(),
        bookmarksCom()
    )
}