let APIURL = "";

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    APIURL = "http://localhost:3000";
    break;
  case "jnt-gameboard-client.herokuapp.com":
    APIURL = "https://jnt-gameboard-server.herokuapp.com";
    break;
}

export default APIURL;
