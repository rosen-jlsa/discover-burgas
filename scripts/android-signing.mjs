import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import {randomBytes,X509Certificate} from "node:crypto";
import {execFileSync} from "node:child_process";
const root=path.join(process.env.LOCALAPPDATA||path.join(os.homedir(),".local","share"),"DiscoverBurgasBuild","signing");
await fs.mkdir(root,{recursive:true,mode:0o700});
const configFile=path.join(root,"release.json");
let config;
try{config=JSON.parse(await fs.readFile(configFile,"utf8"));}catch(error){if(error.code!=="ENOENT")throw error;}
const keytool=process.env.JAVA_HOME?path.join(process.env.JAVA_HOME,"bin",process.platform==="win32"?"keytool.exe":"keytool"):"keytool";
if(!config){
 const password=randomBytes(32).toString("base64url");
 config={keystore:path.join(root,"release.keystore"),alias:"discover-burgas",password};
 // Never overwrite or rotate an existing key implicitly.
 try{await fs.access(config.keystore);throw new Error("Existing keystore has no config; restore its password instead of regenerating it.");}catch(error){if(error.code!=="ENOENT")throw error;}
 execFileSync(keytool,["-genkeypair","-keystore",config.keystore,"-storetype","PKCS12","-alias",config.alias,"-keyalg","RSA","-keysize","3072","-validity","10000","-dname","CN=Discover Burgas, O=Discover Burgas, C=BG","-storepass:env","DISCOVER_SIGNING_PASSWORD","-keypass:env","DISCOVER_SIGNING_PASSWORD"],{env:{...process.env,DISCOVER_SIGNING_PASSWORD:password},stdio:"pipe"});
 await fs.writeFile(configFile,JSON.stringify(config),{mode:0o600,flag:"wx"});
}
const pem=execFileSync(keytool,["-exportcert","-rfc","-keystore",config.keystore,"-alias",config.alias,"-storepass:env","DISCOVER_SIGNING_PASSWORD"],{env:{...process.env,DISCOVER_SIGNING_PASSWORD:config.password},encoding:"utf8"});
const fingerprint=new X509Certificate(pem).fingerprint256;
await fs.writeFile("platforms/android/signing-certificate.json",JSON.stringify({packageName:"com.discoverburgas.guide",sha256Fingerprints:[fingerprint]},null,2)+"\n");
console.log(`Signing key retained outside Git: ${root}\nPublic SHA-256 certificate: ${fingerprint}\nBack up the keystore AND release.json securely; they are required for future APK updates.`);
