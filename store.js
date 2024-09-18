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
        id: Date.now().toString(36),
        url: url,
        title: title,
        description: description
    });
    bookmarks.markChange();
    saveBookmarskLocal();
}

export const updateBookmark = (id, url, title, description) => {
    const idx = getIndexBookmark(id);
    if(idx >= 0){
        bookmarks.value[idx].url = url;
        bookmarks.value[idx].title = title;
        bookmarks.value[idx].description = description;
        bookmarks.markChange();
        saveBookmarskLocal();
    }
}

function getIndexBookmark(id){
   return bookmarks.value.findIndex(item => item.id == id);
}

export const removeBookmark = (id) => {
    const idx = getIndexBookmark(id);
    if(idx >= 0){
        bookmarks.value.splice(idx, 1);
        bookmarks.markChange();
        saveBookmarskLocal();
    }
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
