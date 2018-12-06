document.querySelector("#ulBlockchain").addEventListener("click", function(event) {
    
    document.querySelectorAll(".blockDescription").forEach(function(blockDesc){
        blockDesc.classList.remove("selectedDescription");
    })
    
    var divDescrip = event.target.nextElementSibling;
    divDescrip.classList.add("selectedDescription");
    
    if (divDescrip.textContent == "Block Description -- requesting..") {
        web3.eth.getBlock(event.target.textContent).then(writeDescription);
    }
});

document.querySelector(".titles").addEventListener("click", function(event) {
    document.querySelector("#easterEgg").style.display = "block";
    setTimeout(function(){
        location.reload(true);
    }, 2000)
});