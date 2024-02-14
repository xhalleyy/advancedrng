import { saveToLocalStorage, getLocalStorage, removeLocalData } from "./localstorage.js";

let nameInput = document.getElementById('nameInput');
let addBtn = document.getElementById('addBtn');
let peopleAdded = document.getElementById('peopleAdded');
let groupBtn = document.getElementById('groupBtn');
let groupDiv = document.getElementById('groupDiv');
let range = document.getElementById('minmax-range');
let groupAmount = document.getElementById('minmax-range2');
let tooltip = document.getElementById('tooltip-default');
let tooltip2 = document.getElementById('tooltip-default2');
let person = "";
let individual;
let people;
let count = 0;

addBtn.addEventListener('click', () => {
    person = nameInput.value;
    const storedPeople = getLocalStorage();
    
    if (!storedPeople || !storedPeople.includes(person)) {
        addPerson(person);
        saveToLocalStorage(person);
    }
});

const onLoad = () => {
    people = getLocalStorage();

    people.map(person => {
        count++;
        let parentDiv = document.createElement('div');
        parentDiv.className = 'bg-sky-200/70 mx-72 grid grid-cols-2 py-3 my-4 items-center rounded-xl';

        let h1 = document.createElement('h1');
        h1.className = 'font-quick-med text-2xl ps-16';
        h1.textContent = person;

        let childDiv = document.createElement('div');
        childDiv.className = 'col-span-1 pe-16 flex justify-end';

        let button = document.createElement('button');
        button.type = 'button';
        button.className = 'text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 rounded-lg text-lg font-quick-reg px-5 py-2 text-center bg-opacity-85';
        button.textContent = 'Remove';

        button.addEventListener('click', () => {
            removeLocalData(person);
            parentDiv.remove();
        });

        range.max = count;
        childDiv.append(button);
        parentDiv.append(h1, childDiv);
        peopleAdded.append(parentDiv);
    });
}

onLoad();

const addPerson = (person) => {
    let parentDiv = document.createElement('div');
    parentDiv.className = 'bg-sky-200/70 mx-72 grid grid-cols-2 py-3 my-4 items-center rounded-xl';

    let h1 = document.createElement('h1');
    h1.className = 'font-quick-med text-2xl ps-16';
    h1.textContent = person;

    let childDiv = document.createElement('div');
    childDiv.className = 'col-span-1 pe-16 flex justify-end';

    let button = document.createElement('button');
    button.type = 'button';
    button.id = 'removeBtn';
    button.className = 'text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 rounded-lg text-lg font-quick-reg px-5 py-2 text-center bg-opacity-85';
    button.textContent = 'Remove';

    childDiv.append(button);
    parentDiv.append(h1, childDiv);
    peopleAdded.append(parentDiv);

    count++;
    range.max = count;

    button.addEventListener('click', () => {
        removeLocalData(person);
        parentDiv.remove();
    });
}

people = getLocalStorage();

range.addEventListener('input', () => {
    if(range.value !== 0){
        groupAmount.value = 0;
    }
    tooltip.textContent = range.value;

});

groupAmount.addEventListener('input', () => {
    if(groupAmount.value !== 0){
        range.value = 0; 
    }

    tooltip2.textContent = groupAmount.value;

})

// Create groups based on the range's value

const createGroup = (size) => {
    size = parseInt(size);

    if (size == 0) {
        alert('Invalid Group Size');
    }

    // By subtracting 0.5 from the result of Math.random(), you get a random value between -0.5 and 0.5. This random value will cause the comparison function to return negative, positive, or zero values in a random manner for different pairs of elements. sort() method shuffles the array randomly.

    const randomizer = [...people].sort(() => Math.random() - 0.5);

    // This gives us the number of groups by dividing the length of the people array by the size
    const numGroups = Math.ceil(people.length / size);

    // Array.from() creates a new, shallow-copied Array instance from an iterable or array-like object
    // Creating a new array with the length of numGroups 
    // _ means the parameter is not being used
    
    const groups = Array.from({ length: numGroups }, (_, index) => {
        const startIndex = index * size;
        return randomizer.slice(startIndex, startIndex + size)
    });

    // map through groups, if a group's length is equal to one, we take the value of that array and then add it to the first group!
    groups.map(group => {
        if(group.length == 1 && size !== 1)
        {
            individual = group.pop();
        }
    });

    groups[0].push(individual);

    // Need to store groups in local storage:
    localStorage.setItem('groups', JSON.stringify(groups));

    // console.log(groups);
    // console.log(individual);
    return groups;

}

groupBtn.addEventListener('click', () => {
    groupDiv.innerHTML = "";
    people = getLocalStorage();
    

    const groups = createGroup(range.value);
    console.log(groups);

    const diffGroups = groups.map(group => {
        let p = document.createElement('p');
        p.className = 'font-quick-med text-lg py-1';
        p.textContent = group.join(', ');
        return p;
    });

    groupDiv.append(...diffGroups);
});

