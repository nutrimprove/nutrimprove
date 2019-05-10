module.exports.response = (res, error, output) => {
   const result = {
      timestamp: new Date(),
      statusCode: 200
   };

   if (typeof output === "string") {
      result.message = output;
   } else {
      result.message = 'Request successful';
      result.value = output;
   }

   if(!error) {
      if (output.length === 0) {
         result.statusCode = 404;
         result.message = 'Request returned no values';
      } else {
         result.statusCode = 200;
      }
   } else if(error && error.code) {
      switch (error.code) {
         case 'ER_ACCESS_DENIED_ERROR':
            result.statusCode = 401;
            break;
         case 'ENOTFOUND':
            result.statusCode = 404;
      }
      console.log(error);
   } else if (Number.isInteger(error)) {
      result.statusCode = error;
      console.log(`Error code: ${error}`);
   }

   res.status(result.statusCode).json(result);
};
