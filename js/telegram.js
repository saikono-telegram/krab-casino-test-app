window.Telegram.WebApp.ready();
const tg = window.Telegram.WebApp;

const card = document.getElementById('user');

const newCard = document.createElement('div');

newCard.innerHTML =  
`
<div class="wrap-menu">
    <span class="label-casino">Ваш Telegram ID: #${tg.initDataUnsafe.user.id}</span>
    <span class="focus-icon" data-symbol="&#xf207;"></span>     
</div>
`;

card.appendChild(newCard);
