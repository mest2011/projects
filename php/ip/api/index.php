<?php


if(isset($_GET['json'])){
    header("Content-type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    echo json_encode(["ip"=>get_client_ip()]);
    die();
}


function get_client_ip() {
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if(isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}
$temp = (String)$_SERVER['REMOTE_ADDR'];



?>

<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/toastr.min.css" />
    <script
      src="js/bootstrap.min.js"
      integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
      crossorigin="anonymous"
    ></script>
    <title>Seu IP</title>
  </head>
  <body class="row">
    <div
      class="
        containner
        ip-containner
        rounded
        p-5
        my-5
        mx-auto
        col-12 col-md-8
        d-flex
      "
    >
      <div class="input-group m-auto ">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Seu IP é:</span>
        </div>

        <input
          id="lbl-ip"
          type="text"
          class="form-control col-10 mr-auto"
          placeholder="192.168.0.1"
          aria-label="ip"
          aria-describedby="basic-addon1"
          value="<?php echo get_client_ip();?>"
          onclick="copyText()"
        />
      </div>
    </div>
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/toastr.min.js"></script>
    <script>
      toastr.options.closeButton = true;
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = "toast-bottom-right";

      function copyText() {
        let text = document.getElementById("lbl-ip");
        text.select();
        document.execCommand("copy");
        toastr.success("Ip copiado para area de transferencia!", "Sucesso!", {
          timeOut: 2000,
        });
      }
    </script>
  </body>
</html>

