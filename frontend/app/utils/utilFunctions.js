export function validateEmail(email) {
  if(email.length > 0){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }else{
    return true;
  }
}
export function validateWebsite(url){
  var re = /^(ftp|http|https):\/\/[^ "]+$/;
  return re.test(url);
}

export function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';

  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
  } catch (err) {
    console.log('Oops, unable to copy', err);
  }
  document.body.removeChild(textArea);
}


export function password_generator( len, stringBool, numericBool, punctuationBool ) {
     var length = (len)?(len):(10);
     if(!stringBool && !numericBool && !punctuationBool){
       return '';
     }
     var string = "abcdefghijklmnopqrstuvwxyz"; //to upper
     var numeric = '0123456789';
     var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
     var password = "";
     var character = "";
     while( password.length<length ) {
         var entity1 = Math.ceil(string.length * Math.random()*Math.random());
         var entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
         var entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
         var hold = string.charAt( entity1 );
         hold = (entity1%2==0)?(hold.toUpperCase()):(hold);
         if(stringBool) character += hold;
         if(numericBool) character += numeric.charAt( entity2 );
         if(punctuationBool) character += punctuation.charAt( entity3 );

         password = character;
     }
     return password;
 }

 export function extractHostname(url) {
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
 export function extractRootDomain(url) {
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
