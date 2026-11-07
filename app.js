const P=(r,m,l)=>[r,m,l];
const pz=(names,pr,e)=>names.map(n=>({n,p:pr,e}));
const mk=(a,e)=>a.map(([n,p])=>({n,p:[p],e:typeof e=="function"?e(n):e}));
const D={
"Simply Veg":{s:1,i:pz(["Margherita (Single Cheese)","Cheese & Tomato","Cheese & Onion","Cheese & Corn","Cheese & Capsicum","Onion & Paneer"],P(99,190,320),"🍕")},
"Veg Delight":{s:1,i:pz(["Double Cheese Margherita","Spicy Triple Tango Twist","Farm House Spl.","Country Fresh"],P(170,290,399),"🧀")},
"Veg Special":{s:1,i:pz(["Corn Hub Spl.","Peppy Paneer Spl.","Mexican Green","Deluxe Veggie Delight","Gourmet Pizza","Four Seasons Pizza","Makhni Paneer","Veg Spice","Treat Pizza","Mexican Cheddar Pizza"],P(199,330,440),"🌶️")},
"Royal Veg":{s:1,i:pz(["Veg Supreme Pizza","Tandoori Paneer","Veg Island","Five Veggie Special","Green Pizza"],P(220,350,480),"👑")},
"Veg Feast":{s:1,i:pz(["Veg Extra Vaganza","Chef's Special","Punjabi Tadka Special","Veggie Paradise Special","Italian Mint Pizza","New Veg Island Pizza","Dual Tone Pizza"],P(240,380,499),"🔥")},
"Pizza Mania":{i:mk([["Onion Capsicum",80],["Corn Capsicum",80],["Tomato Capsicum",80],["Onion Corn",80],["Tomato Corn",80],["Onion Tomato",80],["Loaded (Jalapeno, Tomato, Mushroom)",110],["Tangy Spl. (Capsicum, Onion)",115],["Garden Fresh (Paneer, Onion, Tomato)",120],["Corn Exotica (Corn, Onion, Tomato)",115],["Veg Single Combo",240],["Veg Double Combo",280]],"🍕")},
"Calzones":{i:mk([["Chipotle Calzone",120],["Zesty Calzone",120],["Cheese Calzone",120],["Spicy Calzone",120]],"🥟")},
"Burgers":{i:mk([["Cheese Burger",50],["Veg Burger",60],["Tandoori Burger",70],["Maha Burger",80],["Pizza Burger",80],["Add Cheese on Any Burger",20]],"🍔")},
"Snacks":{i:mk([["Garlic Bread Sticks",100],["Stuff Garlic Bread",120],["Garlic Bread Exotica",150],["Jalapeno Garlic Bread",120],["Zingi Parcel (2 Piece)",60]],"🥖")},
"French Fries":{i:mk([["Fries",80],["Masala Fries",80],["Mint Fries",80],["Tandoori Fries",80],["Large Fries",120],["Chilly Potato",120]],"🍟")},
"Sandwich":{i:mk([["Veg Sandwich",70],["Cheese Sandwich",80],["Paneer Sandwich",80],["Corn Sandwich",80],["Mushroom Sandwich",80],["LabaLab Sandwich",120]],"🥪")},
"Desserts & Shakes":{i:mk([["Choco Lava Cake",80],["Tutti Frutti Ice Cream",80],["Cheese Dip / Jalapeno Dip",30],["Chocolate Shake",90],["Butter Scotch Shake",90],["Strawberry Shake",90],["Cold Coffee",90],["Vanilla Shake",90],["Add Ice Cream in Any Shake",20]],n=>/Shake|Coffee/.test(n)?"🥤":"🍰")}
};
const L=["Regular","Medium","Large"],S=["Serves 1","Serves 2","Serves 4"];
const tabs=document.getElementById("tabs"),grid=document.getElementById("grid"),size=document.getElementById("size");
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.1});
function show1(k){
 [...tabs.children].forEach(b=>b.classList.toggle("on",b.dataset.k===k));
 const d=D[k];
 size.innerHTML=d.s?L.map((l,i)=>`<span>${l} · ${S[i]}</span>`).join(""):"";
 grid.innerHTML=d.i.map((x,i)=>`<div class="card" style="transition-delay:${(i%8)*60}ms"><span class="e">${x.e}</span>${i<2&&d.s?'<span class="tag">HOT</span>':""}<h3>${x.n}</h3><div class="pr">${x.p.map((v,j)=>`<b data-j="${j}" class="${x.p.length>1&&j==0?'sel':''}">${x.p.length>1?L[j][0]+' ':''}₹${v}</b>`).join("")}</div><button class="add" data-k="${k}" data-i="${i}">+ Add</button></div>`).join("");
 grid.querySelectorAll(".card").forEach(c=>io.observe(c));
}
Object.keys(D).forEach((k,i)=>{const b=document.createElement("button");b.textContent=k;b.dataset.k=k;b.onclick=()=>show(k);tabs.append(b)});
function show(k){
 if(k!=="All"){show1(k);return}
 let h="";Object.keys(D).forEach(c=>{show1(c);h+=`<h3 class="ch" style="grid-column:1/-1;font-size:1.5rem;margin-top:18px;border-left:6px solid var(--red);padding-left:12px">${c}</h3>`+grid.innerHTML});
 grid.innerHTML=h;size.innerHTML=L.map((l,i)=>`<span>${l} · ${S[i]}</span>`).join("");
 [...tabs.children].forEach(b=>b.classList.toggle("on",b.dataset.k==="All"));
 grid.querySelectorAll(".card").forEach(c=>io.observe(c));
}
{const b=document.createElement("button");b.textContent="🍽️ Full Menu";b.dataset.k="All";b.onclick=()=>show("All");tabs.prepend(b)}
show("Simply Veg");
const NO="919911273199",C={},$=id=>document.getElementById(id);
function draw(){const a=Object.entries(C);let t=0,n=0;
 $("items").innerHTML=a.length?a.map(([k,v])=>{t+=v.p*v.q;n+=v.q;return `<div class="it"><span>${v.n}${v.z?" ("+v.z+")":""}<small>₹${v.p} × ${v.q}</small></span><span class="q"><button data-k="${k}" data-d="-1">−</button>${v.q}<button data-k="${k}" data-d="1">+</button></span></div>`}).join(""):"<p class='em'>Your bag is empty 🍕</p>";
 $("tt").textContent="₹"+t;$("cnt").textContent=n;$("send").style.display=n?"block":"none";
 let m="Hello Da Pizza Hub Hansi! 🍕\nI would like to order:\n"+a.map(([k,v],i)=>`${i+1}. ${v.n}${v.z?" ("+v.z+")":""} x${v.q} = ₹${v.p*v.q}`).join("\n")+`\n\nTotal: ₹${t}`;
 if($("nm").value)m+="\nName: "+$("nm").value;if($("ad").value)m+="\nAddress: "+$("ad").value;
 $("send").href="https://wa.me/"+NO+"?text="+encodeURIComponent(m);}
