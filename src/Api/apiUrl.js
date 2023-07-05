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
  findAllPostFeed: '/post/findAllPostFeed',
  likeAPost: '/post/like',
  findAllLikeSinglePost: '/post/findAlllike',
  CheckCurrentUserLike: '/post/checkCurrentLike',
  FindAllLikePost: '/post/findAlllike',
  getAllCommentPost: '/post/getAllComment',
  addCommentInPost: '/post/comment',

  findAllFriend: '/connection/getFriend',

  //!User Profile Route
  profileUpdate: '/auth/profileUpdate',
  findOneProfile: '/auth/findOneProfile',

  //!connection\
  getAllPendingrequest: '/connection/pendingRequest',
  acceptRequest: '/connection/acceptRequest',
  sendRequest: '/connection/sendRequest',
  checkRelationShipStatus: '/connection/checkRelationShip',

  //! conversation
  setConversation: '/conversation/set',
  getConversation: '/conversation/get',
  getMessage: '/message/get',
  sendMessage: '/message/send',
}
export default routeUrl
