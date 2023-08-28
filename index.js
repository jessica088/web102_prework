/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    const container = document.getElementById("games-container");

    // loop over each item in the data
        for (let place=0; place<games.length; place++){
            const game = games[place]
        

        // create a new div element, which will become the game card
            const gameCard = document.createElement("div");
             

        // add the class game-card to the list
            gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
            gameCard.innerHTML = `
                <img class= "game-img" src="${game.img}"/>
                <br></br>
                <b class="game-name">${game.name}</b>
                <p>
                ${game.description}
                </p>
                <p>Backers: ${game.backers}</p>
            `;

        // append the game to the games-container
            container.append(gameCard);
        }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const contributions = GAMES_JSON.reduce((acc,game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = contributions.toLocaleString('en-US'); 

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const raised = GAMES_JSON.reduce((acc,amount) => {
    return acc + amount.pledged;
}, 0);

// set inner HTML using template literal

raisedCard.innerHTML = raised.toLocaleString('en-US');

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const games = GAMES_JSON.length;
gamesCard.innerHTML = games.toLocaleString('en-US');

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedFilter = GAMES_JSON.filter ((game) => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedFilter);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedFilter = GAMES_JSON.filter ((game) => {
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedFilter);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click",showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedFilter = GAMES_JSON.filter ((game) => {
    return game.pledged < game.goal;
});

let unfundedGames = unfundedFilter.length;

// create a string that explains the number of unfunded games using the ternary operator
const display = `A total of ${GAMES_JSON.reduce((acc,game)=>{return acc+game.pledged},0)} has been 
raised for ${GAMES_JSON.length} games. Currently ${unfundedGames} ${unfundedGames>1 ? "games" : "game"}
remains unfunded. We need your help to fund these amazing games!!!`;

// create a new DOM element containing the template string and append it to the description container
let description = document.createElement("p");
description.innerHTML = display;
descriptionContainer.append(description);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstPlace, secondPlace, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstName = document.createElement("p");
firstName.innerHTML = `${firstPlace.name}`;
firstGameContainer.append(firstName);
// do the same for the runner up item
const secondName = document.createElement("p");
secondName.innerHTML = `${secondPlace.name}`;
secondGameContainer.append(secondName);
/*************************************************************************************/
function searchGame(){
    let input = document.getElementById('search').value
    input=input.toLowerCase();
    let allGamesNames = GAMES_JSON.filter((game)=>{
        return game.name;
    });
    let gameName = document.getElementsByClassName('game-name');
    let gameCard = document.getElementsByClassName('game-card');
    for (let i = 0; i < gameName.length; i++) { 
        if (!gameName[i].innerHTML.toLowerCase().includes(input)) {
            gameCard[i].style.display="none";
        }
        else {
            gameCard[i].style.display="block";                 
        }
    }
};
let searchbar = document.getElementById("search");
searchbar.addEventListener("keyup", searchGame);