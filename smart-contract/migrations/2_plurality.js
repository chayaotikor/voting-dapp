const Plurality = artifacts.require("Plurality");

module.exports = function (deployer) {
  deployer.deploy(Plurality, 5);
};
