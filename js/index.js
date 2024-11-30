var siteName=document.getElementById('siteName');
var siteUrl=document.getElementById('siteUrl');

var bookmarkContainer=[]

if (localStorage.getItem('sitedata')==null) {
    var bookmarkContainer=[]
}
else{
    bookmarkContainer=JSON.parse(localStorage.getItem('sitedata'))
    display()
}
function validation(ele) {
    var regex={
        siteName:/[a-z]{3}/i,
        siteUrl:/(https?:\/\/)(www\.)[a-z0-9-]/i
    }
    if (regex[ele.id].test(ele.value)) {
        ele.classList.remove('is-invalid')    
        ele.classList.add('is-valid') 
        return true;  
    }
    else{
        ele.classList.add('is-invalid')    
        ele.classList.remove('is-valid') 
        return false;  
    }
}
function addBookmark() {
    if(validation(siteName) && validation(siteUrl)){
        var inputs={
            bookName:siteName.value,
            url:siteUrl.value ,
        }
        bookmarkContainer.push(inputs);
        console.log(bookmarkContainer);
        localStorage.setItem('sitedata',JSON.stringify(bookmarkContainer))
        
        display()
        clear()
    }
    else{
        swal({
            icon: "warning",
            title: "Site Name or Url is not valid, Please follow the rules below :",
            text: `-Site name must contain at least 3 characters 
            -Site URL must be a valid one`,
          });
    }
}
function clear() {
    siteName.value=null
    siteUrl.value=null
    siteName.classList.remove('is-valid')
    siteUrl.classList.remove('is-valid')
}

function display(){
    
    var cartona=""
    for (let i = 0; i < bookmarkContainer.length; i++) {
   cartona+=`<tr>
                <td>${i+1}</td>
                <td>${bookmarkContainer[i].bookName}</td>
                <td><button class="btn btn-visit px-3 text-capitalize" onclick="window.location.href='${bookmarkContainer[i].url}';"><i class="fa-solid fa-eye pe-2"></i>visit</button></td>
                <td><button class="btn btn-delete px-3 text-capitalize" onclick="deleteItem(${i})"><i class="fa-solid fa-trash-can pe-2"></i>delete</button></td>
            </tr>`
    }
    document.getElementById('contentTable').innerHTML=cartona;
}

function deleteItem(deletedIndex) {
    bookmarkContainer.splice(deletedIndex,1)
    localStorage.setItem('sitedata',JSON.stringify(bookmarkContainer))
    display()
}



