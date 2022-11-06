let url = 'http://localhost:3500'

function getData(params) {
    axios.get(url + '/users')
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            reload(res.data)
            // console.log(res.data);
            }
        })
}
getData()

let form = document.forms.form

let povish = [

]

form.onsubmit = (event) => {
    event.preventDefault()
    
    let get = {
        increase: false,
        rise: false
    }
    let fm = new FormData(form)
    fm.forEach((value, key) => {
        get[key] = value
    })

    axios.post(url + "/users", get)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                getData()
            }
        })

}
let search = document.querySelector('.search')



let inMain = document.querySelector('.in_main')

function reload(arr) {
    inMain.innerHTML = ""
    
    for (let info of arr) {
        let reg1 = document.querySelector('.reg')
        let filt = document.querySelector('.filo')
        let user = document.createElement('div')
        let name = document.createElement('div')
        let span1 = document.createElement('span')
        let inp = document.createElement('input')
        let imgCookie = document.createElement('img')
        let imgTrash = document.createElement('img')
        let vse = document.querySelector('.vse')
        let img = document.createElement('img')
        // b decor
        user.classList.add('user')
        name.classList.add('name')
        inp.classList.add('pri')
        imgCookie.classList.add('pech')
        imgTrash.classList.add('trash')
        imgCookie.src = 'https://www.clipartmax.com/png/middle/20-206538_cookie-free-icon-http-cookie.png'
        imgTrash.src = 'https://image.pngaaa.com/450/1462450-middle.png'
        img.src = 'https://banner2.cleanpng.com/20180626/aiv/kisspng-star-polygons-in-art-and-culture-five-pointed-star-5b32e3a07d4456.3580985715300617285131.jpg'
        span1.innerHTML = info.name
        inp.style.type = 'number'
        img.style.display = 'none'
        inp.value = info.salary + '$'
        inp.onkeyup = () => {
            axios.patch(url + '/users/' + info.id, {
                salary: inp.value

            }
            )
            getData()
        }
        // c add
        inMain.append(user)
        user.append(name)
        name.append(span1)
        user.append(inp)
        user.append(img)
        user.append(imgCookie)
        user.append(imgTrash)
        // functions
        info.increase ? user.classList.add('item_d') : console.log()
        imgTrash.onclick = () => {
            let idx = arr.indexOf(info)
            arr.splice(idx, 1)

            axios.delete(url + '/users/' + info.id)
                .then(res => {
                    if (res.status === 200 || res.status === 201) {
                        getData()
                    }
                })
        }
        name.onclick = () => {
            if (info.increase === false) {
                axios.patch(url + '/users/' + info.id, {
                    increase: true
                })
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            // getData()
                            img.style.display = 'block'
                        }
                    })

            } else {
                img.style.display = 'none'

                axios.patch(url + '/users/' + info.id, {
                    increase: false
                })
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            getData()
                        }
                    })


            }
        }



        search.onchange = () => {


            let filtered = arr.filter(info => {
                let title = info.name.toLowerCase()
                let value = search.value.toLowerCase().trim()
                
                if (title.includes(value)) {
                    return info
                }
            })

            reload(filtered)
        }
        //         var button = document.getElementById("click"),
        filt.onclick = () => {
            console.log("hi");
            let filter = arr.filter((product) => product.salary >= 1000)
            reload(filter)
        }
        vse.onclick = () => {
            location.reload()
        }
        let count = 1;
        imgCookie.onclick = function bum(bum) {
        count += 1;
        reg1.innerHTML = + count;
        };
        info.ris ? user.classList.add('item_done') : console.log()
        imgCookie.onclick = () => {
            console.log('hi');
            if (info.ris === false) {
                count++;
                axios.patch(url + '/users/' + info.id, {
                    ris: true
                })
                .then(res => {
                    if (res.status === 200 || res.status === 201) {
                        getData()
                    }
                    })

            } else {
                count--;
                axios.patch(url + '/users/' + info.id, {
                    ris: false
                })
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            getData()
                        }
                    })
                    
                    
                }
                reload(arr)
        }
        let po = document.querySelector('.povisa')
        po.onclick = () => {
            let filter = arr.filter((product) => product.ris === true)
            reload(filter)
        }
    }
}
getData()