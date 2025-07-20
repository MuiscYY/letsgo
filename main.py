from pet.rabbit import Rabbit

def main():
    name = input("请给你的兔子起个名字（默认 兔兔）：").strip() or "兔兔"
    rabbit = Rabbit(name=name)

    print(f"\n欢迎回来，舰长Music！我是你的电子宠物 {rabbit.name} 🐰\n")
    print("你可以输入以下指令：喂食 / 抚摸 / 玩耍 / 睡觉 / 改名 / 状态 / 退出")

    while True:
        command = input("请输入指令：").strip()
        if command == "喂食":
            rabbit.feed()
        elif command == "抚摸":
            rabbit.pet()
        elif command == "玩耍":
            rabbit.play()
        elif command == "睡觉":
            rabbit.sleep()
        elif command == "改名":
            new_name = input("新的名字：").strip()
            if new_name:
                rabbit.rename(new_name)
            else:
                print("名字不能为空哦！")
        elif command == "状态":
            rabbit.status()
        elif command == "退出":
            print("兔兔说：再见！期待与你下次见面～")
            break
        else:
            print("兔兔歪头看你：我听不懂这个指令哦 🐰？")

if __name__ == "__main__":
    main()
