const container = document.getElementById("card-container");
const search = document.getElementById("searchTerm");

async function loadJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

const getData = () => {
  localStorage.removeItem("restaurants");
  loadJSON("./data.json").then((data) => {
    console.log("data---", data);
    localStorage.setItem("restaurants", JSON.stringify(data));
    generateView(data);
  });
};

const reset = () => {
  container.innerHTML = "";
  getData();
};

const searchRestaurants = () => {
  let filtered_restaurants;
  const restaurantData = localStorage.getItem("restaurants");
  const parseddata = JSON.parse(restaurantData);
  keyword = search.value.toLowerCase();
  filtered_restaurants = parseddata.filter(function (res) {
    res = res.name.toLowerCase();
    return res.indexOf(keyword) > -1;
  });

  if (filtered_restaurants.length == 0) reset();
  container.innerHTML = "";
  generateView(filtered_restaurants);
};

const generateCard = (restaurant) =>
  ` <div class="picture-card" id="${restaurant.id}">
    <img src=${restaurant.url} alt="Coding is great" width="100%" height="200px" >
    <div class="text-box">
      <p>${restaurant.name}</p>
      <p>${restaurant.location} Rating : ${restaurant.rating}</p>
      <p>ETA: ${restaurant.eta}     </p>
      
    </div>
  </div>`;

const generateView = (restaurants) => {
  const cards = restaurants.map((r) => generateCard(r));
  cards.forEach((element) => {
    container.innerHTML += element;
  });
};

const sortBy = (key, reverse) => {
  // Move smaller items towards the front
  // or back of the array depending on if
  // we want to sort the array in reverse
  // order or not.
  const moveSmaller = reverse ? 1 : -1;

  // Move larger items towards the front
  // or back of the array depending on if
  // we want to sort the array in reverse
  // order or not.
  const moveLarger = reverse ? -1 : 1;

  /**
   * @param  {*} a
   * @param  {*} b
   * @return {Number}
   */
  return (a, b) => {
    if (a[key] < b[key]) {
      return moveSmaller;
    }
    if (a[key] > b[key]) {
      return moveLarger;
    }
    return 0;
  };
};

const sortingFilter = (filter) => {
  const { value } = filter;
  const restaurantData = localStorage.getItem("restaurants");
  const parseddata = JSON.parse(restaurantData);
  if (value == "name") parseddata.sort(sortBy("name", false));
  if (value == "eta") parseddata.sort(sortBy("eta", false));
  if (value == "rating") parseddata.sort(sortBy("rating", true));
  container.innerHTML = "";
  generateView(parseddata);
};
