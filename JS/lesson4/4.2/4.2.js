
function checkSpam(str){
    var lowStr = str.toLowerCase();
    console.log(lowStr.indexOf('spam') && lowStr.indexOf('sex'));
}


checkSpam('get new Sex videos');
checkSpam('[SPAM] How to earn fast money?');
checkSpam('New PSD template');