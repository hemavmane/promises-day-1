console.log("entering the user id",1)

function getUserdata(id){
   return new promises((resolve,rejected)=>{
        setTimeout(()=>{
            let user = {id:id,username:"hema"}
resolve(user)
        }, 3000 )
    })
}



function getRepositories(username){
    return new promises((resolve,rejected)=>{
        setTimeout(()=>{
            let repos={
                hema:["calcultor","counter","color flipper"],
                vasanth:["reviews","add","instagram"],
                trisha:["facebok","twitter","linkdin"],
               

            };
            resolve(repos[username])
        }, 2000)
    })
}

function getCommits(repo){
    return new promises((resolve,rejected)=>{
        setTimeout(()=>{
            let commits ={
                calculator:["initial","colors","eventlistner","hover"],
                colorflipper:["initial","eventlistner","colors"],
                counter:["initial","colors","add functionality"]
        
            };resolve(commits[repo])
        },1000)
    })
}












