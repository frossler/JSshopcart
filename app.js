const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const template = document.getElementById('card-template').content;
const footerTemplate = document.getElementById('footer-template').content;
const cartTemplate = document.getElementById('cart-template').content;
const fragment = document.createDocumentFragment();


let cart = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

cards.addEventListener('click', e => {
    addToCart(e);
});

items.addEventListener('click', (e) => {
    btnAction(e);
})

const fetchData = async () => {
    try {
        const res = await fetch('products.json');
        const data = await res.json();
        renderCard(data);
    } catch (error) {
        console.log(error);
    }
}

const renderCard = data => {
    data.forEach(product => {
        template.querySelector('h5').textContent = product.title;
        template.querySelector('span').textContent = product.price;
        template.querySelector('img').setAttribute("src", product.thumbnailUrl);
        template.querySelector('button').dataset.id = product.id;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
    cards.appendChild(fragment);
}

const addToCart = e => {
    if (e.target.classList.contains('custom-btn')) {

        setCart(e.target.parentElement);
    }
    e.stopPropagation();
}

const setCart = obj => {
    const product = {
        id: obj.querySelector('.custom-btn').dataset.id,
        title: obj.querySelector('h5').textContent,
        price: obj.querySelector('span').textContent,
        quantity: 1

    }
    if (cart.hasOwnProperty(product.id)) {
        product.quantity = cart[product.id].quantity + 1;
    }
    cart[product.id] = {
        ...product
    };
    renderCart();
}

const renderCart = () => {
    items.innerHTML = "";
    Object.values(cart).forEach(product => {
        cartTemplate.querySelector('th').textContent = product.id;
        cartTemplate.querySelectorAll('td')[0].textContent = product.title;
        cartTemplate.querySelectorAll('td')[1].textContent = product.quantity;
        cartTemplate.querySelector('.btn-dark').dataset.id = product.id;
        cartTemplate.querySelector('.btn-danger').dataset.id = product.id;
        cartTemplate.querySelector('span').textContent = product.quantity * product.price;

        const clone = cartTemplate.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.appendChild(fragment);

    renderFooter();
}

const renderFooter = () => {
    footer.innerHTML = "";
    if (Object.keys(cart).length === 0) {
        footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
        return
    }
    const nQuantity = Object.values(cart).reduce((acc, {
        quantity
    }) => acc + quantity, 0);
    const nPrice = Object.values(cart).reduce((acc, {
        quantity,
        price
    }) => acc + quantity * price, 0);

    footerTemplate.querySelectorAll('td')[0].textContent = nQuantity;
    footerTemplate.querySelector('span').textContent = nPrice;

    const clone = footerTemplate.cloneNode(true);
    fragment.appendChild(clone);

    footer.appendChild(fragment);

    const emptyBtn = document.getElementById('empty-cart');
    emptyBtn.addEventListener('click', () => {
        cart = {};
        renderCart();
    });

    const endBtn = document.getElementById('end');
    endBtn.addEventListener('click', () => {
        cart = JSON.stringify(cart);
        localStorage.setItem('totalProducts', cart);
        console.log(localStorage);
        return window.location.assign('end.html');
    })
}

const btnAction = e => {

    if (e.target.classList.contains('btn-dark')) {
        const product = cart[e.target.dataset.id];
        product.quantity++;
        cart[e.target.dataset.id] = {
            ...product
        };
        console.log(cart);
        renderCart();
    }
    if (e.target.classList.contains('btn-danger')) {
        const product = cart[e.target.dataset.id];
        product.quantity--;
        if (product.quantity === 0) {
            delete cart[e.target.dataset.id];
        }
        renderCart();
    }
    e.stopPropagation();
}


