const express = require('express')

const bodyParser = require("body-parser");
const path = require('path')
var expressLayouts = require('express-ejs-layouts');
var cookies = require("cookies")


class WebSocket {

    constructor(ownerids, port, client) {
        this.ownerids = ownerids
        this.port = port
        this.client = client
        this.app = express()

        this.app.set('views', path.join(__dirname, 'views'))
        this.app.set('view engine', 'ejs');
        this.app.use(expressLayouts)
        this.app.use(express.static(path.join(__dirname, 'public')))
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cookies.express(["some", "random", "keys"]))


        this.registerRoots()

        
        this.server = this.app.listen(port, () => {
            console.log("Der Websocket läuft auf dem Port: " + this.server.address().port)
        })
    }



    registerRoots() {

        this.app.get("/bot-pb", (req, res) => {
            res.redirect(this.client.user.displayAvatarURL)
        })

        this.app.get("/online", (req,res) => {
            res.render("index")
        })

        this.app.get("/server-pb", (req, res) => {
            res.redirect(this.client.guilds.get("585511241628516352").iconURL)
        })

      
    
    
    }

}

module.exports = WebSocket