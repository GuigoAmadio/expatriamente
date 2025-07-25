// test-bcrypt.js
const bcrypt = require("bcrypt");

// Substitua pelo hash que você tem no banco
const hash = "$2b$10$wKuksZcegAyrVESxc7RH/.Vgk9JHZ/ZpbNUycmrNeMCpIVPHxrCgy";
// Substitua pela senha que você quer testar
const passwordToTest = "admin123";

bcrypt.compare(passwordToTest, hash, function (err, result) {
  if (err) {
    console.error("Erro ao comparar:", err);
    process.exit(1);
  }
  if (result) {
    console.log("Senha confere!");
  } else {
    console.log("Senha incorreta.");
  }
  process.exit(0);
});
