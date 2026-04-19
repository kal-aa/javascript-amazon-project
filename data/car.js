class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(details) {
    this.#brand = details.brand;
    this.#model = details.model;
  }

  displayInfo() {
    console.log(
      this.#brand + ": " + this.#model + ",",
      "speed",
      this.speed + "KM/hr",
    );
  }

  go() {
    if (this.speed >= 120 || this.isTrunkOpen) return;
    this.speed += 5;
  }
  brake() {
    if (this.speed <= 0) return;
    this.speed -= 5;
  }

  openTrunk() {
    if (this.speed > 0) return;
    this.isTrunkOpen = true;
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

const car1 = new Car({ brand: "Aston Martin", model: "Valkyrie" });

car1.openTrunk();
car1.go();
car1.displayInfo();

car1.closeTrunk();
car1.go();
car1.displayInfo();

car1.brake();
car1.brake();
car1.displayInfo();

class RaceCar extends Car {
  acceleration;

  constructor(details) {
    super(details);
    this.acceleration = details.acceleration;
  }

  go() {
    if (this.speed >= 300) return;
    this.speed += this.acceleration;
  }

  openTrunk() {
    console.log("Race cars don't have trunk");
  }
  closeTrunk() {
    console.log("Race cars don't have trunk");
  }
}

const raceCar1 = new RaceCar({
  brand: "Pagani",
  model: "Zonda",
  acceleration: 10,
});

raceCar1.openTrunk();

raceCar1.go();
raceCar1.displayInfo();

raceCar1.acceleration = 100;
