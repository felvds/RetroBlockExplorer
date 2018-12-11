document.querySelector("#bodyBlockchain").onscroll = function() {
    adjustHeight();

    var ulBlockchain = document.querySelector("#ulBlockchain");
    var nBlocks = ulBlockchain.children.length - 1;
    var lastLi = ulBlockchain.children[nBlocks];
    var blockNumber = lastLi.children[0].textContent - 1;
    
    ulBlockchain.appendChild(buildLi(blockNumber));
}

function adjustHeight() {
    var blockDesc = document.querySelector(".selectedDescription");
    
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        blockDesc.classList.add("fullHeight");
    } else {
        blockDesc.classList.remove("fullHeight");
    }
}