// ==UserScript==
// @name         Beautiful Steam Trade Offers Page
// @version      1.0
// @author       ^^Mojżesz^^
// @description  Make your Trade Offers page looks better.
// @match        https://steamcommunity.com/*/tradeoffers*
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
        const pageContent = document.getElementsByClassName('pagecontent no_header profile_subpage_general')[0];
        console.log('observerPage')

        if (pageContent){
            observerPage.disconnect();
            pageContent.style = `background-color: ${backgroundColorTheme}; background-image: linear-gradient(to bottom, ${backgroundColorTheme}, ${additionalColor}01, ${backgroundColorTheme}), url(${myImg}); background-size: 100% 1152px;`;
        }
    })
    observerPage.observe(document, {childList: true, subtree: true});

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

    const observerHeaderTexture = new MutationObserver(function(){
        const profileHeader = document.getElementsByClassName('profile_small_header_texture')[0];
        const headerBg= document.getElementsByClassName('profile_small_header_bg')[0];
        console.log('observerHeaderTexture')

        if (profileHeader && headerBg){
            observerHeaderTexture.disconnect();
            headerBg.style = `background: ${panelColorTheme}01; border: 1px solid ${panelColorTheme}01`;
            profileHeader.style = `background: ${panelColorTheme}01; border: 1px solid ${panelColorTheme}01`;
        }
    })
    observerHeaderTexture.observe(document, {childList: true, subtree: true});

    const observerSihSettings = new MutationObserver(function(){
        const bgPanel = document.getElementsByClassName('sih_bg')[0];
        const settingsPanel = document.getElementsByClassName('sih_panel_mode row')[0];
        const settingsContainer = document.getElementsByClassName('sig_status_container')[0];
        console.log('observerSihGiveaways')

        if (bgPanel && settingsPanel && settingsContainer){
            observerSihSettings.disconnect();

            settingsPanel.style = `background: ${panelColorTheme}DF; display: flex; border: 1px solid ${additionalColor}30`;
            bgPanel.style = `background: ${panelColorTheme}01;`;
            settingsContainer.style = `background: ${panelColorTheme}01;`;
        }
    })
    observerSihSettings.observe(document, {childList: true, subtree: true});

    const observerBackgroundFooter = new MutationObserver(function(){
        const activePageContent = document.getElementsByClassName('flat_page responsive_page')[0];
        const footer = document.getElementById('footer');

        if (activePageContent && footer){
            observerBackgroundFooter.disconnect();
            activePageContent.style = `background: ${backgroundColorTheme}`;
            footer.style = `background: ${backgroundColorTheme};`;
        }
    })
    observerBackgroundFooter.observe(document, {childList: true, subtree: true});

    const observerMainContent = new MutationObserver(function(){

        const mainContent = document.getElementsByClassName('maincontent')[0];
        const rightCol = document.getElementsByClassName('profile_rightcol')[0];
        const rightControls = document.getElementsByClassName('rightcol_controls_content');
        const rightControlRules = document.getElementsByClassName('rightcol_controls_rule');
        const rightControlCols = document.getElementsByClassName('rightcol_controls');

        if (mainContent && rightCol && rightControls && rightControlRules && rightControlCols){
            mainContent.style = `background: ${panelColorTheme}DF; border: 1px solid ${additionalColor}30;`
            rightCol.style = `background: ${panelColorTheme}01;`;
            for (let control of rightControls){
                control.style = `background: ${panelColorTheme}01; border: 1px solid ${additionalColor}30`;
            }
            for (let rule of rightControlRules){
                rule.style = `display: none;`;
            }
            rightControlCols[0].style = `background: none;`;
            rightControlCols[1].style = `background: none;`;
        }
    })
    observerMainContent.observe(document, {childList: true, subtree: true});

    const observerWelcomeBlock = new MutationObserver(function(){
        const welcomeBlock = document.getElementsByClassName('tradeoffer_welcome_ctn')[0];

        if (welcomeBlock){
            observerWelcomeBlock.disconnect();
            welcomeBlock.style = `background: ${panelColorTheme}01;`;
        }
        else{
            setTimeout(function disconnectObserver(){
                observerWelcomeBlock.disconnect();
                console.log('observerWelcomeBlock - disconnected')
            }, 2000)
        }
    })
    observerWelcomeBlock.observe(document, {childList: true, subtree: true});
})();