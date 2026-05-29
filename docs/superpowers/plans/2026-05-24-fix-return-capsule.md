# 修复返回上文胶囊失效实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 解决 VitePress 在 SPA 路由跳转后导致 Return Capsule（返回上文）记录错误的目标 URL 从而导致点击原地跳跃的 bug。

**架构：**
1. 在 `.vitepress/theme/index.mjs` 中，引入一个状态变量 `currentActiveUrl` 来跟踪发生实际跳转前的真正页面 URL。
2. 在路由完成跳转（`onAfterRouteChanged`）后再更新 `currentActiveUrl`。
3. 规范化路径比对（去除 `.html` 后缀与尾部斜杠），确保无论 clean URL 还是常规 URL 均能正确比对是否同页。
4. 修改 `ReturnCapsule.vue`，利用 VitePress 的 `useRouter` 执行顺滑的客户端 SPA 路由（`router.go`）。

**技术栈：** Vue 3, VitePress, SessionStorage

---

### 任务 1：规范化路径工具与活动 URL 跟踪

**文件：**
- 修改：`g:\DSmod\Mem-Wiki\.vitepress\theme\index.mjs`

- [ ] **步骤 1：引入 `currentActiveUrl` 并进行规范化 pathname 比较**

在 `index.mjs` 的 `if (typeof window !== 'undefined')` 作用域内：
- 声明活动 URL 追踪器：`let currentActiveUrl = location.href`
- 声明规范化路径函数：
  ```javascript
  const normalizePathname = (pathname) => {
    return pathname.replace(/\.html$/, '').replace(/\/$/, '')
  }
  ```
- 在 `router.onAfterRouteChanged` 中，更新 `currentActiveUrl` 记录：
  ```javascript
  router.onAfterRouteChanged = () => {
    currentActiveUrl = location.href
    triggerHighlight()
  }
  ```

- [ ] **步骤 2：重构点击拦截器以使用追踪的活动 URL**

重构 `document.addEventListener('click', ...)`，使其基于 `currentActiveUrl` 创建 `currentUrl` 对象，并使用 `normalizePathname` 安全比对页面跳转关系：

```javascript
      // Global click interceptor to record "Return Capsule" state
      document.addEventListener('click', (e) => {
        const a = e.target.closest('a')
        if (!a || !a.href) return
        
        // Only track clicks inside the actual document content (ignore sidebar/nav)
        if (!e.target.closest('.vp-doc')) return
        
        const url = new URL(a.href)
        const currentUrl = new URL(currentActiveUrl)
        
        const urlPath = normalizePathname(url.pathname)
        const currentPath = normalizePathname(currentUrl.pathname)
        const isSamePage = urlPath === currentPath
        
        // If it's a cross-page jump or a hash jump on the same page
        if (url.origin === currentUrl.origin && (!isSamePage || url.hash)) {
           // If it's an in-page jump, calculate distance to avoid "too close" jumps
           if (isSamePage && url.hash) {
             try {
               const targetId = decodeURIComponent(url.hash)
               const targetEl = document.querySelector(targetId)
               if (targetEl) {
                 const rectA = a.getBoundingClientRect()
                 const rectTarget = targetEl.getBoundingClientRect()
                 const distance = Math.abs(rectTarget.top - rectA.top)
                 
                 // If the jump distance is less than 1 viewport height, ignore it
                 if (distance < window.innerHeight) {
                   return
                 }
               }
             } catch (e) {
               // Ignore querySelector errors for invalid hashes
             }
           }

           // Find nearest heading
           let foundHeading = null
           const headings = Array.from(document.querySelectorAll('.vp-doc h1, .vp-doc h2, .vp-doc h3, .vp-doc h4'))
           for (let i = headings.length - 1; i >= 0; i--) {
              // Find the closest heading BEFORE the clicked link
              if (headings[i].compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING) {
                 // Remove trailing '#' anchor link characters added by markdown
                 foundHeading = headings[i].textContent.replace(/#$/, '').trim()
                 break
              }
           }
           
           const titleText = foundHeading || document.title.split('|')[0].trim()
           sessionStorage.setItem('mem_wiki_return_text', titleText)
           sessionStorage.setItem('mem_wiki_return_url', currentActiveUrl)
           
           // Dispatch event so ReturnCapsule can pick it up if it's an in-page hash jump
           setTimeout(() => {
             window.dispatchEvent(new Event('mem-wiki-route-changed'))
           }, 100)
        }
      })
```

- [ ] **步骤 3：本地编译验证**

运行：`npm run docs:build`
预期：PASS，能够正常打包没有 JS 语法或引用错误。

---

### 任务 2：重构胶囊组件以使用高级 SPA 路由

**文件：**
- 修改：`g:\DSmod\Mem-Wiki\.vitepress\theme\components\ReturnCapsule.vue`

- [ ] **步骤 1：引入 `useRouter` 并重构 `goBack`**

在 `ReturnCapsule.vue` 中导入 `useRouter`，并重构跳转方法以实现流畅的 SPA 折返：

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

const isVisible = ref(false)
const returnTitle = ref('')
const returnUrl = ref('')

const checkStorage = () => {
  if (typeof window !== 'undefined') {
    const title = sessionStorage.getItem('mem_wiki_return_text')
    const url = sessionStorage.getItem('mem_wiki_return_url')
    
    if (title && url) {
      returnTitle.value = title
      returnUrl.value = url
      isVisible.value = true
    } else {
      isVisible.value = false
    }
  }
}

const goBack = () => {
  if (returnUrl.value) {
    router.go(returnUrl.value)
    dismiss()
  }
}

const dismiss = () => {
  sessionStorage.removeItem('mem_wiki_return_text')
  sessionStorage.removeItem('mem_wiki_return_url')
  isVisible.value = false
}

onMounted(() => {
  checkStorage()
  window.addEventListener('mem-wiki-route-changed', checkStorage)
})

onUnmounted(() => {
  window.removeEventListener('mem-wiki-route-changed', checkStorage)
})
</script>
```

- [ ] **步骤 2：测试构建与最终验证**

运行：`npm run docs:build`
预期：PASS，客户端与服务端包均正常生成。
