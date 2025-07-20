class Rabbit:
    def __init__(self, name="兔兔"):
        self.name = name
        self.hunger = 50
        self.happiness = 50
        self.energy = 50

    def rename(self, new_name: str):
        """给兔子重新命名"""
        old_name = self.name
        self.name = new_name
        print(f"从现在开始，{old_name}的新名字是 {self.name}！")

    def feed(self):
        self.hunger = max(0, self.hunger - 10)
        self.happiness += 5
        print(f"{self.name}吃得津津有味，饥饿值：{self.hunger}，开心值：{self.happiness}")

    def pet(self):
        self.happiness += 10
        print(f"{self.name}咕噜咕噜地蹭你，好开心 🐰 开心值：{self.happiness}")

    def play(self):
        if self.energy >= 10:
            self.happiness += 15
            self.hunger += 5
            self.energy -= 10
            print(
                f"{self.name}开心地和你玩耍！ 开心值：{self.happiness}，饥饿值：{self.hunger}，能量值：{self.energy}"
            )
        else:
            print(f"{self.name}太累了，想先休息一下～")

    def sleep(self):
        self.energy = min(100, self.energy + 20)
        print(f"{self.name}进入梦乡……能量值恢复到：{self.energy}")

    def status(self):
        print(f"🐰 {self.name} 状态：饥饿值={self.hunger}，开心值={self.happiness}，能量值={self.energy}")
