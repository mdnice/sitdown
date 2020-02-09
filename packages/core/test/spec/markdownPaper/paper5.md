<section id="frontmatter">
<section id="frontmatter-left">
<img id="avatar" src="https://tva1.sinaimg.cn/large/006y8mN6gy1g73qxb4k8xj30dw0dwgmu.jpg">
<p id="name">谭淞宸</p>
</section>
<section id="frontmatter-right">
<p id="number">Vol. 15</p>
<p id="word-count">📝 2.1 千字</p>
<p id="time-estimation">🕒 5.2 分钟</p>
</section>
</section>

---

## 统计力学与分子动力学

经典统计力学告诉我们，正则系综中系统在 $2n$ 维相空间的坐标 $\mathbf x=(\mathbf q,\mathbf p)$ 应该符合正则分布，即系统处在坐标 $\mathbf x$ 附近的概率应该正比于 Boltzmann 因子 $e^{-\beta H(\mathbf x)}$。

根据统计力学的基本假设，任何宏观物理量期望值都可以表述为以 Boltzmann 因子为权重的加权平均：
$$
\langle A\rangle=\int\mathrm d\mathbf x A(\mathbf x)e^{-\beta H(\mathbf x)}
$$
也就是说，如果我们通过计算模拟的方法，能按 $e^{-\beta H(\mathbf x)}$ 对系统进行采样，在每次采样中计算物理量 $A$ 并平均，就能得到正确的期望值。

**分子动力学**提供了这样的采样方法，它假定系统在长时间的演化过程中，在扩展的微正则系综意义下等概率地经过每一个微观态，从而在正则系综中以 $e^{-\beta H(\mathbf x)}$ 为权重地经过每一个微观态。

如上假定的各态历经性并非常常能够满足。不过，对于简单系统和特定的控温条件，我们能够从理论上证明分子动力学采样等价于正则分布。

## 线性系统

我们对 Hamilton 量具有二次型形式的系统特别感兴趣：
$$
H=\frac12\mathbf p^T\mathbf T\mathbf p+\frac12\mathbf q^T\mathbf V\mathbf q
$$
这是因为：

1. 动能项天然是二次型的形式，且 $\mathbf T$ 一般是对角矩阵；
2. 势能项在微扰近似下常常能够化为谐振子势，谐振子势有利于理论分析，也是任何更精确势能的出发点；
3. 在虚时间路径积分分子动力学（PIMD）中，对*不对易动能与势能算符*进行 Trotter 因子化展开后我们将得到大量的谐振子势能项，也即我们可以用 $P$ 个自由度的经典、近线性的系统的运动来描述 $1$ 个自由度的量子系统的运动。

当 $\mathbf T$ 是数量矩阵时，我们总能够构造一个正则变换使得变换后 $\mathbf V$ 对角化，从而各自由度的运动分离，线性系统的运动完全等价于一个谐振子的运动。所以我们可以只考虑单位谐振子，其 Hamilton 量为：
$$
H=\frac12(p^2+q^2)
$$

## 随机微分方程

**随机微分方程**是一类含有随机项的微分方程，其中最基本的即是 Langevin 方程：假设粒子不受外力地在流体中运动，所受阻尼强度为 $\gamma$，温度为 $1/\beta$，则有
$$
\dot p(t)=-\gamma p(t)+\sqrt{\frac{2\gamma}{\beta}}\dot W(t)
$$
其中 $p$ 是动量，$\dot W(t)$ 是白噪音，它满足
$$
\begin{aligned}
\langle \dot W(t)\rangle&=0\\
\langle \dot W(t)\dot W(t')\rangle&=\delta(t-t')
\end{aligned}
$$
式中，$\langle\cdots\rangle$ 表示对系综的平均。

## Langevin 动力学

在无外界干扰的情况下，线性系统将按 Hamilton 正则方程演化，方程可以写作：
$$
\dot{\mathbf x}=\mathbf A\mathbf x,\mathbf A=\begin{pmatrix}
0&1\\-1&0
\end{pmatrix}
$$
现在我们在此基础上构建一个含有 Langevin 随机项的微分方程，用于模拟恒温条件下系统与大量热源中的粒子碰撞达到热平衡：
$$
\dot{\mathbf x}=\mathbf K\mathbf x+\mathbf b
$$
其中
$$
\mathbf K=\mathbf A+
\begin{pmatrix}
0&0\\0&\gamma
\end{pmatrix}\\
\mathbf b=\begin{pmatrix}
0\\\sqrt{2\gamma/\beta}\dot W
\end{pmatrix}
$$
我们现在要证明：加入 Langevin 随机项后，系统的位置与动量在长时极限下将无限接近于所需要的正则分布。

## 非齐次线性方程求解