grid.addEventListener("click",e=>{
 const ch=e.target.closest(".pr b");
 if(ch&&ch.parentNode.children.length>1){[...ch.parentNode.children].forEach(c=>c.classList.remove("sel"));ch.classList.add("sel")}
 const b=e.target.closest(".add");
 if(b){const card=b.closest(".card"),sel=card.querySelector(".pr b.sel")||card.querySelector(".pr b"),j=+sel.dataset.j,it=D[b.dataset.k].i[b.dataset.i],key=it.n+j;
  C[key]=C[key]||{n:it.n,z:it.p.length>1?L[j]:"",p:it.p[j],q:0};C[key].q++;draw();
  b.textContent="✓ Added";setTimeout(()=>b.textContent="+ Add",900);$("bag").animate([{transform:"scale(1.25)"},{transform:"scale(1)"}],{duration:300})}
});
$("items").addEventListener("click",e=>{const b=e.target.closest("button[data-k]");if(b){const c=C[b.dataset.k];c.q+=+b.dataset.d;if(c.q<=0)delete C[b.dataset.k];draw()}});
$("bag").onclick=()=>$("dr").classList.add("open");$("x").onclick=()=>$("dr").classList.remove("open");
$("nm").oninput=$("ad").oninput=draw;
document.querySelector(".combo").addEventListener("click",e=>{const b=e.target.closest(".cadd");if(!b)return;const key="c"+b.dataset.n;C[key]=C[key]||{n:b.dataset.n,z:"Combo",p:+b.dataset.p,q:0};C[key].q++;draw();b.textContent="✓ Added";setTimeout(()=>b.textContent="+ Add",900);$("bag").animate([{transform:"scale(1.25)"},{transform:"scale(1)"}],{duration:300})});
draw();
const m="🍕 Fresh Baked &nbsp; 🧀 Extra Cheesy &nbsp; 🔥 Hot Delivery &nbsp; 🍟 Fries in a Jar &nbsp; 🥤 Cool Shakes &nbsp; ";
document.getElementById("mq").innerHTML=m.repeat(8);
document.addEventListener("click",e=>{if(e.target.matches(".btn,.tabs button")){for(let i=0;i<10;i++){const s=document.createElement("span");s.textContent=["🍕","🧀","🍅"][i%3];s.style.cssText=`position:fixed;left:${e.clientX}px;top:${e.clientY}px;font-size:22px;pointer-events:none;z-index:50;transition:1s;opacity:1`;document.body.append(s);requestAnimationFrame(()=>{s.style.transform=`translate(${(Math.random()-.5)*240}px,${-Math.random()*200}px) rotate(${Math.random()*360}deg)`;s.style.opacity=0});setTimeout(()=>s.remove(),1000)}}});