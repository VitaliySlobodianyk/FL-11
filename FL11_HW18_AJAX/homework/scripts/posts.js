pageElements = { 
    spinner: document.querySelector('.main__spinner'),
    postTemplate: document.getElementById('post').content,
    postsPlace: document.querySelector('.posts'),
    commentTemplate: document.getElementById('comment').content
};

let urlMethods= {
  checkHash(){
      let reg =/#userId=(\d+)/mg;   
      let id = reg.exec(window.location.hash);
          return id? id[1]: undefined;     
  }
};
document.addEventListener('DOMContentLoaded',()=>{
   let userId = urlMethods.checkHash();
   if(userId){
    apiWorker.postsPageRequest( {
        method:'GET',
        url: `${apiInfo.users}/${userId}`,
        callback: (responce)=>{
            document.querySelector('.author').textContent= JSON.parse(responce).name;
        }
    });
    apiWorker.postsPageRequest( {
        method:'GET',
        url: `${apiInfo.posts}?userId=${userId}`,
        callback: pageWorker.fillPosts
    });  
   }
});