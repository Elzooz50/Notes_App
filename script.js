// 


const addBtn = document.getElementById("add");
const notesContainer = document.createElement("div");
notesContainer.style.display = "flex";
notesContainer.style.flexWrap = "wrap";
notesContainer.style.gap = "15px";
notesContainer.style.padding = "20px";
document.body.appendChild(notesContainer);

const notes = JSON.parse(localStorage.getItem("notes")) || [];

notes.forEach((note) => addNewNote(note));

addBtn.addEventListener("click", () => addNewNote());

function addNewNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");
    note.style.width = "250px";
    note.style.padding = "15px";
    note.style.backgroundColor = "#fff";
    note.style.borderRadius = "10px";
    note.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
    note.style.display = "flex";
    note.style.flexDirection = "column";
    note.style.justifyContent = "space-between";
    note.style.minHeight = "200px";

    note.innerHTML = `
        <div class="tools" style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <button class="edit" style="background: none; border: none; cursor: pointer; font-size: 18px; color: #6A0DAD;">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete" style="background: none; border: none; cursor: pointer; font-size: 18px; color: red;">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
        <div class="main" style="display: ${text ? 'block' : 'none'}; overflow-wrap: break-word;"></div>
        <textarea style="width: 100%; height: 100px; resize: none; display: ${text ? 'none' : 'block'};">${text}</textarea>
    `;

    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");
    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    main.innerHTML = marked(text);

    editBtn.addEventListener("click", () => {
        main.style.display = main.style.display === "none" ? "block" : "none";
        textArea.style.display = textArea.style.display === "none" ? "block" : "none";
    });

    deleteBtn.addEventListener("click", () => {
        note.remove();
        updateLS();
    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLS();
    });

    notesContainer.appendChild(note);
    updateLS();
}

function updateLS() {
    const notesText = document.querySelectorAll("textarea");
    const notes = Array.from(notesText).map((note) => note.value);
    localStorage.setItem("notes", JSON.stringify(notes));
}
