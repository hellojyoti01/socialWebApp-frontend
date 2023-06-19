const routeUrl = {
  //!Auth Route
  register: '/auth/signUp',
  socialSign: '/auth/social',
  logIn: '/auth/signIn',
  sendOTP: '/auth/sendOTP',
  verifyOTP: '/auth/verifyOTP',
  resetPassword: '/auth/resetPassword',
  WhoAmI: '/auth/WhoAmI',
  findUser: '/auth/findUser',

  //! Post Route
  findAllPostSingleUser: '/post/findAllPostSingleUser',
  createPost: '/post/create',
  updatePost: '/post/update',
  deletePost: '/post/delete',
  findAllFriend: '/connection/getFriend',

  //!User Profile Route
  profileUpdate: '/auth/profileUpdate',
  findOneProfile: '/auth/findOneProfile',

  //!connection\
  getAllPendingrequest: '/connection/pendingRequest',
  acceptRequest: '/connection/acceptRequest',
  sendRequest: '/connection/sendRequest',
}
export default routeUrl
