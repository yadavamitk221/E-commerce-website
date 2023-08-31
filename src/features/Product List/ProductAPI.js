export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products') 
    const data = await response.json()
    resolve({data});
  }
  );
}

export function fetchCategories() {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/categories');
    const data = await response.json()
    resolve({data});
  }
  );
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/"+update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //  TODO: on server it will return only some information of the user (not password);
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/brands') 
    const data = await response.json()
    resolve({data});
  }
  );
}

export function fetchProductsById(id) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products/'+id) ;
    const data = await response.json();
    resolve({data});
  }
  );
}

export function createProduct(product) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/products/', {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    }) ;
    const data = await response.json();
    resolve({data});
  }
  );
}


export function fetchProductsByFilters(filter, sort, pagination) {
  // filter = {"category":"smartphone"}
  // sort = {_sort: "price"_order="desc"}
  // pagination = {_page:1,_limit=10}
  // TODO : on server we will support multi values
  // TODO: SERVER WILL FILTER DELETED PRODUCTS IN CASE OF NON=ADMIN
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

  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products?'+queryString) 
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({data:{products:data, totalItems:+totalItems}});
  }
  );
}
