function uncheckRadios()
{
    const nodes = document.querySelectorAll('input[type=radio]');
    
    for(let i = 0; i < nodes.length; ++i)
        nodes[i].checked = false;

    let el = document.getElementById('userID');
    el.parentElement.lastChild.previousSibling.textContent = 'Create';
    el.previousSibling.textContent = 'Create User:';
    el.remove();
}

function setID(el, id)
{
    // COLLECT FORM DOM
    const elementForm = document.getElementById('apps').firstChild.nextSibling;

    const node = document.getElementById('userID');
    
    // COLLECTING AND DISPLAYING ID
    if(!node)
    {
        const node = document.createElement("input");
        node.setAttribute('name', 'userID');
        node.setAttribute('id', 'userID');
        node.setAttribute('class', 'form-control');
        node.value = id;
        elementForm.insertBefore(node, elementForm.firstChild.nextSibling.nextSibling);

        elementForm.lastChild.previousSibling.textContent = 'Update';
    }
    else node.value = id;

    // COLLECTING USERNAME AND PASSWORD FROM THE DOM
    el = el.parentElement.previousSibling;
    const password = el.textContent;
    console.log(password);

    const username = el.previousSibling.textContent;
    console.log(username);

    // DISPLAYING USERNAME AND PASSWORD FROM THE DOM
    // CODE HERE

    // UPDATE FROM DOM h4
    elementForm.firstChild.nextSibling.textContent = 'Update User:';
}