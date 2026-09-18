// Mostra 3 formas de acessar o projeto rodando localmente:
// 1) Localhost (no próprio computador)
// 2) Endereço de rede (IP local, para acessar de outro dispositivo na mesma Wi-Fi)
// 3) QR Code do endereço de rede (para escanear com o celular)
//
// Uso: node scripts/mostrar-acesso.js
// (ou junto com o "npm run dev", veja o package.json)

const os = require("os");
const qrcode = require("qrcode-terminal");

const PORT = process.env.PORT || 3000;

function pegarIpLocal() {
  const interfaces = os.networkInterfaces();
  for (const nome of Object.keys(interfaces)) {
    for (const rede of interfaces[nome]) {
      // Ignora endereços internos (127.0.0.1) e IPv6
      if (rede.family === "IPv4" && !rede.internal) {
        return rede.address;
      }
    }
  }
  return null;
}

function aguardarServidor(porta, tentativas = 30) {
  const net = require("net");
  return new Promise((resolve) => {
    const tentar = (restantes) => {
      const socket = net.createConnection(porta, "127.0.0.1");
      socket.once("connect", () => {
        socket.destroy();
        resolve(true);
      });
      socket.once("error", () => {
        socket.destroy();
        if (restantes <= 0) return resolve(false);
        setTimeout(() => tentar(restantes - 1), 500);
      });
    };
    tentar(tentativas);
  });
}

(async () => {
  await aguardarServidor(PORT);

  const ipLocal = pegarIpLocal();
  const urlLocalhost = `http://localhost:${PORT}`;
  const urlRede = ipLocal ? `http://${ipLocal}:${PORT}` : null;

  console.log("");
  console.log("========================================");
  console.log(" GestorX rodando! Escolha como acessar:");
  console.log("========================================");
  console.log("");
  console.log(`1) Local (neste computador):`);
  console.log(`   ${urlLocalhost}`);
  console.log("");

  if (urlRede) {
    console.log(`2) Rede (outro dispositivo na mesma Wi-Fi):`);
    console.log(`   ${urlRede}`);
    console.log("");
    console.log(`3) QR Code (aponte a câmera do celular):`);
    console.log("");
    qrcode.generate(urlRede, { small: true });
  } else {
    console.log("2) Rede: não foi possível detectar um IP local nesta máquina.");
  }

  console.log("========================================");
  console.log("");
})();
