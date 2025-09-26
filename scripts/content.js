let maps1 = new Map();

//ожидаем загрузки страницы
const observer = new MutationObserver(function () {
  if (document.getElementsByClassName("side_bar_inner")[0]) {
    switch (document.readyState) {
      case "loading":
        console.log("wait");
        break;

      case "complete":
        console.log("ready");
        MainUpdate();
        break;
    }
  }
});

const target = document.querySelector("body");
const config = { childList: true };
observer.observe(target, config);

function MainUpdate()
{
  const maps1=new Map();
  
  //блок добавления групп
  const text_input_group=document.querySelector("#text_input_group"); 
  const btngr=document.querySelector("#btn"); 
  
  const article = document.querySelector("ol");
  const ol_btn = document.querySelector("#select_list_group");
  const btn_res=document.querySelector("#btn_group");
  const list_group_cont=document.querySelector("#list_group_cont");

  // удаление предыдущих 
  delete_old_obj(text_input_group);
  delete_old_obj(btngr);
  delete_old_obj(ol_btn);
  delete_old_obj(btn_res);
  delete_old_obj(list_group_cont);
  
  let json =  localStorage.getItem("category_vk_group");
  if (typeof json === '')
  {
     maps1 = new Map(JSON.parse(json));
  }
  
  // меню сбоку
  if (article)
  {
      const heading = article.querySelector("li");
      let list_group_cont = document.createElement("div");
      list_group_cont.id="list_group_cont";
      list_group_cont.classList.add("LeftMenuItem-module__container--vaT3i");
      heading.insertAdjacentElement("afterend", list_group_cont);

      let badge = document.createElement("select");
      badge.id = "select_list_group";
      badge.classList.add("LeftMenuItem-module__container--vaT3i");

      badge.addEventListener("change", function handleChange(event) {
        console.log(event.target.value);
        getSelectValue(event);
      });
      createOption(badge);
      
      heading.insertAdjacentElement("afterend", badge);
  }

  //добавление в группу
  var add_group = document.querySelector(".redesigned-group-info");

  if (add_group) {
    let btn = document.createElement("Button");
    btn.classList.add("FlatButton");
    btn.classList.add("FlatButton--primary");
    btn.classList.add("FlatButton--size-m");
    btn.id="btn_group";
    btn.classList.add("redesigned-group-action");
    btn.innerHTML = "Add group";
    btn.addEventListener("click", (e) => {
      create_Prompt(add_group);
    });

    const headbtn = add_group.querySelector(".redesigned-group-info__actions");
    headbtn.insertAdjacentElement("beforeend", btn);
  }


}

function getSelectValue(e) {
  let selectedValue = e.target.value;

  if (selectedValue == e.target.value) {
    createlist(e.target.value);
  }
}

// функция по создаюнию выборки
function createOption(badge) {
  let category=getLocalsessionStorage();
  category.forEach((values, keys)=>
  {
    let li = document.createElement("option");
    li.classList.add("LeftMenuItem-module__item--XMcN9");
    li.textContent = keys;
    li.value=keys;
    badge.appendChild(li);
  });
  // выбираем первого в списке
  createlist(category.keys().next().value);
}


// создание список
function createlist(category) {
  let element = document.getElementById("list_group");
  if (element) {
    element.remove();
  }

  let cat=getLocalsessionStorage();
  let arr=cat.get(category);
  //console.log(arr);
  let heading = document.querySelector("#l_pr");
  let list_group_cont = document.getElementById("list_group_cont");

  let ul = document.createElement("ul");
  ul.id = "list_group";
  if (arr)
  {
      arr.forEach((value) => {
        let li = document.createElement("li");
        li.innerHTML = "<a href='" + value + "'>" + value.replace('https://vk.com/',"") + "</a>";
        li.classList.add("LeftMenuItem-module__item--XMcN9");
        ul.appendChild(li);
   });
  }

  //const heading = article.querySelector("li");
  //heading.insertAdjacentElement("afterend", ul);
  list_group_cont.appendChild(ul)
}

