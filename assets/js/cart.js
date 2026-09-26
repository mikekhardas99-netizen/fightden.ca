function decreaseQty(button)
{
    const objInput = button.nextElementSibling;
    if (objInput.value > 0)
    {
        objInput.value = Math.abs(objInput.value) - 1;
    }
    else
    {
        objInput.value = 0;
    }
}

function increaseQty(button)
{
    const objInput = button.previousElementSibling;
    objInput.value = Math.abs(objInput.value) + 1;
}

function addToCart(button)
{
    const itemId = button.getAttribute("data-item");
    const itemDescr = button.getAttribute("data-descr");
    const objInput = button.parentElement.previousElementSibling.querySelector(".itemqty");
    let itemQty = objInput.value;
    if (itemQty > 0)
    {
        console.log("Added " + itemQty + " of " + itemDescr + " to cart. Data-item: " + itemId);
        const existingQty = sessionStorage.getItem("Item" + itemId);
        //console.log("Existing quantity in cart: " + existingQty);
        if (existingQty !== null)
        {
            itemQty = parseInt(existingQty) + parseInt(itemQty);
        }
        try
        {
            sessionStorage.setItem("Item" + itemId, itemQty);
            objInput.value = 0; // Reset the quantity input field after adding to cart
            console.log("Updated quantity: " + itemQty);
        }
        catch (e)
        {
            console.error("Error storing item in sessionStorage: " + e);
            if (e instanceof DOMException &&
                (e.name === 'QuotaExceededError' || 
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || // Firefox specific
                e.code === 22 || 
                e.code === 1014)
                ) {
                    console.warn('sessionStorage limit reached. Consider clearing old data.');
                    // Optional: clear oldest data or fallback to memory
            } else {
                // 2. Handle SecurityError (e.g., blocked by private mode or browser settings)
                console.error('sessionStorage is disabled or inaccessible:', error.message);
            }
        }

        // Here you would typically add the item to the cart in your application logic
    }
    else
    {
        alert("Please select a quantity greater than 0.");
    }
}

function loadProducts()
{
    const objProducts = {
        products: {}
    };

    const jsonProduct1 = {};
    jsonProduct1.productid = 1;
    jsonProduct1.name = "Private Lesson";
    jsonProduct1.cost = 200;
    const jsonp1 = JSON.stringify(jsonProduct1);
    //console.log(jsonp1);

    const jsonProduct2 = {};
    jsonProduct2.productid = 2;
    jsonProduct2.name = "Single Drop In Class";
    jsonProduct2.cost = 30;
    const jsonp2 = JSON.stringify(jsonProduct2);
    //console.log(jsonp1);

    const jsonProduct3 = {};
    jsonProduct3.productid = 3;
    jsonProduct3.name = "Intro Group Seminar";
    jsonProduct3.cost = 1000;
    const jsonp3 = JSON.stringify(jsonProduct3);

    objProducts.products[1] = jsonProduct1;
    objProducts.products[2] = jsonProduct2;
    objProducts.products[3] = jsonProduct3;
    console.log(objProducts);
    console.log(objProducts.products[2].cost);
    


    //let jsonProduct1 = '{"productid": 1, "name": "Private Lesson", "cost": 200}';
    //let jsonProduct2 = '{"productid": 2, "name": "Single Drop In Class", "cost": 30}';
    //let userObject = JSON.parse(jsonProduct1);
}