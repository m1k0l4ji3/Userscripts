// ==UserScript==
// @name         Beautiful Steam Friends Page
// @version      1.0
// @author       ^^Mojżesz^^
// @description  Makes your Friends page looks better.
// @match        https://steamcommunity.com/*/friends*
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

    const observerPageHeader = new MutationObserver(function(){
        const pageHeader = document.getElementsByClassName('friends_header_bg')[0];

        if (pageHeader){
            observerPageHeader.disconnect()
            pageHeader.style = `background: none`;
        }
    })
    observerPageHeader.observe(document, {childList: true, subtree: true})

    const observerPageContent = new MutationObserver(function(){
        const pageContent = document.getElementsByClassName('responsive_page_template_content')[0]

        if (pageContent){
            observerPageContent.disconnect()
            pageContent.style = `background: ${backgroundColorTheme}; background: linear-gradient(to bottom, ${backgroundColorTheme}, ${additionalColor}01, ${backgroundColorTheme}), url(${myImg}); background-size: 100% 1152px;`;
        }
    })
    observerPageContent.observe(document, {childList: true, subtree: true})

    const observerTitleBar = new MutationObserver(function(){
        const titleBar = document.getElementsByClassName('profile_friends title_bar')[0];

        if (titleBar){
            titleBar.style = `background: ${panelColorTheme}AA; border: 1px solid ${additionalColor}30; border-radius: 4px; width: 97%`;
        }
    })
    observerTitleBar.observe(document, {childList: true, subtree: true})

    const observerFriendsContainer = new MutationObserver(function(){
        const friendsContainer = document.getElementsByClassName('friends_container')[0];

        if (friendsContainer){
            observerFriendsContainer.disconnect()
            friendsContainer.style = `background: ${panelColorTheme}DF; padding: 10px; border: 1px solid ${additionalColor}30; border-radius: 4px;`;
        }
    })
    observerFriendsContainer.observe(document, {childList: true, subtree: true})

    const observerFriendOverlays = new MutationObserver(function(){
        const friendOverlays = document.getElementsByClassName('selectable_overlay');

        if (friendOverlays){
            for (let overlay of friendOverlays){
                overlay.style = `border: 1px solid ${additionalColor}30`;
            }
        }
    })
    observerFriendOverlays.observe(document, {childList: true, subtree: true})

    const observerBackgroundFooter = new MutationObserver(function(){
        const activePageContent = document.getElementsByClassName('v6 game_bg responsive_page ')[0];
        const footer = document.getElementById('footer');
        console.log('observerBackgroundFooter')

        if (activePageContent && footer){
            observerBackgroundFooter.disconnect();
            activePageContent.style = `background: ${backgroundColorTheme}`;
            footer.style = `background: ${backgroundColorTheme};`;
        }
    })
    observerBackgroundFooter.observe(document, {childList: true, subtree: true});


})();