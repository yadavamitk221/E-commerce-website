// A mock function to mimic making an async request for d

import { json } from "react-router-dom";

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://e-commerce-apis-n74l.onrender.com/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //  TODO: on server it will return only some information of the user (not password);
    resolve({ data });
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("loginInfo", loginInfo);
      const response = await fetch("https://e-commerce-apis-n74l.onrender.com/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
      console.log("response: ",response);
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject("Invalid Credentials");
      }
      //  TODO: on server it will return only some information of the user (not password);
    } catch (error) {
      return reject( error );
    }
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://e-commerce-apis-n74l.onrender.com/auth/check");
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        return reject({ error });
      }
      //  TODO: on server it will return only some information of the user (not password);
    } catch (error) {
      return reject({ error });
    }
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://e-commerce-apis-n74l.onrender.com/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        return reject({ error });
      }
      //  TODO: on server it will return only some information of the user (not password);
    } catch (error) {
      return reject({ error });
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    //  TODO: on server it will remove user session info
    resolve({ data: "success" });
  });
}