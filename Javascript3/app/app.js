class car{

constructor(brand, model, year, milage, iselectric){
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.milage = milage;
    this.iselectric = iselectric;

}

getInfo(){
    var electric = this.iselectric ? "elektrisch" : "nicht elektrisch";
    return `${this.brand} ${this.model} (${this.year}) – ${this.milage} km, ${electric}`;
}

}


let cars = [
    new car("Tesla", "Model 3", 2020, 15000, true),
    new car("Volkswagen", "Golf", 2018, 30000, false),
    new car("BMW", "i3", 2019, 20000, true),
    new car("Audi", "A4", 2017, 40000, false),
    new car("Nissan", "Leaf", 2021, 10000, true)
];


// Alle Fahrzeuge ausgeben
document.write("<h1>Alle Fahrzeuge:</h1><br>");
for(let car of cars){
    document.write(car.getInfo() + "<br>");
}

document.write("<br><h1>Elektrofahrzeuge:</h1><br>");
for(let car of cars){
    if(car.iselectric){
    document.write(car.getInfo() + "<br>");
    }
}

document.write("<br><h1>Statistiken:</h1><br>");
document.write("<b>Durchschnittsalter:</b> " + getAverageAge(cars).toFixed(1) + " Jahre<br>");
document.write("<b>Fahrzeug mit maximaler Laufleistung:</b> " + getMaxMileageCar(cars).getInfo() + "<br>");


document.write("<h1>Alle Fahrzeuge nach Laufleistung sortiert:</h1><br>");
for(let car of getCarsSortedByMilage(cars)){
    document.write(car.getInfo() + "<br>");
}
// Suche nach Marke
function searchCarsByBrand(cars, brand) {
    const lowerBrand = brand.toLowerCase();
    return cars.filter(car => car.brand.toLowerCase() === lowerBrand);
}



// Suche ausführen
searchCar();




function searchCar() {
    const brand = prompt("Geben Sie eine Marke ein:");
    if (brand) {
        const results = searchCarsByBrand(cars, brand);
        document.write("<br><h1>Suchergebnisse für '" + brand + "':</h1><br>");
        if (results.length > 0) {
            for (let car of results) {
                document.write(car.getInfo() + "<br>");
            }
        } else {
            document.write("Keine Fahrzeuge gefunden.<br>");
        }
    }
}
function getCarsSortedByMilage(cars) {
    return cars.sort((a, b) =>   b.milage -a.milage);
}

function getElectricCars(cars) {
    return cars.filter(car => car.iselectric === true);
}

// b) Durchschnittsalter – berechnet das durchschnittliche Alter aller Fahrzeuge
function getAverageAge(cars) {
    if (cars.length === 0) return 0;
    const currentYear = new Date().getFullYear();
    const totalAge = cars.reduce((sum, car) => sum + (currentYear - car.year), 0);
    return totalAge / cars.length;
}

// c) Maximal-Laufleistung – liefert das Fahrzeug mit der größten mileage
function getMaxMileageCar(cars) {
    if (cars.length === 0) return null;
    return cars.reduce((max, car) => car.milage > max.milage ? car : max);
}


