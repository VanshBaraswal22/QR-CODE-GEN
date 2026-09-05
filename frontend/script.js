$(document).ready(function () {

    $("#qrForm").on("submit", function (event) {

        event.preventDefault();

        let url = $("#url").val().trim();

        if (url === "") {
            alert("Please enter a URL.");
            return;
        }


        // Add https:// if the user doesn't enter it

        if (!/^https?:\/\//i.test(url)) {
            url = "https://" + url;
        }


        // Remove previous QR code

        $("#qrcode").empty();


        // Generate QR code

        new QRCode(document.getElementById("qrcode"), {

            text: url,

            width: 220,

            height: 220,

            colorDark: "#111111",

            colorLight: "#ffffff",

            correctLevel: QRCode.CorrectLevel.H

        });


        // Show the URL below the QR code

        $("#urlPreview").text(url);


        // Show download button

        $("#downloadBtn").show();

    });


    // Download QR code

    $("#downloadBtn").on("click", function () {

        let canvas = $("#qrcode canvas")[0];

        let image = $("#qrcode img")[0];


        if (canvas) {

            let link = document.createElement("a");

            link.download = "qr-code.png";

            link.href = canvas.toDataURL("image/png");

            link.click();

        }

        else if (image) {

            let link = document.createElement("a");

            link.download = "qr-code.png";

            link.href = image.src;

            link.click();

        }

    });

});