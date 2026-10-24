const template = document.createElement('template');
template.innerHTML = `
<nav>
    <ul>
        <li id="about"><a href="about">About</a></li>
        <li id="projects"><a href="projects">Projects</a></li>
    </ul>
</nav>`;

class NavBar extends HTMLElement {
    connectedCallback() {
        const shadow =this.attachShadow({mode: 'closed'})
        shadow.appendChild(template.content.cloneNode(true))
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