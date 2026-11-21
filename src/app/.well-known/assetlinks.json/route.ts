import certificate from "../../../../platforms/android/signing-certificate.json";
export function GET(){
 const fingerprints=certificate.sha256Fingerprints.filter(value=>/^([A-F0-9]{2}:){31}[A-F0-9]{2}$/.test(value));
 if(!fingerprints.length)return Response.json({error:"Android signing certificate is not configured"},{status:503,headers:{"Cache-Control":"no-store"}});
 return Response.json([{relation:["delegate_permission/common.handle_all_urls"],target:{namespace:"android_app",package_name:certificate.packageName,sha256_cert_fingerprints:fingerprints}}],{headers:{"Cache-Control":"public, max-age=300"}});
}
