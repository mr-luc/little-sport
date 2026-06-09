const I={
ball:['Ball','⚽','Spielgerät für viele Sportarten.'],training:['Training','🏋️','Geplante Übung zur Leistungsverbesserung.'],muskel:['Muskel','💪','Erzeugt Bewegung durch Anspannung.'],ausdauer:['Ausdauer','🫁','Fähigkeit, eine Belastung länger durchzuhalten.'],herz:['Herz','❤️','Pumpt Blut durch den Körper.'],fairplay:['Fair Play','🤝','Sportliches und faires Verhalten.'],team:['Team','👥','Gruppe, die gemeinsam spielt.'],tor:['Tor','🥅','Zielbereich in mehreren Sportarten.'],
netz:['Netz','🏐','Trennt Spielfelder oder fängt den Ball.'],korb:['Korb','🏀','Ziel beim Basketball.'],schlaeger:['Schläger','🎾','Gerät zum Spielen eines Balles.'],wasser:['Wasser','🏊','Element für Schwimmen und Wassersport.'],zeit:['Zeit','⏱️','Messgröße im Sport.'],regel:['Regel','📏','Vorgabe für ein faires Spiel.'],wettkampf:['Wettkampf','🏆','Sportlicher Vergleich.'],belastung:['Belastung','🔥','Anstrengung für den Körper.'],
fussball:['Fußball','⚽','Mannschaftssport mit Ball und Tor.'],basketball:['Basketball','🏀','Mannschaftssport mit Ball und Korb.'],volleyball:['Volleyball','🏐','Rückschlagsport über ein Netz.'],tennis:['Tennis','🎾','Rückschlagsport mit Schläger und Ball.'],schwimmen:['Schwimmen','🏊','Fortbewegung im Wasser.'],krafttraining:['Krafttraining','🏋️','Training zur Verbesserung der Muskelkraft.'],ausdauertraining:['Ausdauertraining','🏃','Training für Herz, Lunge und Kreislauf.'],herzfrequenz:['Herzfrequenz','💓','Anzahl der Herzschläge pro Minute.'],puls:['Puls','📈','Spürbarer Herzschlag an Blutgefäßen.'],taktik:['Taktik','🧠','Planvolles Verhalten im Spiel.'],mannschaftssport:['Mannschaftssport','👥','Sportart mit gemeinsamem Teamziel.'],sportsgeist:['Sportsgeist','🌟','Fair, respektvoll und leistungsbereit handeln.'],schiedsrichter:['Schiedsrichter','🟨','Achtet auf Regeln und Fairness.'],leichtathletik:['Leichtathletik','🏟️','Sportarten wie Laufen, Springen und Werfen.'],olympia:['Olympia','🥇','Großes internationales Sportereignis.'],fitness:['Fitness','✅','Körperliche Leistungsfähigkeit.'],technik:['Technik','🎯','Gezielte Bewegungsform im Sport.']
};
const START=['ball','training','muskel','ausdauer','herz','fairplay','team','tor','netz','korb','schlaeger','wasser','zeit','regel','wettkampf','belastung'];
const R={},E={},S='little-sport-progress-v2';
function key(a,b){return[a,b].sort().join('+')}
function r(a,b,c,e){R[key(a,b)]=c;E[c]=e}
r('ball','tor','fussball','Ball und Tor ergeben Fußball.');
r('ball','korb','basketball','Beim Basketball muss der Ball in den Korb.');
r('ball','netz','volleyball','Beim Volleyball wird der Ball über das Netz gespielt.');
r('ball','schlaeger','tennis','Mit Schläger und Ball entsteht Tennis.');
r('wasser','training','schwimmen','Training im Wasser führt zum Schwimmen.');
r('muskel','training','krafttraining','Muskeln werden durch Krafttraining gezielt trainiert.');
r('ausdauer','training','ausdauertraining','Ausdauertraining verbessert die Belastbarkeit.');
r('herz','belastung','herzfrequenz','Bei Belastung steigt die Herzfrequenz.');
r('herzfrequenz','zeit','puls','Den Puls misst man über Herzschläge pro Zeit.');
r('team','regel','mannschaftssport','Teams brauchen Regeln für Mannschaftssport.');
r('team','taktik','mannschaftssport','Taktik ist in Mannschaftssportarten wichtig.');
r('fussball','team','mannschaftssport','Fußball ist ein Mannschaftssport.');
r('basketball','team','mannschaftssport','Basketball ist ein Mannschaftssport.');
r('fairplay','wettkampf','sportsgeist','Fair Play im Wettkampf zeigt Sportsgeist.');
r('regel','fairplay','schiedsrichter','Schiedsrichter achten auf Regeln und Fair Play.');
r('ausdauertraining','zeit','leichtathletik','Zeitmessung ist in der Leichtathletik wichtig.');
r('leichtathletik','wettkampf','olympia','Leichtathletik gehört zu Olympia.');
r('training','belastung','fitness','Training und passende Belastung verbessern Fitness.');
r('ball','training','technik','Mit Training verbesserst du die Technik am Ball.');
let d=[...START],sel=null;
const q=s=>document.querySelector(s),grid=q('#grid'),msg=q('#msg'),counter=q('#counter'),badge=q('#badge'),search=q('#search'),A=q('#a'),B=q('#b'),RS=q('#r'),pop=q('#pop');
function load(){try{const saved=JSON.parse(localStorage.getItem(S)||'[]').filter(x=>I[x]);d=[...new Set([...START,...saved])]}catch(e){d=[...START]}}
function save(){localStorage.setItem(S,JSON.stringify(d.filter(x=>!START.includes(x))))}
function badgeText(){const n=d.length;if(n>=Object.keys(I).length)return'Sport-Meister';if(n>=26)return'Olympia-Profi';if(n>=22)return'Taktik-Profi';if(n>=19)return'Trainings-Profi';return'Starter'}
function card(id){return `<div class="sym">${I[id][1]}</div><div class="name">${I[id][0]}</div><div class="info">${I[id][2]}</div>`}
function slot(el,id,label){el.className='slot'+(id?' active':'');el.innerHTML=id?`${I[id][1]}<span>${I[id][0]}</span><small>${I[id][2]}</small>`:`❔<span>${label}</span>`}
function result(id,ok){RS.className='slot result '+(ok?'success':'fail');RS.innerHTML=id?`${I[id][1]}<span>${I[id][0]}</span>`:'✨<span>Ergebnis</span>'}
function render(nid){grid.innerHTML='';const s=(search.value||'').toLowerCase();d.forEach(id=>{if(s&&!I[id][0].toLowerCase().includes(s))return;const el=document.createElement('article');el.className='card '+(sel===id?'sel ':'')+(nid===id?'new':'');el.innerHTML=card(id);el.onclick=()=>choose(id);grid.appendChild(el)});counter.textContent=d.length+' / '+Object.keys(I).length;badge.textContent=badgeText();renderMissions()}
function choose(id){if(!sel){sel=id;slot(A,id,'1. Begriff');slot(B,null,'2. Begriff');result(null,true);msg.innerHTML='<b>'+I[id][1]+' '+I[id][0]+'</b>: '+I[id][2]+'<br>Wähle jetzt einen zweiten Begriff.';render();return}slot(B,id,'2. Begriff');combine(sel,id);sel=null}
function combine(a,b){const c=R[key(a,b)];if(!c){result(null,false);msg.textContent='Gute Idee, aber diese Kombination gibt es im Spiel noch nicht.';setTimeout(resetSlots,900);return}const neu=!d.includes(c);if(neu){d.push(c);save()}const f=I[a][0]+' + '+I[b][0]+' = '+I[c][0];result(c,true);msg.innerHTML='<b>'+f+'</b><br>'+(E[c]||I[c][2]);if(neu)show(c,f,E[c]||I[c][2]);setTimeout(()=>{resetSlots();render(neu?c:null)},1100)}
function resetSlots(){slot(A,null,'1. Begriff');slot(B,null,'2. Begriff');result(null,true);render()}
function show(id,f,ex){if(!pop)return;q('#pe').textContent=I[id][1];q('#pt').textContent=I[id][0];q('#pf').textContent=f;q('#px').textContent=ex;pop.classList.add('show')}
function hint(){const p=[];for(let i=0;i<d.length;i++)for(let j=i;j<d.length;j++){const c=R[key(d[i],d[j])];if(c&&!d.includes(c))p.push([d[i],d[j]])}if(!p.length){msg.textContent='Im Moment gibt es keinen neuen Tipp.';return}const x=p[Math.floor(Math.random()*p.length)];msg.innerHTML='💡 Probiere <b>'+I[x[0]][1]+' '+I[x[0]][0]+'</b> + <b>'+I[x[1]][1]+' '+I[x[1]][0]+'</b>.'}
function reset(){localStorage.removeItem(S);d=[...START];sel=null;if(search)search.value='';resetSlots();msg.textContent='Spielstand gelöscht. Du kannst neu starten.'}
function renderMissions(){const box=q('#missionList');if(!box)return;const missions=[['Trainingslehre',['krafttraining','ausdauertraining','fitness']],['Sportarten',['fussball','basketball','volleyball','tennis','schwimmen']],['Fair Play',['sportsgeist','schiedsrichter']],['Olympia',['leichtathletik','olympia']]];box.innerHTML=missions.map(m=>{const n=m[1].filter(x=>d.includes(x)).length;return `<div class="mission"><b>${n===m[1].length?'✅':'🎯'} ${m[0]}</b><br><span>${n} / ${m[1].length} entdeckt</span></div>`}).join('')}
q('#hint').onclick=hint;q('#reset').onclick=reset;if(q('#close'))q('#close').onclick=()=>pop.classList.remove('show');if(pop)pop.onclick=e=>{if(e.target===pop)pop.classList.remove('show')};search.oninput=()=>render();
load();resetSlots();msg.innerHTML='Jetzt anklickbar: Wähle zwei Karten. Starte z. B. mit <b>Ball + Tor</b> oder <b>Muskel + Training</b>.';