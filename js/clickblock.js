document.querySelector("#divBlockchain").addEventListener("click", function(event) {
    
    document.querySelectorAll(".blockLink").forEach(function(blockLink){
        blockLink.classList.remove("selectedBlockLink");
    })
    
    document.querySelectorAll(".blockDescription").forEach(function(blockDesc){
        blockDesc.classList.remove("selectedDescription");
    })
    
    var divLink = event.target.nextElementSibling;
    divLink.classList.add("selectedBlockLink");
    
    var divDescrip = divLink.nextElementSibling;
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