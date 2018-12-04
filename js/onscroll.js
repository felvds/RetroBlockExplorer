document.querySelector("#bodyBlockchain").onscroll = function() {
    var ulBlockchain = document.querySelector("#ulBlockchain");
    var nBlocks = ulBlockchain.children.length - 1;
    var lastLi = ulBlockchain.children[nBlocks];
    var blockNumber = lastLi.children[0].textContent - 1;
    
    ulBlockchain.appendChild(buildLi(blockNumber));
}

function buildLi(blockNumber) {
    var newLi = document.createElement("li");
    
    var newDivNumber = document.createElement("div");
    newDivNumber.classList.add("blockNumber");
    newDivNumber.textContent = blockNumber;
    
    var newDivLink = document.createElement("div");
    newDivLink.classList.add("blockLink");
    
    var newDivDescript = document.createElement("div");
    newDivDescript.classList.add("blockDescription");
    newDivDescript.textContent = "Block Description -- requesting..";
    
    newLi.appendChild(newDivNumber);
    newLi.appendChild(newDivLink);
    newLi.appendChild(newDivDescript);
    
    return newLi
};
