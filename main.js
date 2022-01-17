let data;
(async () => {
    data = await (await fetch('./store/loanProducts.json')).json();
    if (data) {
        getProduct();
    }
})();

let getProduct =  function () {
    let productList = document.querySelectorAll('.tabs-nav');
    let productFormContent = document.querySelectorAll('.tabs__content');
    let selectedProduct;

    function getDataById (element, id) {
        return  Array.from(element).filter((t) => t.id === id?.toString());
    }

    function onSaveButtonClick(id) {
        const currentData = Array.from(document.querySelectorAll('input'
        )).filter((input) => input.id === id.toString());

        const newData = currentData.reduce(
            (acc, el) => ({...acc, [el.name.toString()]: el.value, id: el.id}),
            {},
        );

        let currentTab = getDataById(
            document.querySelectorAll('.tabs-nav__item')
        , id);
        const inputProductName = getDataById(
            document.getElementsByName('name'),
        );

        const productTitle = getDataById(
            document.querySelectorAll('.product__title'),
        id );
        const productDate = getDataById(
            document.querySelectorAll('.current_date'),
            id );

        const inputMinAmount = getDataById(
            document.getElementsByName('minAmount'),
         id);
        const inputMaxAmount = getDataById(
            document.getElementsByName('maxAmount'),
         id);
        const inputMinTerm = getDataById(
            document.getElementsByName('minTerm'),
        id);
        const inputMaxTerm = getDataById(
            document.getElementsByName('maxTerm')
         , id);
        const inputAnnualInterestRate = getDataById(
            document.getElementsByName('annualInterestRate')
        , id);

        const copy = data.map((data) => {
            if (data.id === id) {
                productDate[0].innerText = new Date().toLocaleDateString()
                currentTab[0].innerText = newData.name;
                currentTab[0].append(productDate[0])
                productTitle[0].innerText = newData.name;
           /*     productDate[0].innerText = '12.23.45';*/
                inputMinAmount[0].value = newData.minAmount;
                inputMaxAmount[0].value = newData.maxAmount;
                inputMinTerm[0].value = newData.minTerm;
                inputMaxTerm[0].value = newData.maxTerm;
                inputAnnualInterestRate[0].value = newData.annualInterestRate;

                return newData;
            }
            return data;
        });

        data = copy;
    }

    function render() {
        data.map(({id, name, minAmount, maxAmount, minTerm, maxTerm, annualInterestRate, date}) => {
            const tabItem = document.createElement('div');
            const productTitle = document.createElement('div');
            const formContainer = document.createElement('div');
            const amountInputBlock = document.createElement('div');
            const ternInputBlock = document.createElement('div');

            const inputAnnualInterestRate = document.createElement('input');
            const inputProductName = document.createElement('input');
            const inputMinAmount = document.createElement('input');
            const inputMaxAmount = document.createElement('input');
            const inputMinTerm = document.createElement('input');
            const inputMaxTerm = document.createElement('input');

            const labelProductName = document.createElement('label');
            const labelMinAmount = document.createElement('label');
            const labelMaxAmount = document.createElement('label');
            const labelMinTerm = document.createElement('label');
            const labelMaxTerm = document.createElement('label');
            const labelAnnualInterestRate = document.createElement('label');


            const formDate = document.createElement('div');
            formDate.innerText = date

            const saveButton = document.createElement('button');

            amountInputBlock.className = 'input__container';
            ternInputBlock.className = 'input__container';

            formDate.className ='current_date'
            formDate.id = id
            tabItem.innerText = name;
            tabItem.className = 'tabs-nav__item';
            tabItem.id = id;
            tabItem.setAttribute('data-tab-name', name);
            tabItem.append(formDate)
            productList[0].append(tabItem);

            saveButton.innerText = 'Сохранить';
            saveButton.className = 'button__save';
            saveButton.addEventListener(
                'click',
                onSaveButtonClick.bind(this, id),
                id,
            );

            productTitle.id = id;
            productTitle.innerText = name;
            productTitle.className = 'product__title';
            productTitle.setAttribute('product__title', name);


            labelProductName.innerText = 'Product Name';

            inputProductName.value = name;
            inputProductName.id = id;
            inputProductName.name = 'name';

            labelProductName.append(inputProductName);
            labelProductName.className = 'input__container';

            labelMinAmount.innerText = 'Min Amount';
            inputMinAmount.value = minAmount;
            inputMinAmount.id = id;
            inputMinAmount.name = 'minAmount';
            labelMinAmount.append(inputMinAmount);

            labelMaxAmount.innerText = 'Max Amount';
            inputMaxAmount.value = maxAmount;
            inputMaxAmount.id = id;
            inputMaxAmount.name = 'maxAmount';
            labelMaxAmount.append(inputMaxAmount);

            amountInputBlock.append(labelMinAmount, labelMaxAmount);

            labelMinTerm.innerText = 'Min Term';
            inputMinTerm.value = minTerm;
            inputMinTerm.id = id;
            inputMinTerm.name = 'minTerm';
            labelMinTerm.append(inputMinTerm);

            labelMaxTerm.innerText = 'Max Term';
            inputMaxTerm.value = maxTerm;
            inputMaxTerm.id = id;
            inputMaxTerm.name = 'maxTerm';
            labelMaxTerm.append(inputMaxTerm);

            ternInputBlock.append(labelMinTerm, labelMaxTerm);

            inputAnnualInterestRate.value = annualInterestRate;
            inputAnnualInterestRate.id = id;
            inputAnnualInterestRate.name = 'annualInterestRate';
            labelAnnualInterestRate.innerText = 'Annual Interest Rate';
            labelAnnualInterestRate.append(inputAnnualInterestRate);

            formContainer.append(
                productTitle,
                labelProductName,
                amountInputBlock,
                ternInputBlock,
                labelAnnualInterestRate,
                saveButton,
            );
            formContainer.className = `tab ${name}`;
            productFormContent[0].append(formContainer);
        });
    }

    render();

    let tabContent = document.querySelectorAll('.tab');
    let tabNav = document.querySelectorAll('.tabs-nav__item');

    tabNav.forEach((item) => {
        item.addEventListener('click', selectTabNav);
    });

    function selectTabNav() {
        tabNav.forEach((item) => {
            item.classList.remove('is-active');
        });
        this.classList.add('is-active');
        selectedProduct = this.getAttribute('data-tab-name');
        selectTabContent(selectedProduct);
    }

    function selectTabContent(selectedProduct) {
        tabContent.forEach((item) => {
            item.classList.value.slice(4) === selectedProduct
                ? item.classList.add('is-active')
                : item.classList.remove('is-active');
        });
    }
};
