console.log("Loaded");

$("#searchCard").click(function(){
    var cardFetcher;
    var cardID = $("#idInput").val();
    var cardName = $("#nameInput").val().replace(" ","+");
    var parsedCard;
    if (cardID != ""){
        $.get("https://api.scryfall.com/cards/multiverse/" + cardID, function (data){
                var cardName = data.name;
                var cardCost = data.mana_cost;
                var cardImage = data.image_uris.normal;
                var cardPrice = data.usd;
                parsedCard = [cardName, cardCost, cardImage, cardPrice];
                console.log(parsedCard);
                setTempInfo(parsedCard);
        });
    } else if (cardName != ""){
        $.get("https://api.scryfall.com/cards/named?fuzzy=" + cardName, function (data){
                var cardName = data.name;
                var cardCost = data.mana_cost;
                var cardImage = data.image_uris.normal;
                var cardPrice = data.usd;
                parsedCard = [cardName, cardCost, cardImage, cardPrice];
                console.log(parsedCard);
                setTempInfo(parsedCard);
        });
    } else {
        console.log("Missing Input");
        return null;
    }
})

function setTempInfo(parsedCard){
    $("#tempName").html(parsedCard[0]);
    $("#tempPrice").html("$" + parsedCard[3]);
    $("#tempImage").attr("src", parsedCard[2]);
}