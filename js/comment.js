function deleteItems(name) {
    const deleteElement = document.querySelector(name);
    deleteElement.innerHTML = '';
}

document.querySelector("select").addEventListener('change', function (e) {
    if (e.target.value == "big/small") {
        deleteItems("#menu");

        const menu = document.getElementById('menu');
        const newDiv = document.createElement('div');
        newDiv.innerHTML =  
        `
        <div class="wrap-menu" id="big/small">
            <select class="js-choice-2" type="text" name="game" id="game" autocomplete="off" required>
                <option value="">Выберите исход</option>
                <option value="big">[🎲] Больше (1.9X)</option>
                <option value="small">[🎲] Меньше (1.9X)</option>
            </select>

            <span class="focus-icon" data-symbol="&#xf1f8;"></span>
        </div>
        `;

        menu.appendChild(newDiv);
    }

    else if (e.target.value == "even/odd") {
        deleteItems("#menu");

        const menu = document.getElementById('menu');
        const newDiv = document.createElement('div');
        newDiv.innerHTML =  
        `
        <div class="wrap-menu" id="even/odd">
            <select class="js-choice-2" type="text" name="game" id="game" autocomplete="off" required>
                <option value="">Выберите исход</option>
                <option value="even">[🎲] Чётное (1.9X)</option>
                <option value="odd">[🎲] Нечётное (1.9X)</option>
            </select>

            <span class="focus-icon" data-symbol="&#xf1f8;"></span>
        </div>
        `;

        menu.appendChild(newDiv);
    }

    else if (e.target.value == "number") {
        deleteItems("#menu");

        const menu = document.getElementById('menu');
        const newDiv = document.createElement('div');
        newDiv.innerHTML =  
        `
        <div class="wrap-menu" id="number">
            <select class="js-choice-2" type="text" name="game"  id="game" autocomplete="off" required>
                <option value="">Выберите исход</option>
                <option value="1">[🎲] 1 (3X)</option>
                <option value="2">[🎲] 2 (3X)</option>
                <option value="3">[🎲] 3 (3X)</option>
                <option value="4">[🎲] 4 (3X)</option>
                <option value="5">[🎲] 5 (3X)</option>
                <option value="6">[🎲] 6 (3X)</option>
            </select>

            <span class="focus-icon" data-symbol="&#xf1f8;"></span>
        </div>
        `;

        menu.appendChild(newDiv);
    }

    else if (e.target.value == "pvp") {
        deleteItems("#menu");

        const menu = document.getElementById('menu');
        const newDiv = document.createElement('div');
        newDiv.innerHTML =  
        `
        <div class="wrap-menu" id="pvp">
            <select class="js-choice-2" type="text" name="game" id="game" autocomplete="off" required>
                <option value="">Выберите исход</option>
                <option value="pvp1">[🎲] Победа первого кубика (1.9X)</option>
                <option value="pvp2">[🎲] Победа второго кубика (1.9X)</option>
            </select>

            <span class="focus-icon" data-symbol="&#xf1f8;"></span>
        </div>
        `;

        menu.appendChild(newDiv);
    }

    else if (e.target.value == "basketball") {
        deleteItems("#menu");

        const menu = document.getElementById('menu');
        const newDiv = document.createElement('div');
        newDiv.innerHTML =  
        `
        <div class="wrap-menu" id="basketball">
            <select class="js-choice-2" type="text" name="game" id="game" autocomplete="off" required>
                <option value="">Выберите исход</option>
                <option value="basketball_goal">[🏀] Голл (1.9X)</option>
                <option value="basketball_by">[🏀] Мимо (1.4X)</option>
            </select>

            <span class="focus-icon" data-symbol="&#xf1f8;"></span>
        </div>
        `;

        menu.appendChild(newDiv);
    }

    else if (e.target.value == "football") {
        deleteItems("#menu");

        const menu = document.getElementById('menu');
        const newDiv = document.createElement('div');
        newDiv.innerHTML =  
        `
        <div class="wrap-menu" id="football">
            <select class="js-choice-2" type="text" name="game" id="game" autocomplete="off" required>
                <option value="">Выберите исход</option>
                <option value="football_goal">[⚽️] Голл (1.4X)</option>
                <option value="football_by">[⚽️] Мимо (1.9X)</option>
            </select>

            <span class="focus-icon" data-symbol="&#xf1f8;"></span>
        </div>
        `;

        menu.appendChild(newDiv);
    }

    else if (e.target.value == "darts") {
        deleteItems("#menu");

        const menu = document.getElementById('menu');
        const newDiv = document.createElement('div');
        newDiv.innerHTML =  
        `
        <div class="wrap-menu" id="darts">
            <select class="js-choice-2" type="text" name="game" id="game" autocomplete="off" required>
                <option value="">Выберите исход</option>
                <option value="red">[🎯] Красное (1.9X)</option>
                <option value="white">[🎯] Белое (1.9X)</option>
                <option value="center">[🎯] Центр (3X)</option>
                <option value="by">[🎯] Мимо (3X)</option>
            </select>

            <span class="focus-icon" data-symbol="&#xf1f8;"></span>
        </div>
        `;

        menu.appendChild(newDiv);
    }

    else if (e.target.value == "knb") {
        deleteItems("#menu");

        const menu = document.getElementById('menu');
        const newDiv = document.createElement('div');
        newDiv.innerHTML =  
        `
        <div class="wrap-menu" id="knb">
            <select class="js-choice-2" type="text" name="game" id="game" autocomplete="off" required>
                <option value="">Выберите исход</option>
                <option value="stone">[✊] Камень (2.5X)</option>
                <option value="scissors">[✌️] Ножницы (2.5X)</option>
                <option value="paper">[🖐] Бумага (2.5X)</option>
            </select>

            <span class="focus-icon" data-symbol="&#xf1f8;"></span>
        </div>
        `;

        menu.appendChild(newDiv);
    }

    const element = document.querySelector(".js-choice-2");

    const choices = new Choices(element, {
        searchEnabled: false,
        itemSelectText: ""
    });
})


function updateAmount (amount) {
    const menu = document.getElementById('game');
    
    console.log(menu.value)

    var json = {
        "big": 1.9,
        "small": 1.9,
        "even": 1.9,
        "odd": 1.9,
        "pvp1": 1.9,
        "pvp2": 1.9,
        "red": 1.9,
        "white": 1.9,
        "1": 3,
        "2": 3,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 3,
        "center": 3, 
        "by": 3, 
        "basket_goal": 1.9,
        "basket_by": 1.4,
        "football_goal": 1.4,
        "football_by": 1.9,
        "scissors": 2.5,
        "paper": 2.5,
        "stone": 2.5
    }

    console.log()

    deleteItems("#win");

    const win = document.getElementById('win');
    const newDiv_win = document.createElement('div');
    newDiv_win.innerHTML =  
    `
    <div class="wrap-menu">
        <span class="label-casino">Ваш возможный выигрыш - ${amount.replace(" USDT", "") * json[menu.value.toString()]} USDT</span>
        <span class="focus-icon" data-symbol="&#xf198;"></span>       
    </div>
    `;

    win.appendChild(newDiv_win);
}