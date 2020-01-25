<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Log Reader</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <?php
        $url = 'pihole.fritz.box:6669';

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
    <style>
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            padding: 15px;
        }
    </style>
</head>
<body>
    <center>
        <table style="width:25%">
            <tr>
                <th><u>Raum</u></th>            
            </tr>
            <script type="text/javascript">
                var response = JSON.parse('<?php echo $data ?>');                
                response.rooms.forEach(function (_val, _i, _strArray) {
                    document.write(`<tr><td>${_val}</td></tr>`); 
                });
            </script>
        </table>
    </center>
</body>
</html>