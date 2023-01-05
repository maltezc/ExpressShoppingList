const app = require("./app")

const localPort = 3000
app.listen(localPort, function () {
    console.log(`web server is up and running on http://localhost:${localPort}/`)
})