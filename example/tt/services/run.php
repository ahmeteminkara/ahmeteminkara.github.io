<?php
header('Content-Type: application/json');



if ($_REQUEST) {
    
    switch ($_REQUEST['m']) {
        case 'getList':
      
            getList();

            break;
        case 'listProcess':
      
            listProcess();

            break;
        
        default:
            break;
    }

}
function getList()
{
    $url = "https://aping.bilyoner.com/sto/programs/active";

    $content = file_get_contents($url);

    $json = json_decode($content);

    $list = $json->gameCycleEntityModel->eventVOs;
    
    $array = array();

    foreach ($list as $value) {
        array_push($array,$value->eventDescription);
    }


    success($array);
}


function listProcess()
{
    
    for ($i=0; $i < 15; $i++) { 
        $_REQUEST["surpriz"];
    }


}


function success($data)
{
    echo json_encode(array(
        "success"=>true,
        "data"=>$data,
    ));
}
