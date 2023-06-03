// ==UserScript==
// @name         Beautiful Steam Inventory
// @version      1.0
// @author       ^^Mojżesz^^
// @description  Makes your inventory looks better.
// @match        https://steamcommunity.com/*/inventory*
// ==/UserScript==

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

    const observerPage = new MutationObserver(function(){
        const pageContent = document.getElementsByClassName('pagecontent no_header no_footerpad')[0];
        console.log('observerPage')

        if (pageContent){
            observerPage.disconnect();
            pageContent.style = `background-color: ${backgroundColorTheme}; background-image: linear-gradient(to bottom, ${backgroundColorTheme}, ${additionalColor}01, ${backgroundColorTheme}), url(${myImg}); background-size: cover;`;
        }
    })
    observerPage.observe(document, {childList: true, subtree: true});

    const observerCsgoItems = new MutationObserver(function(){
        const itemDescContents = document.getElementsByClassName('item_desc_content app730');
        console.log('observerCsgoItems')

        if (itemDescContents[0]){
            for (let itemDescContent of itemDescContents){
                itemDescContent.style = `background: ${panelColorTheme}80; border: none`;
            }
            setTimeout(function disconnectObserver(){
                observerCsgoItems.disconnect();
                console.log('observerCsgoItems - disconnected')
            }, 1000)
        }
    })
    observerCsgoItems.observe(document.getElementsByClassName('inventory_page_right')[0], {childList: true, subtree: true});

    const observerSteamItems = new MutationObserver(function(){
        const itemDescContents = document.getElementsByClassName('item_desc_content app753');
        console.log('observerSteamItems')

        if (itemDescContents[0]){
            for (let itemDescContent of itemDescContents){
                itemDescContent.style = `background: ${panelColorTheme}80`;
            }
            setTimeout(function disconnectObserver(){
                observerSteamItems.disconnect();
                console.log('observerSteamItems - disconnected')
            }, 1000)
        }
    })
    observerSteamItems.observe(document.getElementsByClassName('inventory_page_right')[0], {childList: true, subtree: true});

    const observerSihGiveaways = new MutationObserver(function(){
        const giveawayPanel = document.getElementsByClassName('inventory_links sih_panel_mode row')[0];
        const bgPanel = document.getElementsByClassName('sih_bg')[0];
        const dcPanel = document.getElementsByClassName('row sih_skins_giveaway')[0];
        const sihOnButton = document.getElementsByClassName('row row sih_status_container')[0];
        console.log('observerSihGiveaways')

        if (giveawayPanel && bgPanel && dcPanel && sihOnButton){
            observerSihGiveaways.disconnect();
            giveawayPanel.style = `background: ${panelColorTheme}AA; border: 1px solid ${panelColorTheme}01`;
            bgPanel.style = `background: none; border: 1px solid ${panelColorTheme}01`;
            dcPanel.style = `display: none;`;
            sihOnButton.style = `background: ${panelColorTheme}DF; border: 1px solid ${panelColorTheme}01`;
        }
    })
    observerSihGiveaways.observe(document, {childList: true, subtree: true});

    const observerInventoriesTabs = new MutationObserver(function(){
        const rowSeparators = document.getElementsByClassName('games_list_tab_row_separator');
        const colSeparators = document.getElementsByClassName('games_list_tab_separator');
        const tabs = document.getElementsByClassName('games_list_tab');
        const tabsContainer = document.getElementsByClassName('games_list_tabs_ctn responsive_hidden')[0];
        console.log('observerInventoriesTabs')

        if (rowSeparators && colSeparators && tabs && tabsContainer){
            observerInventoriesTabs.disconnect();
            for (let separator of rowSeparators) separator.style = "display: none";
            for (let separator of colSeparators) separator.style = "display: none";
            for (let tab of tabs) tab.style = `background: ${panelColorTheme}DF; border: 1px solid ${panelColorTheme}FF`;
            tabsContainer.style = `background: ${panelColorTheme}01; border: 1px solid ${panelColorTheme}01`;
        }
    })
    observerInventoriesTabs.observe(document, {childList: true, subtree: true});

    const observerHeaderTexture = new MutationObserver(function(){
        const profileHeader = document.getElementsByClassName('profile_small_header_texture')[0];
        console.log('observerHeaderTexture')

        if (profileHeader){
            observerHeaderTexture.disconnect();
            profileHeader.style = `background: ${panelColorTheme}01; border: 1px solid ${panelColorTheme}01`;
        }
    })
    observerHeaderTexture.observe(document, {childList: true, subtree: true});

    const observerDonatePanel = new MutationObserver(function(){
        const donatePanel = document.getElementsByClassName('sih-subscribe-donat column')[0];
        console.log('observerDonatePanel')

        if (donatePanel){
            observerDonatePanel.disconnect();
            donatePanel.style = "display: none";
        }
    })
    observerDonatePanel.observe(document, {childList: true, subtree: true});

    const observerHeadersTop = new MutationObserver(function(){
        const headerEdges = document.getElementById('global_header');
        const middleHeader = document.getElementsByClassName('content')[0];
        console.log('observerHeadersTop')

        if (headerEdges && middleHeader){
            observerHeadersTop.disconnect();
            headerEdges.style = `background: ${backgroundColorTheme}`;
            middleHeader.style = `background-color: ${backgroundColorTheme}`;
        }
    })
    observerHeadersTop.observe(document, {childList: true, subtree: true})

    const observerInventoryContent = new MutationObserver(function(){
        const tabContent = document.getElementById('tabcontent_inventory');
        const activeInventory = document.getElementById('active_inventory_page');
        console.log('observerInventoryContent')

        if (tabContent && activeInventory){
            observerInventoryContent.disconnect();
            tabContent.style = `background: ${panelColorTheme}DF; height: 800px; border: 1px solid ${additionalColor}01;`;
            activeInventory.style = `background: ${panelColorTheme}01`;
        }
    })
    observerInventoryContent.observe(document, {childList: true, subtree: true});

    const observerBackgroundFooter = new MutationObserver(function(){
        const activePageContent = document.getElementsByClassName('flat_page responsive_page ')[0];
        const footer = document.getElementById('footer');
        console.log('observerBackgroundFooter')

        if (activePageContent && footer){
            observerBackgroundFooter.disconnect();
            activePageContent.style = `background: ${backgroundColorTheme}`;
            footer.style = `background: ${backgroundColorTheme};`;
        }
    })
    observerBackgroundFooter.observe(document, {childList: true, subtree: true});

    //     const observerSihPricesTab = new MutationObserver(function(){
    //         const rightOffersPanel = document.getElementsByClassName('sih block_of_marketplace_prices profile_inventory column short_form')[0];
    //         console.log('observerSihPricesTab')

    //         if (rightOffersPanel){
    //             observerSihPricesTab.disconnect();
    //             rightOffersPanel.style = "display: none;";
    //         }
    //     })
    //     observerSihPricesTab.observe(document, {childList: true, subtree: true});

    const observerMarketInfo = new MutationObserver(function(){
        const marketInfos = document.getElementsByClassName('item_market_actions');
        console.log('observerMarketInfo')

        if (marketInfos){
            observerMarketInfo.disconnect();
            for (let marketInfo of marketInfos) marketInfo.style = `background: ${panelColorTheme}80;`;
        }
    })
    observerMarketInfo.observe(document, {childList: true, subtree: true});

    const observerAlertBox = new MutationObserver(function(){
        const alertBoxcontent = document.getElementsByClassName('alertbox_content')[0];
        const alertBoxHeader = document.getElementsByClassName('alertbox_header')[0];
        const alertleftCap = document.getElementsByClassName('leftcap')[0];
        const alertrightCap = document.getElementsByClassName('rightcap')[0];
        console.log('observerAlertBox')
        const closeButton = document.getElementsByClassName('close_button welcome_dismiss')[0];

        if (alertBoxcontent && alertBoxHeader && alertleftCap && alertrightCap && closeButton){
            observerAlertBox.disconnect();

            alertBoxcontent.style = `background: ${panelColorTheme}AA; border: 1px solid #FFFFFF15;`;
            alertBoxHeader.style = `background: ${additionalColor}10;`;
            alertleftCap.style = `background: ${additionalColor}01;`;
            alertrightCap.style = `background: ${additionalColor}01;`;

            closeButton.style = `background: none; display: flex; justify-content: center; align-items: center`;

            const newButton = document.createElement('span');
            newButton.innerHTML = "<b><i>X</i></b>";
            newButton.style = "color: white; font-size: 120%;";

            closeButton.appendChild(newButton);
        }
        else{
            setTimeout(function disconnectObserver(){
                observerAlertBox.disconnect();
                console.log('observerAlertBox - disconnected')
            }, 500)
        }
        const observerNewItems = new MutationObserver(function(){
            const newItems = document.getElementsByClassName('newitem ellipsis');
            console.log('observerNewItems')
            if (newItems){
                observerNewItems.disconnect();

                for (let newItem of newItems){
                    newItem.style = `background: ${additionalColor}10; border: 1px solid ${additionalColor}20;`;
                }
            }
            else{
                setTimeout(function disconnectObserver(){
                    observerNewItems.disconnect();
                    console.log('observerNewItems - disconnected')
                }, 500)
            }
        })
        observerNewItems.observe(document, {childList: true, subtree: true});

        const observerScrollButton = new MutationObserver(function(){
            const scrollButtons = document.getElementsByClassName('scrollcontrol_button');
            console.log('observerScrollButton')
            if (scrollButtons){
                observerScrollButton.disconnect();

                for (let scrollButton of scrollButtons){
                    scrollButton.style = `background: ${panelColorTheme}FD; border: 1px solid ${additionalColor}20;`;
                }
            }
            else{
                setTimeout(function disconnectObserver(){
                    observerScrollButton.disconnect();
                    console.log('observerScrollButton - disconnected')
                }, 500)
            }
        })
        observerScrollButton.observe(document, {childList: true, subtree: true});
    })
    observerAlertBox.observe(document, {childList: true, subtree: true});



})();