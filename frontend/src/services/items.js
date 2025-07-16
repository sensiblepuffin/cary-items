const BACKEND_URL = 'http://localhost:3777';

const fruits = [
    "Abiu",
    "Açaí",
    "Acerola",
    "Akebi",
    "Ackee",
    "African Cherry Orange",
    "American Mayapple",
    "Apple",
    "Apricot",
    "Aratiles",
    "Araza",
    "Avocado",
    "Banana",
    "Bilberry",
    "Blackberry",
    "Blackcurrant",
    "Black sapote",
    "Blueberry",
    "Boysenberry",
    "Breadfruit",
    "Buddha's hand",
    "Cactus pear",
    "Canistel",
    "Catmon",
    "Cempedak",
    "Cherimoya",
    "Cherry",
    "Chico fruit",
    "Citron",
    "Cloudberry",
    "Coco de mer",
    "Coconut",
    "Crab apple",
    "Cranberry",
    "Currant",
    "Damson",
    "Date",
    "Dragonfruit",
    "Durian",
    "Elderberry",
    "Feijoa",
    "Fig",
    "Finger Lime",
    "Gac",
    "Goji berry",
    "Gooseberry",
    "Grape",
    "Raisin",
    "Grapefruit",
    "Grewia asiatica",
    "Guava",
    "Hala fruit",
    "Haws, fruit of Hawthorn",
    "Honeyberry",
    "Huckleberry",
    "Jabuticaba",
    "Jackfruit",
    "Jambul",
    "Japanese plum",
    "Jostaberry",
    "Jujube",
    "Juniper berry",
    "Kaffir lime",
    "Kiwano",
    "Kiwifruit",
    "Kumquat",
    "Lanzones",
    "Lemon",
    "Lime",
    "Loganberry",
    "Longan",
    "Loquat",
    "Lulo",
    "Lychee",
    "Magellan Barberry",
    "Macopa",
    "Mamey apple",
    "Mamey Sapote",
    "Mango",
    "Mangosteen",
    "Marionberry",
    "Medlar",
    "Melon",
    "Cantaloupe",
    "Galia melon",
    "Honeydew",
    "Mouse melon",
    "Muskmelon",
    "Watermelon",
    "Miracle fruit",
    "Mohsina",
    "Momordica fruit",
    "Monstera deliciosa",
    "Mulberry",
    "Nance",
    "Nectarine",
    "Orange",
    "Blood orange",
    "Clementine",
    "Mandarine",
    "Tangerine",
    "Papaya",
    "Passionfruit",
    "Pawpaw",
    "Peach",
    "Pear",
    "Persimmon",
    "Pineapple",
    "Pineberry",
    "Plantain",
    "Plum",
    "Prune",
    "Plumcot",
    "Pomegranate",
    "Pomelo",
    "Quince",
    "Raspberry",
    "Salmonberry",
    "Rambutan",
    "Redcurrant",
    "Rose apple",
    "Salal berry",
    "Salak",
    "Santol",
    "Sapodilla",
    "Sapote",
    "Sarguelas",
    "Saskatoon",
    "Satsuma",
    "Sloe",
    "Soursop",
    "Star apple",
    "Star fruit",
    "Strawberry",
    "Sugar apple",
    "Suriname cherry",
    "Tamarillo",
    "Tamarind",
    "Tangelo",
    "Tayberry",
    "Thimbleberry",
    "Ugli fruit",
    "White currant",
    "White sapote",
    "Ximenia",
    "Yuzu",
]

export const addItem = async () => {
    // TODO: Handle new item name
    await fetch(BACKEND_URL 
            + '/items?name=' 
            + fruits[Math.floor(Math.random()*fruits.length)], 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .catch((err) => {
            console.log(err);
        })

};

export const removeItem = async (itemId) => {
    await fetch(BACKEND_URL + '/items/' + itemId, 
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .catch((err) => {
            console.log(err);
        });
};

export const editItem = async (itemId, itemName) => {
    await fetch(BACKEND_URL 
        + '/items/edit/' + itemId 
        + '?name=' + itemName, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .catch((err) => {
            console.log(err);
        });
};