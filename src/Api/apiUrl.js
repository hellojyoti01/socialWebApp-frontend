const routeUrl = {
  //!Auth Route
  register: '/auth/signUp',
  socialSign: '/auth/social',
  logIn: '/auth/signIn',
  sendOTP: '/auth/sendOTP',
  verifyOTP: '/auth/verifyOTP',
  resetPassword: '/auth/resetPassword',
  WhoAmI: '/auth/WhoAmI',

  //! Post Route
  findAllPostSingleUser: '/post/findAllPostSingleUser',
  createPost: '/post/create',
  updatePost: '/post/update',
  deletePost: '/post/delete',
  findAllFriend: '/connection/getFriend',

  //!User Profile Route
  profileUpdate: '/auth/profileUpdate',
  findOneProfile: '/auth/findOneProfile',
}
export default routeUrl
