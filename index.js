let userInputEl = document.getElementById("searchInput");
let resultEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        link,
        title,
        description
    } = result;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.herf = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url")
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

    resultEl.appendChild(resultItemEl);
}


function displayResult(searchResults) {
    spinnerEl.classList.add("d-none");

    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}


function getHTTPResponse(event) {
    if (event.key === "Enter") {

        spinnerEl.classList.remove("d-none");
        resultEl.textContent = "";

        let userInput = userInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + userInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResult(search_results);
            });
    }
}


userInputEl.addEventListener("keydown", getHTTPResponse)