function toggle(index) {
    console.log(index)
    let aForm = document.querySelector('.num' + index);
    aForm.classList.toggle('hide');
}