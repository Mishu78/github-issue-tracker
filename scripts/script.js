

//data load
const issuesContainer=document.getElementById('issuesContainer');
async function loadIssues(){
    const res=await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data=await res.json();
displayIssues(data.data);
}

function displayIssues(issues){
console.log(issues);
issues.forEach(issue => {

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
loadIssues();