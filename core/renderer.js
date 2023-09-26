/**
 * 工具函数：挂载元素
 * @param {*} vnode      虚拟DOM对象
 * @param {*} container  真实DOM元素，被挂载元素
 */
function mountElement(vnode, container){
  const el = document.createElement(vnode.tag)
  //遍历 vnode.props 讲属性和事件添加到DOM元素
  for(const key in vnode.props){
    if(/^on/.test(key)){//判断事件
      el.addEventListener(
        key.substring(2).toLowerCase(),
        vnode.props[key]
      )
    }
  }

  //处理children
  if(typeof vnode.children === 'string'){
    el.appendChild(document.createTextNode(vnode.children))
  }else if(Array.isArray(vnode.children)){
    //递归调用
    vnode.children.array.forEach(child => renderer(child,el))
  }

  container.appendChild(el)
}

/**
 * 工具函数：挂载组件
 * @param {*} vnode
 * @param {*} container 
 */
function mountCompoent(vnode, container){
  //调用组件函数，获取组件的虚拟DOM
  const customEle = vnode.tag()
  renderer(customEle, container)
}
/**
 * 渲染函数
 * @param {*} vnode 
 * @param {*} container 
 */
function renderer(vnode, container){
  if(typeof vnode.tag === 'string'){
    mountElement(vnode, container)
  }else if(typeof vnode.tag === 'function'){
    mountCompoent(vnode, container)
  }
}