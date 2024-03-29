export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://e-commerce-apis-n74l.onrender.com/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //  TODO: on server it will return only some information of the user (not password);
    resolve({ data });
  });
}

export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch("https://e-commerce-apis-n74l.onrender.com/cart");
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://e-commerce-apis-n74l.onrender.com/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //  TODO: on server it will return only some information of the user (not password);
    resolve({ data });
  });
}

export function deleteItemFormCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://e-commerce-apis-n74l.onrender.com/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //  TODO: on server it will return only some information of the user (not password);
    resolve({ data: { id: itemId } });
  });
}


export function resetCart() {
  // get all items of user - and then delete e  ach item 
  return new Promise(async (resolve) => {
  const response = await fetchItemsByUserId();
  const items = response.data;
  console.log("All Items of User",items);
  for(let item of items){
    await deleteItemFormCart(item.id);
  }
  resolve({status: 'success'});
})
}
