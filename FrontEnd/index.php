<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <link rel="stylesheet" href="index.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <title>Log Reader</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <?php
        $url = 'pihole.fritz.box:6969';

        function GetRequest($arg_1)
        {
            $_ch = curl_init($arg_1);
            curl_setopt($_ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($_ch, CURLOPT_HEADER, 0);
            $_data = curl_exec($_ch);
            curl_close($_ch);

            return $_data;
        };        

        $data = GetRequest($url);
    ?>
</head>

<script type="text/javascript">
    function tableClicker(shitto) {
        console.log(shitto.innerHTML);
    }

    function loadTable(id, title, dataArray) {
        let _table = document.getElementById(id);
        let _html = `<tr><th><u>${title}</u></th></tr>`;

        dataArray.forEach(_element => {
            _html += `<tr><td><button class="tableButton" onClick="tableClicker(this)"> ${_element} </button></td></tr>`;
        });
        _table.innerHTML = _html;
    } 

</script>

<body>
    <table id="main-table">
        <script>
            let response = JSON.parse('<?php echo $data ?>');  
            loadTable('main-table', 'Räume', response.rooms); 
        </script>        
    </table>
</body>
</html>