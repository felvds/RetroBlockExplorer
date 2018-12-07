// var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("https://mainnet.infura.io/v3/304540b5abcd4486a8f1e1e09e6317da"));

web3.eth.getBlockNumber()
    .then(LoadBlocks)
    .catch(err => console.info(err));

function LoadBlocks(lastblock) {
    var firstBlockNumber = document.querySelector(".firstBlockNumber");
    firstBlockNumber.textContent = lastblock;
    
    var ulBlockchain = document.querySelector("#ulBlockchain");
    var i;
    for (i = 1; i < 100; i++) {
        ulBlockchain.appendChild(buildLi(lastblock - i));
    }

    web3.eth.getBlock(lastblock)
        .then(writeDescription)
        .catch(err => console.info(err));
}

function writeDescription (blockData) {
    var divDescription = document.querySelector(".selectedDescription");
    var descriptString = "Fields and Values:\n";
    
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

function buildLi(blockNumber) {
    var newLi = document.createElement("li");
    
    var newDivNumber = document.createElement("div");
    newDivNumber.classList.add("blockNumber");
    newDivNumber.textContent = blockNumber;
    
    var newDivDescript = document.createElement("div");
    newDivDescript.classList.add("blockDescription");
    newDivDescript.textContent = "Block Description -- requesting..";
    
    newLi.appendChild(newDivNumber);
    newLi.appendChild(newDivDescript);
    
    return newLi;
}

