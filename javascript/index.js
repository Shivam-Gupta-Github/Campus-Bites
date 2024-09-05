
let products = [
  {
    id: "1",
    name: 'product 1',
    image: '1.png',
    price: 75
  },
  {
    id: "2",
    name: 'product 2',
    image: '2.png',
    price: 50
  },
  {
    id: "3",
    name: 'product 3',
    image: '3.png',
    price: 45
  },
  {
    id: "4",
    name: 'product 4',
    image: '4.png',
    price: 60
  },
  {
    id: "5",
    name: 'product 5',
    image: '5.png',
    price: 120
  },
  {
    id: "6",
    name: 'product 6',
    image: '6.png',
    price: 40
  },
  {
    id: "7",
    name: 'product 7',
    image: '7.png',
    price: 10
  },
  {
    id: "8",
    name: 'product 8',
    image: '8.png',
    price: 60
  }
]

let northIndian = [
  {
    id: "cholaBhatoora",
    name: 'Chola Bhatoora',
    image: 'cholaBhatoora.png',
    price: 75
  },
  {
    id: "paneerParatha",
    name: 'Paneer Paratha',
    image: 'paneerParatha.png',
    price: 50
  },
  {
    id: "alooParatha",
    name: 'Aloo Paratha',
    image: 'alooParatha.png',
    price: 40
  },
  {
    id: "vegBiryani",
    name: 'Veg Biryani',
    image: 'vegBiryani.png',
    price: 75
  },
]


let chinese = [
  {
    id: "chowmien",
    name: 'Chowmien',
    image: 'chowmien.png',
    price: 30
  },
  {
    id: "hakkaNoodles",
    name: 'Hakka Noodles',
    image: 'hakkaNoodles.png',
    price: 35
  },
  {
    id: "manchurian",
    name: 'Manchurian',
    image: 'manchurian.png',
    price: 40
  },
  {
    id: "friedRice",
    name: 'Fried Rice',
    image: 'friedRice.png',
    price: 35
  },
]

let iceCream = [
  {
    id: "blackCurrent",
    name: 'BlackCurrent',
    image: 'blackCurrent.png',
    price: 30
  },
  {
    id: "butterscotch",
    name: 'Butterscotch',
    image: 'butterscotch.png',
    price: 35
  },
  {
    id: "chocobar",
    name: 'Chocobar',
    image: 'chocobar.png',
    price: 40
  },
  {
    id: "strawberryIceCream",
    name: 'Strawberry ice-cream',
    image: 'strawberryIceCream.png',
    price: 35
  },
]

let beverages = [
  {
    id: "chocolateShake",
    name: 'Chocolate Shake',
    image: 'chocolateShake.png',
    price: 60
  },
  {
    id: "bananaShake",
    name: 'Banana Shake',
    image: 'bananaShake.png',
    price: 35
  },
  {
    id: "coffee",
    name: 'Coffee',
    image: 'coffee.png',
    price: 40
  },
  {
    id: "pepsi",
    name: 'Pepsi',
    image: 'pepsi.png',
    price: 20
  },
]

function getPriceById(id) {
  var product = products.find(item => item.id === id);
  if (!product) {
    product = northIndian.find(item => item.id === id);
  }
  if (!product) {
    product = chinese.find(item => item.id === id);
  }
  if (!product) {
    product = iceCream.find(item => item.id === id);
  }
  if (!product) {
      product = beverages.find(item => item.id === id);
  }

  if (product) {
    return product.price;
  } else {
    return null; // Return null or handle the case where the ID is not found
  }
}

let basket = [];

let generateItem = (x) => {
  
  let {id,name,image,price}=x;

  return `
  <div class="item-box">
    <img class="item-img" src="../resources/foods/north indian.png" alt="${name}">
    <div class="item-info">
      <h3 class="item-name">${name}</h3>
      <h3 id="item-${id}-price" class="item-price">Rs. ${price}</h3>
    </div>
    <div class="add-button">
      <div onclick="add('${id}')" class="add">+</div>
      <div id=${id} class="count">Add</div>
      <div onclick="remove('${id}')" class="remove">-</div>
    </div>
  </div>
`;

}

let ni = document.getElementById("north-indian");
ni.innerHTML=northIndian.map(generateItem).join("");   

let ic = document.getElementById("ice-cream");
ic.innerHTML=iceCream.map(generateItem).join("");

let ch = document.getElementById("chinese");
ch.innerHTML=chinese.map(generateItem).join(""); 

let bv = document.getElementById("beverage");
bv.innerHTML=beverages.map(generateItem).join(""); 

let items = document.getElementById("others");
items.innerHTML=products.map(generateItem).join(""); 

var total=0;

let add = (id) => {
  let selectedItem=id;
  let count = document.getElementById(id);
  if (count.innerHTML == "Add"){
    count.innerHTML = 1;
  }
  else {
    count.innerHTML++;
  }

  // updating cart
  let search = basket.find((x) => x.id === selectedItem);
  if (search === undefined){
    basket.push({
      id: selectedItem,
      quantity: 1,
    })
  } else {
    search.quantity += 1;
  }

  console.log(basket);
  //updating total amount
  total+=getPriceById(selectedItem);
  console.log(total);

  updateBasket();
}


let remove = (id) => {
  let selectedItem=id;
  let count = document.getElementById(id);
  if (count.innerHTML > 1){
    count.innerHTML--;
  }
  else {
    count.innerHTML="Add";
  }

  // updating cart
  let search = basket.find((x) => x.id === selectedItem);
  if (search === undefined){
    return;
  } 
  else if (search.quantity === 0){
      return;
  }
  else {
    search.quantity -= 1;
    if (search.quantity === 0){
      basket = basket.filter(item => item.id !== selectedItem);
    }
  }

  //updating total amount
  total-=getPriceById(selectedItem);
  console.log(basket);
  console.log(total);

  updateBasket();
  if (basket.length === 0){
    document.querySelector('.basket').classList.add("hidden");
  }
}


let generateBasketBox= (numberOfItems,total) => {

  return `
  <div class="basket">
    <div class="basket-info">
      <h3 id="no-of-items" class="basket-text">${numberOfItems} items added</h3>
      <h3 id="total" class="basket-text">total : Rs. ${total}</h3>
    </div>
    <div class="go-to-cart"><a style="text-decoration: none; color: inherit;" href="basket.html">Proceed to pay</a></div>
  </div>
`;

}

function updateBasket () {
  let basketBox = document.querySelector('.basket');
  basketBox.classList.remove("hidden");
  basketBox.innerHTML=generateBasketBox(basket.length,total);
}
