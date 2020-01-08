var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var sqlite3 = require('sqlite3').verbose();
var template = require(`./view/template`);
 
var listSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs";
var db = new sqlite3.Database("db/bbs.db");

var app = http.createServer(function(req, res) {
    //console.log(req.url);
    var _url = req.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;
    //console.log(pathname);
    //console.log(queryData);

    if (pathname === '/') {
        if (queryData.title === undefined) {  // localhost:3000
            let navBar = template.navMain();
            let trs ='';
            db.all(listSql, function(err, rows){
                for(let row of rows){
                    trs += `<tr>;
                        <td>${row.id}</td><td>${row.title}</td>
                        <td>${row.writer}</td><td>${row.ts}</td><td>${row.hit}</td>
                        </tr>`
                }
            });     
            let html = template.Html(navBar,trs);
            res.writeHead(200);
            res.end(html);
        } else {        // localhost:3000/?title=xxx
            let title = queryData.title;
            let navBar = template.navList(title);
            fs.readdir('./data', function(err, files){
                let list = template.List(files);
                fs.readFile(`./data/${title}.txt`,'utf8',function(err, desc){
                let html = template.Html(list, navBar, title, desc);
                res.writeHead(200);
                res.end(html);
                });
               
            });
            
        }
    } else if (pathname === '/create') {
        fs.readdir('./data', function(err, files){
            let list = template.List(files);
            let navBar = template.navOp();
            let view = require('./view/create');
            let html = view.create(list,navBar);
            res.writeHead(200);
            res.end(html);
            })

    } else if (pathname === '/create_proc') {
        var body = '';
        req.on('data', function(data){
            body += data;
        });
        req.on('end', function(){
            let post = qs.parse(body);
            let title = post.title;
            let desc = post.desc;
            //console.log(title);
            //console.log(desc);
            fs.writeFile(`./data/${title}.txt`,desc,'utf8',function(err){
                res.writeHead(302, {Location:   `/?title=${title}`});
                res.end();
            });
        
        });
    } else if (pathname === '/update') {
        let title = queryData.title;
        fs.readdir('./data', function(err, files) {
            let list = template.List(files);
            let navBar = template.navOp();
            fs.readFile(`./data/${title}.txt`, 'utf8', function(err, desc) {
                let view = require('./view/update');
                let html = view.update(list, navBar, title, desc);
                res.writeHead(200);
                res.end(html);
            });
        });



    } else if (pathname === '/update_proc') {
        var body = '';
        req.on('data', function(data){
            body += data;
        });
        req.on('end', function(){
            let post = qs.parse(body);
            let oldTitle = post.oldTitle;
            let title = post.title;
            let desc = post.desc;
            fs.rename(  `./data/${oldTitle}.txt`, `./data/${title}.txt`, function(){
                fs.writeFile(`./data/${title}.txt`, desc, 'utf8', function(err){
                    res.writeHead(302, {Location: `/?title=${title}`});
                    res.end();
                });
            
            });
        
        });

    }
    else if (pathname === '/delete') {
        let title = queryData.title;
        fs.readdir('./data', function(err, files){
            let list = template.List(files);
            let navBar = template.navOp();
            let view = require('./view/delete');
            let html = view.delete(list, navBar,title);
                
            res.writeHead(200);
            res.end(html);
               
        });
     } 
     else if (pathname === '/delete_proc') {
            var body = '';
                req.on('data', function(data){
                body += data;
                 });
            req.on('end', function(){
                let post = qs.parse(body);
                let title = post.title;
                fs.unlink(`./data/${title}.txt`, function(){
                        res.writeHead(302, {Location: `/`});
                        res.end();
                });
            });   
        }else if (pathname === '/favicon.ico') {
        fs.readFile('nodejs.png', function(err, data) {
            res.statusCode = 200;
            res.setHeader('Content-type', 'image/png');      
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});
app.listen(3000);