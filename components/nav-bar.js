const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="./components/navbar.css">
<nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <a href="#" class="nav-logo">BrandLogo</a>

      <!-- Navigation Links -->
      <ul class="nav-menu">
        <li class="nav-item"><a href="#" class="nav-links">About</a></li>
        <li class="nav-item dropdownmenu">
         <a href="#" class="nav-links hasSubMenu">Services</a><i class="fa-solid fa-triangle fa-rotate-180 fa-2xs dropdown" style="color: rgb(255, 255, 255);"></i>
         <ul class="submenu">
          <li><a href="#" class="submenu-links">Service 1</a></li>
          <li><a href="#" class="submenu-links">Service 2</a></li>
          <li><a href="#" class="submenu-links">Service 3</a></li>
         </ul>
        </li>
        
        <li class="nav-item dropdownmenu">
          <a href="#" class="nav-links hasSubMenu">Products</a><i class="fa-solid fa-triangle fa-rotate-180 fa-2xs dropdown" style="color: rgb(255, 255, 255);"></i>
          <ul class="submenu">
            <li><a href="#" class="submenu-links">Product 1</a></li>
            <li><a href="#" class="submenu-links">Product 2</a></li>
            <li><a href="#" class="submenu-links">Product 3</a></li>
          </ul>
        </li>
        <li class="nav-item"><a href="#" class="nav-links">Locations</a></li>
        <li class="nav-item"><a href="#" class="nav-links">Schedule</a></li>
        <li class="nav-item"><a href="#" class="nav-links">Shop</a></li>
        <li class="nav-item"><a href="#" class="nav-links">Contact Us</a></li>
        <li class="nav-item"><a href="#" class="nav-links">Extra 1</a></li>
        <li class="nav-item"><a href="#" class="nav-links">Extra 2</a></li>
        <li class="nav-item"><a href="#" class="nav-links">Extra 3</a></li>
        <li class="nav-item"><a href="#" class="nav-links">Extra 4</a></li>
      </ul>

      <!-- Hamburger Menu Icon for Mobile -->
      <button class="menu-toggle" id="mobile-menu" aria-label="Toggle navigation menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
  </nav>
`;

class NavBar extends HTMLElement {
    connectedCallback() {
        const shadow =this.attachShadow({mode: 'closed'})
        shadow.appendChild(template.content.cloneNode(true));

        // Attach external CSS
        //const link = document.createElement('link');
        //link.rel = 'stylesheet';
        //link.href = './components/navbar.css'; // Adjust the path to your CSS file
        //shadow.appendChild(link);

        // Define default CSS variable in shadow DOM
        const style = document.createElement('style');
        style.textContent = `
          :host {
            --menubgcolor: #000000;
          }
        `;
        shadow.appendChild(style);
    }

    static get observedAttributes() {
        return ["active-page"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "active-page") {
            oldValue && template.content.getElementById(oldValue).classList.remove("active-underline");
            newValue && template.content.getElementById(newValue).classList.add("active-underline");
        }
    }
}
customElements.define('nav-bar', NavBar);