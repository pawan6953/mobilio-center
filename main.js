
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('Service Worker registered:', reg.scope))
        .catch(err => console.error('Service Worker registration failed:', err));
    });
  }
  
 
  function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(name + " added to cart!");
  }
  

  function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cart-items');
    let totalPrice = 0;
  
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty!</p>";
    } else {
      cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
          <h3>${item.name}</h3>
          <p>Price: ₹${item.price.toLocaleString()}</p>
        </div>
      `).join('');
      totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    }
  
    const totalElement = document.getElementById('total-price');
    if (totalElement) {
      totalElement.textContent = "Total Price: ₹" + totalPrice.toLocaleString();
    }
  }
  

  function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
  }

  if (window.location.pathname.includes('cart.html')) {
    displayCart();
  }


window.addEventListener('offline', function() {
  alert('You are offline. Please check your internet connection.');
});


window.addEventListener('online', function() {
  alert('You are back online!');
});
