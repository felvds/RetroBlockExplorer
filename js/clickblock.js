document.querySelector("#firstBlockNumber").addEventListener("click", clickBlock);

document.querySelector(".blockDescription").addEventListener("dblclick", clickDescription);

document.querySelector(".titles").addEventListener("click", function(event) {
    document.querySelector("#easterEgg").style.display = "block";
    setTimeout(function(){
        location.reload(true);
    }, 2000);
});

function clickBlock(event) {
    document.querySelectorAll(".blockLink").forEach(function(blockDesc){
        blockDesc.classList.remove("selectedLink");
    });
    
    var divLink = event.target.nextElementSibling;
    divLink.classList.add("selectedLink");
    
    document.querySelectorAll(".blockDescription").forEach(function(blockDesc){
        blockDesc.classList.remove("selectedDescription");
    });
    
    var blockNumber = event.target.textContent;
    var divDescription = document.querySelector(".Block" + blockNumber);
    
    if (divDescription == null) {
        buildDivDescription(blockNumber);
        web3.eth.getBlock(blockNumber)
            .then(writeDescription)
            .catch(err => console.info(err));
    } else {
        divDescription.classList.add("selectedDescription");
    }
    
    adjustHeight();
}

function clickDescription (event) {
    web3.eth.getTransaction(getSelection().toString())
        .then(writeTransaction)
        .catch(err => errGetTransaction(err));
}

function errGetTransaction (error) {
    console.info(error);
    alert("Something went wrong with this input - errors are in the console.");
}

function writeTransaction (transacData) {
    if (transacData == null) {
        alert("This hash probably isn't from a transaction... Sorry!");
    } else {
    var divDescription = document.querySelector(".selectedDescription");
    var transacString = "\n\nTransaction info:\n\n";
    
    for (var field in transacData) {
        transacString = transacString + field + ": " + transacData[field] + "\n";
    }
    
    divDescription.textContent = divDescription.textContent + transacString;
    divDescription.scrollTo(0,divDescription.scrollHeight);
    }
}

function buildDivDescription(blockNumber) {
    var newDivDescription = document.createElement("div");
    
    newDivDescription.classList.add("blockDescription");
    newDivDescription.classList.add("Block" + blockNumber);
    newDivDescription.classList.add("selectedDescription");
    newDivDescription.textContent = "Loading block description..";
    newDivDescription.addEventListener("dblclick", clickDescription);
    
    document.querySelector("#mainBlockchain").appendChild(newDivDescription);
}