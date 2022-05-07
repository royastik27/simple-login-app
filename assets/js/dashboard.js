// SELECT BUTTON

function uncheckRadios()
{
    const nodes = document.querySelectorAll('input[type=radio]');

    // CHECKING IF ANY RADIO IS CHECKED and UNCHECKING ALL
    let cnt = 0;
    
    for(let i = 0; i < nodes.length; ++i)
    {
        if(nodes[i].checked) ++cnt;

        nodes[i].checked = false;
    }

    if(!cnt) return;

    let el = document.getElementById('userID');

    // CLEARING USERNAME AND PASSWORD
    let el2 = el.nextSibling.nextSibling;
    el2.value = '';
    el2 = el2.nextSibling.nextSibling;
    el2.value = '';
    
    // CHANGING BUTTON TEXT
    el2.nextSibling.nextSibling.textContent = 'create';

    // CHANGING HEADING
    el.previousSibling.textContent = 'Create User:';
    el.remove();
}

function setID(el, id)
{
    // COLLECT FORM DOM
    const elementForm = document.getElementById('apps').firstChild.nextSibling;

    const node = document.getElementById('userID');
    
    // COLLECTING and DISPLAYING ID
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
    const username = el.previousSibling.textContent;

    // DISPLAYING USERNAME AND PASSWORD TO THE DOM
    el = document.getElementById('userID').nextSibling.nextSibling;
    el.value = username;
    el = el.nextSibling.nextSibling;
    el.value = password;

    // UPDATE FROM DOM h4
    elementForm.firstChild.nextSibling.textContent = 'Update User:';
}

// DELETE BUTTON

const user = document.getElementsByClassName('user-single');

// SHOW DELETE BUTTON ON HOVER
for(let i = 0; i < user.length; ++i)
{
    user[i].addEventListener('mouseenter', (e) =>
    {
        // console.log(e.target);
        const el = e.target.lastChild.previousSibling.lastChild.previousSibling;
        el.style.display = 'inline';
    });

    user[i].addEventListener('mouseleave', (e) =>
    {
        const el = e.target.lastChild.previousSibling.lastChild.previousSibling;
        el.style.display = 'none';
        // el.style.display = 'none';
    });
}

// ADD VIEW PASSWORD FUNCTiONALITY
