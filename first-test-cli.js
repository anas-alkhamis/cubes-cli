const {
  camelToKebab,
  camelToPascal,
  createDomainMeta,
  createRepositoryDef,
  createRepositoryMeta,
  createRepositoryProxy,
  createServiceDef,
  createServiceMeta,
  createDomainDef,
  createServiceFile,
  createProxyFile,
  askYesNo,
} = require("./content");
const platform = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux",
};

console.info(
  `Node.js version: ${process.version} Running on: ${
    platform[process.platform]
  }  Current working directory: ${process.cwd()}`
);

const readline = require("readline");
const fs = require("fs");
const path = require("path");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const COLORS = {
  reset: "\x1b[0m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
};
const note = `${COLORS.yellow}(Use camelCase format, e.g., myProxyName)${COLORS.reset}`;
rl.setPrompt(`${COLORS.cyan}Enter file name: ${note} ${COLORS.reset}`);

rl.prompt();

const paths = [
  { path: "/src/app/service/def/", id: "serviceDef" },
  { path: "/src/app/service/meta/", id: "serviceMeta" },
  { path: "/src/app/repository/def/", id: "repositoryDef" },
  { path: "/src/app/repository/meta/", id: "repositoryMeta" },
  { path: "/src/app/repository/proxy/", id: "repositoryProxy" },
  { path: "/src/app/domain/def/", id: "domainDef" },
  { path: "/src/app/domain/meta/", id: "domainMeta" },
];

const writeFiles = (name, withDir = false) => {
  try {
    const kebabName = camelToKebab(name);
    if (withDir) {
      paths.forEach(({ path: basePath }, index) => {
        const filePath = path.join(process.cwd(), basePath, kebabName);
        fs.mkdirSync(filePath);
        paths[index].path += `${kebabName}/`;
      });
    }
    const fileContents = {
      serviceDef: createServiceDef(name, paths),
      serviceMeta: createServiceMeta(name, paths),
      repositoryDef: createRepositoryDef(name, paths),
      repositoryMeta: createRepositoryMeta(name, paths),
      repositoryProxy: createRepositoryProxy(name, paths),
      domainDef: createDomainDef(name, paths),
      domainMeta: createDomainMeta(name),
    };
    paths.forEach(({ path: basePath, id }) => {
      let fileName;

      if (id.includes("repository")) {
        if (id.includes("Meta")) {
          fileName = `i-${kebabName}-repository.ts`;
        } else if (id.includes("Def")) {
          fileName = `${kebabName}-repository.ts`;
        } else {
          fileName = `${kebabName}-proxy.ts`;
        }
      } else if (id.includes("domain")) {
        if (id.includes("Def")) {
          fileName = `${kebabName}.ts`;
        } else {
          fileName = `i-${kebabName}.ts`;
        }
      } else {
        if (id.includes("Def")) {
          fileName = `${kebabName}-service.ts`;
        } else {
          fileName = `i-${kebabName}-service.ts`;
        }
      }
      const filePath = path.join(process.cwd(), basePath, fileName);
      fs.writeFileSync(filePath, fileContents[id]);
    });

    console.log("Files successfully created!");
  } catch (error) {
    console.error("Error writing files:", error);
  }
};

