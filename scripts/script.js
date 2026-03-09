

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
const issuesDetailsModal=document.getElementById("issues-details-modal")
const modalTitle=document.getElementById('modal-title')
const modalStatus=document.getElementById('modal-status')
const modalAuthor=document.getElementById('modal-author')
const modalCreatedAt=document.getElementById('modal-createdAt')
const modalLabels=document.getElementById('modal-labels')
const modalDescription=document.getElementById('modal-description')
const modalAssignee=document.getElementById('modal-assignee')
const modalPriority=document.getElementById('modal-priority')
const issueCount=document.getElementById('issueCount');

function switchTab(tab){
    
    currentTab=tab;
    const tabs=['all','open','closed'];

    for(const t of tabs){
        const tabName=document.getElementById('tab-'+ t);
        if(t ===tab){
            
            tabName.classList.remove(...tabInactive);
            tabName.classList.add(...tabActive);
        }
        else{
            tabName.classList.remove(...tabActive);
            tabName.classList.add(...tabInactive);
        }
    }
    showLoading();
    setTimeout(()=>{
        displayIssues(allIssues);
        hideLoading();
    },1000)
    

    if(tab ==='all'){
        allContainer.classList.remove('hidden');
    }
    else if(tab==='open'){
        openContainer.classList.remove('hidden');
    }
    else if(tab==='closed'){
        closedContainer.classList.remove('hidden');
    }
    
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
issueCount.textContent=`${filteredIssues.length} issues`;
filteredIssues.forEach(issue => {

    let priorityClass=" ";
    if(issue.priority=== "high"){
        priorityClass="badge-error";
    }
    else if(issue.priority=== "medium"){
        priorityClass="badge-warning";
    }
    else if(issue.priority==="low"){
        priorityClass="bg-gray-200 text-gray-700"
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
    
    <h2 id="issue-title" class="font-semibold text-lg mb-1" onclick="openIssueModal(${issue.id})">${issue.title}</h2>
    <p id="issue-description" class="text-xs text-gray-500 mb-3 line-clamp-2">${issue.description}</p>
   
    
   
    <div class="flex gap-2 mb-3 flex-wrap">
    ${issue.labels.map(label =>{
         let labelColorClass="";
         if(label==="bug"){
        labelColorClass="bg-red-200 text-red-600"
    }
    else if(label==="help wanted"){
        labelColorClass="bg-yellow-200 text-red-600"
    }
    else if(label==="documentation"){
        labelColorClass="bg-purple-200 text-red-700"
    }
    else if(label==="good first issue"){
        labelColorClass="bg-blue-200 text-green-700"
    }
    else if(label==="enhancement"){
        labelColorClass="bg-green-200 text-green-700"
    }
    return `<span class="badge text-xs ${ labelColorClass}">${label.toUpperCase()}</span>`}).join('')}</span>
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
async function openIssueModal(issueId){
    const res= await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
    const data= await res.json();
    const issueDetails = data.data;
    
    console.log(issueDetails,'data');
    

    modalTitle.textContent=issueDetails.title;
    modalStatus.textContent=issueDetails.status;
    modalAuthor.textContent=issueDetails.author;
    modalCreatedAt.textContent=issueDetails.createdAt;
    modalLabels.innerHTML=issueDetails.labels.map(label=>{
        let labelColorClass="";
         if(label==="bug"){
        labelColorClass="bg-red-200 text-red-600"
    }
    else if(label==="help wanted"){
        labelColorClass="bg-yellow-200 text-red-600"
    }
    else if(label==="documentation"){
        labelColorClass="bg-purple-200 text-red-700"
    }
    else if(label==="good first issue"){
        labelColorClass="bg-blue-200 text-green-700"
    }
    else if(label==="enhancement"){
        labelColorClass="bg-green-200 text-green-700"
    }
    return `<span class="badge text-xs ${ labelColorClass}">${label.toUpperCase()}</span>`}).join('');
    modalDescription.textContent=issueDetails.description;
    modalAssignee.textContent=issueDetails.assignee;
    let priorityClass=" ";
    if(issueDetails.priority=== "high"){
        priorityClass="badge-error";
    }
    else if(issueDetails.priority=== "medium"){
        priorityClass="badge-warning";
    }
    else if(issueDetails.priority==="low"){
        priorityClass="bg-gray-200 text-gray-700"
    }
    modalPriority.className=`badge ${priorityClass}`;
    modalPriority.textContent=issueDetails.priority.toUpperCase();

    issuesDetailsModal.showModal();
}

async function searchIssues(){
    const search = document.getElementById('searchInput').value;
    if(!search){
     displayIssues(allIssues);
     return;
    }
    showLoading();

    const res= await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${search}`)
    const data=await res.json();
    hideLoading();
    displayIssues(data.data);
}
switchTab('all');
loadIssues();