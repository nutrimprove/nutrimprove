const extractUser = userDetails => {
  if (!userDetails) {
    return null;
  }

  return {
    email: userDetails.email,
    picture: userDetails.picture,
    exp: userDetails.exp,
  };
};

export default extractUser;
