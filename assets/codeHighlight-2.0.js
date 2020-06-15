/**
 * @author: Storm
 * @email: wenyejie@foxmail.com
 */

// 载入高亮css <link rel="stylesheet" href="../assets/prism.css" />
const $link = document.createElement('link')
$link.setAttribute('rel', 'stylesheet')
$link.href = '../assets/prism.css'
document.head.appendChild($link)

// 载入相关HTML
const $wrap = document.createElement('div')
$wrap.innerHTML =
  '<pre><code\n' +
  '  data-code-highlight="javascript"\n' +
  '  class="language-javascript"></code></pre>\n' +
  '    <div>\n' +
  '      结果为:\n' +
  '      <pre ><code id="result" class="language-json"></code></pre>\n' +
  '    </div>'

const $code = document.querySelector('script[data-code-highlight="javascript"]')

document.body.insertBefore($wrap, $code)

const $result = document.querySelector('#result')
$result.innerHTML = JSON.stringify(window.demo, null, 2)

const $view = document.querySelector('code[data-code-highlight="javascript"]')

$view.innerHTML = $code.innerText.replace(/(?<=\n)[ ]{6}/g, '')

// 载入高亮代码
const $script = document.createElement('script')
$script.src = '../assets/prism.js'
document.body.appendChild($script)
