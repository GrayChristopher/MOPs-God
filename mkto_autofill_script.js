MktoForms2.whenReady(function (form) {

    var value = readCookie('_mkto_trk');    

    if (readCookie('_mkto_trk')) {      

      $.post( theme_ajax_object.ajax_url, {

          action: "marketo_api",

          value: value

        }, function( response ) {

          console.log(response);

          var marketovalues = JSON.parse(response);

          var prefill = {

            "Email" : marketovalues.email,

            "FirstName" : marketovalues.firstName,

            "LastName" : marketovalues.lastName,

            "Company" : marketovalues.company,

            "Phone" : marketovalues.phone,

            "Title" : marketovalues.title

          };

          form.vals(prefill);

      });

    }

  });
and here is the PHP for the ajax call (I replaced the client_id/secret here with "asdfasdfasdfasdf" for security):
add_action( 'wp_ajax_marketo_api', 'marketo_api_handler' );

add_action( 'wp_ajax_nopriv_marketo_api', 'marketo_api_handler' );



function marketo_api_handler() {

  $value = $_POST['value'];

  if ($value) {

      $value = str_replace('&', '%26', $value);

      $token = wp_remote_get('https://222-ENM-584.mktorest.com/identity/oauth/token?grant_type=client_credentials&client_id=asdfasdfasdfasdf&client_secret=asdfasdfasdfasdf');

      $token = json_decode($token['body']);

      $token = $token->access_token;

      if ($token) {

          $marketodata = wp_remote_get('https://222-ENM-584.mktorest.com/rest/v1/leads.json?access_token=' . $token . '&filterType=cookies&filterValues=' . $value . '&fields=email,firstName,lastName,company,phone,title');

          $marketodata = json_decode($marketodata['body']);

          $marketodata = $marketodata->result[0];

          if ($marketodata !== null) {

              echo json_encode($marketodata);

          }

      }

  }

  wp_die();

}
