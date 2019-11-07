const passordlister = {
  totaltTopp1mill: 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10-million-password-list-top-1000000.txt',
  norskeTopp125: 'https://raw.githubusercontent.com/0301/ordliste/master/ordliste_passord_topp_125.txt',
}

const btn = document.querySelector("#btn");
const inpPass = document.querySelector("#inp");
const divRes = document.querySelector("#divRes");
const velger = document.querySelector('.velger');

for(const liste of Object.keys(passordlister)){
  velger.innerHTML += `<option value=${liste}>${liste}</option>`;
}
btn.onclick = function(){
  if(inpPass.value !== ""){
    checkPass();
  }
}
async function checkPass(){
  const startDate = new Date();
  let response = await fetch(passordlister[velger.value]);
  let text = await response.text();
  let passlist = text.split("\n");

  let passCheck = await check(passlist, inpPass.value);

  if(passCheck[0]){
    const endDate = new Date();
    let dt = endDate - startDate;
    console.log(dt/1000);
    divRes.innerHTML += `<li>Det tok ${passCheck[1]} antall forsøk og ${dt/1000}s for å knekke passordet <b>${inpPass.value}</b></li>`;
  }else{
    divRes.innerHTML += `<li>Brukte ${passCheck[1]} antall forsøk, og klarte <br>ikke</br> knekke passordet <b>${inpPass.value}</b></li>`;
  }
}

function check(list,uPass){
  for(const pass in list){
    if(uPass === list[pass]){
      return [true, pass];
    }
  }
  return [false,list.length];
}
