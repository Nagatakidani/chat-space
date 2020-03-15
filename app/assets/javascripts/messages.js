$(function(){
  function buildHTML (message) {
    if (message.content && message.image) {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="message__upper-message">
            <p class="message__upper-message__talker">
              ${message.user_name}
            </p>
            <p class="message__upper-message__time">
              ${message.created_at}
            </p>
          </div>
          <div class="message__lower-message">
            <p class="message__lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else if (message.content) {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="message__upper-message">
            <p class="message__upper-message__talker">
              ${message.user_name}
            </p>
            <p class="message__upper-message__time">
              ${message.created_at}
            </p>
          </div>
          <div class="message__lower-message">
            <p class="message__lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
        return html;
    } else if  (message.image) {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="message__upper-message">
            <p class="message__upper-message__talker">
              ${message.user_name}
            </p>
            <p class="message__upper-message__time">
              ${message.created_at}
            </p>
          </div>
          <div class="message__lower-message">
          <img src=${message.image} >
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',  
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .always(function(){
        $('input').prop('disabled', false);
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.main-chat__massages').append(html);
        $('.main-chat__massages').animate({ scrollTop: $('.main-chat__massages')[0].scrollHeight});
        $('form')[0].reset();
      })
      .fail(function() {
        alert("メッセージ送信失敗");
      });
  });

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
  .done(function(messages) {
    if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main-chat__massages').append(insertHTML);
      $('.main-chat__massages').animate({ scrollTop: $('.main-chat__massages')[0].scrollHeight});
    }
  })
  .fail(function() {
    alert('error');
  });
};
if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 500);
}

});