/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/kmallen91')
.then (response =>{
  console.log(response)
 
})

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/


/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/


axios.get('https://api.github.com/users/kmallen91')
.then (data =>{
  const newUser = createCard(data.data)
  cards.appendChild(newUser)
})
.catch(error =>{
  document.querySelector('.cards').textContent = "ERROR"
})

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

let followersArray = [
  axios.get('https://api.github.com/users/kmallen91/followers')
  .then (data =>{
    followersArray = data.data;
    console.log(followersArray)
    followersArray.forEach(e =>{
      axios.get(`https://api.github.com/users/${e.login}`)
      .then (data =>{
        const newUser = createCard(data.data)
        cards.appendChild(newUser)
      })
      .catch(error =>{
        document.querySelector('.cards').textContent = "ERROR"
      })
    })
    })
    
];
console.log(followersArray)

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
const cards = document.querySelector('.cards');
// let atts = {avatar_url, name, login, location, followers, following, bio}

function createCard(object){
  let newCard = document.createElement('div');
  let cardImg = document.createElement('img');
  let cardInfo = document.createElement('div');
  let cardName = document.createElement('h3');
  let cardUser = document.createElement('p');
  let cardLocation = document.createElement('p'),
      cardFollowers = document.createElement('p'),
      cardFollowing = document.createElement('p'),
      cardBio = document.createElement('p'),
      cardProfile = document.createElement('p');

  newCard.appendChild(cardImg);
  newCard.appendChild(cardInfo);
  cardInfo.appendChild(cardName);
  cardInfo.appendChild(cardUser);
  cardInfo.appendChild(cardLocation);
  cardInfo.appendChild(cardProfile);
  cardInfo.appendChild(cardFollowers);
  cardInfo.appendChild(cardFollowing);
  cardInfo.appendChild(cardBio);

  newCard.classList.add('card');
  cardInfo.classList.add('card-info');
  cardName.classList.add('name');
  cardUser.classList.add('username');

  cardImg.src = object.avatar_url;
  cardName.textContent = `${object.name}`;
  cardUser.textContent = `${object.login}`;
  cardLocation.textContent = `Location: ${object.location}`;
  cardFollowers.textContent = `Followers: ${object.followers}`;
  cardFollowing.textContent = `Following: ${object.following}`;
  cardBio.textContent = `Bio: ${object.bio}`;
  cardProfile.textContent = `Profile: ${object.html_url}`;
  

return newCard;
}




// List of LS Instructors Github username's: 
  // tetondan
  // dustinmyers
  // justsml
  // luishrd
  // bigknell
