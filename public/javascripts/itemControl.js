window.onload = function () {

    var full_item = '';
    var size;
    var description;
    var quantity;
    var listItem = [];

    var addButton = document.getElementsByClassName('addButton');
    for (var i = 0; i < addButton.length; i++) {
        var button = addButton[i]
        button.addEventListener('click', function (event) {
            var buttonClicked = event.target;
            // console.log('cliked',buttonClicked);
            var item = buttonClicked.parentElement;
            var description = item.getElementsByClassName('item-description')[0].innerText;
            var smallSize = item.getElementsByClassName('sizes')[0].checked;
            var largeSize = item.getElementsByClassName('sizes')[1].checked;
            var totalItemPrice = item.getElementsByClassName('price')[0].value;
            quantity = item.getElementsByClassName('quantity')[0].value;

            checkSize(smallSize);
            full_item = description + ' | ' + 'Size:  ' + size + ' | ' + 'Qty:  ' + quantity  + ' | ' + '$ = ' + totalItemPrice;
            addToPreview(description, size, quantity,totalItemPrice);
            addToList(full_item);
            urlHandle();
        });
    }

    function addToList(full) {
        listItem.push(full);
    }

    //Convert and send to whatsapp
    function urlHandle() {
        var link = document.getElementById('url-handle');
        var baseUlr = 'https://api.whatsapp.com/send?phone=61414515970&text=';
        var lista = listItem.toString();
        var newLine = '\n';
        var regex = /[,]/g;
        var test = lista.replace(regex, newLine);
        var message = encodeURI(test);
        var dynamicUrl = baseUlr.concat(message);

        link.setAttribute("href", dynamicUrl);
    }

    function checkSize(check) {
        if (check) {
            size = 'Small';
        } else {
            size = 'Large';
        }
    }

    function addToPreview(description, size, quantity,price) {
        var node = document.createElement("LI");
        node.classList.add("list-group-item");
        var textnode = document.createTextNode('Description: ' + description + ' | ' + 'Size: ' + size + ' | ' + 'Quantity: ' + quantity + ' | ' + '$ = ' + price);
        node.appendChild(textnode);
        document.getElementById("preview").appendChild(node);
    };
};

function handleItem(itemToManage) {
    var itemWrap = itemToManage.parentElement.parentElement;
    var check = itemWrap.getElementsByClassName('sizes')[0].checked;
    var qty = itemWrap.getElementsByClassName('quantity')[0].value;
    var previewPrice = itemWrap.getElementsByClassName('price')[0];
    var smallPrice = itemWrap.getElementsByClassName('price')[0].dataset.small;
    var largePrice = itemWrap.getElementsByClassName('price')[0].dataset.large;
    var sizeToCalculate;

    if (check) {
        sizeToCalculate = smallPrice * qty;
        previewPrice.setAttribute('value', sizeToCalculate);
    } else {
        sizeToCalculate = largePrice * qty;
        previewPrice.setAttribute('value', sizeToCalculate);
    }
}
