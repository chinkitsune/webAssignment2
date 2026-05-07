import { refreshLoginInfo } from "./header.js";
let g_active_page = 0;
let g_max_page = 10; //This is a part of configuration.
let g_cur_page_group = 0;

window.addEventListener("DOMContentLoaded", async () => {
    await refreshLoginInfo();

    document.getElementById('insert-product-form').addEventListener('submit', submit_product_form);
    document.getElementById('modify-product-form').addEventListener('submit', update_product_form);
    document.getElementById('product-list-apply').addEventListener('click', fetch_product);
    document.getElementById('change_insert_view').addEventListener('click', () => {
        changeForm("insert");
    });
    document.getElementById('change_modify_view').addEventListener('click', () => {
        changeForm("update");
    });

    changeForm("insert");

    const messageBoxClose = document.getElementById('message-box-close');
    messageBoxClose.addEventListener('click', () => {
            document.getElementById('message-box').style.display = 'none';
    });
});

async function submit_product_form(event){
    event.preventDefault();

    console.log("Try to submit");

    const formData = new FormData(document.getElementById('insert-product-form'));

    const response = await fetch('/products', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    if(data?.res == 'success')
    {
        showMessage('Successfully inserted');
    }else{
        showMessage('Failed to insert');
    }
};


/**
 * This sends an update request to the server.
 * @param {*} event  not used for now.
 */
async function update_product_form(event){
    event.preventDefault();

    console.log("Try to submit for update");

    const formData = new FormData(document.getElementById('modify-product-form'));
    const productId = document.getElementById('modify-product-id').value;

    const response = await fetch('/products/' + productId, {
        method: 'PUT',
        body: formData,
    });

    const data = await response.json();
    if(data?.product != undefined){
        console.log(data.product);
        fill_product_form(data.product);
        fetch_product(null,g_active_page,g_max_page);
        showMessage('Successfully updated');
    }else{
        showMessage('Failed to update');
    }
};


async function fill_product_form(product)
{
    document.getElementById('modify-product-id').value = product._id;
    document.getElementById('modify-product-id').disabled = true;
    document.getElementById('modify-product-name').value = product.name;
    document.getElementById('modify-product-price').value = product.price
    document.getElementById('modify-product-image').src = "./" + product.image;
    document.getElementById('modify-product-description').value = product.description;     

    document.getElementById('modify-product-category').value = product.category;
    document.getElementById('modify-product-age').value = product.age;
    document.getElementById('modify-product-color').value = product.color;
    document.getElementById('modify-product-material').value = product.material;
    document.getElementById('modify-product-size').value = product.size;

    const sizeElement = document.getElementById('modify-product-size');
    if (sizeElement && sizeElement.options && product.size) {
        Array.from(sizeElement.options).forEach(option => {
            option.selected = product.size.includes(option.value);
        });
    }
}

function changeForm(formType)
{
    switch(formType){
        case "insert":
            document.getElementById('insert-product-card').hidden = false;
            document.getElementById('modify-product-card').hidden = true;
            break;
        case "update":
            document.getElementById('insert-product-card').hidden = true;
            document.getElementById('modify-product-card').hidden = false;
            break;
        default:
            break;
    }
}

async function fetch_product(event,activatePage=0,limit=-1)
{
    if(limit == -1)
    {
        limit = g_max_page;
    }
    const start = activatePage * limit;
    const keyword = document.getElementById('product-list-search').value;
    console.log(keyword);
    const url = `/products?start=${start}&limit=${limit}&keyword=${keyword}`;
    const response = await fetch(url);
    const data = await response.json();

    const tbody = document.querySelector('#product-list-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (!response.ok || data.res !== 'success' || !Array.isArray(data.data?.[1]) || data.data[1].length === 0) {
        const row = document.createElement('tr');
        row.classList.add('empty-row');
        const cell = document.createElement('td');
        cell.colSpan = 2;
        cell.textContent = 'No products available.';
        row.appendChild(cell);
        tbody.appendChild(row);
        return;
    }

    data.data[1].forEach(product => {
        const row = document.createElement('tr');
        row.dataset.productId = product._id || '';

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name || 'Unnamed Product';

        const priceCell = document.createElement('td');
        const priceValue = product.price;
        priceCell.textContent = '$' + priceValue.toFixed(2);

        row.appendChild(nameCell);
        row.appendChild(priceCell);

        //This is for highlighting the selected button.
        row.addEventListener('click', () => {
            //clear all list's selected class.
            document.querySelectorAll('#product-list-table tbody tr.selected').forEach(r => {
                r.classList.remove('selected');
            });
            //add only this row into selected class.
            row.classList.add('selected');
        });

        row.addEventListener('click', () => {
            changeForm("update");
            fill_product_form(product);
        });

        tbody.appendChild(row);
    });
    refresh_paging_buttons(data.data[0],activatePage,limit,g_cur_page_group);
}

function refresh_paging_buttons(total,activePage,limit,cur_page_group=0,max_pages = 5)
{
    const pagingControls = document.getElementById('pagination-controls');
    const totalPage = Math.ceil(total/limit);
    const totalPageGroup = Math.ceil(totalPage / max_pages);
    const maxDisplayPage = Math.min(cur_page_group*max_pages + max_pages, totalPage);

    pagingControls.innerHTML = '';
    const leftIcon = document.createElement('button');
    leftIcon.innerHTML = '&laquo;';
    leftIcon.type = 'button';
    leftIcon.disabled = true;
    if(cur_page_group - 1 >= 0){
        leftIcon.disabled = false;
        leftIcon.addEventListener('click', () => {
            cur_page_group--;
            refresh_paging_buttons(total,activePage,limit,cur_page_group,max_pages);
        });
    }else{
        leftIcon.disabled = true;
    }

    leftIcon.classList.add('pagination-button');
    pagingControls.appendChild(leftIcon);

    
    for(let i=cur_page_group*max_pages; i < maxDisplayPage; i++)
    {
        const pageButton = document.createElement('button');
        pageButton.innerText = i + 1;
        pageButton.type = 'button';
        pageButton.classList.add('pagination-button');
        if(activePage == i)
        {
            pageButton.classList.add('active');
        }else{
            pageButton.addEventListener('click', () => {
                g_active_page = i;
                g_cur_page_group = cur_page_group;
                fetch_product(null,i,limit);
            });
        }
        pagingControls.appendChild(pageButton);
    }

    console.count("cur_page_group : " + cur_page_group +" TotalPageGroup: " + totalPageGroup);
    const rightIcon = document.createElement('button');
    rightIcon.innerHTML = '&raquo;';
    rightIcon.type = 'button';
    rightIcon.classList.add('pagination-button');
    if(cur_page_group + 1 < totalPageGroup){
        rightIcon.disabled = false;
        rightIcon.addEventListener('click', () => {
            cur_page_group++;
            refresh_paging_buttons(total,activePage,limit,cur_page_group,max_pages);
        });
    }else{
        rightIcon.disabled = true;
    }
    pagingControls.appendChild(rightIcon);

}

let messageTimeoutId = null;

export function showMessage(message, timeout = 1000) {
    const messageBox = document.getElementById('message-box');
    const messageBoxText = document.getElementById('message-box-text');
    if (messageBox && messageBoxText) {
        messageBoxText.innerHTML = message;
        messageBox.style.display = 'flex';

        if (messageTimeoutId) {
            clearTimeout(messageTimeoutId);
        }
        
        if (timeout > 0) {
            messageTimeoutId = setTimeout(() => {
                messageBox.style.display = 'none';
            }, timeout);
        }
    }
}