// создание попура в шапке 
function create_Prompt(add_group) {
  //главный попур
  let modal_dv = document.createElement("div");
  modal_dv.id="main_popur"
  modal_dv, (id = "bg-modal");
  //внутренний блок
  let modal_cont = document.createElement("div");
  modal_cont.id = "modal_cont";

  //добавление внутренннего блока
  modal_dv.appendChild(modal_cont);
  modal_dv.style.display = "flex";

  // кнопка отключения
  let close_btn = document.createElement("div");
  close_btn.id = "Close_btn";
  close_btn.innerHTML = "X";
  close_btn.addEventListener("click", (e) => {
    modal_dv.style.cssText="display: none;";
    });
  modal_cont.appendChild(close_btn);

  // добавление верхнего блока редактроа групп
  let content_category = document.createElement("div");
  content_category.id = "content_category";
  
  //заголовок
  let content_category_caption = CreateDiv("Добавление группы","content_category_caption");
  content_category.insertAdjacentElement("afterend",content_category_caption);
  content_category.appendChild(content_category_caption);
  
  // добавление нижнего блока редактора добавления в группы
  let content_category_group = CreateDiv("","content_category_group");
  
  let _label=CreateDiv("Добавление в группу","content_category_group1")
  content_category_group.appendChild(_label);

  let category=getLocalsessionStorage();
  
  category.forEach((values, keys)=>
  {
    console.log(keys);
    let x = CreateInput(values,keys);
    x.addEventListener("change", function () {
      if (this.checked) {
        console.log("Checkbox is checked..");
        add_group_from_popur(this);
      } else {
        console.log("Checkbox is not checked..");
      }
    });

    content_category_group.appendChild(x);
    let y = document.createElement("label");
    y.innerText = keys;
    content_category_group.appendChild(y);
  });


  /// Добавляет кнопку для добавления в группу
  //let btn_Add_from_Group = CreateButton("Add group",true);
  //content_category_group.appendChild(btn_Add_from_Group);

  /// Добавляет в основной объект
  modal_cont.appendChild(content_category);
  modal_cont.appendChild(CreateP());

  modal_cont.insertAdjacentElement("afterend", content_category_group);
  modal_cont.appendChild(content_category_group);

  add_group.insertAdjacentElement("afterend", modal_dv);

}

/// добавляет группы из формы
function add_group_from_popur(obj) {
  let cat1 = getLocalsessionStorage();
  let key_array=cat1.get(obj.value);
  let currentUrl = window.location.href;
  let ar=[currentUrl];
  let str='';
  console.log(ar);
  
  if (key_array)
  {
    console.log("key_array2");
    str=key_array.concat(ar);
    cat1.set(obj.value,str);
  }
  else
  {
    cat1.set(obj.value,ar);
    console.log(cat1);

  }
  
  console.log(cat1);
  str = JSON.stringify(Array.from(cat1.entries()));
  console.log("str");
  console.log(str);
  console.log("str");
  localStorage.setItem("category_vk_group", str);
  //const currentUrl = window.location.href;
  //var ar=[currentUrl];
  //var str=key_array.concat(ar);
 // maps1.set('music',str);
  //var str = JSON.stringify(Array.from(maps1.entries()));
  //sessionStorage.setItem("category_vk_group", str);
}

//обработка попура из строки состояния
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse)
  {
      
    if (request.name=="export")
    {
      console.log('export');
      let json =  localStorage.getItem("category_vk_group");
      console.log(JSON.stringify(json));
      console.log(typeof(json));
      sendResponse({message: json});
    }

    if (request.name=="import")
    {
      console.log('import');
      console.log(request.value);
      localStorage.setItem("category_vk_group", request.value);
      sendResponse("ok");
    }

      return true;
  }
);
