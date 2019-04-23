module.exports.response = (res, error, output) => {
    let errorCode = 400;
    if(!error) {
        errorCode = 200;
        console.log('Database connection successful');
    } else if(error.code) {
        switch(error.code) {
            case 'ER_ACCESS_DENIED_ERROR':
                errorCode = 401;
                break;
            case 'ENOTFOUND':
                errorCode = 404;
        }
        console.log(error);
    } else if (Number.isInteger(error)) {
        errorCode = error;
        console.log(`Error code: ${error}`);
    }

    const result = {
        timestamp: new Date(),
        code: errorCode,
    };

    if (typeof output === "string") {
        result.message = output;
    } else {
        result.message = 'Request successful';
        result.value = output;
    }

    res.status(errorCode).json(result);
};
