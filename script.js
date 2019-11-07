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

  if(passCheck){
    const endDate = new Date();
    let dt = endDate - startDate;
    console.log(dt/1000);
    divRes.innerHTML += `<li>Det tok ${dt/1000}s å knekke passordet <b>${inpPass.value}</b></li>`;
  }else{
    divRes.innerHTML += `<li>Klarte ikke knekke passordet <b>${inpPass.value}</b></li>`;
  }
}

function check(list,uPass){
  for(const pass of list){
    if(uPass === pass){
      return true;
    }
  }
  return false;
}
