document.addEventListener("DOMContentLoaded", () => {


/* ===============================
   ELEMENTS
================================ */

const generateBtn = document.getElementById("generateBtn");
const cardsContainer = document.getElementById("cardsContainer");

const songsInput = document.getElementById("songInput");
const cardSize = document.getElementById("cardSize");
const cardCount = document.getElementById("cardCount");



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

        let random = Math.floor(
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
   CREATE UNIQUE CARD KEY
================================ */

function cardKey(items){

    return items
        .sort()
        .join("|");

}



/* ===============================
   GENERATE CARD DATA
================================ */

function generateCardItems(items,size){


    let needed = size * size;

    let attempts = 0;


    while(attempts < 1000){

        let selected = shuffle(items)
            .slice(0,needed);


        let key = cardKey(selected);


        if(!generatedCards.has(key)){

            generatedCards.add(key);

            return selected;

        }


        attempts++;

    }


    return shuffle(items)
        .slice(0,needed);

}



/* ===============================
   CREATE HTML CARD
================================ */

function createCard(items,size,number){


    let wrapper =
        document.createElement("div");


    wrapper.className =
        "card-mini";



    let title =
        document.createElement("h3");


    title.textContent =
        `Карточка № ${number}`;



    let card =
        document.createElement("div");


    card.className =
        "bingo-card";



    let grid =
        document.createElement("div");


    grid.className =
        `bingo-grid grid-${size}`;



    items.forEach((song,index)=>{


        let cell =
            document.createElement("div");


        cell.className =
            "bingo-cell";



        cell.innerHTML = `

            <div class="cell-number">
                ${String(index+1).padStart(2,"0")}
            </div>

            <span>
                ${song}
            </span>

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


    cardsContainer.innerHTML = "";

    generatedCards.clear();



    let songs =
        songsInput.value
        .split("\n")
        .map(song=>song.trim())
        .filter(song=>song);



    if(!songs.length){

        alert(
            "Добавьте список песен"
        );

        return;

    }



    let size =
        Number(cardSize.value);



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



    if(songs.length < needed){


        alert(
            `Для карточки ${size}×${size} нужно минимум ${needed} песен`
        );


        return;

    }




    for(
        let i = 1;
        i <= count;
        i++
    ){


        let items =
            generateCardItems(
                songs,
                size
            );



        let card =
            createCard(
                items,
                size,
                i
            );



        cardsContainer.appendChild(card);


    }



}



/* ===============================
   PRINT
================================ */


function printCards(){

    window.print();

}




/* ===============================
   PDF PREPARATION
================================ */


function preparePDF(){


    alert(
        "PDF экспорт будет подключён следующим этапом"
    );


}



/* ===============================
   EVENTS
================================ */


generateBtn.addEventListener(
    "click",
    createCards
);



const printBtn =
    document.getElementById("printBtn");


if(printBtn){

    printBtn.addEventListener(
        "click",
        printCards
    );

}



const pdfBtn =
    document.getElementById("pdfBtn");


if(pdfBtn){

    pdfBtn.addEventListener(
        "click",
        preparePDF
    );

}



});
