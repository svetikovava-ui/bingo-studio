document.addEventListener("DOMContentLoaded", function () {

    const generateBtn = document.getElementById("generateBtn");
    const cardsContainer = document.getElementById("cardsContainer");

    const songsInput = document.getElementById("songInput");
    const cardSize = document.getElementById("cardSize");
    const cardCount = document.getElementById("cardCount");


    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }


    function generateCard(items, size) {

        let needed = size * size;

        let selected = shuffle([...items]).slice(0, needed);

        let card = document.createElement("div");
        card.className = "bingo-card";

        let grid = document.createElement("div");
        grid.className = "bingo-grid grid-" + size;


        selected.forEach(song => {

            let cell = document.createElement("div");

            cell.className = "bingo-cell";

            cell.innerHTML = `
                <span>${song}</span>
            `;

            grid.appendChild(cell);

        });

        card.appendChild(grid);

        return card;
    }


    function createCards() {

        cardsContainer.innerHTML = "";

        let songs = songsInput.value
            .split("\n")
            .map(item => item.trim())
            .filter(item => item.length > 0);


        if (songs.length === 0) {

            alert("Добавьте список песен");
            return;

        }


        let size = Number(cardSize.value);
        let count = Number(cardCount.value);


        if (songs.length < size * size) {

            alert(
                "Для выбранного размера нужно минимум "
                + (size * size)
                + " элементов"
            );

            return;
        }


        for(let i = 0; i < count; i++) {

            let wrapper = document.createElement("div");

            wrapper.className = "card-mini";


            let title = document.createElement("h3");

            title.innerText = "Карточка № " + (i+1);


            let card = generateCard(
                songs,
                size
            );


            wrapper.appendChild(title);

            wrapper.appendChild(card);


            cardsContainer.appendChild(wrapper);

        }

    }


    generateBtn.addEventListener(
        "click",
        createCards
    );

});
