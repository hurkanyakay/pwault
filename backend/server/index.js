const express = require('express');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const compression = require('compression');

class WebServer {
  constructor(){
    this.name = 'WebServer'
    const PORT = process.env.BACKENDPORT || 4000;
    console.log("Initiating webserver at", PORT);

    this.app = express()
    this.app.listen(PORT)
    require('./routes/api')(this.app);

    if(isProd){
      const outputPath = __base + "../frontend/build"
      this.app.use(compression());
      this.app.use('/', express.static(outputPath));
      this.app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
    }

  }
}
module.exports = WebServer;