首先，我们可以将随机项当成正常的函数项来求解一般的一阶非齐次线性方程：
$$
\begin{aligned}
\dot{\mathbf x}(t)&=\mathbf K\mathbf x(t)+\mathbf b(t)\\
\frac{\mathrm d}{\mathrm dt}\left(e^{-\mathbf Kt}\mathbf x(t)\right)&=e^{-\mathbf Kt}\mathbf b(t)\\
e^{-\mathbf Kt}\mathbf x(t)-\mathbf x(0)&=\int_0^te^{-\mathbf Ks}\mathbf b\mathrm ds
\end{aligned}
$$
最终的结果为
$$
\mathbf x(t)=e^{\mathbf Kt}\left[\mathbf x(0)+\int_0^te^{-\mathbf Ks}\mathbf b\mathrm ds\right]
$$
由于 $\mathbf x(t)$ 的积分中含有随机项，因而它是一个随机变量；且随机过程的基本知识告诉我们它一定是一个二元正则分布的随机变量。二元正则分布完全由均值向量和协方差矩阵描述，所以我们只需要求出
$$
\begin{aligned}
\mu(t)&=\langle\mathbf x(t)\rangle\\
\Sigma(t)&=\langle(\mathbf x-\mu)(t)(\mathbf x-\mu)^T(t)\rangle
\end{aligned}
$$
这两个统计学量即可。

---

首先值得注意到的是，求期望和求积分可以交换次序，而随机项 $\mathbf b$ 的期望很容易看出来为零向量：
$$
\langle\mathbf b\rangle=\begin{pmatrix}
0\\\sqrt{2\gamma/\beta}\langle\dot W\rangle
\end{pmatrix}=\mathbf 0
$$
因而均值即为
$$
\boldsymbol\mu(t)=e^{\mathbf Kt}\mathbf x(0)
$$
从而协方差矩阵为（请左右滑动查看完整公式）
$$
\begin{aligned}
&\boldsymbol\Sigma(t)\\
&=\left\langle\left[\int_0^te^{\mathbf K(t-s)}\mathbf b\mathrm ds\right]\left[\int_0^te^{\mathbf K(t-s)}\mathbf b\mathrm ds\right]^T\right\rangle\\
&=\left\langle\int_0^t\int_0^te^{\mathbf K(t-s)}\mathbf b\mathbf b^T\mathrm e^{\mathbf K^T(t-r)}\mathrm dsdr\right\rangle
\end{aligned}
$$
注意到
$$
\langle \mathbf b(s)\mathbf b^T(r)\rangle=\begin{pmatrix}0&0\\0&2\gamma\delta(s-r)/\beta\end{pmatrix}
$$
代入上式，化简即能得到：
$$
\boldsymbol{\Sigma}(t)=\frac{2 \gamma}\beta\int_{0}^{t} \exp (\mathbf Ks)\left[\begin{array}{cc}{0} & {0} \\ {0} & {1}\end{array}\right] \exp \left(\mathbf{K}^{T}s\right) \mathrm d s
$$

## 长时极限

现在我们来具体研究一下矩阵 $\mathbf K$ 的性质。它的本征值是：
$$
\lambda_\pm=\frac{-\gamma\pm\sqrt{\gamma^2-4}}{2}
$$
可见当 $\gamma>2$ 时，该矩阵本征值全部为负，那么 $e^{\mathbf Kt}$ 在 $t\to\infty$ 时趋于零矩阵。因而
$$
\boldsymbol\mu(\infty)=\mathbf 0
$$
而 $\boldsymbol\Sigma(t)$ 的长时极限则需要我们进行一番~~痛苦的~~计算，但最终我们可以得到
$$
\boldsymbol\Sigma(\infty)=\mathbf 1/\beta
$$
其中 $\mathbf 1$ 为单位矩阵。现在协方差矩阵为对角阵，说明两个变量 $q,p$ 的相关系数为 0，其分布密度函数由两个一元正态分布的乘积给出：
$$
\begin{aligned}
f(p,q)&=\frac1{2\pi\sigma_p\sigma_q}\exp\left(-\frac{(q-\mu_q)^2}{2\sigma_q^2}\right)\exp\left(-\frac{(p-\mu_p)^2}{2\sigma_p^2}\right)\\
&=\frac{\beta^2}{2\pi}\exp\left(-\frac{\beta}2(q^2+p^2)\right)
\end{aligned}
$$
注意：系统的 Hamilton 量为 $H=(q^2+p^2)/2$，因而我们算出的分布密度函数恰为
$$
f(q,p)\propto e^{-\beta H}
$$
这说明，若我们在演化充分长的时间之后对运动轨迹采样，我们就能得到正则分布。我们得到结论：

#### 任何线性系统在 Langevin 控温方案下进行恒温分子动力学演化时，长时极限下位置与动量的分布密度函数恰好等于正则分布。

## 从解析论证到数值计算

故事讲完了吗？当然没有。

在实际应用中，我们常常不能解析求解运动方程，此时就需要发展相应的离散时间方法来求解。

以上讨论的真正价值在于：当我们发展了这样的方法之后，我们可以以线性系统为例，检验这种方法*是否能像解析计算一样给出相等的多元正则分布*；如果发生偏离，我们可以据此计算离散时间方法得到的分布与系统真正的分布之间的*差距有多大、是否需要进行修正*。

---

<section id="backmatter">
<p id="end">本文结束</p>
<p id="more">关注这里，获取更多精彩内容：</p>
<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g77q459r7nj30u00u0tae.jpg">
</section>