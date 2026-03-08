

//data load
const issuesContainer=document.getElementById('issuesContainer');
const loadingSpinner=document.getElementById('loadingSpinner');
let currentTab='all';
let allIssues=[];
const tabActive=['bg-blue-700','border-blue-700', 'text-white'];
const tabInactive=['bg-transparent','text-slate-700','border-slate-200','text-black'];
const allContainer=document.getElementById("all-container")
const openContainer=document.getElementById("open-container")
const closedContainer=document.getElementById("closed-container")
function switchTab(tab){
    
    currentTab=tab;
    const tabs=['all','open','closed'];

    for(const t of tabs){
        const tabName=document.getElementById('tab-'+ t);
        if(t ===tab){
            currentTab=t;
            tabName.classList.remove(...tabInactive);
            tabName.classList.add(...tabActive);
        }
        else{
            tabName.classList.remove(...tabActive);
            tabName.classList.add(...tabInactive);
        }
    }

    if(tab ==='all'){
        allContainer.classList.remove('hidden');
    }
    else if(tab==='open'){
        openContainer.classList.remove('hidden');
    }
    else if(tab==='closed'){
        closedContainer.classList.remove('hidden');
    }
    
  loadIssues()
    displayIssues(allIssues);
}
switchTab(currentTab);
function showLoading(){
    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('flex');
    issuesContainer.innerHTML="";
}
function hideLoading(){
    loadingSpinner.classList.add('hidden');  
    loadingSpinner.classList.remove('flex');  
}


async function selectIssue(issueId,btn){
    console.log(issueId,btn);
    showLoading();
}



async function loadIssues(){
    showLoading();
    const res=await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data=await res.json();
    allIssues=data.data;
   hideLoading();
displayIssues(data.data);
}



function displayIssues(issues){
console.log(issues);
issuesContainer.innerHTML='';
let filteredIssues=issues;
if(currentTab=='open'){
    filteredIssues=issues.filter(issue=>issue.status==="open");
}
else if(currentTab=='closed'){
    filteredIssues=issues.filter(issue=>issue.status==="closed");
}
filteredIssues.forEach(issue => {

    let priorityClass=" ";
    if(issue.priority=== "high"){
        priorityClass="badge-error";
    }
    else if(issue.priority=== "medium"){
        priorityClass="badge-warning";
    }
    else if(issue.priority==="low"){
        priorityClass="badge-outline"
    }

    let borderColorClass="";
    if(issue.status==="open"){
        borderColorClass="border-t-4 border-t-green-500"
    }
    else if(issue.status==='closed'){
       borderColorClass='border-t-4 border-t-purple-500' 
    }
    const card=document.createElement('div');
    card.className=`card w-full bg-base-100 shadow-sm ${borderColorClass}`;
    card.innerHTML=`
     <div class="card-body">
    <div class="flex justify-between">
        <img src="./assets/Open-Status.png" alt="">
        <div id="priority" class="badge badge-primary ${priorityClass}">${issue.priority.toUpperCase()}</div>
    </div>
    
    <h2 id="issue-title" class="font-semibold text-lg mb-1">${issue.title}</h2>
    <p id="issue-description" class="text-xs text-gray-500 mb-3 line-clamp-2">${issue.description}</p>
   
    
   
    <div class="flex gap-2 mb-3 flex-wrap">
    ${issue.labels.map(label =>`<span class="badge badge-error badge-outline text-xs">${label}</span>`).join('')}</span>
    </div>
    <div class="text-xs text-gray-400 border-t pt-2">
        <p>${issue.author}</p>
        <p>${issue.createdAt}</p>
    </div>
  </div>
  </div>
    `
    issuesContainer.appendChild(card);
  
    
});
}
switchTab('all');
loadIssues();