from pet.rabbit import Rabbit

def main():
    rabbit = Rabbit(name="兔兔")

    print(f"\n欢迎回来，舰长Music！我是你的电子宠物 {rabbit.name} 🐰\n")
    print("你可以输入以下指令：喂食 / 抚摸 / 玩耍 / 命名 / 睡觉 / 状态 / 退出")

    while True:
        command = input("请输入指令：").strip()
        if command == "喂食":
            rabbit.feed()
        elif command == "抚摸":
            rabbit.pet()
        elif command == "玩耍":
            rabbit.play()
        elif command == "帮助":
            print("可用指令：喂食 / 抚摸 / 玩耍 / 命名 / 睡觉 / 状态 / 退出")
        elif command == "命名":
            new_name = input("给兔兔起个名字吧：").strip()
            if new_name:
                rabbit.rename(new_name)
            else:
                print("名字不能为空哦~")
        elif command == "睡觉":
            rabbit.sleep()
        elif command == "状态":
            rabbit.status()
        elif command == "退出":
            print("兔兔说：再见！期待与你下次见面～")
            break
        else:
            print("兔兔歪头看你：我听不懂这个指令哦 🐰？")

if __name__ == "__main__":
    main()
