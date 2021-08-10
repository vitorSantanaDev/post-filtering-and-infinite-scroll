const postsContainer = document.querySelector('#posts-container')
const loaderContainer = document.querySelector('.loader')
const filterInput = document.querySelector('#filter')

let page = 1

const getPost = async () => {
   const reponse = await 
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
   return reponse.json()
}

const generatePostsTemplate = posts => posts.map(({id, title, body}) =>`
        <div class="post">
            <div class="number">${id}</div>
            <div class="post-info">
                <h2 class="post-title">${title}</h2>
                <p class="post-body">${body}</p>
            </div>
        </div>`
).join(' ')


const addPostIntoDom = async () => {
    const posts = await getPost()
    const postsTemplate = generatePostsTemplate(posts)
    postsContainer.innerHTML += postsTemplate
}
addPostIntoDom()

const getNextPosts = () =>{
    setTimeout(() => {
        page++
        addPostIntoDom()
    }, 300)
}

const removeLoader = () => {
    setTimeout(() =>{
        loaderContainer.classList.remove('show')
        getNextPosts()
    }, 1000)
}

const showLoader = () => {
    loaderContainer.classList.add('show')
    removeLoader()
}

const handleScrollToPageBottom = () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    const isPgaeBottomAlmosReached = scrollTop + clientHeight 
        >= scrollHeight - 10

    if(isPgaeBottomAlmosReached){
       showLoader()
    }
}      



const showPostIfMatchInputValue = inputValue => post => {
    const postTitle = post.querySelector('.post-title').textContent.toLowerCase()
    const postBody = post.querySelector('.post-body').textContent.toLowerCase()
    const postContainsInputValue = postTitle.includes(inputValue) 
        || postBody.includes(inputValue)

    if(postContainsInputValue){
        post.style.display = 'flex'
        return
    }

    post.style.display = 'none'
}

const handleInputValue =  event => {
    const inputValue = event.target.value.toLowerCase()
    const posts = document.querySelectorAll('.post')

    
    posts.forEach(showPostIfMatchInputValue(inputValue))
}

window.addEventListener('scroll', handleScrollToPageBottom)
filterInput.addEventListener('input', handleInputValue)



