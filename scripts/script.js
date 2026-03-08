

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
    const card =document.createElement("div");
    card.className="card w-96 bg-base-100 card-lg shadow-sm"
    card.innerHTML=`
     <div class="card-body">
    <div class="flex justify-between">
        <img src="./assets/Open-Status.png" alt="">
        <div id="priority" class="badge badge-primary">High</div>
    </div>
    
    <h2 id="issue-title" class="font-semibold text-lg mb-1">${issue.title}</h2>
    <p id="issue-description" class="text-xs text-gray-500 mb-3 line-clamp-2">${issue.description}</p>
    <h2 id="status"></h2>
    <div class="flex gap-2 mb-3">
        <span id="label" class="badge badge-error badge-outline text-xs ">${issue.labels}</span>
        <span id="" class="badge badge-error badge-outline text-xs">Help Wanted</span>
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