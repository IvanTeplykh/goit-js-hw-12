import{a as w,i as s,S as y}from"./assets/vendor-F1LeQrrD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();const x="54652097-fa33845d90f17562231f3e558";async function p(e,t,i){const r={key:x,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:i};try{return(await w({method:"get",url:"https://pixabay.com/api/",params:r})).data}catch{s.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}}const C=y.default||y;let m;document.querySelector(".js-img-total");function S(e){const t=document.querySelector(".gallery"),i=e.map(r=>`<li class="photo-card">
            <a href="${r.largeImageURL}">
                <img src="${r.webformatURL}" alt="${r.tags.split(",").slice(0,3).join(", ")}"/>
            </a>
            <div class="info">
            <div class="info-item">
                <p class="info-item">
                    <b>Likes</b>${r.likes}
                </p>
                </div>
                <div class="info-item">
                <p class="info-item">
                    <b>Views</b>${r.views}
                </p>
                </div>
                <div class="info-item">
                <p class="info-item">
                    <b>Comments</b>${r.comments}
                </p>
                </div>
                <div class="info-item">
                <p class="info-item">
                    <b>Downloads</b>${r.downloads}
                </p>
                </div>
            </div>
        </li>`).join("");t.insertAdjacentHTML("beforeend",i),m?m.refresh():m=new C(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,closeText:"×",navText:["←","→"]})}function g(){const e=document.querySelector(".gallery");e.innerHTML=""}function q(){document.querySelector(".loader").classList.remove("hidden")}function f(){document.querySelector(".loader").classList.add("hidden")}function M(){document.querySelector(".load-more").classList.remove("hidden")}function d(){document.querySelector(".load-more").classList.add("hidden")}function L(e,t){const i=document.querySelector(".img-total");return t+=e.hits.length,i.textContent=`Total images: ${t}/${e.totalHits}`,e.totalHits===t?(d(),s.info({title:"Info",position:"topRight",message:"Sorry, it is all images we have"})):M(),t}const v=document.querySelector(".form"),h=document.querySelector(".js-search-query"),P=document.querySelector(".load-more"),T=document.querySelector(".img-total");let a="",l=1,b=15,c=0;v.addEventListener("submit",B);P.addEventListener("click",I);async function B(e){if(e.preventDefault(),g(),q(),d(),a=e.currentTarget.searchText.value.trim(),c=0,l=1,v.reset(),a===""){s.warning({title:"warning",position:"topRight",message:"Please enter a search query!"}),T.textContent="",h.textContent="Search query :",g(),d(),f();return}h.textContent=`Search query : "${a}"`;try{const t=await p(a,l,b);t.hits.length===0?(s.info({title:"Info",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),d()):(S(t.hits),c=L(t,c))}catch(t){console.log(t),s.error({title:"Error",position:"topRight",message:"Sorry, something went wrong. Please try again!"})}finally{f(),l+=1}}async function I(){q();try{const e=await p(a,l,b);S(e.hits),c=L(e,c),l+=1;const t=document.querySelector(".gallery").firstElementChild;if(t){const{height:i}=t.getBoundingClientRect();window.scrollBy({top:i*2,behavior:"smooth"})}}catch{s.error({title:"Error",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"})}finally{f()}}
//# sourceMappingURL=index.js.map
