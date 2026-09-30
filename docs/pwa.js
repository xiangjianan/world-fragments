'use strict';
if('serviceWorker' in navigator){
 window.addEventListener('load',async()=>{
  try{
   await navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'});
   await navigator.serviceWorker.ready;
   // Prime the data cache even on the first visit, before this page is controlled.
   const response=await fetch('./data/entries.json',{cache:'no-store'});
   if(response.ok){const cache=await caches.open('world-fragments-pwa-v1');await cache.put('./data/entries.json',response)}
  }catch(error){console.warn('Offline setup unavailable:',error.message)}
 });
}
const installButton=document.getElementById('install-app');
const installHelp=document.getElementById('install-help');
const offlineStatus=document.getElementById('offline-status');
let installPrompt;
function syncAppStatus(){
 const standalone=window.matchMedia('(display-mode: standalone)').matches||navigator.standalone;
 if(installHelp)installHelp.hidden=Boolean(standalone);
 if(offlineStatus)offlineStatus.hidden=navigator.onLine;
 if(standalone&&installButton)installButton.hidden=true;
}
window.addEventListener('beforeinstallprompt',event=>{if(!installButton)return;event.preventDefault();installPrompt=event;installButton.hidden=false});
if(installButton)installButton.addEventListener('click',async()=>{if(!installPrompt)return;await installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installButton.hidden=true});
window.addEventListener('appinstalled',()=>{installPrompt=null;syncAppStatus();if(installButton)installButton.hidden=true});
window.addEventListener('online',syncAppStatus);window.addEventListener('offline',syncAppStatus);syncAppStatus();
