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
  getAllCommentPost: '/post/getAllPerentComment',
  addCommentInPost: '/post/comment',
  updatedComment: '/post/updatedComment',
  deleteComment: '/post/deleteComment',

  //!User Profile Route
  profileUpdate: '/auth/profileUpdate',
  findOneProfile: '/auth/findOneProfile',

  //!connection\
  findAllFriend: '/connection/getAllFriend',
  findFriend: '/connection/getFriend',
  getAllSentRequests: '/connection/getAllSentRequest',
  getAllPendingrequest: '/connection/pendingRequest',
  acceptRequest: '/connection/acceptRequest',
  declineRequest: '/connection/declineRequest',
  sendRequest: '/connection/sendRequest',
  checkRelationShipStatus: '/connection/checkRelationShip',

  //! conversation
  setConversation: '/conversation/set',
  getConversation: '/conversation/get',
  getMessage: '/message/get',
  sendMessage: '/message/send',
}
export default routeUrl
