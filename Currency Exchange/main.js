let currencyOne = "USD";
let currencyTwo = "CAD";

// Update selected currency when clicking menu items
document.querySelectorAll("#currency-one a").forEach((menu) =>
    menu.addEventListener("click", function () {
        document.getElementById("from-button").textContent = this.textContent;
        currencyOne = this.textContent;
        calculate(); // Recalculate when currency changes
        document.getElementById("currency-one").style.display = 'none';
    })
);
// Update selected currency when clicking menu items
document.querySelectorAll("#currency-two a").forEach((menu) =>
    menu.addEventListener("click", function () {
        document.getElementById("to-button").textContent = this.textContent;
        currencyTwo = this.textContent;
        calculate(); // Recalculate when currency changes
        document.getElementById("currency-two").style.display = 'none'; // Hide the dropdown menu
        
    })
);
//Hide 
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('mouseover', function () {
        this.querySelector('.dropdown-content').style.display = 'block';
    });

    dropdown.addEventListener('mouseleave', function () {
        // Hide dropdown menu if mouse leaves the dropdown area
        const dropdownContent = this.querySelector('.dropdown-content');
        if (!dropdownContent.contains(event.relatedTarget)) {
            dropdownContent.style.display = 'none';
        }
    });
});


const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rate and update the DOM
function calculate() {
    const currency_one = currencyOne;
    const currency_two = currencyTwo;
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency_two];
            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
            /* const amountOne =  parseFloat(amountE1_one.value);
            const convertedAmount = amountOne *rate;
            if(convertedAmount %1 ===0) {
                amountEl_two.value = convertedAmount.toFixed(0);
            }else{
                amountE1_two.value = convertedAmount.toFixed(4);
            } */
        })
        .catch(error => console.error('Error fetching exchange rate:', error));
}

currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyOne;
    currencyOne = currencyTwo;
    currencyTwo = temp;
    
    document.getElementById('from-button').textContent = currencyOne;
    document.getElementById('to-button').textContent = currencyTwo;
    
    calculate();
});

calculate();