rl.on("line", async (input) => {
  const withDir = await askYesNo(rl, "new directory");

  rl.pause();
  try {
    const rootPath = path.join(process.cwd(), "src");
    const hasSrcDir = fs.existsSync(`${rootPath}`);
    !hasSrcDir && fs.mkdirSync(`${rootPath}`);
    const hasAppDir = fs.existsSync(`${rootPath}/app`);
    !hasAppDir && fs.mkdirSync(`${rootPath}/app`);
    //------------------proxy.ts File --------------------//
    const hasProxyFile = fs.existsSync(`${rootPath}/proxy.ts`);
    !hasProxyFile &&
      fs.writeFileSync(`${rootPath}/proxy.ts`, createProxyFile());

    const importText = `import { ${input} } from '${
      paths[4].path
    }${camelToKebab(input)}.proxy'\n`;
    let updatedProxyFileContent = fs.readFileSync(
      `${rootPath}/proxy.ts`,
      "utf8"
    );

    updatedProxyFileContent = updatedProxyFileContent.replace(
      /(const\s+clientMaps\s*=\s*\{)([\s\S]*?)(\s*\})/,
      (match, start, content, end) => {
        return `${start}\n  ${input},\n${content.trim()}\n${end}`;
      }
    );

    fs.writeFileSync(
      `${rootPath}/proxy.ts`,
      importText + updatedProxyFileContent,
      "utf8"
    );

    //------------------ ./proxy.ts File --------------------//

    //------------------Service.ts File------------------------
    const hasServiceFile = fs.existsSync(`${rootPath}/service.ts`);
    !hasServiceFile &&
      fs.writeFileSync(`${rootPath}/service.ts`, createServiceFile());

    const newRepository = `${camelToPascal(
      input
    )}Repository: { key: "${camelToPascal(input)}Repository", config: {} },`;

    const newService = `${camelToPascal(input)}Service: { key: "${camelToPascal(
      input
    )}Service", config: {} },`;

    let updatedServiceFileContent = fs.readFileSync(
      `${rootPath}/service.ts`,
      "utf8"
    );

    // Update repositoryMap
    updatedServiceFileContent = updatedServiceFileContent.replace(
      /(const\s+repositoryMap\s*=\s*\{)([\s\S]*?)(\s*\})/,
      (match, start, content, end) => {
        return `${start}\n  ${newRepository}\n${content.trim()}\n${end}`;
      }
    );

    // Update serviceMap
    updatedServiceFileContent = updatedServiceFileContent.replace(
      /(const\s+serviceMap\s*=\s*\{)([\s\S]*?)(\s*\})/,
      (match, start, content, end) => {
        return `${start}\n  ${newService}\n${content.trim()}\n${end}`;
      }
    );

    // Write the updated content back to the file
    fs.writeFileSync(
      `${rootPath}/service.ts`,
      updatedServiceFileContent,
      "utf8"
    );

    //------------------./ Service.ts File------------------------

    // check domain
    const hasDomainDir = fs.existsSync(`${rootPath}/app/domain`);
    !hasDomainDir && fs.mkdirSync(`${rootPath}/app/domain`);
    const hasDomainDefDir = fs.existsSync(`${rootPath}/app/domain/def`);
    !hasDomainDefDir && fs.mkdirSync(`${rootPath}/app/domain/def`);
    const hasDomainMetaDir = fs.existsSync(`${rootPath}/app/domain/meta`);
    !hasDomainMetaDir && fs.mkdirSync(`${rootPath}/app/domain/meta`);

    // check service
    const hasServiceDir = fs.existsSync(`${rootPath}/app/service`);
    !hasServiceDir && fs.mkdirSync(`${rootPath}/app/service`);
    const hasServiceDefDir = fs.existsSync(`${rootPath}/app/service/def`);
    !hasServiceDefDir && fs.mkdirSync(`${rootPath}/app/service/def`);

    const hasServiceMetaDir = fs.existsSync(`${rootPath}/app/service/meta`);
    !hasServiceMetaDir && fs.mkdirSync(`${rootPath}/app/service/meta`);

    // check repository
    const hasRepositoryDir = fs.existsSync(`${rootPath}/app/repository`);
    !hasRepositoryDir && fs.mkdirSync(`${rootPath}/app/repository`);

    const hasRepositoryDefDir = fs.existsSync(`${rootPath}/app/repository/def`);
    !hasRepositoryDefDir && fs.mkdirSync(`${rootPath}/app/repository/def`);

    const hasRepositoryMetaDir = fs.existsSync(
      `${rootPath}/app/repository/meta`
    );
    !hasRepositoryMetaDir && fs.mkdirSync(`${rootPath}/app/repository/meta`);

    const hasRepositoryProxyDir = fs.existsSync(
      `${rootPath}/app/repository/proxy`
    );
    !hasRepositoryProxyDir && fs.mkdirSync(`${rootPath}/app/repository/proxy`);

    writeFiles(input, withDir);
    rl.close(0);
  } catch (err) {
    console.log(err);
    rl.close(1);
  }
});

rl.on("close", () => {
  console.info("CLI terminated.");
  process.exit(0);
});

rl.on("pause", () => {
  console.info("files generating..");
});
