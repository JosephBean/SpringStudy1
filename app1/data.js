export const model = [
    {
        point : 12,
        data : [[1,0,1,0,1],[0,0,0,0,0],[1,1,0,1,1],[0,0,0,0,0],[1,0,1,0,1]]
    },{
        point : 17,
        data : [[1,0,1,0,1],[0,0,0,0,0],[1,0,1,0,1],[0,0,0,0,0],[1,0,1,0,1]]
    }, {
        point : 22,
        data : [[1,0,0,0,1],[0,0,1,0,0],[1,1,1,1,1],[0,0,1,0,0],[1,0,0,0,1]]
    }
];
export const pointEvent = () => {
    data.getDiv(data.getHistory(0)).className += " bg3";
    if(data.getHistory(1) != undefined) {
        let styles = data.getDiv(data.getHistory(1)).className.split(" ");
        data.getDiv(data.getHistory(1)).className = styles[0];
    }
}
export const dataEvent = () => {
    let html = "";
    for(let row of model[data.getId()].data) {
        let temp = "";
        for(let col of row) {
            temp += `<div class="${(col == 1) ? "bg1" : "bg2"}"></div>`;
        }
        html += `<li>${temp}</li>`;
    }
    data.getUl().innerHTML = html;
    pointEvent();
}
export const btnEvent = (e) => {
    localStorage.setItem("id", e.target.id);
    if(!data.goMove(data.getHistory(0))) data.setHistory([data.getPoint()]);
    dataEvent();
}
export const createEvent = (keyEvent) => {
    for(let btn of data.getBtn()) btn.onclick = btnEvent;
    window.addEventListener("keydown", keyEvent);
    dataEvent();
}
export const data = {
    setHistory : data => localStorage.setItem("history", JSON.stringify(data)),
    getHistory : index => {
        let history = JSON.parse(localStorage.getItem("history"));
        if(!history) history = [0];
        if(history[1] == undefined) history[0] = model[data.getId()].point;
        data.setHistory(history);
        return history[index];
    },
    setId : target => localStorage.setItem("id", (data.getId() + target) % model.length),
    getId : () => (localStorage.getItem("id")) ? Number(localStorage.getItem("id")) : 1,
    getPoint : () => model[data.getId()].point,
    getModel : (y, x) => model[data.getId()].data[y][x],
    getUl: () => document.getElementsByTagName("ul")[0],
    getDiv : index => document.getElementsByTagName("div")[index],
    getBtn : () => document.getElementsByTagName("button"),
    goKey : () => (data.getUl().firstChild.childNodes.length > 0) ? true : false,
    goMove : point => {
        let y = Math.floor(point / 5);
        let x = (point % 5);
        return (data.getModel(y, x) == 0) ? true : false;
    }
}