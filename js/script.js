const currencyOne = document.querySelector("#currency-one");
const amountOne = document.querySelector(".amount-one");
const currencyTwo = document.querySelector("#currency-two");
const amountTwo = document.querySelector(".amount-two");
const swapBtn = document.querySelector(".swap");
const rateInfo = document.querySelector(".rate-info");

// funkcja przeliczająca waluty
const calculate = () => {
	const $apiKey = "6080f8922ce8bbeb125afd7135617b0e";

	fetch(
		`https://api.exchangeratesapi.io/v1/latest?access_key=${$apiKey}&from=${currencyOne.value}&to=${currencyTwo.value}`
	)
		.then(res => res.json())
		.then(data => {
			const currency1 = currencyOne.value;
			const currency2 = currencyTwo.value;

			// console.log(currency1);
			// console.log(currency2);
			// console.log(data.rates[currency1]);
			const rate = data.rates[currency2];
			rateInfo.textContent = `1 ${currency1} = ${rate.toFixed(4)} ${currency2}`;
			// console.log(rate);
			amountTwo.value = (amountOne.value * rate).toFixed(2);
		});
};

// funkcja zamieniająca miejscami waluty
const swap = () => {
	const oldValue = currencyOne.value;
	currencyOne.value = currencyTwo.value;
	currencyTwo.value = oldValue;
	calculate();
};

currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
swapBtn.addEventListener("click", swap);
calculate();
