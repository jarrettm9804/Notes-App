let notes = [];
let selectedNoteIndex = null;

const titleText = document.getElementById("title")
const editor = document.getElementById("editor")

titleText.addEventListener("input", ()=> {
    if(selectedNoteIndex === null) return;
    notes[selectedNoteIndex].title = titleText.value 
    renderNotes();
})

    

editor.addEventListener("input", ()=> {
    if(selectedNoteIndex === null) return;
    notes[selectedNoteIndex].content = editor.value 
})

function addNoteItem(){
    console.log("Created Note Item")
    const note = {
        title: "Untitled Note",
        content: ""
    }
    notes.push(note)

    renderNotes()
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

function removeNote(){
    if(selectedNoteIndex === null) return;

    notes.splice(selectedNoteIndex, 1);

    renderNotes();

    selectedNoteIndex = null;

    titleText.value = "";
    editor.value = "";

}



    
    
