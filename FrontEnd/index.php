<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <link rel="stylesheet" href="index.css">
    <script type="text/javascript">
        var curPage = 'rooms'; 
    </script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript" src="chartStuff.js"></script>
    <title>Log Reader</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <?php
        $url = 'pihole.fritz.box:6969/'; // Fallback
        if(!empty($_GET)){
            $url .= '?';
            foreach ($_GET as $key => $value) {
                $url .= $key . "=" . $value . "&";
            };
        };

        function GetRequest($arg_1){
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
 
    function getURLVars() {
        let _urlVars = {};
        let _temp = [];
        location.search
            .substr(1)
            .split('&')
            .forEach(function (item) {
                _temp = item.split('=');
                _urlVars[_temp[0]] = _temp[1];                
            });
        return _urlVars;
    }

    function tableClicker(_btnInfo) {       
        let _vars = getURLVars();
        let _targetUrl = '';
        let _btn = _btnInfo.innerHTML.trim();

        if (curPage === 'rooms') {
            _targetUrl += `room=${_btn}`;
        }else if (curPage === 'logs') {
            _targetUrl += `room=${_vars.room}&log=${_btn}`;
        } 

        location.href = `/?${_targetUrl}`;

    };

    function loadTable(_id, _title, _dataArray) {
        let _table = document.getElementById(_id);
        let _html = `<tr><th><u>${_title}</u></th></tr>`;

        _dataArray.forEach(_element => {
            _html += `<tr><td><button class="tableButton" onClick="tableClicker(this)"> ${_element} </button></td></tr>`;
        });
        _table.innerHTML = _html;
    } 

</script>

<body>
    <table id="main-table">
        <script>
            let response = JSON.parse('<?php echo $data ?>');
            if (response.rooms){
                loadTable('main-table', 'Räume', response.rooms); 
            }else if (response.logs) {
                // TODO: Rename logs to readable times
                loadTable('main-table', 'Logs', response.logs);
                curPage = 'logs';
            }else if (response.log) {
                curPage = 'log';
                setData(response.log);
            };
            
        </script>        
    </table>
    <div id="chart_div" style="width: 100%; height: 500px;"></div>
</body>
</html>