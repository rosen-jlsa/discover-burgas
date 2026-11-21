import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import {spawnSync} from "node:child_process";
import {createHash} from "node:crypto";
const env={...process.env};
if(!env.ANDROID_KEYSTORE_FILE){
 const root=path.join(env.LOCALAPPDATA||path.join(os.homedir(),".local","share"),"DiscoverBurgasBuild","signing","release.json");
 const config=JSON.parse(await fs.readFile(root,"utf8").catch(()=>{throw new Error("Initialize signing with npm run android:signing, or configure ANDROID_KEYSTORE_* environment values.");}));
 env.ANDROID_KEYSTORE_FILE=config.keystore;env.ANDROID_KEYSTORE_PASSWORD=config.password;env.ANDROID_KEY_ALIAS=config.alias;env.ANDROID_KEY_PASSWORD=config.password;
}
if(!env.JAVA_HOME||!(env.ANDROID_HOME||env.ANDROID_SDK_ROOT))throw new Error("Set JAVA_HOME to JDK 17 and ANDROID_HOME to an Android SDK with platform 36 and build tools 35.0.0.");
const certificate=spawnSync(path.join(env.JAVA_HOME,"bin",process.platform==="win32"?"keytool.exe":"keytool"),["-exportcert","-keystore",env.ANDROID_KEYSTORE_FILE,"-alias",env.ANDROID_KEY_ALIAS||"discover-burgas","-storepass:env","ANDROID_KEYSTORE_PASSWORD"],{env});
if(certificate.status!==0)throw new Error("Cannot verify release signing certificate.");
const fingerprint=createHash("sha256").update(certificate.stdout).digest("hex").toUpperCase().match(/../g).join(":");
const identity=JSON.parse(await fs.readFile("platforms/android/signing-certificate.json","utf8"));
if(!identity.sha256Fingerprints.includes(fingerprint))throw new Error("Signing certificate does not match the website asset links. Use the registered release key.");
const project=path.resolve("platforms/android/project");
const command=process.platform==="win32"?"gradlew.bat":"./gradlew";
const result=spawnSync(command,["--no-daemon","assembleRelease","bundleRelease","lintRelease"],{cwd:project,env,stdio:"inherit",shell:process.platform==="win32"});
if(result.status!==0)throw new Error(`Android build failed (${result.status})`);
const output=path.resolve("artifacts/android");await fs.mkdir(output,{recursive:true});
const artifacts=[["app/build/outputs/apk/release/app-release.apk","discover-burgas-1.1.0.apk"],["app/build/outputs/bundle/release/app-release.aab","discover-burgas-1.1.0.aab"]];
const sums=[];
for(const [source,name] of artifacts){const bytes=await fs.readFile(path.join(project,source));await fs.writeFile(path.join(output,name),bytes);sums.push(`${createHash("sha256").update(bytes).digest("hex")}  ${name}`);}
await fs.writeFile(path.join(output,"SHA256SUMS.txt"),sums.join("\n")+"\n");console.log(`Signed artifacts: ${output}`);
