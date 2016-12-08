/**
 * Created by ayak on 07.12.16.
 */
$(document).ready(function() {
  $(".js-login-modal").on("shown.bs.modal", function () {
    $(".js-input-password, .js-input-login").closest(".form-group").removeClass("has-error");


    $(".js-btn-send-info").on("click", function () {
      var login = $(".js-input-login").val();
      var password = $(".js-input-password").val();
      var onLogin = function () {
        $(".js-login-modal").modal('hide');
        $(".js-btn-login").replaceWith('<button type="button" class="btn btn-lg ui-my-custom-button js-btn-logout" data-target=".js-login-modal">Выйти</button>');
        $(".ui-score-window").append('<div class="text-center username">' + login + '</div>');
        $(".js-btn-logout").on("click", function () {
          $.ajax({
            method: "GET",
            url: "/logout"
          });
          $(".js-btn-logout").replaceWith('<button type="button" class="btn btn-lg ui-my-custom-button js-btn-login" data-toggle="modal" data-target=".js-login-modal">Войти</button>');
          $(".username").empty();
        })
      };

      if (login == ""){
        $(".js-input-login").closest(".form-group").addClass("has-error")
      } else {
        $(".js-input-login").closest(".form-group").removeClass("has-error")
      }
      if (password == ""){
        $(".js-input-password").closest(".form-group").addClass("has-error")
      }else {
        $(".js-input-password").closest(".form-group").removeClass("has-error")
      }
      if (login !== "" && password !== ""){
        $.ajax({
          method: "POST",
          url: "/login",
          contentType: "application/json",
          data: JSON.stringify({
            login: login,
            password: password
          }),
          success: function () {
            onLogin();
          }
        });
      }
    });
  });

});