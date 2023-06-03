// ==UserScript==
// @name         Steam Direct Login Buttons
// @version      2.0
// @author       ^^Mojżesz^^
// @description  Adds direct login buttons to the login page to fill form and speed up sign in process and makes login page looks better.
// @match        https://steamcommunity.com/login*
// @match        https://store.steampowered.com/login*
// ==/UserScript==

(function() {
    'use strict';

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const photos = ["IMAGE URLS"]; //Paste here background image urls

    // const photoNumber = getRandomInt(photos.length); // Uncomment this line and change "photos index" to "photoNumber" to load a random image whenever the page loads.
    const myImg = photos[0];

    //Set mainLoginContainer
    const observerLoginDiv = new MutationObserver(function(){
        const communityLoginContainer = document.getElementsByClassName('login_LoginContainer_2vAS_')[0];
        const storeLoginContainer = document.getElementsByClassName('login_LoginContainer_2kLRm')[0];
        const mainLoginContainer = communityLoginContainer ? communityLoginContainer : storeLoginContainer
        const loginPanel = document.getElementsByClassName('newlogindialog_Login_ZOBYq')[0];
        console.log(mainLoginContainer, loginPanel)

        if (mainLoginContainer && loginPanel){
            function create_account_button(personame, username, password, image_url){

                //Set userButton
                const userButton = document.createElement('div');
                userButton.className = "user_button";
                userButton.style = "background: none; width: 100px; height: 130px; display: flex; flex-direction: column; padding-top: 10px; padding-left: 5px; padding-right: 5px; border-radius: 3%;";

                //userButton functions
                userButton.onmouseover = function(){
                    userButton.style.outline = "1px solid #2D73FF"; // Add or remove border from userButton
                    userButton.style.background = "linear-gradient(45deg, #06BFFF45 0%, #2D73FF45 100%)";
                    userButton.style.cursor = "pointer";
                }

                userButton.onmouseleave = function(){
                    userButton.style.outline = "none";
                    userButton.style.background = "none";
                }

                userButton.onclick = function(){
                    const usernameInput = document.getElementsByClassName('newlogindialog_TextInput_2eKVn')[0];
                    const passwordInput = document.getElementsByClassName('newlogindialog_TextInput_2eKVn')[1];
                    const submitButton = document.getElementsByClassName('newlogindialog_SubmitButton_2QgFE')[0];

                    function setNativeValue(element, value) {
                        let lastValue = element.value;
                        element.value = value;
                        let event = new Event("input", { target: element, bubbles: true });
                        event.simulated = true;
                        let tracker = element._valueTracker;
                        if (tracker) {
                            tracker.setValue(lastValue);
                        }
                        element.dispatchEvent(event);
                    }
                    setNativeValue(usernameInput, username);
                    setNativeValue(passwordInput, password);
                    submitButton.click();
                }

                buttonContainer.appendChild(userButton);

                //Set userImage
                const userImage = document.createElement('img');
                userImage.src = image_url;
                userImage.alt = personame;
                userImage.style = "padding-top: 5px; padding-bottom: 5px; padding-left: 10px; padding-right: 10px; user-select: none; border-radius: 12%;";

                userButton.appendChild(userImage);

                //Set usernameSpan
                const usernameSpan = document.createElement('span');
                usernameSpan.innerHTML = username;
                usernameSpan.style = "text-align: center; color: #FFFFFFAA; font-size: 80%; font-family: comic sans ms; user-select: none;";

                userButton.appendChild(usernameSpan);

                //Set personameSpan
                const personameSpan = document.createElement('span');
                personameSpan.innerHTML = personame;
                personameSpan.style = "text-align: center; color: #FFFFFFDF; font-family: comic sans ms; user-select: none; font-weight: 600;";

                userButton.appendChild(personameSpan);
            }

            const accounts_details = {
                "personame1": {"username": "username", "password": "password", "image_url": "https://cdn.akamai.steamstatic.com/store/about/icon-gamehubs.svg"},
                "personame2": {"username": "username", "password": "password", "image_url": "https://cdn.akamai.steamstatic.com/store/about/icon-gamehubs.svg"},
                "personame3": {"username": "username", "password": "password", "image_url": "https://cdn.akamai.steamstatic.com/store/about/icon-gamehubs.svg"},
                "personame4": {"username": "username", "password": "password", "image_url": "https://cdn.akamai.steamstatic.com/store/about/icon-gamehubs.svg"},
                "personame5": {"username": "username", "password": "password", "image_url": "https://cdn.akamai.steamstatic.com/store/about/icon-gamehubs.svg"},
                "personame6": {"username": "username", "password": "password", "image_url": "https://cdn.akamai.steamstatic.com/store/about/icon-gamehubs.svg"},
                "personame7": {"username": "username", "password": "password", "image_url": "https://cdn.akamai.steamstatic.com/store/about/icon-gamehubs.svg"},
                "personame8": {"username": "username", "password": "password", "image_url": "https://cdn.akamai.steamstatic.com/store/about/icon-gamehubs.svg"},
                "personame9": {"username": "username", "password": "password", "image_url": "https://cdn.akamai.steamstatic.com/store/about/icon-gamehubs.svg"},
                "personame10": {"username": "username", "password": "password", "image_url": "https://cdn.akamai.steamstatic.com/store/about/icon-gamehubs.svg"}
            }
            observerLoginDiv.disconnect();

            //Set buttonContainer
            const buttonContainer = document.createElement('div');
            buttonContainer.className = "button_container";
            buttonContainer.style = "display: flex; align-items: center; justify-content: center; background: #171a21AA; border: 1px solid #FFFFFF30; float: center; margin-top: 150px; border-radius: 4px";

            for(let account in accounts_details){
                create_account_button(account, accounts_details[account].username, accounts_details[account].password, accounts_details[account].image_url);
            }

            //Set authorDiv
            const authorDiv = document.createElement('div');
            authorDiv.style = "width: 100%; height: 20px; background: none; float: left;";

            //Set authorSpan
            const authorSpan = document.createElement('span');
            authorSpan.innerHTML = "created by <a href=\"https://steamcommunity.com/id/roza13\" style=\"color:#06BFFF\">^^Mojżesz^^</a>";
            authorSpan.style = "float: right; padding-right: 25px; font-family: comic sans ms; font-size: 11px;";

            authorDiv.appendChild(authorSpan);

            mainLoginContainer.appendChild(buttonContainer);
            mainLoginContainer.appendChild(authorDiv);
        }
    })
    observerLoginDiv.observe(document, {childList: true, subtree: true})


    //Set bottomRow
    const bottomRow = document.getElementsByClassName('login_bottom_row')[0];
    bottomRow.style = "background: none";

    const pageContent = document.getElementsByClassName('page_content')[0];
    pageContent.style = `background-color: #171a21; background: linear-gradient(to bottom, #171a21, #171a2160, #171a21), url(${myImg}); background-size: cover;`;

    const observerLoginForm = new MutationObserver(function(){
        const loginForm = document.getElementsByClassName('newlogindialog_FormContainer_3jLIH')[0];

        if (loginForm){
            loginForm.style = "background: #171a21DF; border: 1px solid #FFFFFF30";
        }

    })
    observerLoginForm.observe(document, {childList: true, subtree: true});


})();