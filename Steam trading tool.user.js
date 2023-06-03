// ==UserScript==
// @name         Steam trading tool
// @version      1.0
// @author       ^^Mojżesz^^
// @description  Automating trade offer preapartion process.
// @match        https://steamcommunity.com/tradeoffer/new/*
// ==/UserScript==

function selectTheirInventory(){
    const theirTab = document.getElementById('inventory_select_their_inventory');
    theirTab.click()
}

function selectYourInventory(){
    const yourTab = document.getElementById('inventory_select_your_inventory');
    yourTab.click()
}

function getItems(tag, count){
    if(tag.includes("them")){
        selectTheirInventory();
    }
    else{
        selectYourInventory();
    }
    const itemCheckbox = document.getElementById(tag);
    itemCheckbox.click();

    const itemInput = document.getElementById('Txt_Num');
    itemInput.value = count

    const takeAllButton = document.getElementById('Bt_TakeAll');
    takeAllButton.click();
    selectYourInventory();
}

function getFinalItemCount(){
    const detailsText = document.getElementById('divDetail').textContent;
    return detailsText.replace("Your items (0):Their items (", "").split(")")[0];
}

function getGems(){
    const observerGemsInput = new MutationObserver(function(){

        const gemsInput = document.getElementById('trade_currency_input');
        if(gemsInput){
            observerGemsInput.disconnect();
            const gemsConfirmButton = document.getElementsByClassName('btn_green_steamui btn_medium')[0];
            const gemsPrice = getFinalItemCount() * 11
            gemsInput.value = gemsPrice + 20 - (gemsPrice % 20);
            gemsConfirmButton.click();
        }
    });
    observerGemsInput.observe(document, {childList: true, subtree: true});
}

function confirmTrade(){
    const confirmDiv = document.getElementById('you_notready');
    confirmDiv.click();
    const makeOfferDiv = document.getElementById('trade_confirmbtn');
    makeOfferDiv.click();
}

