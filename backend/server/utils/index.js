const request = require('request');

function getFavRequest(website){
  return new Promise((resolve, reject)=>{
    var requestSettings = {
        url: 'https://plus.google.com/_/favicon?domain_url='+website,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function(error, response, body) {
      if(error){
        reject(error);
      }
      resolve(body.toString('base64'))
    });
  })
}


function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf("://") > -1) {
      hostname = url.split('/')[2];
  }
  else {
      hostname = url.split('/')[0];
  }
  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];
  return hostname;
}

function extractRootDomain(url) {
  var domain = extractHostname(url),
      splitArr = domain.split('.'),
      arrLen = splitArr.length;
  //extracting the root domain here
  //if there is a subdomain
  if (arrLen > 2) {
      domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
      //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
      if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
          //this is using a ccTLD
          domain = splitArr[arrLen - 3] + '.' + domain;
      }
  }
  return domain;
}

function containsRegex(a, regex){
  var nameSearch = []
  var siteSearch = []
  for(var i = 0; i < a.length; i++) {
    var pos = a[i].name.search(regex);
    if(pos > -1){
      nameSearch.push(a[i])
    }
    var posW = a[i].website.search(regex);
    if(posW > -1){
      siteSearch.push(a[i])
    }
  }
  return { nameSearch, siteSearch }
}

module.exports = {
  getFavRequest,
  containsRegex,
  extractHostname,
  extractRootDomain
}