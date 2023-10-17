// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://e-commerce-apis-n74l.onrender.com/orders/own/"
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://e-commerce-apis-n74l.onrender.com/users/own"
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(update) {
  console.log("authApi", update);
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://e-commerce-apis-n74l.onrender.com/users/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    //  TODO: on server it will return only some information of the user (not password);
    resolve({ data });
  });
}