export default {
  Auth: {
    region: "ap-south-1",
    userPoolId: "ap-south-1_hbEucu3hD",
    userPoolWebClientId: "i3bsd38i8041173s8o5nf96l1",
    oauth: {
      domain: "dev-hackathon-chat.auth.ap-south-1.amazoncognito.com",
      scope: [
        "phone",
        "email",
        "profile",
        "openid",
        "aws.cognito.signin.user.admin",
      ],
      redirectSignIn: "http://localhost:8080/",
      redirectSignOut: "http://localhost:8080/",
      responseType: "code",
    },
  },
};
