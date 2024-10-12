let tg = window.Telegram.WebApp; 

tg.expand(); 

function goProfile() {
	document.location = "profile.html?id=" + tg.initDataUnsafe.user.id;
}


function getId() {
	var query = window.location.href.split("?")[1]
    var params = query.split("&");  
    alert(params[0].split("=")[1]);
}

//const card = document.getElementById('user');

//const newCard = document.createElement('div');

//newCard.innerHTML =  
//`
//<div class="wrap-menu">
   // <span class="label-casino">Ваш Telegram ID: #${tg.initDataUnsafe.user.id}</span>
    //<span class="focus-icon" data-symbol="&#xf207;"></span>     
//</div>
//`;

//card.appendChild(newCard);