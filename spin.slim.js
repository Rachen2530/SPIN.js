function SPIN(input)
{
    // Check if input ID is malformed
    if (!/^([0-9]{6}|[0-9]{8})[\-\+ ]{0,1}[0-9]{4}$/.test(input))
    {
        return false;
    }   

    // Make ID numeric
    var num = input.replace(/\D/g, "");

    // Add century if needed
    if (num.length === 10)
    {
        var d = new Date(),
        nowM = d.getMonth() + 1,
        nowD = d.getDate(),
        cent = parseInt(d.getFullYear().toString().substr(0, 2), 10),
        year = parseInt(d.getFullYear().toString().substr(2, 2), 10),
        inpY = parseInt(num.substr(0, 2), 10),
        inpM = parseInt(num.substr(2, 2), 10),
        inpD = parseInt(num.substr(4, 2), 10),
        pfix = cent - 
               (((inpY === year && inpM >= nowM) && inpD > nowD) || inpY > year ? 1 : 0) - 
               (input.substr(-5, 1) === '+' ? 1 : 0);

        num = (pfix < 10 ? '0' : '') + pfix + num;
    }

    // Check if 12 digit numeric ID is valid
    if(!/^([0-9]{4}((0[13578]|1[02])([06][1-9]|[1278][0-9]|[39][0-1])|(0[469]|11)([06][1-9]|[1278][0-9]|[39]0)|02([06][1-9]|[17][0-9]|[28][0-8]))|([0-9]{2}([02468][48]|[13579][26]|[2468]0)|([02468][048]|[13579][26])00)02[28]9)(00[1-9]|0[1-9][0-9]|[1-9][0-9]{2})[0-9]$/.test(num))
    {
        return false;
    }

    // Calculate and validate checksum digit
    var number = num.substr(-10), 
        weights = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9],
        length = 10, 
        bit = 1, 
        sum = 0, 
        digit;

    while (length)
    {
        digit = parseInt(number.charAt(--length), 10);
        sum += (bit ^= 1) ? weights[digit] : digit;
    }
    
    // Return result
    return sum && sum % 10 === 0 ? num : false;
}
