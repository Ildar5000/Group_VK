/// удалить в будущем не используется
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

function getLocalsessionStorage()
{
  let json = localStorage.getItem("category_vk_group");
  if (typeof json !== '')
  {
     maps1 = new Map(JSON.parse(json));
  }
  return maps1;
}

function CreateDiv(content_txt,_id)
{
  let newDiv = document.createElement("div");
  newDiv.id =_id
  newDiv.innerText = content_txt;
  return newDiv;
}

function CreateP()
{
  let newDiv = document.createElement("p");
  return newDiv;
}

function CreateButton(content,vk_style)
{
  let newbtn = document.createElement("Button");
  newbtn.innerHTML = content;
  if (vk_style)
  {
      newbtn.classList.add("FlatButton");
      newbtn.classList.add("FlatButton--primary");
      newbtn.classList.add("FlatButton--size-m");
      newbtn.id="btn_group";
      newbtn.classList.add("redesigned-group-action");
  }
  return newbtn;
}

function CreateInput(value,keys)
{
  let Newinput = document.createElement("INPUT");
  Newinput.setAttribute("type", "checkbox");
  Newinput.value = keys;
  return Newinput;
}
