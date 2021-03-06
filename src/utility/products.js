export var categorizeProducts = (productsArr) => {
  //initiliaze categorizes products
  var categorizes = [];
  var categoryName;
  var isCategoryExist;
  var newCategory;
  //loop over products
  // productsArr.forEach((product)=>{
  //   var category=product.category;
  //   console.log(category)

  // })
  for (var product of productsArr) {
    categoryName = product.category;
    // console.log(categoryName)
    isCategoryExist = categorizes.some(
      (categoryObj) => categoryObj.category === categoryName
    );
    // console.log(isCategoryExist)
    if (isCategoryExist) {
      //if category is sxist (yes)
      //push products in products field in categorObj
      categorizes = categorizes.map((categoryObj) => {
        if (categoryObj.category === categoryName) {
          categoryObj.products.push(product);
          return categoryObj;
        } else {
          return categoryObj;
        }
      });
    } else {
      newCategory = {
        category: product.category,
        products: [product],
      };
      categorizes.push(newCategory);
    }
  }
  return categorizes;
};

export var productsAdditionInCart = (existingProducts, upcomingProduct) => {
  var exist = existingProducts.some(
    (existingProduct) => existingProduct.id === upcomingProduct.id
  );
  if (!exist) {
    return [...existingProducts, { ...upcomingProduct, quantity: 1 }];
  } else {
    return existingProducts.map((existingProduct) => {
      if (existingProduct.id === upcomingProduct.id) {
        return {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        };
      } else return existingProduct;
    });
  }
};
export var productRemovalFromCart = (existingProducts, upcomingProductId) => {
  var product = existingProducts.find(
    (existingProduct) => existingProduct.id === upcomingProductId
  );
  if (product) {
    if (product.quantity > 0) {
      return existingProducts.map((existingProduct) => {
        if (existingProduct.id === upcomingProductId) {
          return {
            ...existingProduct,
            quantity: existingProduct.quantity - 1,
          };
        } else {
          return existingProduct;
        }
      });
    } else {
      return existingProducts.filter(
        (existingProduct) => existingProduct.id !== upcomingProductId
      );
    }
  } else {
    return existingProducts;
  }
};
