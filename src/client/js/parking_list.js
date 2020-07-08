//Array to hold parking List
const parkingList = []

//function to toggle visibility of "ADD PARKING ITEM"
const parking = () => {
    const button = document.querySelector('#add_list_wrap');
    button.classList.toggle("hidden");
}

//function to add parking Item
const add_item = () => {
    const item = document.querySelector('#item').value

    if (item == null || item == '') {
        alert("Please input an Item")
        return;
    }
    //add new item to list
    parkingList.push(item)

    let itemFragWrap = document.createDocumentFragment()
    for (let i = 0; i < parkingList.length; i++) {
        const itemFrag = document.createElement('template')
        itemFrag.innerHTML = `<span> ${parkingList[i]} </span>`

        itemFragWrap.appendChild(itemFrag.content)
    }
    console.log("Item Frag wrapper ", itemFragWrap)

    const parkingListDom = document.querySelector('#parking-list')

    //clear parkingList ro rerender
    parkingListDom.innerHTML = ''

    parkingListDom.append(itemFragWrap)
}

export { parking, add_item }