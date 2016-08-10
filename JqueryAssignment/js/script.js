var str1, strImg;
var $poster=$("#poster");
 var  $tableClass=$('#tableClass'); 
 var $para=$("#para");
 var search;
 var dataTemplate=$("#dataTemplate").html();
 var imgTemplate=$("#imgTblTemplate").html();
 var imgBody=$(".imgBody");
 var dataBody=$(".dataBody");
 var title;
 
$(document).ready(function()  {  
   $("#find").click(function()  { //Movie find function 
      imgBody.empty();
      dataBody.empty();
      title = $("#srch-term").val();
      ajaxFun(); // calling Ajax Function
     });  //click function ends

   function ajaxFun() // Ajax Function define
   {
     $.ajax({
         type: 'GET',
         url: 'http://www.omdbapi.com/?s='+ title,
                 dataType: "json",
                 success: function(details) { // success function called
                  search=details.Search;                         
                  if(details.Response!="False") // checking Response true or false
                  {  
                    $('#successAlert').slideDown(); // showing alert message
                    $.each(search, function(j, data) {
                    imgBody.append(Mustache.render(imgTemplate,data)); //Mustache to render template
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
                 else // execute if no result found
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
         }
 }); //ready function ends