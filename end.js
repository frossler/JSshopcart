const totalProducts = JSON.parse(localStorage.getItem('totalProducts'));
const results = document.getElementById('results');
const resultsTemplate = document.getElementById('results-template').content;
const footerTemplate = document.getElementById('footer-template').content;
const footerResults = document.getElementById('footer-results');
const payBtn = document.getElementById('pay');
const totalQuantity = 0;

const fragment = document.createDocumentFragment();

const renderResults = () => {

    Object.values(totalProducts).forEach(product => {
        resultsTemplate.querySelector('th').textContent = product.id;
        resultsTemplate.querySelectorAll('td')[0].textContent = product.title;
        resultsTemplate.querySelectorAll('td')[1].textContent = product.quantity;
        resultsTemplate.querySelector('span').textContent = product.quantity * product.price;
        
        const clone = resultsTemplate.cloneNode(true);
        fragment.appendChild(clone);
        
        const cant = Object.values(product);
        console.log(cant[3]);
    })
    results.appendChild(fragment);
    renderFooter();

}

const renderFooter = () => {
    const nQuantity = Object.values(totalProducts).reduce((acc, {
        quantity
    }) => acc + quantity, 0);
    const nPrice = Object.values(totalProducts).reduce((acc, {
        quantity,
        price
    }) => acc + quantity * price, 0);

    console.log(nQuantity);
    console.log(nPrice);

    footerTemplate.querySelectorAll('td')[0].textContent = nQuantity;
    footerTemplate.querySelectorAll('span').textContent = nQuantity;

    const clone = footerTemplate.cloneNode(true);
    fragment.appendChild(clone);

    footerResults.appendChild(fragment);
}
renderResults();

payBtn.addEventListener('click', function() {
    document.getElementById('pop-up').classList.add('active');
})