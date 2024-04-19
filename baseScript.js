    const effectLookup = {
        "S": {symbol:"⭐", color: "yellow"},
        "D": {symbol:"🗡️", color: "red"},
        "T": {symbol:"⏳", color: "blue"},
        "B": {symbol:"🛡️", color: "grey"},
        "R": {symbol:"🎲", color: "red"},
        "H": {symbol:"♥", color: "red"},
        "C": {symbol:"📋", color: "blue"},
        "P": {symbol:"🫧", color: "blue"},
        "E": {symbol:"✂"}
    }
    function checkImage(imageSrc, good, bad) {
        var img = new Image();
        img.onload = good; 
        img.onerror = bad;
        img.src = imageSrc;
    }

    function setImage(card) {
        if (card.Image === "" || card.Image === undefined) {
            
            card.Image = "./cardArt/" + card.Title + ".png";
        } else {
            card.Image = "";
        }

    }
        //replace /(\d)([A-Z])/g, "$1lookup[$2]"
    //apply to all fields in card
    //also replace ~ with card title
    function applyEffects(cards) {
        for (let card of cards) {
            for (let field in card) {
                if (typeof card[field] === "string") {
                    card[field] = card[field].replace(/((?:[+-]?\d+)|\\)([A-Z])/g, (match, p1, p2) => `${p1==="\\"? "": p1}${effectLookup[p2].symbol}`);
                    card[field] = card[field].replace(/~/g, card.Title);
                } else if (Array.isArray(card[field])) {
                    for (let i = 0; i < card[field].length; i++) {
                        card[field][i] = card[field][i].replace(/((?:[+-]?\d+)|\\)([A-Z])/g, (match, p1, p2) => `${p1==="\\"? "": p1}${effectLookup[p2].symbol}`);
                        card[field][i] = card[field][i].replace(/~/g, card.Title);
                    }
                }
            }
        }
    }

    function download(cards, name) {
        for (let i = 0; i < cards.length; i++) {
            domtoimage.toPng(document.getElementsByClassName("card")[i])
                .then(function (dataUrl) {
                    var link = document.createElement('a');
                    link.download = 'card' + name + "_" + i + '.png';
                    link.href = dataUrl;
                    link.click();
                })
                .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                });
        }
    }