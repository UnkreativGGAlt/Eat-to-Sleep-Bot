var express = require('express');
const OAuthClientDiscord = require("disco-oauth")
var router = express.Router();

let OAuthClient = new OAuthClientDiscord("585521607875756042", "s4aitv5PbZf7696b0kx0z2-6qR7goToA")
OAuthClient.setScopes(["identify", "email", "guilds"])
OAuthClient.setRedirect("http://localhost:3000/login")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: "OAuth Discord",
dclogin: OAuthClient.getAuthCodeLink()
});
});

router.get("/login/", async (req, res) => {
  let code = req.query.code;
  if (code == undefined == false){
   let userkey = await OAuthClient.getAccess(code).catch(console.error);
   res.cookies.set("key", userkey)

   res.redirect("/")
  }
  else{
  let error = req.query.error;
    if (error == undefined == false){
      if (error == ("access_denied")){
        res.render("loginerror",{
          ü: "Erlaubniss zur Datenverarbeitung von Discord abgelehnt",
          t: "Kein Problem. Wenn du nicht möchtest das die Webseite und der Bot deine Daten für einkaufe des Shops verwenden können wir das verstehen. Allerdings müssen wir dir dann denn Zugriff zum Shop verweigern. Du wirst in kürze erneut auf die Discord Seite zurückgeleitet",
          time: 20000
        })
      }
      else{res.render("loginerror",{
        ü: "Discord API Error",
        t: `Du wirst in kürze erneut auf die Discord Seite zurückgeleitet\n\nSolltest du Hilfe benötigen, Kontaktiere Dustin und teile ihm diesen Error Code mit:\n\n\n\"${error}\"`,
        time: 10000
      })}

    }
    else{
      res.render("loginerror",{
        ü: "Kein Discord-API Code gefunden...",
        t: "Du wirst in kürze auf die Discord Seite geleitet",
        time: 10000
      })
    }
  }
})

router.get("/user/", async (req, res)=>{
  let key = req.cookies.get("key")
  if (key){

   try {
    let user = await OAuthClient.getAuthorizedUser(key)
  

   let guilds = await OAuthClient.getAuthorizedUserGuilds(key)
   


    res.render("user", {
      name: user.username,
      id: user.id,
      g: guilds,
      avatar: user.avatar
    })
   
  } catch (e) {
    res.render("loginerror",{
      ü: "Fehler: " + e,
      t: "Du wirst in kürze auf die Discord Seite geleitet um dich erneut anzumelden",
      time: 10000
    })
  }
   
  }
  else{
    res.render("loginerror",{
      ü: "Login Cookie nicht gefunden",
      t: "Du bist nicht eingeloggt. Sorryyyy. Du wirst in 15 Sekunden zu einem Discord Login weitergeleitet",
      time: 20000
    })
  }
})


module.exports = router;
