(function(){
'use strict';
const quizKey='benarianModuleQuizScoresV1';
const courseKey='benarianHotelCourseProgressV1';
const evidence=[
['Guest-journey map, handover log and daily briefing notes','نقشه سفر مهمان، گزارش تحویل کار و یادداشت جلسه روزانه'],
['PMS room status, arrivals list, folio exceptions and night-audit report','وضعیت اتاق در PMS، فهرست ورودها، مغایرت‌های فولیو و گزارش حسابرسی شبانه'],
['Rooms cleaned per labour hour, inspection scores and room discrepancies','تعداد اتاق نظافت‌شده در ساعت کار، امتیاز بازرسی و مغایرت وضعیت اتاق'],
['Covers, average check, food cost, waste and service-time reports','تعداد مهمان، میانگین فاکتور، هزینه غذا، ضایعات و زمان سرویس'],
['Preventive-maintenance completion, downtime, energy use and safety incidents','تکمیل نگهداری پیشگیرانه، زمان خرابی، مصرف انرژی و حوادث ایمنی'],
['SOP audit results, training records, exceptions and corrective actions','نتایج ممیزی SOP، سوابق آموزش، استثناها و اقدامات اصلاحی'],
['Segment production, conversion, acquisition cost and campaign contribution','تولید هر بخش بازار، نرخ تبدیل، هزینه جذب و سودآوری کمپین'],
['Pickup, pace, forecast, displacement and net RevPAR by channel','پیکاپ، سرعت رزرو، پیش‌بینی، جابه‌جایی تقاضا و RevPAR خالص هر کانال'],
['Budget variance, departmental profit, cash flow and forecast accuracy','انحراف بودجه، سود دپارتمان، جریان نقدی و دقت پیش‌بینی'],
['Turnover, absence, engagement, productivity and training completion','ترک خدمت، غیبت، مشارکت، بهره‌وری و تکمیل آموزش'],
['Energy, water, waste, carbon and verified cost savings','انرژی، آب، پسماند، کربن و صرفه‌جویی تأییدشده'],
['GOP, NOI, CAPEX return, asset condition and owner priorities','GOP، NOI، بازده CAPEX، وضعیت دارایی و اولویت‌های مالک'],
['Incident timeline, guest impact, response time and recovery follow-up','خط زمانی حادثه، اثر بر مهمان، زمان پاسخ و پیگیری جبران خدمات'],
['Daily flash, weekly forecast, monthly review and 90-day action plan','گزارش روزانه، پیش‌بینی هفتگی، بازبینی ماهانه و برنامه ۹۰ روزه']
];
const actions=[
['Assign one accountable owner to every guest touchpoint and handover','برای هر نقطه تماس و تحویل کار، یک مسئول پاسخگو تعیین کنید'],
['Reconcile PMS, housekeeping and cashiering information before every shift handover','پیش از هر تحویل شیفت، اطلاعات PMS، خانه‌داری و صندوق را تطبیق دهید'],
['Roster from arrivals, departures, service level and measured workload','برنامه نیرو را بر اساس ورود، خروج، سطح خدمات و حجم کار اندازه‌گیری‌شده تنظیم کنید'],
['Engineer the menu and control purchasing, portions, waste and service flow','مهندسی منو انجام دهید و خرید، اندازه پرس، ضایعات و جریان سرویس را کنترل کنید'],
['Prioritise work orders by guest, safety, operational and asset risk','دستورکارها را بر اساس ریسک مهمان، ایمنی، عملیات و دارایی اولویت‌بندی کنید'],
['Test the SOP with employees, define evidence and control every revision','SOP را با کارکنان آزمایش کنید، شواهد را مشخص و هر بازنگری را کنترل کنید'],
['Focus sales activity on profitable segments and measure net contribution','فعالیت فروش را بر بخش‌های سودآور متمرکز و سهم خالص را اندازه‌گیری کنید'],
['Forecast by date and segment, then manage price, restrictions and inventory','بر اساس تاریخ و بخش بازار پیش‌بینی کرده، سپس قیمت، محدودیت و موجودی را مدیریت کنید'],
['Link every variance to a cause, owner, corrective action and revised forecast','هر انحراف را به علت، مسئول، اقدام اصلاحی و پیش‌بینی جدید متصل کنید'],
['Set clear expectations, coach with evidence and recognise accountable performance','انتظارات را روشن کنید، با شواهد مربیگری و عملکرد مسئولانه را قدردانی کنید'],
['Establish a baseline before approving a sustainability project or claiming savings','پیش از تأیید پروژه پایداری یا اعلام صرفه‌جویی، خط مبنا تعیین کنید'],
['Translate owner objectives into an asset plan with returns, risks and decision gates','اهداف مالک را به برنامه دارایی با بازده، ریسک و نقاط تصمیم تبدیل کنید'],
['Protect safety, take ownership, communicate facts and document follow-up','از ایمنی محافظت کنید، مسئولیت بپذیرید، واقعیت‌ها را اطلاع دهید و پیگیری را ثبت کنید'],
['Run a disciplined daily, weekly and monthly management rhythm with named owners','ریتم مدیریتی منظم روزانه، هفتگی و ماهانه با مسئولان مشخص اجرا کنید']
];
const scores=JSON.parse(localStorage.getItem(quizKey)||'{}');
const textFor=(el,lang)=>{const n=el&&el.querySelector('.lang-'+lang);return(n?n.textContent:el?el.textContent:'').trim()};
const rotate=(arr,n)=>arr.slice(n%arr.length).concat(arr.slice(0,n%arr.length));
const esc=s=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
const modules=[...document.querySelectorAll('details.module')];
const data=modules.map((mod,index)=>{
 const title=mod.querySelector('.module-title'),summary=mod.querySelector('.module-summary'),method=mod.querySelector('.module-grid>div:first-child p'),assignment=mod.querySelector('.assignment p');
 const lessons=[...mod.querySelectorAll('.lesson-list li')];
 return{index,id:String(index+1).padStart(2,'0'),title:[textFor(title,'en'),textFor(title,'fa')],summary:[textFor(summary,'en'),textFor(summary,'fa')],method:[textFor(method,'en'),textFor(method,'fa')],assignment:[textFor(assignment,'en'),textFor(assignment,'fa')],lessons:lessons.map(x=>[textFor(x,'en'),textFor(x,'fa')])};
});
function other(field,index,offset,lessonIndex){const d=data[(index+offset)%data.length];return lessonIndex==null?d[field]:d[field][lessonIndex%d[field].length]}
function make(qEn,qFa,correct,wrongA,wrongB,number){const mixed=rotate([correct,wrongA,wrongB],number%3);return{q:[qEn,qFa],options:mixed,answer:mixed.indexOf(correct),correct}}
function questions(d){const i=d.index;return[
 make('What is the primary purpose of this module?','هدف اصلی این ماژول چیست؟',d.summary,other('summary',i,3),other('summary',i,7),1),
 make('Which management method best fits this module?','کدام روش مدیریتی برای این ماژول مناسب‌تر است؟',d.method,other('method',i,2),other('method',i,6),2),
 make('Which topic belongs to this module?','کدام موضوع متعلق به این ماژول است؟',d.lessons[0],other('lessons',i,4,0),other('lessons',i,8,0),3),
 make('Which subject should the learner study here?','فراگیر در این بخش باید کدام موضوع را مطالعه کند؟',d.lessons[1],other('lessons',i,5,1),other('lessons',i,9,1),4),
 make('Which control area is included in this module?','کدام حوزه کنترلی در این ماژول قرار دارد؟',d.lessons[2],other('lessons',i,6,2),other('lessons',i,10,2),5),
 make('Which additional lesson supports this module?','کدام درس تکمیلی از این ماژول پشتیبانی می‌کند؟',d.lessons[3],other('lessons',i,7,3),other('lessons',i,11,3),6),
 make('What is the practical assignment for this module?','تمرین عملی این ماژول چیست؟',d.assignment,other('assignment',i,3),other('assignment',i,9),7),
 make('Which management area does this knowledge check assess?','این آزمون دانش کدام حوزه مدیریتی را ارزیابی می‌کند؟',d.title,other('title',i,5),other('title',i,10),8),
 make('Which evidence should the manager review first?','مدیر ابتدا باید کدام شواهد را بررسی کند؟',evidence[i],evidence[(i+4)%14],evidence[(i+9)%14],9),
 make('Which action best demonstrates practical understanding?','کدام اقدام بهترین نشانه درک عملی است؟',actions[i],actions[(i+5)%14],actions[(i+11)%14],10)
 ]}
function renderQuestion(q,n,moduleId){return`<fieldset class="module-quiz-question" data-answer="${q.answer}"><legend><span>${n}.</span> <span class="lang-en">${esc(q.q[0])}</span><span class="lang-fa">${esc(q.q[1])}</span></legend>${q.options.map((o,j)=>`<label><input type="radio" name="mq-${moduleId}-${n}" value="${j}"><span class="lang-en">${esc(o[0])}</span><span class="lang-fa">${esc(o[1])}</span></label>`).join('')}<p class="module-quiz-explanation"><span class="lang-en">Correct answer: ${esc(q.correct[0])}</span><span class="lang-fa">پاسخ صحیح: ${esc(q.correct[1])}</span></p></fieldset>`}
data.forEach(d=>{
 const body=modules[d.index].querySelector('.module-body'),button=body.querySelector('.complete-btn'),qs=questions(d),section=document.createElement('details');
 section.className='module-quiz';section.dataset.module=d.id;
 section.innerHTML=`<summary><span><b class="lang-en">MODULE KNOWLEDGE CHECK</b><b class="lang-fa">آزمون دانش ماژول</b><small class="lang-en">10 questions · Pass mark 8/10</small><small class="lang-fa">۱۰ سؤال · حد قبولی ۸ از ۱۰</small></span><strong class="module-quiz-score">${scores[d.id]==null?'—':scores[d.id]+'/10'}</strong></summary><form>${qs.map((q,n)=>renderQuestion(q,n+1,d.id)).join('')}<button class="module-quiz-submit" type="submit"><span class="lang-en">CHECK MY ANSWERS</span><span class="lang-fa">بررسی پاسخ‌های من</span></button><div class="module-quiz-result" aria-live="polite"></div></form>`;
 body.insertBefore(section,button);
 section.querySelector('form').addEventListener('submit',event=>{
  event.preventDefault();const cards=[...section.querySelectorAll('.module-quiz-question')],fa=document.body.classList.contains('fa');let answered=0,correct=0;
  cards.forEach(card=>{const chosen=card.querySelector('input:checked');card.classList.remove('is-correct','is-wrong');if(chosen){answered++;if(Number(chosen.value)===Number(card.dataset.answer)){correct++;card.classList.add('is-correct')}else card.classList.add('is-wrong')}});
  const result=section.querySelector('.module-quiz-result');
  if(answered<10){result.textContent=fa?'لطفاً به هر ۱۰ سؤال پاسخ دهید.':'Please answer all 10 questions.';result.className='module-quiz-result show warning';return}
  scores[d.id]=correct;localStorage.setItem(quizKey,JSON.stringify(scores));section.querySelector('.module-quiz-score').textContent=correct+'/10';const passed=correct>=8;
  result.textContent=fa?(passed?'عالی! با امتیاز '+correct+' از ۱۰ قبول شدید و ماژول تکمیل شد.':'امتیاز شما '+correct+' از ۱۰ است. پاسخ‌های مشخص‌شده را مرور کرده و دوباره تلاش کنید.'):(passed?'Excellent — '+correct+'/10. You passed and the module is now complete.':'Your score is '+correct+'/10. Review the marked answers and try again.');result.className='module-quiz-result show '+(passed?'pass':'retry');
  if(passed){const progress=new Set(JSON.parse(localStorage.getItem(courseKey)||'[]'));progress.add(d.id);localStorage.setItem(courseKey,JSON.stringify([...progress]));try{completed.add(d.id);applyProgress()}catch(e){}}
  result.scrollIntoView({behavior:'smooth',block:'center'});
 });
});
window.BenarianModuleQuizScores=scores;
})();
