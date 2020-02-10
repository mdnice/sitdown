# 解决了！微信公众号数学公式排版

解决了！微信公众号数学公式排版难的问题被 `Markdown Nice` 解决了！**全网第一个解决的**！怎么还没人知道呢！

> **https://mdnice.com/** 给你最完美的解决方案！

![](https://my-wechat.mdnice.com/wechat/image_20191013231418.png)

![](https://my-wechat.mdnice.com/wechat/image_20191014001842.png)

## 行间公式

我是清晰的行间公式~

$$
\begin {aligned} c (\theta_{1}) C (\theta_{2}) =&(\cos \theta_{1}+i 
\sin \theta_{1})\left (\cos \theta_{2}+i \sin \theta_{2}\right) \\ 
=&\left\{\left (\cos \theta_{1} \cos \theta_{2}-\sin \theta_{1} \sin
\theta_{2}\right)\right.\\ &i\left (\cos \theta_{1} \sin 
\theta_{2}+\cos \theta_{2} \sin \theta_{1}\right)\} \\ =&\cos \left 
(\theta_{1}+\theta_{2}\right)+i \sin \left (\theta_{1}+\theta_{2}\right)
\\ =&c\left (\theta_{1}+\theta_{2}\right) \end {aligned}$$

我是清晰的行间公式~

$$
\left|z_{1}+z_{2}+\cdots+z_{n}\right| \leqslant\left|z_{1}\right|+\left|z_{2}\right|+\cdots+\left|z_{n}\right|.$$

我是清晰的行间公式~

$$
  \begin{pmatrix}
  1 & a_1 & a_1^2 & \cdots & a_1^n \\
  1 & a_2 & a_2^2 & \cdots & a_2^n \\
  \vdots & \vdots & \vdots & \ddots & \vdots \\
  1 & a_m & a_m^2 & \cdots & a_m^n \\
  \end{pmatrix}
$$

我是清晰的行间公式~

## 行内公式

我是整齐的行内公式~

设 $A'$，$B'$ 二点联线段的中点为 $M$, 作 $PP'$，$A^{\prime} A^{\prime \prime}, B^{\prime} B^{\prime \prime}, M A^{\prime}$ 垂直于 $A,B$
二点的联线 $l$ 由于 $M$ 是梯形 $A^{\prime} A^{\prime \prime} B^{\prime \prime} B^{\prime}$ 一个腰的 $A'$ 中点，故 $M'$ 必是另一腰 $A''B''$ 的中点。

我是整齐的行内公式~

由于 $M'$ 是 $A^{\prime \prime}B^{\prime \prime}$ 的中点，而 $\overline {A A^{\prime \prime}}=\overline 
{B B^{\prime \prime}}\left (=P P^{\prime}\right)$, 故 $M'$ 必定同时也是 $AB$ 的中点。

我是整齐的行内公式~

## 使用方法

忘记那把公式转成图片插入公众号的解决方案吧！

使用 `Markdown Nice` 结合 `LaTeX` 语法编写数学公式，一键复制到公众号中，给你飞一般的体验！

![Markdown Nice 预览图](https://my-wechat.mdnice.com/wechat/image_20191013233758.png)

在左边的编辑框写入 `Markdown` 的内容，数学公式采用 `LaTeX` 语法嵌入其中：

1、**行内公式**：将公式前后各加 1 个 `$` 符号，中间插入 `LaTeX` 语法。

```tex
一般情况下 $a+b$ 的结果
```

2、**行间公式**：将公式前后各加 2 个 `$` 符号，中间插入 `LaTeX` 语法。

```tex
$$
  \begin{pmatrix}
  1 & a_1 & a_1^2 & \cdots & a_1^n \\
  1 & a_2 & a_2^2 & \cdots & a_2^n \\
  \vdots & \vdots & \vdots & \ddots & \vdots \\
  1 & a_m & a_m^2 & \cdots & a_m^n \\
  \end{pmatrix}
$$
```

编辑器是实时渲染的，在右边可以实时看到效果。编辑完文章后点击上方工具栏的**蓝色复制按钮**，等出现下图提示：

![复制成功提示](https://my-wechat.mdnice.com/wechat/image_20191013234050.png)

就可以直接在微信公众号后台编辑器直接 `Ctrl + v` 粘贴内容了。

![微信编辑器效果](https://my-wechat.mdnice.com/wechat/image_20191013234234.png)

如果对 `LaTeX` 语法不熟悉，可参考知乎问题：[知乎上的公式是怎么打出来的？](https://www.zhihu.com/question/31298277 "知乎上的公式是怎么打出来的？")。为了优化微信公众号显示，LaTeX 公式书写建议：

1. `\tag{xxx}` 改为 `\qquad (xxx)`（避免公式被缩小）
2. 长的行内公式改为行间公式（优化断行），并适当换行。不要直接使用 `\\` 来换行，要使用 `aligned` 等对其环境。（避免公式被缩小）

**需要注意的是**：本工具排版的公式在公众号后台二次编辑的时候很容易丢失，所以尽量避免该操作。

![哇](https://my-wechat.mdnice.com/wechat/image_20191014001401.png)

这么整齐的公式！这么细致的提示！是不是已经被感动到了！还不快来试一下！

> 访问 **https://mdnice.com/** 极速体验！

感谢`@Phoebe（创始人）`、`@idx（公式终结者）`、`@云影（图床和组件化大佬）`这几位主要开发者提供的技术支持，在开源世界中始终以提升用户体验为目标而努力。

感谢所有主题设计者为用户提供优质选择。

感谢所有用户为开发者提供了诸多宝贵意见。

<span style="display:block;text-align:center;">关注公众号回复<strong>「排版」</strong>加入用户群</span>
<span style="display:block;text-align:center;">觉得公式直击灵魂，欢迎点击<strong>在看</strong>和<strong>转发</strong></span>

![](http://draw-wechat.oss-cn-hangzhou.aliyuncs.com/%E4%BA%8C%E7%BB%B4%E7%A0%81_20190823124950.gif)