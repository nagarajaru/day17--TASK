function element(tag, classname, id, text) {
    let tags = document.createElement(tag);
    tags.classList = classname;
    tags.id = id;
    tags.innerHTML = text;
    return tags;
  }
  //creating a base (container, heading, row)
  
  let container = element("div", "container", "", "");
  const h1 = element("h1", "text-center", "title", "Countries Weather Details");
  const row = element("div", "row", "", "");
  
  //  fetch part
  const responce = fetch("https://restcountries.com/v3.1/all");
  responce
    .then((data) => data.json())
    .then((result) => {
      // console.log(result);
      for (let i = 0; i < result.length; i++) {
        const col = document.createElement("div");
        col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
        col.innerHTML = `
              <div class="card h-100">
              <div class="card-header"> 
              <h5 class ="card-title text-center">${result[i].name.common} </h5>
              </div>
              <div.class ="img-box">
              <img src ="${result[i].flags.png}" class=" card-img-top" alt="countri img" />
              <div class="card-body">
              <div class="card-text text-center">Region:${result[i].region}</div>
              <div class="card-text text-center">Capital:${result[i].capital}</div>
              <div class="card-text text-center">Country Code:${result[i].cca3}</div>
              <button class ="btn btn-primary">Click For Weather </button>
              </div>
              </div>
              </div>
              `;
        row.append(col);
      }
      let buttons = document.querySelectorAll("button");
      buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          let latlng = result[index].latlng;
          let lat = latlng[0];
          let lon = latlng[1];
  
          let weatherApi = fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e5c8ecd7ed9dfeb3dd27359694ea033d
            `
          );
  
          weatherApi
         .then((data1) => data1.json())
         .then((res) => {
  
        //console.log(res);
  
          alert(`Weather of ${result[index].name.common} is ${Math.floor(res.main.temp)} c`)
          });
        });
      });
    });
  document.body.append(h1, container);
  container.append(row);