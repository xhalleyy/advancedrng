const saveToLocalStorage = (person) => {
    let people = getLocalStorage();

    if(!people.includes(person)){
        people.push(person);
    }

    localStorage.setItem("people", JSON.stringify(people));
}

const getLocalStorage= () => {
    let localData = localStorage.getItem("people");

    if(localData == null){
        return [];
    }

    return JSON.parse(localData);
}

const removeLocalData = (person) => {
    let people = getLocalStorage();
    let index = people.indexOf(person);
    people.splice(index, 1);
    localStorage.setItem("people", JSON.stringify(people));
}

export {saveToLocalStorage, getLocalStorage, removeLocalData}