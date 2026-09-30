'use strict';
const CACHE='world-fragments-pwa-v1';
const SHELL=['./','index.html','style.css','app.js','pwa.js','icon.svg','manifest.webmanifest','icons/icon-180.png','icons/icon-192.png','icons/icon-512.png','about.html','about.zh-CN.html'];
const BASE=new URL('./',self.location.href);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys()){if(key.startsWith('world-fragments-pwa-')&&key!==CACHE)await caches.delete(key)}await self.clients.claim()})()));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname))return;
 const relative=url.pathname.slice(BASE.pathname.length);
 if(!SHELL.includes(relative||'./')&&relative!=='data/entries.json')return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  try{
   const response=await fetch(request);
   if(!response.ok)throw new Error('HTTP '+response.status);
   await cache.put(request,response.clone());
   return response;
  }catch(error){
   const cached=await cache.match(request,{ignoreSearch:true});
   if(cached)return cached;
   if(request.mode==='navigate')return (await cache.match(new URL('./',BASE).href))||Response.error();
   return Response.error();
  }
 })());
});
