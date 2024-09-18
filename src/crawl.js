export async function crawlUrl(url){
    let title = "";
    let description = "";
    
    const res = await fetch(`https://crawl.wingram.org/?crawlUrl=${url}`)
    const data = await res.json();
    title = data.title;
    for(const meta of data.meta){
        if(meta.name && meta.name.toLowerCase() == "description"){
            description = meta.content;
            break;
        }
        if(meta.name && meta.name.toLowerCase() == "og:description") {
            description = meta.content;
            break;
        }
    }

    return {
        url: url,
        title: title, 
        description: description,
    }
}