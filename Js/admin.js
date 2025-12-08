// متغير لتخزين المنشورات
let posts = [];

// دالة لتحميل المنشورات
async function loadPostsForAdmin() {
    try {
        const response = await fetch('posts.json');
        const data = await response.json();
        posts = data.posts || [];
        displayPostsForAdmin();
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

// دالة لعرض المنشورات في لوحة التحكم
function displayPostsForAdmin() {
    const container = document.getElementById('posts-list');
    
    if (posts.length === 0) {
        container.innerHTML = '<p>لا توجد منشورات</p>';
        return;
    }
    
    const postsHTML = posts.map((post, index) => `
        <div class="admin-post">
            <h3>${post.title}</h3>
            <button onclick="deletePost(${index})">حذف</button>
            <button onclick="editPost(${index})">تعديل</button>
        </div>
    `).join('');
    
    container.innerHTML = postsHTML;
}

// دالة لإضافة منشور جديد
document.getElementById('post-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const newPost = {
        id: Date.now(), // معرف فريد
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
        date: new Date().toISOString().split('T')[0],
        image: document.getElementById('image').value || ''
    };
    
    posts.push(newPost);
    
    try {
        // حفظ في ملف posts.json
        await savePosts();
        
        // إعادة تعيين النموذج
        this.reset();
        
        // تحديث العرض
        displayPostsForAdmin();
        
        alert('تم إضافة المنشور بنجاح!');
    } catch (error) {
        console.error('Error saving post:', error);
        alert('حدث خطأ أثناء حفظ المنشور');
    }
});

// دالة لحفظ المنشورات
async function savePosts() {
    const data = { posts };
    
    // في بيئة GitHub Pages، نحتاج لحل بديل للتخزين
    // هذا مثال باستخدام localStorage (للاختبار المحلي)
    localStorage.setItem('blogPosts', JSON.stringify(data));
    
    // للاستخدام الحقيقي، قد تحتاج لاستخدام:
    // 1. GitHub API
    // 2. قاعدة بيانات خارجية
    // 3. خدمة تخزين سحابية
}

// دالة لحذف منشور
function deletePost(index) {
    if (confirm('هل أنت متأكد من حذف هذا المنشور؟')) {
        posts.splice(index, 1);
        savePosts();
        displayPostsForAdmin();
    }
}

// دالة لتعديل منشور
function editPost(index) {
    const post = posts[index];
    document.getElementById('title').value = post.title;
    document.getElementById('content').value = post.content;
    document.getElementById('image').value = post.image || '';
    
    // إزالة المنشور القديم
    posts.splice(index, 1);
    
    alert('يمكنك الآن تعديل المنشور');
}

// تحميل المنشورات عند فتح الصفحة
document.addEventListener('DOMContentLoaded', loadPostsForAdmin);
