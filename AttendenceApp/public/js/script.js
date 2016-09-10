    
$(document).ready(function()  { 
//   var chatContentTemplate = $('#chatContent').html();
//   var friendDetailTemplate =$('#friendDetailTemplate').html();
//   var modalChatNameTemplate=$('#modalChatNameTemplate').html();
//   var modalChatContactTitleTemplate=$('#modalChatContactTitleTemplate').html();
//   var contactTemplate =$('#contactTemplate').html();
//   var messageTemplate=$('#messageTemplate').html();
//   var eventTemplate=$('#eventTemplate').html();
//   var chatTab=$('#tab1');
//   var contactTab =$('#tab2');
//   var eventTab=$('#tab4');
//   var ContactTabClass=$('.ContactTabClass');
//   var eventTabClass =$('.eventTabClass');
//   var friendDetailtoMessage=$('#friendDetailtoMessage');
//   var chatTitle=$('.chatTitle');
//   var contactModalTitle =$('.contactModalTitle');
//   var chatModalBody=$('.chatModalBody');
//   var friendDetailModalBody =$('.friendDetailModalBody');
//   var friendDetailModal=$('#friendDetailModal');
//   var btnSearch=$("#btnSearch");
//   var chatTabClass=$('.chatTabClass');
//   var url,ajaxType;
//   url='http://localhost:8080/friends?_sort=id&_order=DESC';
//   ajaxType='GET';
//   var friendIdMessage;
//   var formBtnSubmit=$('#formBtnSubmit');
//   var chatModalfooter=$('#chatModalfooter').html();
//   var chatFooter=$('.chatFooter');
//   var myModal=$('#myModal');
//   var friendBtnSubmit=$('#friendBtnSubmit');

//   //*************variable declaration end***************************************
//   ajaxFun(url,ajaxType,chatTab,chatContentTemplate); 


// btnSearch.click(function(){
//   chatTab.empty();
//   // $('.tabContentClass').empty();
//   //chatContentTemplate.empty();
//  var searchInput=$("#searchInput").val();
//  console.log(searchInput);
//  ajaxType="GET";
//  url="http://localhost:8080/friends?name="+searchInput;
//  ajaxFun(url,ajaxType,chatTab,chatContentTemplate);
// });

// chatTabClass.click(function(){
//   chatTab.empty();
//   url='http://localhost:8080/friends?_sort=id&_order=DESC';
//   ajaxType='GET';
//   ajaxFun(url,ajaxType,chatTab,chatContentTemplate); 
// })


//         //Showing chat detail for all friends
        

// // friend detail function 
//   chatTab.delegate(".frienddetailBtn", 'click', function()  { //Movie find function 
//     friendDetailModalBody.empty();
//         var friendId=$(this).attr('data-id');
//         url='http://localhost:8080/friends?id='+friendId;
//         ajaxType='GET';
//         ajaxFun(url,ajaxType,friendDetailModalBody,friendDetailTemplate);
//      });  

//  // showing message on click of div
//   chatTab.delegate(".ChatDiv", 'click', function()  { 
//     chatModalBody.empty();
//     chatTitle.empty();
//         var friendId=$(this).attr('data-id');
//         url='http://localhost:8080/message?friendId='+friendId;
//         ajaxType='GET';
//         ajaxFun(url,ajaxType,chatModalBody,messageTemplate);
        
//         url='http://localhost:8080/friends?id='+friendId;  
//         ajaxFun(url,ajaxType,chatTitle,modalChatNameTemplate) ;     
//      }); 

// //showing Name on click of contact in contact tab 
//   contactTab.delegate('.ContactDivTemplate','click',function(){
//       contactModalTitle.empty();
//        friendIdMessage=$(this).attr('data-id');
//       url='http://localhost:8080/friends?id='+friendIdMessage;
//         ajaxType='GET',
//         ajaxFun(url,ajaxType,contactModalTitle,modalChatContactTitleTemplate);
        
//         $('#ringTone').get(0).play();

//   });

//   //ringtone Feature
//   $('.audioClose').click(function(){
//     $('#ringTone').get(0).src="";
//   })
//   $('#ringToneClose').click(function(){
//      $('#ringTone').get(0).src="";
//   })

//   //navigate to message from friend detail
//   // friendDetailtoMessage.click( function()  { 
//   //   chatModalBody.empty();
//   //   chatTitle.empty();    
//   //       var friendId=$(this).attr('data-id');
//   //       url='http://localhost:8080/friends?id='+friendId;
//   //       ajaxType='GET';
//   //       showMessage(url,ajaxType,chatModalBody,messageTemplate);        
//   //    }); 

// //define showEvent for event function
//   function showEvent(url, ajaxType,appendElement,contentTemplate){
//     //var nameLead=$('.nameLead');
//   //  var EventHostTemplate=$('#EventHostTemplate').html();
//     $.ajax({
//               type:ajaxType,
//               url:url,
//               dataType:"json",
//              success:function(events){
//                  if(events.Response!="False")   {
//                      $.each(events, function(j,data){
//                      // var eventIdforPerson=data.id;
//                      // console.log(eventIdforPerson);
//                     appendElement.append(Mustache.render(contentTemplate,data));
//                     // url='http://localhost:8080/friends/'+eventIdforPerson;
//                     // ajaxFun(url,ajaxType,eventTab,eventTemplate);
//                          });
                      
//                     }       
//                   else { alert('list incorrect')} // else end
//                }
//              });
//       }


// //showing all the events
//   eventTabClass.click( function(){
    

//     ajaxType='GET';
//     url='http://localhost:8080/event';
//     showEvent(url,ajaxType,eventTab,eventTemplate);
//   });

//   // showing all the Contact in contact Tab
//   ContactTabClass.click( function(){

//     ajaxType="GET",
//     url='http://localhost:8080/friends?_sort=name&_order=ASC';
//     ajaxFun(url,ajaxType,contactTab,contactTemplate);

//   });

//                     //ajax function call
//    function ajaxFun(url, ajaxType,appendElement,contentTemplate) // Ajax Function define
//    {
//      $.ajax({
//          type: ajaxType,
//          url: url,
//                  dataType: "json",
//                  success: function(friends) {                      
//                   if(friends.Response!="False"){
//                     $.each(friends, function(j, data){
//                     appendElement.append(Mustache.render(contentTemplate,data)); //Mustache to render template
//                     });
//                  }
//                  else { alert('list incorrect');} 
//                 }
//             }); 
//          }




// //************Get operation over ******************************
// //object
// friendBtnSubmit.click (function(){

//  //var idSpan=$('.idSpan').text();
//  //console.log(idSpan);
//  var fname=$('#inputFriendName').val();
//  var emailId=$('#inputEmail').val();
//  var phoneNumber=$('#inputPhoneNumber').val();
//  var address=$('#inputAddress').val();
//  var friendObj={
//   name:fname,
//   picture: "http://placehold.it/32x32",
//   email:emailId,
//   phone:phoneNumber,
//   address: address
//         };
// console.log(friendObj);
//         url='http://localhost:8080/friends';
//         ajaxType="POST";
//         ajaxPost(url,ajaxType,chatTab,chatContentTemplate,friendObj);
//         location.reload();
//       //  ajaxFun(url,ajaxType,chatTab,chatContentTemplate);
        
// });


//  formBtnSubmit.click (function(){
//  var idSpan=$('.idSpan').text();
//  console.log(idSpan);
//  var inputMessage=$('#inputMessage').val();
//  var messageObj={
//  friendId:idSpan,
//   messageTime:Date(),
//   messages: inputMessage
//         };
//         url='http://localhost:8080/message';
//         ajaxType="POST";
//          $.ajax({
//          type: ajaxType,
//          url: url,
//                  dataType: "json",
//                  data:messageObj,
//                  success: function(newMessage) {
// chatModalBody.append(Mustache.render(messageTemplate,newMessage));
// $(chatModalBody).animate({ scrollTop: $(chatModalBody).prop("scrollHeight")}, 1000);
// $('#inputMessage').val("");
// }
//                  });
        
// });
// function ajaxPost(url, ajaxType,appendElement,contentTemplate,data) // Ajax Function define
//    {
//      $.ajax({
//          type: ajaxType,
//          url: url,
//                  dataType: "json",
//                  data:data,
//                  success: function(newFriend){
//                   chatTab.append(Mustache.render(chatContentTemplate,newFriend));
//                  }                 
                 
//             }); 
//          }

//     $('#myModal').on('shown.bs.modal', function()
//     {
//       var d = $(chatModalBody);
//       d.scrollTop(d.prop("scrollHeight"));
//       console.log("Scrolling");
//     });


//     function setModalMaxHeight(element)
//     {
//         this.$element     = $(element);
//         this.$content     = this.$element.find('.modal-content');
//         var borderWidth   = this.$content.outerHeight() - this.$content.innerHeight();
//         var dialogMargin  = $(window).width() > 767 ? 60 : 20;
//         var contentHeight = $(window).height() - (dialogMargin + borderWidth);
//         var headerHeight  = this.$element.find('.modal-header').outerHeight() || 0;
//         var footerHeight  = this.$element.find('.modal-footer').outerHeight() || 0;
//         var maxHeight     = contentHeight - (headerHeight + footerHeight);

//         this.$content.css({
//             'overflow': 'hidden'
//           });

//           this.$element
//             .find('.modal-body').css({
//                   'max-height': maxHeight-20,
//                   'overflow-y': 'auto'
//               });
//     }

//     $('.modal').on('show.bs.modal', function()
//     {
//           $(this).show();
//           setModalMaxHeight(this);
//     });

//     $(window).resize(function() {
//         if ($('.modal.in').length != 0)
//         {
//             setModalMaxHeight($('.modal.in'));
//           }
//     });
//     // End-of-Modal-Height-Setting
 
$("div#form1").append(
// Creating Form Div and Adding <h2> and <p> Paragraph Tag in it.
$("<h3/>").text("Contact Form"),
 $("<p/>").text("This is my form. Please fill it out. It's awesome!"), $("<form/>", {
action: '#',
method: '#'
}).append(
// Create <form> Tag and Appending in HTML Div form1.
$("<input/>", {
type: 'text',
id: 'vname',
name: 'name',
placeholder: 'Your Name'
}), // Creating Input Element With Attribute.
$("<input/>", {
type: 'text',
id: 'vemail',
name: 'email',
placeholder: 'Your Email'
}), $("<textarea/>", {
rows: '5px',
cols: '27px',
type: 'text',
id: 'vmsg',
name: 'msg',
placeholder: 'Message'
}), $("<br/>"), $("<input/>", {
type: 'submit',
id: 'submit',
value: 'Submit'
})))
// variable declare 
var storeData;
// $('#notification').click(function(){
//     alert("noti clicked");
//     var form=true;
//     if(form==true){
//   $.ajax({
//     type:'GET',
//     var url='http://localhost:8070/form?id='+ formId,
//     success:function(data){

//     },
//     error:function(error){
//       console.log(error);
//     }
//   });    

// } else{
//   alert("no notification");
// }
// });


 $('[data-toggle="tooltip"]').tooltip();
 $('.card').click(function(){
    var divID=$(this).attr('id');
    $('.row').hide();
    
    console.log('#'+divID+'Id');

    if(divID=="attendence"){
      $('#'+divID+'Id').show();
      $('#btnDiv').show();
      $('#pageId').text(divID+' Page');
      var userId=100008; //get from session
      $.ajax({
      url:'http://localhost:8070/attendance?userId='+userId,
      type:'GET',
      success:function(data){
        if(data.length>=1){
          $('.attendenceBtn').hide();
          $('div[id^="col_fld"]').removeClass('panel-danger')
          .addClass('panel-success');
          $('.attendh3').text("Attendence Marked");
         $('#imgID').attr('src','image/check.png');   
        }
      },
      error:function(error){
        console.log(error);
      }
     });
    }
    
    if(divID=="report"){
      $('#'+divID+'Id').show();
      $('#btnDiv').show();
      $('#pageId').text(divID+' Page');
    }
    if(divID=="notification"){
      $('#'+divID+'Id').show();
      $('#btnDiv').show();
      $('#pageId').text(divID+' Page');
    }


 });

 $('#backBtn').click(function(){
    $('.row').show();
    $('#btnDiv').hide();
    $('.content').hide();
 });

//Attendence *************************************************
var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var output = (day<10 ? '0' : '') + day + '/' +
              (month<10 ? '0' : '') + month + '/' +
              d.getFullYear();

var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var hour=d.getHours();
var minutes=d.getMinutes();
var second=d.getSeconds();
console.log("time" + time);
$('#date').text(output);

//*******code for showing request form after 10 
 // if(hour>10&&minutes>0&&second>0){
 //  $('.requestThumb').show();
 //  $('.attendenceThumb').hide();
 //  $('.time').text(time);
 // }
 

 $('.attendenceBtn').click(function(){
   $('div[id^="col_fld"]').removeClass('panel-danger')
   .addClass('panel-success');
     $('.attendh3').text("Attendence Marked");
     $('.attendenceBtn').hide();
     // $('#imgID').removeAttr('src');
     $('#imgID').attr('src','image/check.png');    
     var id=100008;  //get from session
     var date=output;
     var obj={
      userId:id,
      date:output
     }
     $.ajax({
      url:'http://localhost:8070/attendance',
      type:'POST',
      data:obj,
      success:function(data){
        // alert('success');

      },
      error:function(error){
        console.log(error);
      }
     });
 });

// info on click ***********************************************
$('.infoBtn').click(function(){
    var url='http://localhost:8070/user?id=100002';
    var ajaxType='GET';
    var infoTemplate=$('#infoTemplate').html();
    var MyInfoModalBody=$('.MyInfoModalBody');
    var batchTemplate=$('#batchTemplate').html();
    var catagoryTemplate=$('#catagoryTemplate').html();
    var mentorTemplate=$('#mentorTemplate').html();
    var userdata={};
    MyInfoModalBody.empty();
    ajaxFun(url,ajaxType,MyInfoModalBody,infoTemplate,userdata);
    var batch=0; //coming from session
    url='http://localhost:8070/batch?id='+ batch;
    ajaxFun(url,ajaxType,MyInfoModalBody,batchTemplate,userdata);
    var subcatagory=0 //coming from session
    url='http://localhost:8070/subCategory?id='+ subcatagory;
    ajaxFun(url,ajaxType,MyInfoModalBody,catagoryTemplate,userdata);
    var mentorId=500001;
    url='http://localhost:8070/user?id='+mentorId;
    console.log("mentor");
    ajaxFun(url,ajaxType,MyInfoModalBody,mentorTemplate,userdata);
    console.log("mentor"); 

});
// $('#MyInfo').click()
function ajaxFun(url,ajaxType,appendElement,template,userdata){
  
       return $.ajax({
          url:url,
          type:ajaxType,
          success:function(data){
            // storeData=data;
            // console.log("user data" + storeData);
            $.each(data, function(j, data){
            appendElement.append(Mustache.render(template,data)); //Mustache to render template
                            });
             // return storeData;
             // userdata(data);
          },
          error:function(error){
            console.log("service error");
          }
        });
     }

 }); //ready function ends