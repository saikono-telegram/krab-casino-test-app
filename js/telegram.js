let tg = window.Telegram.WebApp; 

tg.expand(); 

function goProfile() {
   document.location = "profile.html?id=" + tg.initDataUnsafe.user.id + "&name=" + tg.initDataUnsafe.user.first_name;
}


function getId() {
   var query = window.location.href.split("?")[1]
   var params = query.split("&");  

   const card = document.getElementById('user');
   const newCard = document.createElement('div');

   const profile = document.getElementById('profile');
   const newName = document.createElement('div');

   newCard.innerHTML =  
   `
   <div class="wrap-menu">
      <span class="label-casino">Ваш Telegram ID: #${params[0].split("=")[1]}</span>
      <span class="focus-icon" data-symbol="&#xf207;"></span>  
   </div>
   `;

   newName.innerHTML =  
   `
   <span class="casino-form-title">Профиль ${params[1].split("=")[1]}</span>
   `;

   profile.appendChild(newCard);
   name.appendChild(newName);
}