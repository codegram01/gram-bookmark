import { bookmarkCom } from "./bookmark.js";
import { e, ref, g_if } from "/gram.js";

export function navActionCom() {
    const showBookmark = ref(false);
    const openBookmark = () => { showBookmark.value = true };
    const closeBookmark = () => { showBookmark.value = false };

    return e("div", { className: "action"},
        e("button", {text: "Add", onclick: openBookmark}),
        g_if(e("div"), showBookmark, () => bookmarkCom({
            emitClose: closeBookmark
        })),
    )
}