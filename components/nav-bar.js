//<link rel="stylesheet" href="./assets/css/all.min.css">
const template = document.createElement('template');
const NAVBAR_MARKUP = `
<link rel="stylesheet" href="./components/navbar.css">
<nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <a href="#" class="nav-logo"><img src="/images/fightden_logo.webp"></a>

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

const navbarPolicy = trustedTypes.createPolicy('navbar-template', {
  createHTML(input) {
    if (input !== NAVBAR_MARKUP) {
      console.error('Unexpected navbar markup:', input);
      throw new TypeError('Unexpected navbar markup');
    }
    return input;
  }
});

template.innerHTML = navbarPolicy.createHTML(NAVBAR_MARKUP);

class NavBar extends HTMLElement { 
    connectedCallback() {
        const shadow = this.attachShadow({mode: 'closed'});
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

        if (!document.getElementById('font-awesome-solid-font')) {
            const fontFaceStyle = document.createElement('style');
            fontFaceStyle.id = 'font-awesome-solid-font';
            fontFaceStyle.textContent = `
              @font-face {
                font-family: "Font Awesome 7 Pro";
                font-style: normal;
                font-weight: 900;
                font-display: block;
                src: url("${new URL('../assets/webfonts/fa-solid-900.woff2', import.meta.url)}") format("woff2");
              }
            `;
            document.head.appendChild(fontFaceStyle);
        }

        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = new URL('../assets/css/all.min.css', import.meta.url);
        shadow.appendChild(fontAwesomeLink);

        const mobileMenuButton = shadow.querySelector('#mobile-menu');
        const navMenu = shadow.querySelector('.nav-menu');
        const dropdownmenus = shadow.querySelectorAll('.dropdownmenu');

        for (const dropdownmenu of dropdownmenus) {
            console.log(dropdownmenu);
            dropdownmenu.addEventListener('click', (e) => {
                //console.log("submenu click");
                console.log(e.currentTarget.querySelector('.submenu').classList);
                e.currentTarget.querySelector('.submenu').classList.toggle('is-open');
                e.currentTarget.querySelector('.fa-triangle').classList.toggle('fa-rotate-180');
            });
        }

        // Toggle Mobile Menu
        console.log(mobileMenuButton);
        mobileMenuButton.addEventListener('click', () => {
          navMenu.classList.toggle('is-active');
        });
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