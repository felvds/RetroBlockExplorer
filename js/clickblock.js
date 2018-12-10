document.querySelector("#firstBlockNumber").addEventListener("click", clickBlock);

function clickBlock(event) {
    document.querySelectorAll(".blockDescription").forEach(function(blockDesc){
        blockDesc.classList.remove("selectedDescription");
    })
    
    var divDescrip = event.target.nextElementSibling;
    divDescrip.classList.add("selectedDescription");
    
    if (divDescrip.textContent == "Block Description -- requesting..") {
        web3.eth.getBlock(event.target.textContent).then(writeDescription);
    }
}

document.querySelector(".titles").addEventListener("click", function(event) {
    document.querySelector("#easterEgg").style.display = "block";
    setTimeout(function(){
        location.reload(true);
    }, 2000);
});

document.querySelector(".blockDescription").addEventListener("dblclick", clickDescription);

function clickDescription (event) {
    web3.eth.getTransaction(getSelection().toString()).then(writeTransaction);
}

function writeTransaction (transacData) {
    var divDescription = document.querySelector(".selectedDescription");
    var transacString = "\n\nTransaction info:\n\n";
    
    for (var field in transacData) {
        transacString = transacString.concat(field);
        transacString = transacString.concat(": ");
        transacString = transacString.concat(transacData[field]);
        transacString = transacString.concat("\n");
    }
    divDescription.setAttribute("data-transaction",transacString);
    divDescription.scrollTo(0,divDescription.scrollHeight);
}