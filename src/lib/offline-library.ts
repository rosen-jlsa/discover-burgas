export type OfflineStory = {
  key: string; slug: string; locale: "bg" | "en"; savedAt: string;
  name: string; short: string; description: string; history: string; facts: string[];
  sources: { title: string; url: string; publisher: string }[];
  attribution?: string; photo?: Blob;
};
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve,reject)=>{
    const request=indexedDB.open("discover-burgas-offline",1);
    request.onupgradeneeded=()=>request.result.createObjectStore("stories",{keyPath:"key"});
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>reject(request.error);
    request.onblocked=()=>reject(new Error("Offline storage is blocked"));
  });
}
async function transaction<T>(mode:IDBTransactionMode, action:(store:IDBObjectStore)=>IDBRequest<T>):Promise<T>{
  const db=await openDatabase();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction("stories",mode);const request=action(tx.objectStore("stories"));
    tx.oncomplete=()=>{db.close();resolve(request.result);};
    tx.onerror=()=>{db.close();reject(tx.error);};
    tx.onabort=()=>{db.close();reject(tx.error);};
  });
}
export async function listOfflineStories(){return transaction<OfflineStory[]>("readonly",store=>store.getAll());}
export async function removeOfflineStory(key:string){await transaction("readwrite",store=>store.delete(key));}
export async function saveOfflineStory(slug:string,locale:"bg"|"en"){
  const response=await fetch(`/api/places/${encodeURIComponent(slug)}?locale=${locale}`,{cache:"no-store"});
  if(!response.ok)throw new Error("Story download failed");
  const data=await response.json();
  if(typeof data.name!=="string"||typeof data.history!=="string"||!Array.isArray(data.facts)||!Array.isArray(data.sources))throw new Error("Invalid story");
  const image=data.images?.[0];let photo:Blob|undefined;
  if(image?.path){
    const url=new URL(image.path,location.origin);
    if(url.origin!==location.origin||!url.pathname.startsWith("/images/"))throw new Error("Invalid image");
    const result=await fetch(url,{cache:"reload"});
    if(!result.ok)throw new Error("Image download failed");
    photo=await result.blob();
    if(!photo.type.startsWith("image/")||photo.size>10*1024*1024)throw new Error("Image too large");
  }
  const story:OfflineStory={key:`${locale}:${slug}`,slug,locale,savedAt:new Date().toISOString(),name:data.name,short:data.short,description:data.description,history:data.history,facts:data.facts,sources:data.sources,attribution:image?.attribution,photo};
  await transaction("readwrite",store=>store.put(story));
  // Persistence is a best-effort browser capability, never a prerequisite.
  navigator.storage?.persist?.().catch(()=>false);
}
