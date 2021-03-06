/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const entryPoint = document.querySelector('.cards');

axios
.get("https://api.github.com/users/ryanmeinzer")
.then(response => {
  console.log(response.data);
// });
const newCardComplete = cardMaker(response.data);
entryPoint.appendChild(newCardComplete);
})
.catch(error => {
console.log("The data was not returned", error);
})

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = [];

axios
.get('https://api.github.com/users/ryanmeinzer/followers')
.then(response => {
// console.log(response);
  response.data.forEach(user => {
  axios.get(user.url)
.then(response => {
  entryPoint.appendChild(cardMaker(response.data));
});
});
})
.catch(error => {
console.log('The data was not returned', error);
});


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{user's name}</h3>
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

//create elements 

function cardMaker(attr) {
  const newCard = document.createElement('div'),
  newImg = document.createElement('img'),
  newInfo = document.createElement('div'),
  newName = document.createElement('h3'),
  newUsername = document.createElement('p'),
  newLocation = document.createElement('p'),
  newProfile = document.createElement('p'),
  newLink = document.createElement('a'),
  newFollowers = document.createElement('p'),
  newFollowing = document.createElement('p'),
  newBio = document.createElement('p');

//add classes

newCard.classList.add('card');
newInfo.classList.add('card-info');
newName.classList.add('name');
newUsername.classList.add('username');

//add structure

//add content

newImg.src = attr.avatar_url;
newName.textContent = attr.name;
newUsername.textContent = attr.login;
newLocation.textContent = `Location: ${attr.location}`;
newProfile.textContent = `Profile: `;
newLink.textContent = `${attr.html_url}`;
newLink.href = attr.html_url;
newFollowers.textContent = `Followers: ${attr.followers}`;
newFollowing.textContent = `Following: ${attr.following}`;
newBio.textContent = `Bio: ${attr.bio}`;

// entryPoint.append(newCard);
newCard.append(newImg, newInfo); 
newInfo.append(newName, newUsername, newLocation, newProfile, newFollowers, newFollowing, newBio);
newProfile.append(newLink); 

return newCard;

} 

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/