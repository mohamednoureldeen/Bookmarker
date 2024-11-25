
// global variable
var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");

var siteList = [];
siteList = JSON.parse(localStorage.getItem("siteList")) || [];

var siteIndex = 0;

displaySite();


// add site
function addSite() {

  if (valdiationInputs(siteNameInput,"nameError") && valdiationInputs(siteUrlInput,"urlError")) {
    var sites = {
      name: siteNameInput.value,
      url: siteUrlInput.value,
    };
    siteList.push(sites);
    localStorage.setItem("siteList", JSON.stringify(siteList));
    displaySite();
    clearForm();
    siteNameInput.classList.remove("is-valid")
    siteUrlInput.classList.remove("is-valid")
  }

}

// clear form
function clearForm() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
}

// validation
function valdiationInputs(element,msgId){
  var text = element.value;
  var regex = {
    siteName: /^[A-Za-z][A-Za-z\'\-]{2,}([\ A-Za-z][A-Za-z\'\-]+)*$/,
    siteUrl:/^(https?:\/\/)(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/[^\s]*)?$/,
  }
  var msg = document.getElementById(msgId);

  if (regex[element.id].test(text)){
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    msg.classList.add("d-none");
    submitBtn.disabled = false;
    updateBtn.disabled = false;
    return true;
  }
  else{
    msg.classList.remove("d-none");
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    submitBtn.disabled = true;
    updateBtn.disabled = true;
    return false;
  }

}


// display site
function displaySite() {
  var cartona = "";
  for (var i = 0; i < siteList.length; i++) {
    cartona += `
        <tr class="table-row ">
        <td scope="row">${i + 1}</td>
        <td>${siteList[i].name}</td>
        <td>  <button onclick="window.open('${siteList[i].url}');" class=" btn-table btn btn-visit" ><i class="fa-solid fa-eye"></i><span class="hide-text">Visit</span></button></td>
        <td>  <button onclick="setDataInfo(${i})" class="btn-table btn btn-edit"><i class=" fas fa-edit"></i><span class="hide-text">Edit</span></button></td>
        <td>  <button onclick="deleteSite(${i})" class=" btn-table btn btn-delete"><i class="fa-solid fa-trash-can"></i><span class="hide-text">Delete</span></button></td>
        </tr>
        `;
  }
  document.getElementById("tableContent").innerHTML = cartona;
}

// delete site
function deleteSite(index) {
  siteList.splice(index, 1);
  localStorage.setItem("siteList", JSON.stringify(siteList));
  displaySite();
}

// retrieve data
function setDataInfo(index){
    siteIndex = index;
    siteNameInput.value = siteList[index].name;
    siteUrlInput.value = siteList[index].url;

    submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none"); 
}



// update 
function updateSite(){
    if(valdiationInputs(siteNameInput,"nameError") && valdiationInputs(siteUrlInput,"urlError")){
      var sites = {
        name: siteNameInput.value,
        url: siteUrlInput.value,
      };
      siteList.splice(siteIndex, 1, sites);
      localStorage.setItem("siteList", JSON.stringify(siteList));

      submitBtn.classList.remove("d-none");
      updateBtn.classList.add("d-none");

      displaySite();
      clearForm();
      siteNameInput.classList.remove("is-valid")
    siteUrlInput.classList.remove("is-valid")
    }
}
