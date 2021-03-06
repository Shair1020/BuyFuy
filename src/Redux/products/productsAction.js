import { firestore, serverTimestamp, storage } from "./../../Firebase/Firebase";
import { v4 as uuid } from "uuid";
import { CLEAR_PRODUCTS, SET_PRODUCTS } from "./productsConstant";
import { categorizeProducts } from "./../../utility/products";

// admin stuff
export var uploadProducts = (productsObj) => async () => {
  try {
    //  console.log(productsObj)
    //1- send file to storage  and get download url
    var image = storage.child(`product/img-${uuid()}`);
    var filelistener = image.put(productsObj.coverPhoto);
    //filelistener on("stage change",cb- progress ,cb -- error , cb- will trigger and getdownload url link)
    filelistener.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      async () => {
        // will trigger function
        var downloadUrl = await image.getDownloadURL();
        productsObj.coverPhoto = downloadUrl;
        productsObj.createdAt = serverTimestamp();
        productsObj.cost = parseFloat(productsObj.cost);
        productsObj.quantity = parseFloat(productsObj.quantity);
        console.log(productsObj);

        await firestore.collection("products").add(productsObj);
      }
    );
    //2- modify  productObj  with cover photos url and created At
    // 3- create doc in firstore
  } catch (error) {
    console.log(error);
  }
};

export var fetchProducts = () => async (dispatch) => {
  try {
    var query = await firestore.collection("products").get();
    var products = [];
    query.docs.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });
    categorizeProducts(products);

    dispatch({
      type: SET_PRODUCTS,
      payload: {
        products,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export var fetchSpecificProduct = (productId) => async (dispatch) => {
  try {
    var query=await firestore.collection("products").doc(productId).get();
    var products=query.data();
    return products
    // console.log(products);
    
  } catch (error) {
    console.log(error);

  }

};
export var fetchCategpryProducts = (category) => async (dispatch) => {
  try {
    var query = await firestore
      .collection("products")
      .where("category", "==", category)
      .get();
    var products = [];
    query.docs.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });
    dispatch({
      type: SET_PRODUCTS,
      payload: {
        products,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export var clearProducts = () => (dispatch) => {
  try {
    dispatch({
      type: CLEAR_PRODUCTS,
    });
  } catch (error) {
    console.log(error);
  }
};
