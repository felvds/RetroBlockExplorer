// var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("https://mainnet.infura.io/v3/304540b5abcd4486a8f1e1e09e6317da"));

web3.eth.getBlockNumber()
    .then(LoadBlocks)
    .catch(err => console.info(err));

function LoadBlocks(lastblock) {
    var firstBlockNumber = document.querySelector("#firstBlockNumber");
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
    var descriptString = "Header:\n\n";
    var transactionString = "\nTransactions:\n\n"
    
    for (var field in blockData) {
        if (field != "uncles") {
            if (field != "transactions") {
                descriptString = descriptString.concat(field);
                descriptString = descriptString.concat(": ");
                descriptString = descriptString.concat(blockData[field]);
                descriptString = descriptString.concat("\n");
            } else {
                transactionString = transactionString.concat(blockData[field]);
                transactionString = transactionString.replace(/,/g,"\n");
            }
        }
    }
    divDescription.setAttribute("data-header",descriptString);
    divDescription.textContent = transactionString;
}

function buildLi(blockNumber) {
    var newLi = document.createElement("li");
    
    var newDivNumber = document.createElement("div");
    newDivNumber.classList.add("blockNumber");
    newDivNumber.textContent = blockNumber;
    newDivNumber.addEventListener("click", clickBlock);
    
    var newDivDescript = document.createElement("div");
    newDivDescript.classList.add("blockDescription");
    newDivDescript.textContent = "Block Description -- requesting..";
    newDivDescript.addEventListener("dblclick", clickDescription);
    
    newLi.appendChild(newDivNumber);
    newLi.appendChild(newDivDescript);
    
    return newLi;
}

