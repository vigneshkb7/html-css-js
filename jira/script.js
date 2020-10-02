function dragStart(ev){
    ev.dataTransfer.setData("text",ev.target.id)
}

function dragOver(ev){
    ev.preventDefault();
}

function drop(ev){
    const id = ev.dataTransfer.getData("text");
    console.log(id)
    const draggableEle = document.getElementById(id);
    const dropzone = ev.target;
    dropzone.appendChild(draggableEle);
    ev.dataTransfer.clearData();

}