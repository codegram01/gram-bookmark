import { shortUrl } from "../src/url.js";
import { getBookmarks, removeBookmark } from "../store.js";
import { bookmarkCom } from "./bookmark.js";
import { e, range, g_if, ref  } from "/gram.js";

export function bookmarksCom() {
  const showUpdate = ref(false)
  let bookmarkUpdate;
  const openUpdate = (bookmark) => {
    bookmarkUpdate = bookmark;
    showUpdate.value = true;
  }
  const closeUpdate = () => showUpdate.value = false;

  return e("div", { className: "bookmarks-ctn" },
    e( "table", {},
      range(e("tbody"), getBookmarks(), (bookmark, index) => {
        return [
          e("tr", {},
            e("th", { rowSpan: 3, html: `${index + 1}`, className: "b-index" }),
            e("td",{},
              e("a", {
                href: bookmark.url,
                target: "_blank",
                text: bookmark.title,
                className: "b-title",
              })
            ),
            e("th", {rowSpan: 3, className: "b-action",  onclick: ()=>{ openUpdate(bookmark) }},
                e("img", {src: "/static/icons/edit.svg"}),
            )
          ),
          e("tr",{},
            e("td", { className: "b-desc", text: bookmark.description }),
          ),
          e("tr",{},
            e("td", {},
              e("span", {
                className: "b-link",
                text: shortUrl(bookmark.url),
              })
            ),
          ),
        ];
      })
    ),

    g_if(e("div"), showUpdate, () => bookmarkCom({
        emitClose: closeUpdate,
        bookmark: bookmarkUpdate
    }))
  );
}
