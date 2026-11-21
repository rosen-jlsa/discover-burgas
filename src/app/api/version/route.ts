import {appVersion} from "@/lib/app-version";
export function GET(){return Response.json(appVersion,{headers:{"Cache-Control":"no-store"}});}
