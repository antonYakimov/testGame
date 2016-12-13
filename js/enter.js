/**
 * Created by ayak on 07.12.16.
 */

$(".js-btn-logout").css("display", "none");

var onLogout = function () {
  $.ajax({
    method: "GET",
    url: "/logout",
    success: function () {
    //   $(".js-btn-logout").css("display", "none");
    //   $(".js-btn-login").css("display", "inline-block");
    //   $(".js-login-name, .js-result-container").empty();
    //   login = null;
    },
    error: function () {
      $(".js-btn-logout").css("display", "none");
      $(".js-btn-login").css("display", "inline-block");
      $(".js-login-name, .js-result-container").empty();
      login = null;
      results = [];
    }
  });
};

var onLogin = function (login) {
  $(".js-login-modal").modal('hide');
  $(".js-btn-login").css("display", "none");
  $(".js-login-name").text(login);
  $(".js-btn-logout").css("display", "inline-block").on("click", onLogout);
};

var validateAndSendData = function () {
  login = $(".js-input-login").val();
  var password = $(".js-input-password").val();

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
        // onLogin()
      },
      error: function () {
        onLogin(login);
        getAndInsertResults() // current solution for testing
      }
    });
  }
};

var getAndInsertResults = function () {

  console.log('works');

  $.ajax({
    method: "GET",
    url: "/user/" + login + "/results",
    success: function (response) {
     // results = response;
     //  renderResults(results, ".js-result-container")
    },
    error:  function () {
      var response = [{
        name: "Game_1",
        result: "7541"
      },
      {
        name: "Game_2",
        result: "2145"
      }];
     results = response;
      renderResults(results, ".js-result-container")
    }
  })
};

$(document).ready(function() {
  $(".js-btn-login").css("display", "inline-block");
  $(".js-login-modal").on("shown.bs.modal", function () {
    $(".js-input-password, .js-input-login").closest(".form-group").removeClass("has-error");
    $(".js-btn-send-info").on("click", validateAndSendData);
  });
});