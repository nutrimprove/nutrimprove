const extractUser = details => {
  if (!details.user_details) {
    return null;
  }

  return {
    email: details.user_details.email,
    picture: details.user_details.picture,
    exp: details.user_details.exp,
  };
};

export default extractUser;
