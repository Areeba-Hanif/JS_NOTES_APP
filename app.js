const addBtn = document.querySelector("#add-note");
const main = document.querySelector("#hero");

const saveNote = () => {
    const notes = document.querySelectorAll(".Note textarea");
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value);

        }
    )
    if (data.length == 0) {
        localStorage.removeItem("notes");
    }
    else {
        // console.log(data);
        localStorage.setItem("notes", JSON.stringify(data)); // to store notes data in Local Storage 
    }


}
const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("Note");
    note.innerHTML =
        `
    <div class="nav">
    <button id="save">Save</button>
    <button id="delete">Delete</button>

    </div>
    <textarea>${text}</textarea>

`;
    note.querySelector("#delete").addEventListener(
        'click', function () {
            note.remove();
            saveNote();   // this is call for updation in local storage when note has removed
        }

    )

    note.querySelector("textarea").addEventListener(
        "focusout",
        function () {
            saveNote();

        }
    )

    note.querySelector("#save").addEventListener(
        'click', function () {
            saveNote();
        }
    )
    main.appendChild(note);
    saveNote();   // this is call for save empty note in local storage

}

// this is self calling function when page refreshes
(
    function () {
        const lsnotes = JSON.parse(localStorage.getItem("notes"));


        if (lsnotes == null) {
            addNote();  // this is for when a page refreshes an empty note will display
        } else {
            lsnotes.forEach(
                (lsnote) => {
                    addNote(lsnote);
                }
            )
        }



    }
)()

addBtn.addEventListener(
    'click', function () {
        addNote();


    }
)