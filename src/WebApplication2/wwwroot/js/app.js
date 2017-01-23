

function readJSON(file) {
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if (request.status == 200)
        return request.responseText;
};

window.onload = function(){
    var temp = readJSON("json/blogs.json");    
    var arr = JSON.parse(temp);
    var main = document.getElementById("content");
    arr.forEach(function(item) {
        main.appendChild(createItem(item));
    }, this);
    
    
}; 

function createItem(item){
    var div = imageDiv = footerItem = document.createElement("div");        
    div.className = "item";    
    div.appendChild(getImageDiv(item));
    div.appendChild(getAcricle(item));
    div.appendChild(getFooter(item));
    return div;
}

function getAcricle(item){
    return parseArticle(item.article);    
}

function parseArticle(item){
    var textSplit = RegExp(/'.+?'\(.+?\)/g);        
    var title = RegExp(/'.+?'/g);
    var link = RegExp(/\(.+?\)/g);
    var article = document.createElement("article");        
    var items = item.split(/\t/g);    
    for(var i = 0; i< items.length; i++){
        var elem = items[i];                    
        
        var textArray = elem.split(textSplit);        
        var titles = elem.match(title);
        var links = elem.match(link);

        var p = document.createElement("p");  
                    
        for(var j = 0; j < textArray.length; j++){
            var span = document.createElement("span");    
            span.innerText = textArray[j];
            p.appendChild(span);
            if (titles && titles.length > j && links.length > j )  {
                var a = document.createElement("a");
                a.title = titles[j].replace(/'/g,'');
                a.innerHTML = titles[j].replace(/'/g,'');
                a.href = links[j].replace(/\(|\)/, '');
                p.appendChild(a);
            }                        
        }
        
        article.appendChild(p);
    }    
    return article;


}

function getFooter(item){
    var divFooter = document.createElement("div");
    divFooter.classList = "footer-item";
    var tags = document.createElement("div");
    tags.classList = "tags";

    var span = document.createElement("span");
    span.classList = "tags-icon"

    tags.appendChild(span);

    var arrayTags = item.tags;
    for(var i  = 0; i < arrayTags.length; i++){
        var elem = arrayTags[i];
        var a = document.createElement("a");
        a.href = elem.url;
        
        a.innerText = elem.name;
        var isNotLastElem = (i + 1) < arrayTags.length;
        var separator = document.createTextNode(", ");
        tags.appendChild(a);
        if(isNotLastElem)
            tags.appendChild(separator);
    }
    divFooter.appendChild(tags);
    var comment = document.createElement("div");
    comment.classList = "comment";
    var a = document.createElement("a");
    a.classList = "comment-icon";
    a.href = item.comment_url;
    a.innerText = "Коментариев: " + item.comment_count;
    comment.appendChild(a);
    divFooter.appendChild(comment);
    return divFooter;
}

function getImageDiv(elem){
    var header = document.createElement("header");
    var img = document.createElement("img");
    var h2 = document.createElement("h2");
    var a = document.createElement("a");
    var a_span_auth =  a.cloneNode()
    var  a_h2 = a.cloneNode();

    var div_info_created  = document.createElement("div");    
    var time = document.createElement("time");
    var span_auth = document.createElement("span");    
    var span_tag =span_auth.cloneNode();
    var imageDiv = document.createElement("div");    
    
    a.classList = "link";
    h2.classList = "title";
    div_info_created.classList = "info-created";
    span_auth.classList = "author-icon";
    span_tag.classList = "tag-icon";
    imageDiv.className = "image";

    a.href = elem.url;    
    img.src = elem.img;
    img.alt = elem.img_alt;    
    a_h2.href = elem.url;
    a_h2.innerHTML  = elem.title;
    time.innerHTML = elem.data;   
    a_span_auth.href = elem.author_url;
    a_span_auth.title = "Автор: " + elem.author ;
    a_span_auth.innerHTML = elem.author;

    span_auth.appendChild(a_span_auth);

    for(var i = 0; i < elem.tag.length; i++){
        var tag = elem.tag[i];
        var a_span_tag = document.createElement("a");
        a_span_tag.href = tag.url;            
        
        a_span_tag.innerHTML = tag.name;
        span_tag.appendChild(a_span_tag);
        var isNotLastElem = elem.tag.length > i + 1;        
        var separator = document.createTextNode(", ");
        if (isNotLastElem)
            span_tag.appendChild(separator);
        
    }

    h2.appendChild(a_h2);
    header.appendChild(h2);
      
 
    div_info_created.appendChild(time);
    div_info_created.appendChild(span_auth);
    div_info_created.appendChild(span_tag);
    header.appendChild(div_info_created);
    imageDiv.appendChild(a);
    imageDiv.appendChild(img);
    imageDiv.appendChild(header);
    return imageDiv;
}

