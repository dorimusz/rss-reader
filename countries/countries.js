
function loadCountry() {
    fetch("https://restcountries.com/v3.1/name/peru").then(r => r.json()).then(showCountry);
}

function showCountry(country){
    console.log(country);

    const name = country[0].name.official;
    document.getElementById("name").textContent=name;
}

window.addEventListener("load", loadCountry);