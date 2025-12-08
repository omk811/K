// دالة لجلب وعرض المنشورات
async function loadPosts() {
    try {
        const response = await fetch('posts.json');
        const data = await response.json();
        displayPosts(data.posts);
    } catch (error) {
        console.error('Error loading posts:', error);
        document.getElementById('posts-container').innerHTML = 
            '<p class="error">حدث خطأ في تحميل المنشورات</p>';
    }
}

// دالة لعرض المنشورات في الصفحة
function displayPosts(posts) {
    const container = document.getElementById('posts-container');
    
    if (!posts || posts.length === 0) {
        container.innerHTML = '<p class="no-posts">لا توجد منشورات حتى الآن</p>';
        return;
    }
    
    const postsHTML = posts.map(post => `
        <article class="post">
            <h2>${post.title}</h2>
            ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
            <div class="content">${post.content}</div>
            <div class="date">${post.date}</div>
        </article>
    `).join('');
    
    container.innerHTML = postsHTML;
}

// تحميل المنشورات عند فتح الصفحة
document.addEventListener('DOMContentLoaded', loadPosts);
