const button = document.querySelector('button');
button.addEventListener("click", () => {
    const inputs = document.querySelector('input');
    var category_vk_group = sessionStorage.getItem("category_vk_group");
 
    if (category_vk_group === null)
    {
        let maps1 = new Map();
        maps1.set(inputs.value,'');
        var str = JSON.stringify(Array.from(maps1.entries()));
        sessionStorage.setItem("category_vk_group", '');
        alert(maps1);
    }
    else
    {
        let maps1 = new Map();
        maps1.set(inputs.value,'');
        var str = JSON.stringify(Array.from(maps1.entries()));
        sessionStorage.setItem("category_vk_group", '');
        alert('FALSE');

    }
});