let sidebarToggle = document.querySelector(".sidebarToggle");
sidebarToggle.addEventListener("click", function(){
    document.querySelector("body").classList.toggle("active");     
})


$(document).ready(function(){
    
    $.getJSON("config.json", function(d){

        d.config.element.forEach(e => {
            
            if(e.submenu.length > 0){
                if(e.menu_permission.length > 0){
                    if(e.menu_permission.includes($('#user').val())){
                        addMenu_list(e)
                    }
                }else{
                    addMenu_list(e)
                }
                
            }else{
                if(e.menu_permission.length > 0){
                    if(e.menu_permission.includes($('#user').val())){
                        addMenu(e)
                    }
                }else{
                    addMenu(e)
                }
            }
        });
    })
})






const addMenu = (e) =>{
    $('#navigation-list').append(`
        <li class="navigation-list-item">
            <a href="${e.url}" class="navigation-link" target="_blank">
                <div class="row">
                    <div class="col-2">
                        <i class="${e.image}"></i>
                    </div>
                    <div class="col-9">
                        ${e.name}
                    </div>
                </div>
            </a>
        </li>
    `)
}

const addMenu_list = (e) =>{
    $('#navigation-list').append(`
        <li class="navigation-list-item dropdown">
            <a href="#" class="navigation-link" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div class="row">
                    <div class="col-2">
                        <i class="${e.image}"></i>
                    </div>
                    <div class="col-9">
                        ${e.name}
                    </div>
                </div>
            
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    ${ addSubmenu(e.submenu)}
                </ul>
            </a>
        </li>
    `)
}

{/* <li class="navigation-list-item dropdown">
                        
  <a class="navigation-link" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <div class="row">
          <div class="col-2">
              <i class="fas fa-calendar-alt"></i>
          </div>
          <div class="col-9">
              Submenu
          </div>
      </div>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
  </a>
  
</li> */}

const addSubmenu = (sub) =>{
    let user = $('#user').val()
    let franchise = parseInt($('#franchise').val())
    let submenu = ''
    sub.forEach(e =>{
        let have_franchises = exist_per(e.permissions.franchises.length)
        let have_user = exist_per(e.permissions.users.length)
        switch(true){
            case have_franchises && have_user:
                if(e.permissions.franchises.includes(franchise) || e.permissions.users.includes(user) ){
                    submenu += `<li><a href="${e.url}" class="dropdown-item" target="_blank">${e.name}</a></li>`
                }
                break;
            
            case have_franchises:
                if(e.permissions.franchises.includes(franchise)){
                    submenu += `<li><a href="${e.url}" class="dropdown-item" target="_blank">${e.name}</a></li>`
                }
                break;
            case have_user:
                if(e.permissions.users.includes(user)){
                    submenu += `<li><a href="${e.url}" class="dropdown-item" target="_blank">${e.name}</a></li>`
                }
                break;
            
            default:
                submenu += `<li><a href="${e.url}" class="dropdown-item" target="_blank">${e.name}</a></li>`
                break;
        }
    })
    return submenu
}


const exist_per = (per) =>{
    if(per > 0){
        return true
    }else{
        return false
    }
}