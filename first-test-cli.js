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

const writeFiles = (name, withDir = false) => {
  try {
    const paths = [
      { path: "/src/app/service/def/", id: "serviceDef" },
      { path: "/src/app/service/meta/", id: "serviceMeta" },
      { path: "/src/app/repository/def/", id: "repositoryDef" },
      { path: "/src/app/repository/meta/", id: "repositoryMeta" },
      { path: "/src/app/repository/proxy/", id: "repositoryProxy" },
      { path: "/src/app/domain/def/", id: "domainDef" },
      { path: "/src/app/domain/meta/", id: "domainMeta" },
    ];
    const kebabName = camelToKebab(name);
    if (withDir) {
      paths.forEach(({ path: basePath }, index) => {
        const filePath = path.join(process.cwd(), basePath, kebabName);
        fs.mkdirSync(filePath);
        paths[index].path += `${kebabName}/`;
      });
    }
    const fileContents = {
      serviceDef: createServiceDef(name),
      serviceMeta: createServiceMeta(name),
      repositoryDef: createRepositoryDef(name),
      repositoryMeta: createRepositoryMeta(name),
      repositoryProxy: createRepositoryProxy(name),
      domainDef: createDomainDef(name),
      domainMeta: createDomainMeta(name),
    };
    paths.forEach(({ path: basePath, id }) => {
      const fileName =
        id.includes("service") || id.includes("repository")
          ? id.includes("meta")
            ? `i-${kebabName}-${id.replace("Meta", "").toLowerCase()}.ts`
            : `${kebabName}-${id.toLowerCase()}.ts`
          : `i-${kebabName}.ts`;

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
    // const hasProxyFile = fs.existsSync(`${rootPath}/proxy.ts`);
    // !hasProxyFile && fs.mkdirSync(`${rootPath}/proxy.ts`);
    const hasServiceFile = fs.existsSync(`${rootPath}/service.ts`);
    !hasServiceFile && fs.mkdirSync(`${rootPath}/service.ts`);

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
    rl.close(1);

    console.log(err);
  }
});

rl.on("close", () => {
  console.info("CLI terminated.");
  process.exit(0);
});

rl.on("pause", () => {
  console.info("files generating..");
});
