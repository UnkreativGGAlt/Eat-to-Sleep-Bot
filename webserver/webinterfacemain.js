const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require("body-parser");
const path = require('path')
const upload = require("express-fileupload")
var cookies = require("cookies")


class WebSocket {

    constructor(ownerids, port, client) {
        this.ownerids = ownerids
        this.port = port
        this.client = client
        this.app = express()

        this.app.engine('hbs', hbs({
            extname: 'hbs',                     
            defaultLayout: 'layout',            
            layoutsDir: __dirname + '/layouts'  
        }))
        this.app.set('views', path.join(__dirname, 'views'))
        this.app.set('view engine', 'hbs')
        this.app.use(express.static(path.join(__dirname, 'public')))
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(upload())
        this.app.use(cookies.express(["some", "random", "keys"]))


        this.registerRoots()

        
        this.server = this.app.listen(port, () => {
            console.log("Der Websocket läuft auf dem Port: " + this.server.address().port)
        })
    }



    registerRoots() {

        this.app.get('/download', (req, res) => {
            try {
            const file = `${__dirname}/public/${req.query.filename}`;
            res.download(file); // Set disposition and send it.
            }
            catch(e){
                res.render("error", {
                    title: "FEHLER",
                    error: e
                })
            }
        })
        this.app.get("/bot-pb", (req, res) => {
            res.redirect(this.client.user.displayAvatarURL)
        })

        this.app.get('/upload', (req, res) => {
            res.render("upload", {title: "_DM Host File System"})
        })
        this.app.post("/upload", (req, res) => {
            if (req.files){
                var file = req.files.filename,
                filename = file.name;
                file.mv(__dirname + "/public/" + filename, function(err){
                    if (err){
                        console.log(err)
                        res.render("error", {
                            title: "FEHLER",
                            error: err
                        })
                    }
                    else{
                        var link = "http://server.dustin-dm.de:6677/download?filename=" + filename
                        res.render("upload2", {
                            title: "Hochgeladen",
                            link: link
                        })
                        
                    }
                })
                
            }
            else{
                res.render("error", {
                    title: "FEHLER",
                    error: "user tried to upload an empty file(2345346)"
                })
            }
        })
    
    
    }

}

module.exports = WebSocket