const queries = process.argv.slice(2).length ? process.argv.slice(2) : ["Burgas Historical Museum", 'incategory:"Street clocks in Burgas"', "Nessebar panorama", "Sozopol Archaeological Museum building", "Beglik Tash", "Ropotamo boats pier", "Pomorie Salt Museum", "Pomorie tomb", "Arena Burgas"];
for (const query of queries) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.search = new URLSearchParams({action:"query",generator:"search",gsrsearch:query,gsrnamespace:"6",gsrlimit:"5",prop:"imageinfo",iiprop:"url|extmetadata|size",format:"json"});
  const data = await (await fetch(url)).json();
  console.log(JSON.stringify({query,files:Object.values(data.query?.pages || {}).map(p=>({title:p.title,width:p.imageinfo?.[0].width,height:p.imageinfo?.[0].height,description:p.imageinfo?.[0].extmetadata?.ImageDescription?.value,license:p.imageinfo?.[0].extmetadata?.LicenseShortName?.value}))}));
}
