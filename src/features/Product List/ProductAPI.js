export function fetchCategories() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      "https://e-commerce-apis-n74l.onrender.com/categories"
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://e-commerce-apis-n74l.onrender.com/products/" + update.id,
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

export function fetchBrands() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      "https://e-commerce-apis-n74l.onrender.com/brands"
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsById(id) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      "https://e-commerce-apis-n74l.onrender.com/products/" + id
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://e-commerce-apis-n74l.onrender.com/products/",
      {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchProductsByFilters(filter, sort, pagination, admin) {
  // filter = {"category":"smartphone"}
  // sort = {_sort: "price"_order="desc"}
  // pagination = {_page:1,_limit=10}
  // TODO: we have to try with multiple category and brands 
  let queryString = '';
  for(let key in filter){ 
    const categoryValue = filter[key];
    if(categoryValue.length){
      const lastCategoryValue = categoryValue[categoryValue.length-1];
      queryString += `${key}=${lastCategoryValue}&`
    }
  }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }

  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }

  if(admin){
    queryString += `admin=true`
  }

  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      "https://e-commerce-apis-n74l.onrender.com/products?" + queryString
    ); 
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({data:{products:data, totalItems:+totalItems}});
  }
  );
}