(function() {
    'use strict';

    const panelColorTheme = "#171a21";
    const backgroundColorTheme = "#171a21";
    const additionalColor = "#FFFFFF";

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const photos = ["IMAGE URLS"]; //Paste here background image urls

    // const photoNumber = getRandomInt(photos.length); // Uncomment this line and change "photos index" to "photoNumber" to load a random image whenever the page loads.
    const myImg = photos[0];

    const buttonStyle = `margin-top: 20px; padding: 5px; width: 90%; color: white; background: ${panelColorTheme}AA; border: 1px solid ${additionalColor}50; border-radius: 5px`;
    const tags = {
        "cards": "tag_filter_them_753_0_item_class_item_class_2",
        "backgrounds": "tag_filter_them_753_0_item_class_item_class_3",
        "emotes": "tag_filter_them_753_0_item_class_item_class_4",
        "boosters": "tag_filter_them_753_0_item_class_item_class_5",
        "gems": "tag_filter_753_0_item_class_item_class_7"
    };
    let itemsCount;
    selectTheirInventory();

    const infoDiv = document.createElement('div');
    infoDiv.style = `margin-top: 10px; padding: 5px; width: 85%; color: white; background-color: ${panelColorTheme}FF; border: 1px solid ${additionalColor}AA; border-radius: 5px; display: flex; flex-direction: column; align-items: center;`;

    const observerLabels = new MutationObserver(function(){

        const itemCardCheckbox = document.getElementById(tags.cards);

        if(itemCardCheckbox){
            observerLabels.disconnect();
            itemsCount = {
                "cards": 0,
                "backgrounds": 0,
                "emotes": 0,
                "boosters": 0
            };

            const itemCardLabel = itemCardCheckbox.labels[0];
            itemsCount.cards = parseInt(itemCardLabel.getElementsByTagName('span')[0].innerText.slice(2, -1));

            const cardsSpan = document.createElement('span');
            cardsSpan.innerHTML = `Cards: <b>${itemsCount.cards}</b>`;
            infoDiv.appendChild(cardsSpan)

            const itemBackgroundCheckbox = document.getElementById(tags.backgrounds);
            if(itemBackgroundCheckbox){
                const itemBackgroundLabel = itemBackgroundCheckbox.labels[0];
                itemsCount.backgrounds = parseInt(itemBackgroundLabel.getElementsByTagName('span')[0].innerText.slice(2, -1));

                const backgroundsSpan = document.createElement('span');
                backgroundsSpan.innerHTML = `Backgrounds: <b>${itemsCount.backgrounds}</b>`;
                infoDiv.appendChild(backgroundsSpan);
            }
            else console.log("[ERROR] - no backgrounds")


            const itemEmoteCheckbox = document.getElementById(tags.emotes);
            if(itemEmoteCheckbox){
                const itemEmoteLabel = itemEmoteCheckbox.labels[0];
                itemsCount.emotes = parseInt(itemEmoteLabel.getElementsByTagName('span')[0].innerText.slice(2, -1));

                const emotesSpan = document.createElement('span');
                emotesSpan.innerHTML = `Emotes: <b>${itemsCount.emotes}</b>`;
                infoDiv.appendChild(emotesSpan);
            }
            else console.log("[ERROR] - no emotes")

            const itemBoosterCheckbox = document.getElementById(tags.boosters);
            if(itemBoosterCheckbox){
                const itemBoosterLabel = itemBoosterCheckbox.labels[0];
                itemsCount.boosters = parseInt(itemBoosterLabel.getElementsByTagName('span')[0].innerText.slice(2, -1));

                const boostersSpan = document.createElement('span');
                boostersSpan.innerHTML = `Boosters: <b>${itemsCount.boosters}</b>`;
                infoDiv.appendChild(boostersSpan);
            }
            else console.log("[ERROR] - no boosters");

        }
    });
    observerLabels.observe(document, {childList: true, subtree: true});
    selectYourInventory();

    const observerPage = new MutationObserver(function(){
        const pageContent = document.getElementsByClassName('responsive_page_template_content')[0];
        console.log('observerPage')

        if (pageContent){
            observerPage.disconnect();
            pageContent.style = `background-image: linear-gradient(to bottom, ${backgroundColorTheme}, ${additionalColor}01, ${backgroundColorTheme}), url(${myImg}); background-size: 100% 1152px;`;
        }
    })
    observerPage.observe(document, {childList: true, subtree: true});

    const observerTradeArea = new MutationObserver(function(){

        const tradeBoxes = document.getElementsByClassName('trade_box');
        const tradeContents = document.getElementsByClassName('trade_box_contents');
        const tradeSeparators = document.getElementsByClassName('trade_rule');
        const logChatEntry = document.getElementsByClassName('log_chat_entry_area')[0];
        const textArea = document.getElementById('trade_offer_note');

        if ( tradeBoxes && tradeContents && tradeSeparators && logChatEntry && textArea){
            observerTradeArea.disconnect();

            for(let tradeBox of tradeBoxes){
                tradeBox.style = `background: ${panelColorTheme}AA;`;
            }
            for(let tradeContent of tradeContents){
                tradeContent.style = `background: ${panelColorTheme}AA;`;
            }
            for(let tradeSeparator of tradeSeparators){
                tradeSeparator.style = "background: none;";
            }
            logChatEntry.style = "background: none;";
            textArea.style = `background: ${panelColorTheme}AA`;
        }
    })
    observerTradeArea.observe(document, {childList: true, subtree: true});

    const observerRightPanel = new MutationObserver(function(){
        const rightPanel = document.getElementsByClassName('right-panel')[0];
        const tradePanels = document.getElementsByClassName('tradePanel');
        if(rightPanel && tradePanels.length >= 5){
            console.log(tradePanels);
            observerRightPanel.disconnect();
            for(let tradePanel of tradePanels){
                tradePanel.style = `background: ${panelColorTheme}AA; border: 1px solid ${additionalColor}50; border-radius: 5px`;
            }
            tradePanels[0].style = "display: none";
        }
    })
    observerRightPanel.observe(document, {childList: true, subtree: true});

    const observerLeftPanel = new MutationObserver(function(){
        const leftPanel = document.getElementsByClassName('left-panel')[0];
        console.log('observerPage')

        if (leftPanel){

            observerLeftPanel.disconnect();
            leftPanel.style = `background: ${panelColorTheme}AA; align-items: center; border: 1px solid ${additionalColor}50; border-radius: 5px`;
            const sponsorPanel = document.getElementsByClassName('left-panel_sponsor')[0];
            sponsorPanel.style = "display: none";
            const sponsorMsg = document.getElementsByClassName('left-panel_subtitle sih-subscribe-donat')[0];
            sponsorMsg.style = "display: none";


            const halfCardsButton = document.createElement('button');
            halfCardsButton.innerHTML = "Half of Cards";
            halfCardsButton.className = "func_button";

            halfCardsButton.onclick = function(){
                selectTheirInventory();
                getItems(tags.cards, itemsCount.cards / 2);
            }

            const backgroundsButton = document.createElement('button');
            backgroundsButton.innerHTML = "Backgrounds";
            backgroundsButton.className = "func_button";

            backgroundsButton.onclick = function(){
                getItems(tags.backgrounds, itemsCount.backgrounds);
            }

            const emotesButton = document.createElement('button');
            emotesButton.innerHTML = "Emotes";
            emotesButton.className = "func_button";

            emotesButton.onclick = function(){
                getItems(tags.emotes, itemsCount.emotes);
            }

            const boostersButton = document.createElement('button');
            boostersButton.innerHTML = "Boosters";
            boostersButton.className = "func_button";

            boostersButton.onclick = function(){
                getItems(tags.boosters, 1);
            }

            const allCardsButton = document.createElement('button');
            allCardsButton.innerHTML = "All Cards";
            allCardsButton.className = "func_button";

            allCardsButton.onclick = function(){
                getItems(tags.cards, itemsCount.cards);
            }

            const getGemsButton = document.createElement('button');
            getGemsButton.innerHTML = "Get Gems";
            getGemsButton.className = "func_button";

            getGemsButton.onclick = function(){
                getItems(tags.gems, 1);
                getGems();
            }

            const confirmTradeButton = document.createElement('button');
            confirmTradeButton.innerHTML = "Confirm Trade";
            confirmTradeButton.className = "func_button";

            confirmTradeButton.onclick = function(){
                confirmTrade();
            }

            leftPanel.appendChild(infoDiv);

            const observerSpans = new MutationObserver(function(){
                const spansList = infoDiv.getElementsByTagName('span');

                if(spansList && itemsCount.cards > 0){
                    observerSpans.disconnect();
                    leftPanel.insertBefore(halfCardsButton, infoDiv);

                    if(itemsCount.backgrounds > 0) leftPanel.insertBefore(backgroundsButton, infoDiv);
                    if(itemsCount.emotes > 0) leftPanel.insertBefore(emotesButton, infoDiv);
                    if(itemsCount.boosters > 0) leftPanel.insertBefore(boostersButton, infoDiv);

                    leftPanel.insertBefore(allCardsButton, infoDiv);
                    leftPanel.insertBefore(getGemsButton, infoDiv);
                    leftPanel.appendChild(confirmTradeButton);

                    const buttons = document.getElementsByClassName('func_button');

                    for(let button of buttons){
                        button.style = buttonStyle;

                        button.onmouseover = function(){
                            button.style.background = `linear-gradient(45deg, #06BFFF45 0%, #2D73FF45 100%)`;
                            button.style.cursor = "pointer";
                        }
                        button.onmouseleave = function(){
                            button.style.background = `${panelColorTheme}AA`;
                            button.style.color = `${additionalColor}`;
                        }
                    }
                }
            });
            observerSpans.observe(infoDiv, {childList: true, subtree: true});
        }
    });
    observerLeftPanel.observe(document, {childList: true, subtree: true});
})();