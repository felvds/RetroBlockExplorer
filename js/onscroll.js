document.querySelector("#bodyBlockchain").onscroll = function() {
    var ulBlockchain = document.querySelector("#ulBlockchain");
    var nBlocks = ulBlockchain.children.length - 1;
    var lastLi = ulBlockchain.children[nBlocks];
    var blockNumber = lastLi.children[0].textContent - 1;
    
    ulBlockchain.appendChild(buildLi(blockNumber));
}
