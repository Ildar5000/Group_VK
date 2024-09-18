
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
  const text_input_group=document.querySelector("#text_input_group"); 
  const btngr=document.querySelector("#btn"); 
  
  const article = document.querySelector("ol");
  const ol_btn = document.querySelector("#select_list_group");
  const btn_res=document.querySelector("#btn_group");


  // удаление предыдущих 
  delete_old_obj(text_input_group);
  delete_old_obj(btngr);
  delete_old_obj(ol_btn);
  delete_old_obj(btn_res);
 
  
  let json =  localStorage.getItem("category_vk_group");
  if (typeof json === '')
  {
     maps1 = new Map(JSON.parse(json));
  }

  if (top_profile_menu)
  {
    let top_profile_mrow =top_profile_menu.querySelector("#top_settings_link");
    let input_element = document.createElement("input");
    input_element.id='text_input_group';
    input_element.type = "text";
    input_element.className = "top_profile_menu_new shown"; 
    
    top_profile_mrow.insertAdjacentElement("afterend", input_element); 
    input_element.addEventListener("input", function handleChange(event) {
      console.log(event.target.value);
    });

    var btn_element = document.createElement("button");
    btn_element.id="btn";
    btn_element.innerHTML="Добавить категорию";
    btn_element.className = "top_profile_menu_new shown"; 
    btn_element.addEventListener("click", function handleChange(event) {
      const tp=document.querySelector("#text_input_group"); 
      setLocalsessionStorage(maps1,tp.value);
    });
    
    input_element.insertAdjacentElement("afterend", btn_element);
  }
  
  if (article)
  {
      let badge = document.createElement("select");
      badge.id = "select_list_group";
      badge.classList.add("LeftMenuItem-module__container--vaT3i");

      badge.addEventListener("change", function handleChange(event) {
        console.log(event.target.value);
        getSelectValue(event);
      });
      createOption(badge);
      const heading = article.querySelector("li");
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



function getLocalsessionStorage()
{
  let json = localStorage.getItem("category_vk_group");
  if (typeof json !== '')
  {
     maps1 = new Map(JSON.parse(json));
  }
  return maps1;
}


function setLocalsessionStorage(maps1,value)
{
  console.log(maps1);
  console.log(value);

  maps1=getLocalsessionStorage();
  if (maps1)
  {
     maps1.set(value);
     let str = JSON.stringify(Array.from(maps1.entries()));
     localStorage.setItem("category_vk_group", str);
  }
}

function delete_old_obj(obj)
{
  if (obj) 
  {
    obj.remove();
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
    createlist(keys);
    badge.appendChild(li);
  });


  /*
    category.forEach((value, key) => {
      let li = document.createElement("option");
      li.classList.add("LeftMenuItem-module__item--XMcN9");
      li.textContent = category[i];
      li.value = category[i];
      badge.appendChild(li);
    
    console.log(value, key);
  });
  */
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
  heading.insertAdjacentElement("afterend", ul);

}


function create_Prompt(add_group) {
  let modal_dv = document.createElement("div");
  modal_dv, (id = "bg-modal");
  modal_dv.style.cssText =
    "background-color: rgba(0, 0, 0, 0.8);width: 100%;height: 100%;position: absolute;top: 0;display: none;justify-content: center;align-items: center;";

  let modal_cont = document.createElement("div");
  modal_cont.id = "modal_cont";
  modal_cont.style.cssText =
    "height: 300px;width: 500px;background-color: white;text-align: center;padding: 20px;position: relative;";
  modal_dv.appendChild(modal_cont);

  modal_dv.style.display = "flex";

  let close_btn = document.createElement("div");
  close_btn.id = "Close_btn";
  close_btn.innerHTML = "X";
  close_btn.style.cssText =
    "position: absolute;top: 0;right: 10px;font-size: 42px;color: #333;cursor: pointer;	&:hover {color: #666;}";
    close_btn.addEventListener("click", (e) => {
      modal_dv.style.cssText="display: none;";
    });

  let content_category = document.createElement("div");
  content_category.id = "content_category";

  let content_category_caption = document.createElement("div");
  content_category_caption.id = "content_category_caption";
  content_category_caption.innerText = "group";

  content_category.appendChild(content_category_caption);

  modal_cont.appendChild(close_btn);
  let category=getLocalsessionStorage();
  
  category.forEach((values, keys)=>
  {
    console.log(keys);
    let x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");
    x.value = keys;
    x.addEventListener("change", function () {
      if (this.checked) {
        console.log("Checkbox is checked..");
        add_group_from_popur(this);
      } else {
        console.log("Checkbox is not checked..");
      }
    });

    content_category_caption.after(x);
    let y = document.createElement("label");
    y.innerText = keys;
    content_category_caption.after(y);
  });
  
  const p = document.createElement("p");
  content_category_caption.after(p);

  /// Добавляет кнопку для добавления в группу
  let btn_Add_from_Group = document.createElement("Button");
  btn_Add_from_Group.innerHTML = "Add group";

  content_category_caption.after(btn_Add_from_Group);

  /// Добавляет в объект
  modal_cont.insertAdjacentElement("afterend", content_category);
  modal_cont.appendChild(content_category);

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

//обработка попура
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
