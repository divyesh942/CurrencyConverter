const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

for(let select of dropdowns)
{
    for(let cuurCodes  in codes)
    {
        let newOption=document.createElement("option");
        newOption.innerText=cuurCodes;
        newOption.innerHTML=cuurCodes;
        select.append(newOption);

        if(select.name=== "from" && cuurCodes==="USD" )
        {
            newOption.selected=select.name;
        }
        else if(select.name==="to" && cuurCodes==="INR")
        {
            newOption.selected=select.name;
        }

        select.addEventListener("change",(evt)=>{
            updateFlage(evt.target);
        });
    }
}

const updateFlage = (element)=>{
    let currCode = element.value;
    let countryCode = codes[currCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;

    if(amtVal === "" || amtVal < 1)
    {
        amtVal=1;
        amount.value="1";
    }

    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let msg=document.querySelector(".msg");
    msg.innerText=`${amtVal} ${fromCurr.value} = ${amtVal*rate} ${toCurr.value}`;

});