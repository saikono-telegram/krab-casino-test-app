let tg = window.Telegram.WebApp; 

tg.expand(); 

function goProfile() {
   try {
      document.location = "profile.html?id=" + tg.initDataUnsafe.user.id + "&name=" + tg.initDataUnsafe.user.first_name;
   }
   
   catch {
      var query = window.location.href.split("?")[1];
      var params = query.split("&");  

      document.location = "profile.html?id=" + params[0].split("=")[1] + "&name=" + params[1].split("=")[1];
   }
}


function goMenu() {
   var query = window.location.href.split("?")[1];
   var params = query.split("&");  

   document.location = "index.html?id=" + params[0].split("=")[1] + "&name=" + params[1].split("=")[1];
}

function getUser(user_id) {
   return fetch('https://147.45.231.30:1212/api/user?user_id=' + user_id)
      .then(data => data.json())
      .then(response => {
         return response
      });

}


function getId() {
   var query = window.location.href.split("?")[1]
   var params = query.split("&");  

   const card = document.getElementById('user');
   const newCard = document.createElement('div');

   const profile = document.getElementById('profile');
   const newName = document.createElement('div');

   getUser(user_id=params[0].split("=")[1]).then((results) => {
      var user = results["user"]

      newName.innerHTML =  
      `
      <span class="casino-form-title">Профиль</span>
      `;

      newCard.innerHTML =  
      `
      <div class="wrap-menu">
         <span class="label-casino">Ваш аккаунт: ${params[1].split("=")[1]} (${params[0].split("=")[1]})</span>
         <span class="focus-icon" data-symbol="&#xf207;"></span>          
      </div>

      <div class="wrap-menu">
         <span class="label-casino">Приглашено пользователей: ${user["referals"]} чел.</span>
         <span class="focus-icon" data-symbol="&#xf20d;"></span> 
      </div>
      
      <div class="wrap-menu">
         <span class="label-casino">Ваш реф.баланс: ${Math.round(user["balance"] * 100) / 100}$</span>
         <span class="focus-icon" data-symbol="&#xf111;"></span> 
      </div>

      <div class="wrap-menu">
         <span class="label-casino">Ваш кэшбэк: ${Math.round(user["cashback"] * 100) / 100}$</span>
         <span class="focus-icon" data-symbol="&#xf19a;"></span> 
      </div>

      <div class="wrap-menu">
         <span class="label-casino">Выигрышей: ${user["wins"]} шт. (${Math.round(user["wins_amount"] * 100) / 100}$)</span>
         <span class="focus-icon" data-symbol="&#xf214;"></span> 
      </div>

      <div class="wrap-menu">
         <span class="label-casino">Проигрышей: ${user["losers"]} шт. (${Math.round(user["losers_amount"] * 100) / 100}$)</span>
         <span class="focus-icon" data-symbol="&#xf213;"></span> 
      </div>

      <div class="wrap-menu">
         <span class="label-casino">Выиграно: ${(Math.round(user["wins_amount"] * 100) / 100) - (Math.round(user["losers_amount"] * 100) / 100)}$</span>
         <span class="focus-icon" data-symbol="&#xf198;"></span> 
      </div>
      `;

      profile.appendChild(newName);
      card.appendChild(newCard);


      console.log(user);
   });
}
