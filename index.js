/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

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
  // loop over each item in the data
  for (var i = 0; i < games.length; i++) {
    // create a new div element, which will become the game card
    var newDiv = document.createElement("div");

    // add the class game-card to the list
    newDiv.classList.add("game-card");

    // set the inner HTML using a template literal to display some info
    // about each game

    var img = document.createElement("img");
    img.classList.add("game-img");
    img.src = games[i]["img"];
    newDiv.innerHTML = `<b> ${games[i]["name"]}</b><br><br> ${games[i]["description"]}<br><br> Backers: ${games[i]["backers"]}<br><br>`;

    // append the game to the games-container
    newDiv.appendChild(img);
    gamesContainer.append(newDiv);
    //document.write(gamesContainer.innerHTML)
  }
  // TIP: if your images are not displaying, make sure there is space
  // between the end of the src attribute and the end of the tag ("/>")
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let count = GAMES_JSON.reduce(function (sum, currValue) {
  return sum + currValue.backers;
}, 0);

//console.log(count)
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.append(count.toLocaleString());

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let count2 = GAMES_JSON.reduce(function (sum, currValue) {
  return sum + currValue.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.append(`$` + count2.toLocaleString());

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let count3 = GAMES_JSON.length;
gamesCard.append(count3);

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const cond1 = GAMES_JSON.filter(function (obj) {
    return obj.pledged < obj.goal;
  });
  //console.log(cond1)

  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(cond1);
}
filterUnfundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  const cond2 = GAMES_JSON.filter(function (obj) {
    return obj.pledged >= obj.goal;
  });
  //console.log(cond2)

  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(cond2);
}
filterFundedOnly();

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);

  //console.log(GAMES_JSON)
}
showAllGames();

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator


// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const count4 = GAMES_JSON.filter(item => item.pledged < item.goal).length;
    //console.log(count4)

// create a string that explains the number of unfunded games using the ternary operator   
var displayString =
 `A  total of $` + count2.toLocaleString() + ` has been raised for `+ count3 + ` ${count3 > 1 ? "games": "game"}. Currently, ` + count4 + ` ${count4 > 1 ? "games remain": "game remains"}  unfunded. We need your help to fund these amazing games!`
//console.log(displayString)

// create a new DOM element containing the template string and append it to the description container
var p = document.createElement("p");
p.append(displayString)
descriptionContainer.append(p)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});
//console.log(sortedGames)

// use destructuring and the spread operator to grab the first and second games
let {
  name: name1,
  description: desc1,
  pledged: pl1,
  goal: goal1,
  backers: bkrs1,
  img: img1,
} = sortedGames[0];
let {
  name: name2,
  description: desc2,
  pledged: pl2,
  goal: goal2,
  backers: bkrs2,
  img: img2,
} = sortedGames[1];

//console.log(name1)
const first = name1;
const second = name2;

// create a new element to hold the name of the top pledge game, then append it to the correct element
var topGame = document.createElement("div");
topGame.append(first);
firstGameContainer.append(topGame);
// do the same for the runner up it
var runnerUp = document.createElement("div");
runnerUp.append(second);
secondGameContainer.append(runnerUp);

//change Theme
let themeToggler = document.querySelector(".theme-toggler");

themeToggler.onclick = () => {
  themeToggler.classList.toggle("active");

  if (themeToggler.classList.contains("active")) {
    document.body.classList.add("active");
  } else {
    document.body.classList.remove("active");
  }
};
