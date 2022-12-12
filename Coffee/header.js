
var menuItem = document.getElementById("menuNav");
menuItem.style.maxHeight="0px";

function menutoggle(){
if(menuItem.style.maxHeight == "0px")
{
    menuItem.style.maxHeight = "200px";
}
else
{
    menuItem.style.maxHeight = "0px";
}
}

menutoggle();