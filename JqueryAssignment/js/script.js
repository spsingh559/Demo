var str1, strImg;
var $poster=$("#poster");
 var  $tableClass=$('#tableClass'); 
 var $para=$("#para");
 var search;
 var dataTemplate=$("#dataTemplate").html();
 var imgTemplate=$("#imgTblTemplate").html();
 var imgBody=$(".imgBody");
 var dataBody=$(".dataBody");
 
$(document).ready(function()  {  
   $("#find").click(function()  { //Movie find function 
    imgBody.empty();
    dataBody.empty();
    var title = $("#srch-term").val();
     $.ajax({
       type: 'GET',
       url: 'http://www.omdbapi.com/?s='+ title,
               dataType: "json",
               success: function(details) {
                search=details.Search;                         
                if(details.Response!="False")
                {  
                  $('#successAlert').slideDown();
                  $.each(search, function(j, data) {
                    console.log("each is working");
                  imgBody.append(Mustache.render(imgTemplate,data));
                  dataBody.append(Mustache.render(dataTemplate,data));
                  });
                  $('#featuresHeading').slideDown();
                  $('#features').slideDown();
                  window.setTimeout(function() {
                   $("#successAlert").fadeTo(500, 0).slideUp(500, function(){
                    $(this).remove(); 
                    });
                    }, 2000); 
               }
               else
               {
                  $('#FailAlert').slideDown();
                   $("#featuresHeading").css("display", "none");
                   $("#features").css("display", "none");
                   window.setTimeout(function() {
                    $("#FailAlert").fadeTo(500, 0).slideUp(500, function(){
                      $(this).remove(); 
                    });
                  }, 2000); 
               } // else end
              }//success function end
          }); // ajax end
     });  //click function ends
 }); //ready function ends