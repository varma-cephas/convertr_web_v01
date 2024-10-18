const currency_converter_form = document.querySelector(".currency_converter_form");
const currency_amount_input = document.querySelector(".currency_amount_input");
const origin_currency_select_option = document.querySelector(".origin_currency_select_option");
const convert_currency_select_option = document.querySelector(".convert_currency_select_option");
const converted_currency_value_output = document.querySelector(".converted_currency_value_output");
const user_greeting = document.querySelector(".user_greeting");

const origin_currency_conversion_rate = document.querySelector(".origin_currency_conversion_rate");
const converted_currency_conversion_rate = document.querySelector(".converted_currency_conversion_rate");

const currency_converter__inner_container = document.querySelector(".currency_converter__inner_container");

const back_arrow = document.querySelector(".back_arrow");

const converted_currency_rate_value = document.querySelector(".converted_currency_rate_value");

const origin_currency_conversion_rate__output = document.querySelector(".origin_currency_conversion_rate__output");
const converted_currency_conversion_rate__output = document.querySelector(".converted_currency_conversion_rate__output");

const microphone = document.querySelector(".input_currency_through_voice__inner_container")

let final_converted_currency;


const greetUser = ()=>{
    const currentDate = new Date();
    const currentTime = currentDate.getHours();
    if(currentTime === 1 || currentTime < 12){
        user_greeting.textContent = "g'm";
    }else if(currentTime === 12 || currentTime <= 18 ){
        user_greeting.textContent = "g'a";
    }else{
        user_greeting.textContent = "g'e";
    }
}

greetUser();

async function getCurrencyData(){
    const request = await fetch(`https://api.fxratesapi.com/latest`);
    const response = await request.json();

    for(let x in response.rates){
        let origin_currency_option = document.createElement("option");
        let converted_currency_option = document.createElement("option");

        origin_currency_option.textContent = x;
        origin_currency_option.setAttribute("value", `${response.rates[x].toFixed(2)} ${x}`);

        origin_currency_option.setAttribute("class", `origin_currency_${x.toLowerCase()}`);
        origin_currency_select_option.appendChild(origin_currency_option);


        converted_currency_option.textContent = x;
        converted_currency_option.setAttribute("value", `${response.rates[x].toFixed(2)} ${x}`);

        convert_currency_select_option.setAttribute("class", `origin_currency_${x.toLowerCase()}`);
        convert_currency_select_option.appendChild(converted_currency_option);
    }
}

getCurrencyData();   


origin_currency_select_option.addEventListener("change", ()=>{
    origin_currency_conversion_rate.textContent = origin_currency_select_option.value;
})

convert_currency_select_option.addEventListener("change", ()=>{
    converted_currency_conversion_rate.textContent = convert_currency_select_option.value;
})

currency_converter_form.addEventListener("submit", (event)=>{
    if(Number(currency_amount_input.value) > 0){
        final_converted_currency = `${((Number(currency_amount_input.value) / Number(origin_currency_select_option.value.split(" ")[0])) * Number(convert_currency_select_option.value.split(" ")[0])).toFixed(4)} ${convert_currency_select_option.value.split(" ")[1]}`;
        converted_currency_value_output.textContent = final_converted_currency;

        origin_currency_conversion_rate__output.textContent = origin_currency_conversion_rate.textContent;
        converted_currency_conversion_rate__output.textContent = converted_currency_conversion_rate.textContent;

        currency_converter__inner_container.style.display = "none";
        microphone.style.display = "none";
        converted_currency_value_output.style.display = "block";
        converted_currency_rate_value.style.display = "block";

        back_arrow.style.display = "block";
    }else{
        alert("Please enter a valid amount that is above zero")
    }

    event.preventDefault();
})


back_arrow.addEventListener("click", ()=>{
    currency_converter__inner_container.style.display = "block";
    microphone.style.display = "block";

    converted_currency_value_output.style.display = "none";
    converted_currency_rate_value.style.display = "none";

    back_arrow.style.display = "none";
})
