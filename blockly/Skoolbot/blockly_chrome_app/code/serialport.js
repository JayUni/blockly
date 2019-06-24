$(document).ready(function() {

    var connectionId;
    var expectedConnectionId;
    // implement the sleep function in javascript
    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }


    // Listing available serial ports
    var onGetDevices = function(ports) {
        for (var i = 0; i < ports.length; i++) {
            $('select#portPath').append('<option value="' + ports[i].path + '">' + ports[i].path + '</option>');
        }
    };

    chrome.serial.getDevices(onGetDevices);

    $('button#connect').click(function() {
        console.log('clicked');
        var clicks = $(this).data('clicks');
        console.log(clicks);
        if (!clicks) {
            var port = $('select#portPath').val();
            console.log(port);
            chrome.serial.connect(port, {bitrate: 9600}, function(info) {
                connectionId = info.connectionId;
                expectedConnectionId = info.connectionId;
                $("button#connect").html("disconnect");
                $("button#send").removeClass("btn-primary").addClass("btn-success");
                console.log('Connection opened with id: ' + connectionId + ', Bitrate: ' + info.bitrate);
            });
        } else {
            chrome.serial.disconnect(connectionId, function(result) {
                $("button#connect").html("connect");
                $("button#send").removeClass("btn-success").addClass("danger");
                console.log('Connection with id: ' + connectionId + ' closed');
            });
        }

        $(this).data("clicks", !clicks);
    });

    var stringReceived = '';

    convertArrayBufferToString = function(buf) {
        var bufView = new Uint8Array(buf);
        var encodedString = String.fromCharCode.apply(null, bufView);
        return decodeURIComponent(escape(encodedString));
    };

    var onLineReceived = function(stringReceived){
        $('textarea#output').html($('textarea#output').val() + stringReceived);
    }

    var onReceiveCallback = function(info) {
        if (info.connectionId == expectedConnectionId && info.data) {
            var str = convertArrayBufferToString(info.data);
            if (str.charAt(str.length-1) === '\n') {
                stringReceived += str.substring(0, str.length-1);
                onLineReceived(stringReceived);
                stringReceived = '';
            } else {
                stringReceived += str;
            }
        }

    };

    chrome.serial.onReceive.addListener(onReceiveCallback);

    $('button#send').click(function() {
        $('textarea#output').html('');
        var str = $('input#input').val();

        // init the chunk array to save the chunks
        var string_chunk = [];
        var input_str = str;
        console.log(input_str);
        var i = 0;
        while (input_str.length != 0){
            if (i == 0){
                string_chunk[i] = input_str.substring(0, 12);
                input_str = input_str.substring(12, input_str.length);
            }
            else{
                if(input_str.length > 20){
                    string_chunk[i] = input_str.substring(0, 20);
                    input_str = input_str.substring(20, input_str.length);
                }
                else{
                    string_chunk[i] = input_str;
                    input_str = '';
                }
            }
            i += 1;
        }
        console.log(string_chunk);

        // Sending data to a serial port
        var writeSerial = function(str) {
            chrome.serial.send(connectionId, convertStringToArrayBuffer(str), function(str){
                console.log(str);
            });
        };

        // Convert string to ArrayBuffer
        var convertStringToArrayBuffer = function(str) {
            var buf=new ArrayBuffer(str.length);
            var bufView=new Uint8Array(buf);
            for (var i=0; i<str.length; i++) {
                bufView[i]=str.charCodeAt(i);
            }
            return buf;
        };

        // send the chunk one by one
        for (var j in string_chunk){
            var chunk = string_chunk[j];
            writeSerial(chunk);
            sleep(50);
        }
    });
});
