function readJSON(a) { var b = new XMLHttpRequest; b.open("GET", a, !1); b.send(null); if (200 == b.status) return b.responseText } window.onload = function () { var a = readJSON("json/blogs.json"), a = JSON.parse(a), b = document.getElementById("content"); a.forEach(function (a) { b.appendChild(createItem(a)) }, this) }; function createItem(a) { var b = imageDiv = footerItem = document.createElement("div"); b.className = "item"; b.appendChild(getImageDiv(a)); b.appendChild(getAcricle(a)); b.appendChild(getFooter(a)); return b }
function getAcricle(a) { return parseArticle(a.article) }
function parseArticle(a) {
    var b = RegExp(/'.+?'\(.+?\)/g), e = RegExp(/'.+?'/g), d = RegExp(/\(.+?\)/g), k = document.createElement("article"); a = a.split(/\t/g); for (var c = 0; c < a.length; c++) {
        for (var f = a[c], l = f.split(b), n = f.match(e), f = f.match(d), m = document.createElement("p"), g = 0; g < l.length; g++) {
            var h = document.createElement("span"); h.innerText = l[g]; m.appendChild(h); n && n.length > g && f.length > g && (h = document.createElement("a"), h.title = n[g].replace(/'/g, ""), h.innerHTML = n[g].replace(/'/g, ""), h.href = f[g].replace(/\(|\)/,
                ""), m.appendChild(h))
        } k.appendChild(m)
    } return k
}
function getFooter(a) {
    var b = document.createElement("div"); b.classList = "footer-item"; var e = document.createElement("div"); e.classList = "tags"; var d = document.createElement("span"); d.classList = "tags-icon"; e.appendChild(d); for (var k = a.tags, c = 0; c < k.length; c++) { var f = k[c], d = document.createElement("a"); d.href = f.url; d.innerText = f.name; var f = c + 1 < k.length, l = document.createTextNode(", "); e.appendChild(d); f && e.appendChild(l) } b.appendChild(e); e = document.createElement("div"); e.classList = "comment"; d = document.createElement("a");
    d.classList = "comment-icon"; d.href = a.comment_url; d.innerText = "\u041a\u043e\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0435\u0432: " + a.comment_count; e.appendChild(d); b.appendChild(e); return b
}
function getImageDiv(a) {
    var b = document.createElement("header"), e = document.createElement("img"), d = document.createElement("h2"), k = document.createElement("a"), c = k.cloneNode(), f = k.cloneNode(), l = document.createElement("div"), n = document.createElement("time"), m = document.createElement("span"), g = m.cloneNode(), h = document.createElement("div"); k.classList = "link"; d.classList = "title"; l.classList = "info-created"; m.classList = "author-icon"; g.classList = "tag-icon"; h.className = "image"; k.href = a.url; e.src = a.img; e.alt = a.img_alt;
    f.href = a.url; f.innerHTML = a.title; n.innerHTML = a.data; c.href = a.author_url; c.title = "\u0410\u0432\u0442\u043e\u0440: " + a.author; c.innerHTML = a.author; m.appendChild(c); for (c = 0; c < a.tag.length; c++) { var q = a.tag[c], p = document.createElement("a"); p.href = q.url; p.innerHTML = q.name; g.appendChild(p); q = a.tag.length > c + 1; p = document.createTextNode(", "); q && g.appendChild(p) } d.appendChild(f); b.appendChild(d); l.appendChild(n); l.appendChild(m); l.appendChild(g); b.appendChild(l); h.appendChild(k); h.appendChild(e); h.appendChild(b);
    return h
};