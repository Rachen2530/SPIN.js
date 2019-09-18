class SPIN {
    
    constructor(input)
    {
        if (input)
        {
            this.set(input);
        }
    }
    
    /**
     * Set input data.
     * 
     * @param {String} input
     */
    set(input)
    {
        // Check if input ID is malformed
        if (!/^([0-9]{6}|[0-9]{8})[\-\+ ]{0,1}[0-9]{4}$/.test(input))
        {
            console.error("Identity number must contain 10 or 12 digits, allowed characters are 0-9, '+' and '-'.");
            return;
        }
        this.input = input;
        
        // Set current date
        let date = new Date();
        this.nowY = date.getFullYear();
        this.nowM = date.getMonth() + 1;
        this.nowD = date.getDate();
        
        // Make ID numeric
        this.num = this.input.replace(/\D/g, "");
        if (this.num.length === 10)
        {
            this.addCentury();
        }
        
        // Warn if ID is invalid
        if (!this.valid())
        {
            console.warn(this.input + " is not a valid identity number");
        }
    }
    
    /**
     * Prefixes a year in case a 10 digit ID number is being used. The function
     * is considering if the '+' maker between birth date and birth number is 
     * being used.
     */
    addCentury()
    {
        let cent = parseInt(this.nowY.toString().substr(0, 2), 10),
            year = parseInt(this.nowY.toString().substr(2, 2), 10),
            inpY = parseInt(this.num.substr(0, 2), 10),
            inpM = parseInt(this.num.substr(2, 2), 10),
            inpD = parseInt(this.num.substr(4, 2), 10),
            pfix = cent - 
                   (((inpY === year && inpM >= this.nowM) && inpD > this.nowD) || inpY > year ? 1 : 0) - 
                   (this.input.substr(-5, 1) === '+' ? 1 : 0);
        
        this.num = (pfix < 10 ? '0' : '') + pfix + this.num;
    }
    
    /**
     * Return full length ID (12 digits)
     * 
     * @returns {Boolean|String} Full length ID (YYYYMMDDXXXX) or FALSE if ID is invalid.
     */
    id()
    {
        return this.valid() ? this.num : false;
    }
    
    /**
     * Return gender
     * 
     * @returns {Boolean|String} Gender ("MALE" or "FEMALE") or FALSE if ID is invalid.
     */
    gender()
    {
        return this.valid() ? (this.num.substr(-2, 1) % 2 === 0 ? 'FEMALE' : 'MALE') : false;
    }
    
    /**
     * Return age based on birth date and current date.
     * 
     * @returns {Boolean|Number} The age or FALSE if ID is invalid.
     */
    age()
    {
        let y = parseInt(this.num.substr(0, 4), 10),
            m = parseInt(this.num.substr(4, 2), 10),
            d = parseInt(this.num.substr(6, 2), 10);
            d -= d >= 61 ? 60 : 0;
        let a = this.nowY === y && m <= this.nowM && d <= this.nowD ? 0 :
                this.nowY === y ? -1 :
                y > this.nowY ? this.nowY - y :
                this.nowY - y - (
                   this.nowY >= y && m >= this.nowM && d > this.nowD ? 1 : 0
                );
        
        return this.valid() ? a : false;
    }
    
    /**
     * Return type of ID.
     * 
     * @returns {Boolean|String} Type of ID; "SAN" (samordningsnummer) or "PEN" (personnummer). If ID is invalid, FALSE will be returned.
     */
    type()
    {
        return !this.valid() ? false : parseInt(this.num.substr(6, 2), 10) >= 61 ? 'SAN' : 'PEN';
    }
    
    /**
     * Checks if a 'personnummer' or 'samordningsnummer' is valid, considering 
     * birth date and checksum digit. For birth dates, the actual date (and leap 
     * year/days) is validated.
     * 
     * @returns {Boolean} Returns TRUE if ID is valid, otherwise FALSE.
     */
    valid()
    {
        if(!/^([0-9]{4}((0[13578]|1[02])([06][1-9]|[1278][0-9]|[39][0-1])|(0[469]|11)([06][1-9]|[1278][0-9]|[39]0)|02([06][1-9]|[17][0-9]|[28][0-8]))|([0-9]{2}([02468][48]|[13579][26]|[2468]0)|([02468][048]|[13579][26])00)02[28]9)([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]|[0-9][1-9][0-9]{2}|[1-9][0-9]{3})$/.test(this.num))
        {
            return false;
        }

        let number = this.num.substr(-10), 
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
        
        return sum && sum % 10 === 0;
    }
}
