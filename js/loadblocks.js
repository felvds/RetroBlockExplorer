// var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("https://mainnet.infura.io/v3/304540b5abcd4486a8f1e1e09e6317da"));

web3.eth.getBlockNumber()
    .then(LoadBlocks)
    .catch(err => console.info(err));

function LoadBlocks(blockNumber) {
    var ulBlockchain = document.querySelector("#ulBlockchain");
    var i;
    for (i = 1; i < 100; i++) {
        ulBlockchain.appendChild(buildLi(blockNumber - i));
    }
    
    document.querySelector("#firstBlockNumber").textContent = blockNumber;
    
    web3.eth.getBlock(blockNumber)
        .then(writeDescription)
        .catch(err => console.info(err));
    
    document.querySelector(".selectedDescription").classList.add("Block" + blockNumber);
}

function writeDescription (blockData) {
    var divDescription = document.querySelector(".selectedDescription");
    var descriptString = "Header:\n\n";
    var transactionString = "\nTransactions - doubleclick to see more info:\n\n"
    
    for (var field in blockData) {
        if (field != "uncles") {
            if (field != "transactions") {
                descriptString = descriptString + field + ": " + blockData[field] + "\n";
            } else {
                transactionString = transactionString + blockData[field];
                transactionString = transactionString.replace(/,/g,"\n");
            }
        }
    }
    divDescription.textContent = descriptString + transactionString;
}

function buildLi(blockNumber) {
    var newLi = document.createElement("li");
    
    var newDivNumber = document.createElement("div");
    newDivNumber.classList.add("blockNumber");
    newDivNumber.textContent = blockNumber;
    newDivNumber.addEventListener("click", clickBlock);
    
    var newDivLink = document.createElement("div");
    newDivLink.classList.add("blockLink");
    
    newLi.appendChild(newDivNumber);
    newLi.appendChild(newDivLink);
    
    return newLi;
}

