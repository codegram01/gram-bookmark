import { shortUrl } from "../src/url.js";
import { getBookmarks, removeBookmark } from "../store.js";
import { e, range } from "/gram.js";

export function bookmarksCom(){
    function callRemoveBookmark(index){
        const c = confirm("Do you want to delete this bookmark?")
        if(c) {
            removeBookmark(index)
        }
    }
    return e("div", {className: "bookmarks-ctn"},
        e("table", {}, 
            e("thead", {}, 
                e("tr", {}, 
                    e("th", {text: "Site"}),
                    e("th", {text: "Description"}),
                    e("th", {text: "Action"})
                )
            ),
            range(e("tbody") ,getBookmarks(), (bookmark, index) => {
                // return e("li", {text: `${index}: ${fruit} - `}, 
                //   e("button", {text: "x", onclick: ()=>{removeFruit(index)}})
                // )
                return e("tr", {}, 
                    e("td",{ className: "site"},
                        e("div", {text: bookmark.title}),
                        e("a", { href:bookmark.url, target: "_blank", text: shortUrl(bookmark.url)} )
                    ),
                    e("td", {},
                        e("div", {text: bookmark.description, className: "bookmark-desc"})
                    ),
                    e("td", {style: "min-width: 100px;"}, 
                        e("div",{className: "bookmark-action"},
                            e("img", {className:"btn btn-black" ,src: "/static/icons/edit.svg", onclick: ()=>{}}),
                            e("img", {className:"btn btn-black" ,src: "/static/icons/trash.svg", onclick: ()=>{callRemoveBookmark(index)}})
                        )
                    )
                )
              })
        )
    )
}