def greet(name):
    return f"你好，{name}舰长！欢迎登陆 Codex 环境！"

if __name__ == "__main__":
    name = input("请输入你的代号：")
    print(greet(name))
