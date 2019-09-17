window.onload = function (){
    
var full_item='';
var size;
var description;
var quantity;
var listItem = [];

var addButton = document.getElementsByClassName('addButton');
for(var i = 0;i<addButton.length;i++){
    var button = addButton[i]
    button.addEventListener('click',function(event){
        var buttonClicked = event.target;
        // console.log('cliked',buttonClicked);
        var item = buttonClicked.parentElement;
        
        var description = item.getElementsByClassName('item-description')[0].innerText;
        var smallSize = item.getElementsByClassName('sizes')[0].checked;
        var largeSize = item.getElementsByClassName('sizes')[1].checked;
        quantity = item.getElementsByClassName('quantity')[0].value;

        console.log(item)

        checkSize(smallSize);

        full_item = description + ' | ' +'Size:  ' + size + ' | ' + 'Qty:  ' + quantity;
        // console.log(full_item);
        // console.log(description,size);
        addToPreview(description,size,quantity);
        addToList(full_item);
        urlHandle();
    });    
}




// var removeButton = document.getElementsByClassName('removeButton');
// for(var i = 0;i<addButton.length;i++){
//     var button = addButton[i]
//         button.addEventListener('click',function(event){
//         var buttonClicked = event.target;
//         // console.log('cliked',buttonClicked);
//         var item = buttonClicked.parentElement;
//         var description = item.getElementsByClassName('item-description')[0].innerText;
        
//         console.log(item)

        // checkSize(smallSize);

        // full_item = description + ' | ' +'Size:  ' + size + ' | ' + 'Qty:  ' + quantity;
        // console.log(full_item);
        // // console.log(description,size);
        // addToPreview(description,size,quantity);
        // addToList(full_item);
        // urlHandle();
    // });
}



function addToList (full){
    listItem.push(full);
    // console.log(listItem);
}

//Convert and send to whatsapp
function urlHandle (){    
    var link = document.getElementById('url-handle');
    var baseUlr = 'https://api.whatsapp.com/send?phone=61414515970&text=';
    var lista = listItem.toString();
    var newLine = '\n';
    var regex = /[,]/g;
    var test = lista.replace(regex,newLine);
    var message = encodeURI(test);
    var dynamicUrl = baseUlr.concat(message);
    link.setAttribute("href", dynamicUrl);
    }

function checkSize(check){
    if(check){
        size = 'Small'
    }else{
        size = 'Large'
    }
}

function addToPreview(description,size,quantity){
    var node = document.createElement("LI");
    node.classList.add("list-group-item");
    var textnode = document.createTextNode('Description: '+ description + ' | ' + 'Size: '+ size + ' | ' + 'Quantity: ' + quantity);
    node.appendChild(textnode);
    document.getElementById("preview").appendChild(node);
};

