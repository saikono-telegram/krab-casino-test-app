let tg = window.Telegram.WebApp; 

tg.expand(); 

function goProfile() {
   document.location = "profile.html?id=" + tg.initDataUnsafe.user.id + "&photo=" + tg.initDataUnsafe.user.photo_url;
}


function getId() {
   var query = window.location.href.split("?")[1]
   var params = query.split("&");  

   const card = document.getElementById('user');

   const newCard = document.createElement('div');

   newCard.innerHTML =  
   `
   <div class="wrap-menu">
      <span class="label-casino">Ваш Telegram ID: #${params[0].split("=")[1]}</span>
      <span class="focus-icon" data-symbol="&#xf207;"></span>  
   </div>
   
   <div class="wrap-menu">
      <span class="label-casino">URL: #${params[1].split("=")[1]}</span>
      <span class="focus-icon" data-symbol="&#xf207;"></span>   
   </div>
   `;

   card.appendChild(newCard);

   let photo = document.getElementById('photo');
   photo.src = params[1].split("=")[1];
}
