var fJS;
jQuery(document).ready(function($) {

  $('#price_filter').val('0-500');
  $("#price_slider").slider({
    range:true,
    min: 0,
    max: 8000,
    values:[0, 8000],
    step: 500,
    slide: function(event, ui) {
      $("#price_range_label").html(ui.values[ 0 ] + ' - '+ ui.values[ 1 ] + 'kW');
      $('#price_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }   
  });

    $('#rotor_filter').val('0-200');
  $("#rotor_slider").slider({
    range:true,
    min: 0,
    max: 200,
    values:[0, 200],
    step: 5,
    slide: function(event, ui) {
      $("#rotor_range_label").html(ui.values[ 0 ] + ' - ' + ui.values[ 1 ] + "m");
      $('#rotor_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }   
  });

  $('#status :checkbox').prop('checked', true);

  fJS = filterInit();
});

function filterInit() {

  var template = Mustache.compile($.trim($("#template").html()));

  var view = function(service){
    return template(service);
  };

  var settings = {
    filter_criteria: {
      amount: ['#price_filter .TYPE.range', 'amount'],
      rotor: ['#rotor_filter .TYPE.range', 'rotor'],
      status: ['#status :checkbox', 'status'],
      wind: ['#iec :checkbox', 'wind']
    },
    search: {input: '#search_box' },
    and_filter_on: true,
    id_field: 'id' //Default is id. This is only for usecase
  };

  return FilterJS(services, "#service_list", view, settings);
}
