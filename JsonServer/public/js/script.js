    
$(document).ready(function()  { 
  var chatContentTemplate = $('#chatContent').html();
  var friendDetailTemplate =$('#friendDetailTemplate').html();
  var modalChatNameTemplate=$('#modalChatNameTemplate').html();
  var modalChatContactTitleTemplate=$('#modalChatContactTitleTemplate').html();
  var contactTemplate =$('#contactTemplate').html();
  var messageTemplate=$('#messageTemplate').html();
  var eventTemplate=$('#eventTemplate').html();
  var chatTab=$('#tab1');
  var contactTab =$('#tab2');
  var eventTab=$('#tab4');
  var ContactTabClass=$('.ContactTabClass');
  var eventTabClass =$('.eventTabClass');
  var friendDetailtoMessage=$('#friendDetailtoMessage');
  var chatTitle=$('.chatTitle');
  var contactModalTitle =$('.contactModalTitle');
  var chatModalBody=$('.chatModalBody');
  var friendDetailModalBody =$('.friendDetailModalBody');
  var friendDetailModal=$('#friendDetailModal');
  var btnSearch=$("#btnSearch");
  var chatTabClass=$('.chatTabClass');
  var url,ajaxType;
  url='http://localhost:8080/friends';
  ajaxType='GET';

  //*************variable declaration end***************************************
  ajaxFun(url,ajaxType,chatTab,chatContentTemplate); 


btnSearch.click(function(){
  chatTab.empty();
  // $('.tabContentClass').empty();
  //chatContentTemplate.empty();
 var searchInput=$("#searchInput").val();
 console.log(searchInput);
 ajaxType="GET";
 url="http://localhost:8080/friends?name="+searchInput;
 ajaxFun(url,ajaxType,chatTab,chatContentTemplate);
});

chatTabClass.click(function(){
  chatTab.empty();
  url='http://localhost:8080/friends';
  ajaxType='GET';
  ajaxFun(url,ajaxType,chatTab,chatContentTemplate); 
})


        //Showing chat detail for all friends
        

// friend detail function 
  chatTab.delegate(".frienddetailBtn", 'click', function()  { //Movie find function 
    friendDetailModalBody.empty();
        var friendId=$(this).attr('data-id');
        url='http://localhost:8080/friends?index='+friendId;
        ajaxType='GET';
        ajaxFun(url,ajaxType,friendDetailModalBody,friendDetailTemplate);
     });  

  
  // showMessage for message detail
  function showMessage(url, ajaxType,appendElement,contentTemplate){
    $.ajax({
              type:ajaxType,
              url:url,
              dataType:"json",
             success:function(friends){
                 if(friends.Response!="False")   {
                     $.each(friends, function(j,data){
                     chatTitle.append(Mustache.render(modalChatNameTemplate,data));
                     $.each(data.message, function(j,data){
                    appendElement.append(Mustache.render(contentTemplate,data));
                         });
                      });
                    }       
                  else { alert('list incorrect')} // else end
               }
             });
      }

 // showing message on click of div
  chatTab.delegate(".ChatDiv", 'click', function()  { 
    chatModalBody.empty();
    chatTitle.empty();
        var friendId=$(this).attr('data-id');
        url='http://localhost:8080/friends?index='+friendId;
        ajaxType='GET';
        showMessage(url,ajaxType,chatModalBody,messageTemplate);        
     }); 

//showing Name on click of contact in contact tab 
  contactTab.delegate('.ContactDivTemplate','click',function(){
      contactModalTitle.empty();
      var friendId=$(this).attr('data-id');
      url='http://localhost:8080/friends?index='+friendId;
        ajaxType='GET',
        ajaxFun(url,ajaxType,contactModalTitle,modalChatContactTitleTemplate);

  });

  //navigate to message from friend detail
  friendDetailtoMessage.click( function()  { 
    chatModalBody.empty();
    chatTitle.empty();    
        var friendId=$(this).attr('data-id');
        url='http://localhost:8080/friends?index='+friendId;
        ajaxType='GET';
        showMessage(url,ajaxType,chatModalBody,messageTemplate);        
     }); 

//define showEvent for event function
  function showEvent(url, ajaxType,appendElement,contentTemplate){
    $.ajax({
              type:ajaxType,
              url:url,
              dataType:"json",
             success:function(friends){
                 if(friends.Response!="False")   {
                     $.each(friends, function(j,data){
                      console.log(data.name);
                      appendElement.append("<center><h4><strong><b>" +data.name+"</b></strong></h4></center>");
                     $.each(data.event, function(j,data){
                    appendElement.append(Mustache.render(contentTemplate,data));
                         });
                      });
                    }       
                  else { alert('list incorrect')} // else end
               }
             });
      }


//showing all the events
  eventTabClass.click( function(){
    ajaxType='GET';
    url='http://localhost:8080/friends';
    showEvent(url,ajaxType,eventTab,eventTemplate);
  });

  // showing all the Contact in contact Tab
  ContactTabClass.click( function(){

    ajaxType="GET",
    url='http://localhost:8080/friends?_sort=name&_order=ASC';
    ajaxFun(url,ajaxType,contactTab,contactTemplate);

  });

                    //ajax function call
   function ajaxFun(url, ajaxType,appendElement,contentTemplate) // Ajax Function define
   {
    console.log("function call");
     $.ajax({
         type: ajaxType,
         url: url,
                 dataType: "json",
                 success: function(friends) {                      
                  if(friends.Response!="False"){
                    $.each(friends, function(j, data){
                      console.log("each called");
                    appendElement.append(Mustache.render(contentTemplate,data)); //Mustache to render template
                    });
                 }
                 else { alert('list incorrect');} 
                }
            }); 
         }




//************Get operation over ******************************





 }); //ready function ends