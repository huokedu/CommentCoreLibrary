# Abstractions 抽象化对应关系
KagerouEngine的虚拟实例大多数都需要有DOM内对应的实际实例，这些实例会根据不同的Host而不同，不过
我们的默认库也包括了一些我们对这些抽象化设计的理解。以下内容仅供脚本作者参考，并非所有未来的CCL脚本
引擎都会采取同样的抽象化。

以下的各个对象根据其在类列表里的地位排序。越是底层的类越靠前

## DisplayObject = DOMElement
DisplayObject是一个基础的显示控件，它是最最基础的控件，拥有可以布局排版，并且实行整块变幻的属性。
它也提供了为所有其它视觉元素支撑的 EventDispatcher 模板。所以说大部分由DisplayObject派生的类
都有一个支撑的 DOM 元素。

## Sprite&larr;DisplayObject = DIV + CANVAS
Sprite是一个比较罕见的控件，它提供了一个基础迅速的绘图空间，同时也是一个其他对象的载体。所以
Sprite本质上是一个 div。但是 div 控件却无法支持绘图，所以在其上我们提供了一套简单的高速绘图空间，
即 canvas。

## TextField&larr;DisplayObject = DIV + (SPAN)
TextField本是文字框，但是在这里常用于显示文字。可以提供基础的格式选择，很是类似一个div元素。当然
了，在对TextFormat进行操作后，div内可能会产生诸多span来保证不同的文字格式。

## Shape&larr;DisplayObject = SVG
Shape是一个图形元件，提供了很多绘图函数和多种复杂的绘图工具，由于Canvas无法满足诸多滤镜等需求，
Shape的后端是一个 SVG 图像。SVG在目前的条件下兼容性相对很好，不过缺点也明显。在绘制时，由于是在
操作DOM元素，所以会执行大量的DOM操作，产生很多DOM元素。在Shape下实现动画效果，性能会打折扣的。

## Bitmap&larr;DisplayObject = CANVAS
Bitmap是一个位点图，允许在其上进行很多像素级别的操作，这非常适合同样支持像素级操作的canvas元素。

# 潜在意义
由于  `addChild` 和 `removeChild` 方法会由各个影子对象实现，对于许多，如 Bitmap和Shape等
抽象化，我们无法真正的去添加子对象。目前版本会静默放弃，所以建议先创建一个嵌套对象，如 Sprite 等
去包裹两个对象。
