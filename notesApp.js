let notes = [];
let selectedNoteIndex = null;

window.onload = function(){
    const saveNotes = localStorage.getItem("notes");

    if(saveNotes){
        notes = JSON.parse(saveNotes);

        renderNotes();
    }
    if(notes.length > 0){
        openNote(0)
    }
    
}

const titleText = document.getElementById("title")
const editor = document.getElementById("editor")

titleText.addEventListener("input", ()=> {
    if(selectedNoteIndex === null) return;
    notes[selectedNoteIndex].title = titleText.value 

    saveNotes();
    renderNotes();
})

    

editor.addEventListener("input", ()=> {
    if(selectedNoteIndex === null) return;
    notes[selectedNoteIndex].content = editor.value 

    saveNotes();
})

function addNoteItem(){
    console.log("Created Note Item")
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
    selectedNoteIndex = index;

    titleText.value = notes[index].title;
    editor.value = notes[index].content;
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



    
    
