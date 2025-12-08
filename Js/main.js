async function loadPosts() {
    console.log('جاري تحميل المنشورات...');
  
    try {
        const response = await fetch('posts.json');
        console.log('حالة الاستجابة:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('البيانات المستلمة:', data);
        
        displayPosts(data.posts);
    } catch (error) {
        console.error('Error loading posts:', error);
        document.getElementById('posts-container').innerHTML = 
            `<p class="error">حدث خطأ في تحميل المنشورات: ${error.message}</p>`;
    }
}

function displayPosts(posts) {
    console.log('جاري عرض المنشورات:', posts);
    const container = document.getElementById('posts-container');
    
    if (!posts || posts.length === 0) {
        container.innerHTML = '<p class="no-posts">لا توجد منشورات حتى الآن</p>';
        console.log('لا توجد منشورات لعرضها');
        return;
    }
    
    console.log(`عدد المنشورات: ${posts.length}`);
    
    const postsHTML = posts.map(post => `
        <article class="post">
            <h2>${post.title}</h2>
            ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
            <div class="content">${post.content}</div>
            <div class="date">${post.date}</div>
        </article>
    `).join('');
    
    container.innerHTML = postsHTML;
    console.log('تم عرض المنشورات بنجاح');
}
