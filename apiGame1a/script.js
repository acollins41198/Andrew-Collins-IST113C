console.log("Loaded");
var cards = [];
var fullCardList = [];
var parsedCard;
var rawCard;
var totalPrice = 0;
var cardAmount = 0;


function cardViewModel(){
    this.totalPrice = totalPrice;
    this.deckSize = cards.length;
}

$("#searchCard").click(function(){
    var cardID = $("#idInput").val();
    var cardName = $("#nameInput").val().replace(" ","+");
    if (cardID != ""){
        $.get("https://api.scryfall.com/cards/multiverse/" + cardID, function (data){
                rawCard = data;
                var cardName = data.name;
                var cardCost = data.mana_cost;
                var cardImage = data.image_uris.normal;
                var cardPrice = data.usd;
                parsedCard = [cardName, cardCost, cardImage, cardPrice];
                console.log(parsedCard);
                setTempInfo(parsedCard);
        });
    } else if (cardName != ""){
        $.get("https://api.scryfall.com/cards/search?order=usd&q=" + cardName + "+-digital", function (data){
                rawCard = data.data[0];
                var cardName = data.data[0].name;
                var cardCost = data.data[0].mana_cost;
                var cardImage = data.data[0].image_uris.normal;
                var cardPrice = data.data[0].usd;
                parsedCard = [cardName, cardCost, cardImage, cardPrice];
                console.log(parsedCard);
                setTempInfo(parsedCard);
        });
    } else {
        console.log("Missing Input");
        return null;
    }
});

$("#addCard").click(function(){
    if(rawCard != null){
        var dominantType = getCardType(rawCard.type_line);
        var $card = $("#card-template .card").clone();
        var amount = Number($("#addQuantity").val());
        
        $("span.card-name", $card).text(rawCard.name);
        $("span.card-name", $card).append("<span class='tooltiptext'><img src='" + rawCard.image_uris.normal + "' height='350' width='250'></span>");
        $("span.card-mana", $card).append(processCost(rawCard.mana_cost));
        $("span.card-price", $card).text("$" + rawCard.usd);
        $("span.card-quantity", $card).text(amount);
        var totalPrice = (Number(rawCard.usd) * amount);
        $("span.total-price", $card).text("$" + totalPrice);
        
        
        $("button.remove", $card).click(function(){
            for (i = 0; i < cards.length; i++){
                if (cards[i][0] == $("span.card-name", $card).text()){
                    cards.splice(i, 1);
                }
            }
            calculatePrice();
            $card.remove();

        });
        
        var locationID = "#type" + dominantType;
        $(locationID).append($card);
        var baseInfo = [rawCard.name, totalPrice, amount];
        cards.push(baseInfo);
        calculatePrice();
    }
});

$("#exportFile").click(function(){
    var decklist = "";
    for (i = 0; i < cards.length; i++){
        decklist = decklist + cards[i][2] + " " + cards[i][0] + "\r\n";
    }
    console.log(decklist);
    download("decklist.txt", decklist);
});

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function calculatePrice(){
    totalPrice = 0;
    cardAmount = 0;
    for (i = 0; i < cards.length; i++){
        var cardPrice = cards[i][1];
        var thisQuantity = cards[i][2];
        totalPrice = (totalPrice + cardPrice);
        cardAmount = (cardAmount + Number(thisQuantity));
    }
    $("#totalValue").html(totalPrice.toFixed(2));
    $("#totalCards").html(cardAmount);
}

function getCardType(typeLine){
    var bestType;
    var types = typeLine.split(" ");
    console.log(types);
    if (types.includes("Artifact")){
        bestType = "Artifact";
    }
    if (types.includes("Enchantment")){
        bestType = "Enchantment";
    }
    if (types.includes("Land")){
        bestType = "Land";
    }
    if (types.includes("Instant") || types.includes("Sorcery")){
        bestType = "Spell";
    }
    if (types.includes("Planeswalker")){
        bestType = "Planeswalker";
    }
    if (types.includes("Creature")){
        bestType = "Creature";
    }
    console.log(bestType);
    if (bestType != null){
        return bestType;
    } else {
        return "Unknown";
    }
}

function processCost(manaCost){
    var fixedCost = manaCost.replace(/{/g,'<i class="ms ms-');
    fixedCost = fixedCost.replace(/}/g,' ms-cost"></i>');
    fixedCost = fixedCost.toLowerCase();
    return fixedCost;
}

function setTempInfo(parsedCard){
    $("#tempName").html(parsedCard[0]);
    $("#tempPrice").html("$" + parsedCard[3]);
    $("#tempImage").attr("src", parsedCard[2]);
    if(parsedCard[3] == null){
        $("#tempPrice").html("Could not fetch card price");
    }
}
