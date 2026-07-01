document.getElementById("faPhone").addEventListener('click', (e) => updatePhone(e));

function updatePhone()
{
  //document.getElementById("aTel").href = 'tel:4168451532';
  document.getElementById("aTel").href = 'tel:4163429562'; //phone tests
  console.log("Phone link updated");
}


// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

async function sharePage()
{
	const shareData = {
		title: 'Fight Den',
		url: 'https://fightden.ca'
	};

  //window.location.hostname
	
	try {
		await navigator.share(shareData);
	} catch (err) {
		console.info(`${err}`);
	}
}

const canvas = document.getElementById("cnvPhone");
const ctx = canvas.getContext("2d");
window.devicePixelRatio=2;
ctx.font = "16px Verdana";
ctx.fillStyle = "#000000";
ctx.textBaseline = 'middle';
ctx.fillText("416-845-1532",6,24);

function generateBrowserNonce() {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
  }
  
  //const nonce = generateBrowserNonce();
  //console.log(nonce); // Example: "dGhpcyBpcyBhIG5vbmNl"
  