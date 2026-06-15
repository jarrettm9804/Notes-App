let notes = [];

const titleText = document.getElementById("title")
const editor = document.getElementById("editor")



titleText.addEventListener("input", ()=> {
    console.log("Saving Title value")
    localStorage.setItem("title", titleText.value)
})

editor.addEventListener("input", ()=> {
    console.log("Saving Editor value")
    localStorage.setItem("note", editor.value)
})


titleText.value = localStorage.getItem("title") || "";
editor.value = localStorage.getItem("note") || "";

function addNoteItem(){
    console.log("Created Note Item")
    const note = {
        title: "Untitled Note",
        content: ""
    }
    notes.push(note)

    renderNotes()
    console.log(notes)
    }
    

    function renderNotes(){
        const notesList = document.getElementById("notesList")
        notesList.innerHTML = ""

        notes.forEach((note) => {
            const noteItem = document.createElement("button")
            noteItem.classList.add("note-item");
            
            noteItem.textContent = note.title

            notesList.appendChild(noteItem)
        })
        

        /* noteItem.addEventListener("click", () => {
            console.log("Open note item")
        }) */
    }



    
    
