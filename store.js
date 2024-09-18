import { ref } from "/gram.js";

const key_local = {
    bookmark: "GRAM_BOOKMARK"
}

const saveBookmarskLocal = () => {
    localStorage.setItem(key_local.bookmark, JSON.stringify(bookmarks.value))
}
const loadBookmarksLocal = () => {
    let bookmarksLocal = localStorage.getItem(key_local.bookmark)
    if(bookmarksLocal){
        try {
            bookmarks.value = JSON.parse(bookmarksLocal)
        } catch (error) {
            if(error){
                const cDel = confirm("Your bookmark localStorage is wrong, do you want delete it")
                if(cDel){
                    localStorage.removeItem(key_local.bookmark)
                } else {
                    alert("Before you add new bookmark, please fix it, if not all bookmarks save local will lost");
                }
            }
        }
    }
}

const bookmarks = ref([]);

// fake bookmarks for filter when search
const _bookmarks = ref([]);

// when real bookmarks change update fake bookmarks
bookmarks.subscribe(()=>{
    _bookmarks.value = bookmarks.value;
})

export const getBookmarks = () => {
    return _bookmarks;
}

export const addBookmark = (url, title, description) => {
    bookmarks.value.unshift({
        url: url,
        title: title,
        description: description
    });
    bookmarks.markChange();
    saveBookmarskLocal();
}

export const removeBookmark = (index) => {
    bookmarks.value.splice(index, 1);
    bookmarks.markChange();
    saveBookmarskLocal();
}

export const searchBookmarks = (key) => {
    _bookmarks.value = bookmarks.value.filter((bookmark) => {
        const fUrl = bookmark.url.search(new RegExp(key, 'i'));
        if(fUrl != -1) {
            return true;
        }
        const fTitle = bookmark.title.search(new RegExp(key, 'i'));
        if(fTitle != -1) {
            return true;
        }
        const fDesc = bookmark.description.search(new RegExp(key, 'i'));
        if (fDesc !== -1) {
            return true
        }
    })
}

function init_store(){
    loadBookmarksLocal();
}
init_store();
