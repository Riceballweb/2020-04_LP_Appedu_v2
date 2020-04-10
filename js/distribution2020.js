var GET_LOCATION_ENDPOINT = "https://www.appedu.com.tw/Librarys/_ajax/Address.php";
var DISTRIBUTION_ENDPOINT = "https://www.appedu.com.tw/Librarys/_ajax/Distribution.php";

function loadLocation(options) {
  var $cityElement = options.city.element;
  var $areaElement = options.area.element;
  $cityElement.html(
    $("<option>")
      .text(options.city.defaultLabel)
      .val("")
  );
  $areaElement.html(
    $("<option>")
      .text(options.area.defaultLabel)
      .val("")
  );
  // load city data
  $.ajax({
    url: GET_LOCATION_ENDPOINT,
    type: "POST",
    dataType: "json",
    data: { postFlag: "LoadCity" }
  })
    .done(function(response) {
      if (response.result == "true") {
        response.data.forEach(function(v) {
          $cityElement.append(
            $("<option>")
              .val(v.id)
              .text(v.name)
          );
        });
      }
    })
    .fail(function() {
      alert(options.city.errorMessage);
    });
  // listen to city and load area data
  $cityElement.change(function() {
    $areaElement.html(
      $("<option>")
        .text(options.area.defaultLabel)
        .val("")
    );
    $.ajax({
      url: GET_LOCATION_ENDPOINT,
      type: "POST",
      dataType: "json",
      data: {
        postFlag: "LoadArea",
        CityID: $(this).val()
      }
    })
      .done(function(response) {
        if (response.result == "true") {
          response.data.forEach(function(v) {
            $areaElement.append(
              $("<option>")
                .val(v.id)
                .text(v.name)
            );
          });
        }
      })
      .fail(function() {
        alert(options.area.errorMessage);
      });
  });
}

$.validator.addMethod(
  "cellphone",
  function(value, element) {
    var reg = /^[09]{2}[0-9]{8}$/;
    return this.optional(element) || reg.test(value);
  },
  "Please enter a valid cellphone."
);

function distributionSubmitHandler(options) {
  return function(form) {
    $.ajax({
      url: DISTRIBUTION_ENDPOINT,
      type: "POST",
      dataType: "json",
      data: {
        postFlag: "InsertData",
        distribution_id: form.distribution.value,
        media_sub_id: form.mediaSub.value,
        outlet_sub_id: form.outletSub.value,
        type: form.type.value,
        course: form.course.value,
        name: form.name.value,
        cellphone: form.cellphone.value,
        email: form.email.value,
        zip_id: form.area.value,
        remark: form.remark && form.remark.value,
        gift: form.gift && form.gift.value
      }
    })
      .done(function(response) {
        if (response.result == "true") {

          // gtag.js return
          gtag('event', <send>, {
            'event_category': <governmenttraining>,
            'event_label': <label>,
            'value': <value>
          });

          // Call Popup
          Swal.fire(
            '完成填單！',
            (options.successMessage),
            'success'
          )
          window.location.href = "#hero";
          // Clear event-form
          $("#event-form")[0].reset();
        } else {
          console.error(response);
          alert("資料送出失敗，請聯絡我們或再試一次");
        }
      })
      .fail(function(error) {
        console.error(error)
        alert("網路問題無法傳送資料，請聯絡我們或再試一次");
      });
    return false;
  };
}
