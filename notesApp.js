let notes = [];
let selectedNoteIndex = null;

window.onload = function(){
    const saveNotes = localStorage.getItem("notes");

    if(saveNotes){
        notes = JSON.parse(saveNotes);
    }
    document.getElementById("content").style.display = "none"
    renderNotes();
    renderDashboard();
}

const titleText = document.getElementById("title")
const editor = document.getElementById("editor")

function showEditor(){
    searchPage.classList.add("hidden");

    dashboard.style.display = "none";
    content.style.display = "flex";
}

titleText.addEventListener("input", ()=> {
    if(selectedNoteIndex === null) return;
    notes[selectedNoteIndex].title = titleText.value 

    saveNotes();
    renderNotes();
})



editor.addEventListener("input", ()=> {
    if(selectedNoteIndex === null) return;
    notes[selectedNoteIndex].content = editor.value 
    let saveTimer;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        saveNotes();
        
    },1000)
    
})

function showDashboard(){
    searchPage.classList.add("hidden");

    content.style.display = "none";
    dashboard.style.display = "block";
}

function renderDashboard(){
    const dashboard = document.getElementById("dashboard")

    dashboard.innerHTML = "";
    if(notes.length === 0){
        return;
    }

    const heading = document.createElement("h2");
    heading.textContent = "Saved Notes";

    dashboard.appendChild(heading);

    notes.forEach((note, index) => {
        const noteButton = document.createElement("button")
        noteButton.textContent = note.title;
        noteButton.classList.add("dashboard-note");

        noteButton.addEventListener("click", () => {
            openNote(index);
        });

        dashboard.appendChild(noteButton);
    })
}

function addNoteItem(){
    
    const note = {
        title: "Untitled Note",
        content: ""
    }
    notes.push(note)

    saveNotes();
    renderNotes();
    openNote(notes.length - 1)
    }
    

function renderNotes(){
    const notesList = document.getElementById("notesList")
    notesList.innerHTML = ""

    notes.forEach((note, index) => {
        const noteItem = document.createElement("button")
        noteItem.classList.add("note-item");
        
        noteItem.textContent = note.title

        noteItem.addEventListener("click", () => {
            openNote(index);
        })

        notesList.appendChild(noteItem)
    })   
}

function openNote(index){
    hideSearchPage();
    
    selectedNoteIndex = index;

    titleText.value = notes[index].title;
    editor.value = notes[index].content;

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("content").style.display = "flex"
    showEditor();
}

document.getElementById("deleteBtn").addEventListener("click", showDeleteModal)

function removeNote(){
    if(selectedNoteIndex === null) return;
    notes.splice(selectedNoteIndex, 1);

    saveNotes();
    renderNotes();

    selectedNoteIndex = null;

    titleText.value = "";
    editor.value = "";

}

function showDeleteModal(){
    document.getElementById("deleteModal").classList.add("show")

}

function hideDeleteModal(){
    document.getElementById("deleteModal").classList.remove("show")
}

document.getElementById("cancelDeleteBtn").addEventListener("click", hideDeleteModal);
document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
    removeNote();
    hideDeleteModal();
})

function saveNotes(){
    localStorage.setItem("notes", JSON.stringify(notes));
}

function searchNotes(keyword){
    return notes.map((note, index)=>({
            note,
            originalIndex: index
        })).filter(({ note }) => 
        note.title.toLowerCase().includes(keyword) ||
        note.content.toLowerCase().includes(keyword)
    );
}


document.getElementById("searchBtn").addEventListener("click", performSearch);
searchBar.addEventListener("keydown", (event) => {
    if(event.key=== "Enter"){
        performSearch();
    }
})



function performSearch(){
    hideSearchResults()
    
    const keyword = searchBar.value.toLowerCase();
    

    const matchingNotes = searchNotes(keyword);
    if(searchBar.value !== ""){
    renderSearchPage(matchingNotes);


    showSearchPage();
    }
    searchBar.value=""
}

function renderSearchPage(matchingNotes){
    const searchPage = document.getElementById("searchPage");
    
    searchPage.innerHTML = "";
    const heading = document.createElement("h2");
    
        heading.textContent = `There ${matchingNotes.length === 1 ? "was" : "were"} ${matchingNotes.length}`+
        `${matchingNotes.length === 1 ? " match":" matches"}` + ` for keyword "${searchBar.value}"`;
        searchPage.appendChild(heading)
    matchingNotes.forEach((match)=> {
        

        const result = document.createElement("div");
        
        result.classList.add("search-result-page");
        result.textContent = match.note.title;
        
        

        searchPage.appendChild(result);
        console.log("adding:", match.note.title);
    })
    
    
    console.log("searchPage:", searchPage);
    console.log("matches:", matchingNotes.length);
}

function showSearchPage(){
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("content").style.display = "none";
    
    searchPage.classList.remove("hidden");
}

const searchPage = document.getElementById("searchPage");
function hideSearchPage(){
    document.getElementById("searchPage").classList.add("hidden");
}

let searchTimer;
const searchResults = document.getElementById("searchResults")
function hideSearchResults(){
searchResults.innerHTML = ""
}
searchBar.addEventListener("input", () => {
    const keyword = searchBar.value.toLowerCase();
    
    
    const matchingNotes = searchNotes(keyword);
    
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        if(keyword === ""){
        hideSearchResults()
        return;
    } 
        renderSearchResults(matchingNotes)
    },300)
        
    })

function renderSearchResults(matchingNotes){
    const searchResults = document.getElementById("searchResults");

    searchResults.innerHTML="";

    matchingNotes.forEach((match) => {
        const result = document.createElement("div");

        result.classList.add("search-result");
        result.textContent = match.note.title;

        result.addEventListener("click", ()=> {
            openNote(match.originalIndex);
            searchResults.innerHTML = ""
        });

        searchResults.appendChild(result);
    })
}
    
    
