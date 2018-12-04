// var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("https://mainnet.infura.io/v3/304540b5abcd4486a8f1e1e09e6317da"));

web3.eth.getBlockNumber()
    .then(LoadBlocks)
    .catch(err => console.info(err));

function LoadBlocks(lastblock) {
    var lastBlockquotes = document.querySelectorAll(".blockNumber");
    var i = 0;
    
    lastBlockquotes.forEach(function (lastBlockquote){
        lastBlockquote.textContent = lastblock - i;
        i = i + 1;
    });
    
    var blockContent = web3.eth.getBlock(lastblock)
        .then(writeDescription)
        .catch(err => console.info(err));
}

function writeDescription (blockData) {
    var divDescription = document.querySelector(".selectedDescription");
    var descriptString = "";
    
    for (var field in blockData) {
        if (field != "transactions" && field != "uncles") {
            descriptString = descriptString.concat(field);
            descriptString = descriptString.concat(": ");
            descriptString = descriptString.concat(blockData[field]);
            descriptString = descriptString.concat("\n");
        }
    }
    
    divDescription.textContent = descriptString;
}

// console.log(web3.eth.getBlock(web3.eth.blockNumber)
//var dataArray = Object.keys(blockData);
