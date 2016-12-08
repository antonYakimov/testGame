/**
 * Created by ayak on 07.12.16.
 */

$("#myModal").on("shown.bs.modal", function () {
  $('#myInput').focus()
});

$(".js-send-info").on("click", function () {
  $.ajax({
    method: "POST",
    url: "/login",
    data:{
      login: $("#inputLogin").val(),
      password: $("#inputPassword").val()
    }
  })

});