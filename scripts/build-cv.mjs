// Gera public/cv-patrick-amaral.pdf a partir de cv/cv.html usando o Chrome headless.
// Uso: npm run cv [-- saida.pdf]   (caminho do Chrome sobrescrevivel com a variavel CHROME_PATH)
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
].filter(Boolean);

const chrome = candidates.find((path) => existsSync(path));
if (!chrome) {
    console.error("Chrome nao encontrado. Defina CHROME_PATH com o caminho do executavel.");
    process.exit(1);
}

const source = pathToFileURL(resolve("cv/cv.html")).href;
// Saida opcional como argumento, pra gerar uma previa sem sobrescrever o PDF do site.
const output = resolve(process.argv[2] ?? "public/cv-patrick-amaral.pdf");
// Perfil temporario pra nao conflitar com um Chrome ja aberto.
const profile = mkdtempSync(join(tmpdir(), "cv-chrome-"));

try {
    execFileSync(chrome, [
        "--headless=new",
        "--disable-gpu",
        `--user-data-dir=${profile}`,
        "--no-pdf-header-footer",
        // Tempo pra fonte do Google Fonts carregar antes da impressao.
        "--virtual-time-budget=10000",
        `--print-to-pdf=${output}`,
        source,
    ], { stdio: "inherit" });
} finally {
    rmSync(profile, { recursive: true, force: true });
}

console.log(`PDF gerado em ${output}`);
