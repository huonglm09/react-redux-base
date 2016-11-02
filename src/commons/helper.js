class Helper {
    convertObjectFormData(obj) {
        var formData = new FormData();

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                formData.append(key, obj[key]);
            }

        }

        return formData
    }
}

export default new Helper();
