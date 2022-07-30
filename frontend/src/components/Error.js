import React from 'react'

document.ready(function(){
    var API_KEY="AIzaSyCNDTvDi79LgabkRxWA1PCVgtnKtOPt3-4"
    
    var video=''
 
   ("form").submit(function(event){
    event.preventDefault()

    var search=("#search").val()
  
videosearch(API_KEY,search,2)


})

   function videosearch(key,search,maxResults){
    ("#video").empty()

    .get("https://www.googleapis.com/youtube/v3/search?key="+key+
    "&type=video&part=snippet&maxresults="+maxResults+"&q="+search,function(data){
        console.log(data)
       
         data.items.forEach(item =>{
            video=`
            <iframe width="200" height="100" src="https://www.youtube.com/embed/{item.id.videoId}" frameborder="0"></iframe>
            
            `
            ("#videos").append(video)
         });
    })
   }
})

const Error = () => {
  return (
    <div>
        <body>
            <div class="container">
                <br/>
                <h1>Youtube Search</h1>
                <div>
                    <br/>
                    <div class="form-group">
                        <input type="text" class="form-control" id="search"/>
                    </div>
                    <br/>
                    <div class="form-group">
                        <input type="submit" class="btn btn-danger" value="Search"/>
                    </div>
                 </div>
                 <br/>
                 <div class="scroll-bg">
                    <div class="scroll-div">
                             <div class="row">
                                <div class="col-md-12">
                                  <div id="videos"></div>
                             </div>
                        </div>  
                        </div> </div>
            </div>
        </body>
    </div>
  )
}

export default Error