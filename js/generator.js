console.log("BINGO SCRIPT LOADED");

document.addEventListener("DOMContentLoaded", () => {

console.log("DOM READY");


/* ===============================
   ELEMENTS
================================ */

const generateBtn =
document.getElementById("createCards");

const bingoGrid =
document.getElementById("bingoGrid");

const itemsInput =
document.getElementById("itemsList");

const gridSize =
document.getElementById("gridSize");

const cardCount =
document.getElementById("cardCount");

const gameTitle =
document.getElementById("gameTitle");


/* ===============================
   SETTINGS
================================ */

const MAX_CARDS = 200;

let generatedCards = new Set();



/* ===============================
   SHUFFLE
================================ */

function shuffle(array){

    let result = [...array];

    for(let i = result.length - 1; i > 0; i--){

        let random =
        Math.floor(
            Math.random() * (i + 1)
        );

        [
            result[i],
            result[random]
        ] =
        [
            result[random],
            result[i]
        ];

    }

    return result;

}



/* ===============================
   UNIQUE KEY
================================ */

function cardKey(items){

    return [...items]
    .sort()
    .join("|");

}



/* ===============================
   GENERATE ITEMS
================================ */

function generateCardItems(items,size){

    let needed =
    size * size;


    let attempts = 0;


    while(attempts < 1000){

        let selected =
        shuffle(items)
        .slice(0, needed);


        let key =
        cardKey(selected);



        if(!generatedCards.has(key)){

            generatedCards.add(key);

            return selected;

        }


        attempts++;

    }


    return shuffle(items)
    .slice(0, needed);

}



/* ===============================
   CREATE CARD
================================ */

function createCard(items,size,number){


    let wrapper =
    document.createElement("div");

    wrapper.className =
    "print-card";



    let title =
    document.createElement("h3");

    title.className =
    "card-title";


    let name =
    gameTitle && gameTitle.value
    ? gameTitle.value
    : "BINGO";


    title.textContent =
    `${name} № ${number}`;



    let card =
    document.createElement("div");

    card.className =
    "bingo-card";



    let grid =
    document.createElement("div");

    grid.className =
    `bingo-grid grid-${size}`;



    items.forEach((item,index)=>{


        let cell =
        document.createElement("div");


        cell.className =
        "bingo-cell";



        cell.innerHTML = `

            <div class="cell-number">
                ${String(index + 1).padStart(2,"0")}
            </div>

            <div class="song-title">
                ${item}
            </div>

        `;


        grid.appendChild(cell);


    });



    card.appendChild(grid);

    wrapper.appendChild(title);

    wrapper.appendChild(card);



    return wrapper;

}



/* ===============================
   CREATE ALL CARDS
================================ */

function createCards(){


console.log("CREATE START");


bingoGrid.innerHTML = "";


generatedCards.clear();



let items =
itemsInput.value
.split("\n")
.map(item => item.trim())
.filter(item => item);



if(!items.length){

alert(
"Добавьте список элементов"
);

return;

}



let size =
Number(gridSize.value);



let count =
Number(cardCount.value);



let needed =
size * size;



if(count > MAX_CARDS){

alert(
`Максимум ${MAX_CARDS} карточек`
);

return;

}



if(items.length < needed){

alert(
`Для карточки ${size}×${size} нужно минимум ${needed} элементов`
);

return;

}




for(
let i = 1;
i <= count;
i++
){


let cardItems =
generateCardItems(
items,
size
);



let card =
createCard(
cardItems,
size,
i
);



bingoGrid.appendChild(card);


}



console.log("CARDS CREATED");

}



/* ===============================
   PRINT
================================ */

function printCards(){

window.print();

}



/* ===============================
   EVENTS
================================ */


if(generateBtn){

generateBtn.addEventListener(
"click",
createCards
);

}



console.log("BINGO READY");


});
