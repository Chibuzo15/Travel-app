const print = () => {
    console.log("print clicked")
    const trip = document.querySelector('#entryHolder').innerHTML

    const myWindow = window.open('', '', 'height=500, width=500');
    myWindow.document.write('<html>');
    myWindow.document.write('<body> <h1>Your trip<br>');
    myWindow.document.write(trip);
    myWindow.document.write('</body></html>');
    myWindow.document.close();
    myWindow.onload = function () { // necessary if the div contain images

        myWindow.focus(); // necessary for IE >= 10
        myWindow.print();
        myWindow.close();
    };
}

export { print };