# 深入Vue3+TypeScript技术栈

试一下在vscode git push还有没有报以上错误信息 : you don't have permissions to push to on GitHub.Would you like to create a fork and push to it instead

试一下 在 vscode 能不能 push 上去（bash 可以）

> vscode push 成功
>
> 讲一下几个注意点
>
> - ssh验证，`ssh -T git@github.com` 连接成功会输出打招呼语，别用 `ssh -T Benn314@github.com` 百分百失败
>
> - `git reset HEAD~1` 是将 HEAD 指针向前移动一个提交的命令，同时保留工作目录和索引中的修改。这相当于执行一个混合重置（mixed reset）。
>
> - 创建SSH Key并命名为 id_rsa_github `ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f ~/.ssh/id_rsa_github` 存储在 `C:\Users\ben.qiu\.ssh`
>
> - `cat ~/.ssh/id_rsa.pub | clip` 将公钥部署到github的个人SSH页，不建议直接部署在存储库的SSH Key（网上说的）
>
> - 添加key（私钥）到本地的ssh代理
>
>   ```bash
>   eval "$(ssh-agent -s)"
>   ssh-add ~/.ssh/id_rsa_github
>   ```
>
> - 在C:\Users\ben.qiu\\.ssh目录下创建配置文件config，内容为：
>
>   ```config
>   Host github.com
>   HostName github.com
>   User git
>   IdentityFile ~/.ssh/id_rsa_github
>   ```
>
> - 完成，成功推送~

参考链接：

- [git ssh key Permission denied解决过程](https://zhuanlan.zhihu.com/p/574062097)

- 详细ssh进阶配置见：`学习日报\7月10日.md`
