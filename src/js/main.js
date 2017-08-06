/*begin left-pad*/

function leftPad(str, len, ch) {
    // convert `str` to `string`
    str = str + '';
    // `len` is the `pad`'s length now
    len = len - str.length;
    // doesn't need to pad
    if (len <= 0)
        return str;
    // `ch` defaults to `' '`
    if (!ch && ch !== 0)
        ch = ' ';
    // convert `ch` to `string`
    ch = ch + '';
    // `pad` starts with an empty string
    var pad = '';
    // loop
    while (true) {
        // add `ch` to `pad` if `len` is odd
        if (len & 1)
            pad += ch;
        // divide `len` by 2, ditch the remainder
        len >>= 1;
        // "double" the `ch` so this operation count grows logarithmically on `len`
        // each time `ch` is "doubled", the `len` would need to be "doubled" too
        // similar to finding a value in binary search tree, hence O(log(n))
        if (len)
            ch += ch;
        // `len` is 0, exit the loop
        else
            break;
    }
    // pad `str`!
    return pad + str;
}
/*end left-pad*/
function pad2(str) {
    return leftPad(str, 2, '0');
}

function actualizaHora() {
    "use strict";
    var currentdate = new Date();
    var elementos = document.getElementsByClassName("hora");
    for (var elem of elementos) {
        elem.innerText = pad2(currentdate.getHours()) + ":" + pad2(currentdate.getMinutes());
    }
    var elementos = document.getElementsByClassName("data");
    for (var elem of elementos) {
        elem.innerText = pad2(currentdate.getDate()) + "/" + pad2(currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
    }
    void(document.offsetHeight)

}
var forceRedraw = function (element) {
    var disp = element.style.display;
    element.style.display = 'none';
    var trick = element.offsetHeight;
    element.style.display = disp;
};
setInterval(actualizaHora, 1000);
document.addEventListener("DOMContentLoaded", actualizaHora);
window.onload = function () {
    forceRedraw(document.getElementById("main"));
}
document.addEventListener("load", actualizaHora);

var nextCallBack = function () {
    submeterChat("Maria", "Estás a gostar do ambiente?");
    nextCallBack = function () {
        submeterChat("Maria", "Queres ir dançar para a pista? ;)");
        nextCallBack = function () {
            submeterChat("Maria", "Vem dançar!!!");
        };
    }
}

function submeterChatSelf() {
    "use strict";
    var userMessageDiv = document.getElementById("chat-escrever");
    var message = userMessageDiv.value;
    userMessageDiv.value = "";
    submeterChat("Eu", message);
    setTimeout(function () {
        nextCallBack()
    }, 3000);
}

function submeterChat(user, msg) {
    "use strict";
    var message = msg;
    var outerDiv = document.createElement("div");
    outerDiv.classList.add("chat-message");
    var authorDiv = document.createElement("div");
    authorDiv.classList.add("chat-message-author");
    authorDiv.innerText = user;
    var messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message-message");
    messageDiv.innerText = message;
    outerDiv.appendChild(authorDiv);
    outerDiv.appendChild(messageDiv);
    document.getElementById("chat").appendChild(outerDiv);
}

function confirmarPedido(element) {
    "use strict";
    var nome = element.getElementsByClassName("pedir-nome").item(0).innerText;
    var preco = element.getElementsByClassName("pedir-preco").item(0).innerText;
    document.getElementById("pedir-overlay-nome").innerText = nome;
    document.getElementById("pedir-overlay-preco").innerText = preco;
    document.getElementById("pedir-overlay").classList.remove("hidden");
}

function getPedidos() {
    return JSON.parse(sessionStorage.getItem("pedidos")) || []
}

function setPedidos(value) {
    sessionStorage.setItem("pedidos", JSON.stringify(value || []));
}

function pedir(element) {
    "use strict";
    document.getElementById('pedir-overlay').classList.add('hidden');
    document.getElementById('pedir-overlay-confirmado').classList.remove('hidden');
    var nome = document.getElementById("pedir-overlay-nome").innerText;
    var preco = document.getElementById("pedir-overlay-preco").innerText;
    var quantidadeDiv = document.getElementById("quantidade-val");
    var quantidade = (+quantidadeDiv.value);
    quantidadeDiv.value = 1;
    var currPedidos = getPedidos();
    while (quantidade > 0) {
        currPedidos.push({
            "nome": document.getElementById("pedir-overlay-nome").innerText,
            "preco": +document.getElementById("pedir-overlay-preco").innerText
        });
        quantidade--;
    }
    setPedidos(currPedidos);
}

function mostrarPedidos() {
    "use strict";
    var elementos = document.getElementsByClassName("pedidos-container");
    var pedidos = getPedidos();
    var total = 0.0;
    for (var elem of elementos) {
        elem.innerHTML = "";
        if (pedidos.length == 0) {
            elem.classList.add("hidden");
        } else {
            elem.classList.remove("hidden");
            for (var pedido of pedidos) {
                var outerDiv = document.createElement("div");
                outerDiv.classList.add("pedido");
                var nomeDiv = document.createElement("div");
                nomeDiv.classList.add("pedido-nome");
                nomeDiv.innerText = pedido.nome;
                var precoDiv = document.createElement("div");
                precoDiv.classList.add("pedido-preco");
                precoDiv.innerText = pedido.preco.toFixed(2);
                outerDiv.appendChild(nomeDiv);
                outerDiv.appendChild(precoDiv);
                elem.appendChild(outerDiv);
                total += pedido.preco;
            }
            var outerDiv = document.createElement("div");
            outerDiv.classList.add("pedido-total");
            var nomeDiv = document.createElement("div");
            nomeDiv.classList.add("pedido-total-txt");
            nomeDiv.innerText = "Total:";
            var precoDiv = document.createElement("div");
            precoDiv.classList.add("pedido-preco-final");
            precoDiv.innerText = total.toFixed(2);
            outerDiv.appendChild(nomeDiv);
            outerDiv.appendChild(precoDiv);
            elem.appendChild(outerDiv);
            total = 0;
        }
    }
}
document.addEventListener("DOMContentLoaded", mostrarPedidos);
