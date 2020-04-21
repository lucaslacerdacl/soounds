import * as nconf from "nconf";
import * as path from "path";

const configs = new nconf.Provider({
  env: true,
  argv: true,
  store: {
    type: "file",
    file: path.join(__dirname, `./config.json`)
  }
});

const getToken = () => {
  const token = configs.get("token");
  return token;
};

export default getToken;
