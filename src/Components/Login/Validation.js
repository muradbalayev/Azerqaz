    const Validation = (values) => {
        let errors = {}

        if(!values.name) {
            errors.name = "Maili daxil edin"
        }
        

        if(!values.password) {
            errors.password = "Parolu daxil edin"
        }

        else if (values.password.length < 8 || values.password.length > 16)  {
            errors.password = "Parol minimum 8, maksimum 16 simvoldan ibarət olmalıdır!"
        }
        
        else if (!/(?=.*[@$!%*?&\.\+\*\{\]\{\[\-,;`<>':"=^#_|\/\\])/.test(values.password)){
            errors.password = "Parolda ən az 1 xüsusi simvol olmalıdır!"
        }
        
        else if (!/(?=.*\d)/.test(values.password)) {
            errors.password = "Parolun tərkibində ən az 1 rəqəm olmalıdır.";
        }

        else if (!/[a-z]/.test(values.password) || !/[A-Z]/.test(values.password)) {
            errors.password = "Ən az 1 kiçik və 1 böyük hərf olmalıdır!";
        }

        return errors;
    }



export default Validation