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