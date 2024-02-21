const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll('.dropdown select');
const  btn = document.querySelector('button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.To select');
const msg = document.querySelector(".msg");


for (let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        } else if(select.name === "To" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

     select.addEventListener('change', (evt) => {
         updateflag(evt.target)
     });
}

const updateflag = (element) => {
    let currCode = element.value;
    // console.log(currCode)
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img =element.parentElement.querySelector('img');
    img.src = newSrc;
}

btn.addEventListener('click',(e)=> {
    e.preventDefault();
    updateExchangeRate();
  
});

 const updateExchangeRate = async() =>{
    let amount = document.querySelector('.Amount input');
    let amtVal = amount.value;
    console.log(amtVal)
    if(amtVal === "" && amtVal < 1){
        amtVal = 1;
        amount.value = '1';
    }

    // console.log(fromCurr.value , toCurr.value)
    const URL = ` ${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;
    msg.innerText =`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    console.log(response);
 };

 window.addEventListener('load', ()=> {
    updateExchangeRate();
 })
