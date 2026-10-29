// ==================== VEGETABLE IMAGES ====================
import beetroots from "./Beetroots.png";
import bitterGourds from "./Bitter Gourds.png";
import brinjal from "./Brinjal.png";
import cabbage from "./Cabbage.png";
import capsicum from "./Capsicum.png";
import carrot from "./Carrot.png";
import cauliflower from "./Cauliflower.png";
import cucumber from "./Cucumber.png";
import drumstick from "./Drumstick.png";
import garlic from "./Garlic.png";
import ginger from "./Ginger.png";
import greenChili from "./Green Chili.png";
import ladyFinger from "./Lady Finger.png";
import lemon from "./Lemon.png";
import onion from "./Onion.png";
import peas from "./Peas.png";
import potato from "./Potato.png";
import pumpkin from "./Pumpkin.png";
import radish from "./Radish.png";
import tomato from "./Tomato.png";

// ==================== FRUIT IMAGES ====================
import apple from "./Apple.png";
import avocado from "./Avocado.png";
import banana from "./Banana.png";
import grapes from "./Grapes.png";
import guava from "./Guava.png";
import kiwi from "./Kiwi.png";
import oranges from "./Oranges.png";
import papaya from "./Papaya.png";
import pomegranates from "./Pomegranates.png";
import pineapple from "./Pineapple.png";
import strawberry from "./Strawberry.png";

// ==================== PULSES / DAL IMAGES ====================
import chanaDal from "./Chana Dal.png";
import lobia from "./Lobia.png";
import masoorDal from "./Masoor Dal.png";
import matkiDal from "./Matki Dal.png";
import mungDal from "./Mung Dal.png";
import rajma from "./Rajma.png";
import turDal from "./Tur Dal.png";
import uradDal from "./Urad Dal.png";

// ==================== GRAINS / CEREALS ====================
import bajra from "./Bajra.png";
import jowar from "./Jowar.png";
import poha from "./Poha.png";
import rice from "./Rice.png";
import suji from "./Suji.png";
import wheat from "./Wheat.png";

// ==================== DAILY ESSENTIALS ====================
import coffeePowder from "./Coffee Powder.png";
import coconut from "./Coconut.png";
import dates from "./Dates.png";
import jaggery from "./Jaggery.png";
import peanuts from "./Peanuts.png";
import salt from "./Salt.png";
import sugar from "./Sugar.png";
import teaPowder from "./Tea Powder.png";

// ==================== DRY FRUITS ====================
import almond from "./Almond.png";
import blackRaisins from "./Black Raisins.png";
import cashew from "./Cashew.png";
import fig from "./Fig.png";
import goldenRaisin from "./Golden Raisin.png";
import pistachio from "./Pistachio.png";
import walnut from "./Walnut.png";

// Newly added dry-fruit images
import makhana from "./Makhana.png";
import saffron from "./Saffron.png";
import goldenDriedDates from "./Golden Dried Dates.png";
import hazelnuts from "./Hazelnuts.png";

// ==================== SPICES / MASALAS ====================
import chanaMasala from "./Chana Masala.png";
import chickenMasala from "./Chicken Masala.png";
import garamMasala from "./Garam Masala.png";
import milkMasala from "./Milk Masala.png";
import muttonMasala from "./Mutton Masala.png";
import onionGarlicMasala from "./Onion Garlic Masala.png";
import paneerMasala from "./Paneer Masala.png";
import paniPuriMasala from "./Pani Puri Masala.png";
import pavBhajiMasala from "./Pav Bhaji Masala.png";
import redChiliPowder from "./Red Chili Powder.png";
import sambarMasala from "./Sambar Masala.png";
import turmericPowder from "./Turmeric Powder.png";
import Vegetables from "./Vegetables.png";
import Fruits from "./Fruits.png";
import DriedFruits from "./Dried Fruits.png";
import PulsesAndGrains from "./Pulses and Grains.png";
import Spices from "./Spices.png";
import DailyEssentials from "./Daily Essentials.png";

// ==================== PRODUCT IMAGE MAP ====================
const imageMap = {
  // Vegetables
  Tomato: tomato,
  Potato: potato,
  Onion: onion,
  Carrot: carrot,
  Cucumber: cucumber,
  "Lady Finger": ladyFinger,
  "Lady finger": ladyFinger,
  Okra: ladyFinger,
  Lemon: lemon,
  Brinjal: brinjal,
  Eggplant: brinjal,
  Beetroot: beetroots,
  Beetroots: beetroots,
  "Bitter Gourd": bitterGourds,
  "Bitter Gourds": bitterGourds,
  "Green Chili": greenChili,
  "Green Chilli": greenChili,
  Cabbage: cabbage,
  Capsicum: capsicum,
  Cauliflower: cauliflower,
  Drumstick: drumstick,
  Garlic: garlic,
  Ginger: ginger,
  Peas: peas,
  "Green Peas": peas,
  "Green Peas ": peas,
  Peans: peas,
  Pumpkin: pumpkin,
  Radish: radish,

  // Fruits
  Apple: apple,
  Avocado: avocado,
  Banana: banana,
  Grapes: grapes,
  Guava: guava,
  Kiwi: kiwi,
  Orange: oranges,
  Oranges: oranges,
  Papaya: papaya,
  Pomegranate: pomegranates,
  Pomegranates: pomegranates,
  Pineapple: pineapple,
  Strawberry: strawberry,

  // Pulses and dals
  "Chana Dal": chanaDal,
  "Chana dal": chanaDal,
  "Mung Dal": mungDal,
  "Moong Dal": mungDal,
  "Masoor Dal": masoorDal,
  "Masur Dal": masoorDal,
  "Matki Dal": matkiDal,
  Matki: matkiDal,
  "Tur Dal": turDal,
  "Toor Dal": turDal,
  "Urad Dal": uradDal,
  Lobia: lobia,
  "Lobia (Chavli)": lobia,
  "Lobia(Chavli)": lobia,
  "Lobia (Chawli)": lobia,
  "Lobia(Chawli)": lobia,
  Chavli: lobia,
  Chawli: lobia,
  Rajma: rajma,

  // Grains and cereals
  Bajra: bajra,
  Jowar: jowar,
  Poha: poha,
  Rice: rice,
  Suji: suji,
  "Semolina (Suji)": suji,
  Wheat: wheat,

  // Daily essentials
  "Coffee Powder": coffeePowder,
  Coffee: coffeePowder,
  Coconut: coconut,
  Cocount: coconut,
  Coconuts: coconut,
  Dates: dates,
  Jaggery: jaggery,
  "Jaggery (Gul)": jaggery,
  "Jaggery(Gul)": jaggery,
  "Gul (Jaggery)": jaggery,
  "Gul(Jaggery)": jaggery,
  Peanut: peanuts,
  Peanuts: peanuts,
  "Tea Powder": teaPowder,
  "Tea powder": teaPowder,
  Tea: teaPowder,
  Salt: salt,
  Sugar: sugar,

  // Dry fruits and newly added products
  Almond: almond,
  Almonds: almond,
  "Black Raisins": blackRaisins,
  "Black Raisin": blackRaisins,
  Cashew: cashew,
  Cashews: cashew,
  Fig: fig,
  Figs: fig,
  "Golden Raisin": goldenRaisin,
  "Golden Raisins": goldenRaisin,
  Pistachio: pistachio,
  Pistachios: pistachio,
  Walnut: walnut,
  Walnuts: walnut,

  Makhana: makhana,
  Foxnuts: makhana,
  "Fox Nuts": makhana,

  Saffron: saffron,

  "Golden Dried Dates": goldenDriedDates,
  "Golden Dry Dates": goldenDriedDates,
  "Yellow Dry Dates": goldenDriedDates,
  "Dry Dates": goldenDriedDates,

  Hazelnuts: hazelnuts,
  Hazelnut: hazelnuts,

  // Spices and masalas
  "Chana Masala": chanaMasala,
  "Chhole Masala": chanaMasala,
  "Chole Masala": chanaMasala,
  "Chhola Masala": chanaMasala,
  "Chana Masala Powder": chanaMasala,

  "Chicken Masala": chickenMasala,
  "Garam Masala": garamMasala,
  "Milk Masala": milkMasala,
  "Mutton Masala": muttonMasala,
  "Onion Garlic Masala": onionGarlicMasala,

  "Paneer Masala": paneerMasala,
  "Panner Masala": paneerMasala,

  "Pani Puri Masala": paniPuriMasala,
  "Pav Bhaji Masala": pavBhajiMasala,
  "Red Chili Powder": redChiliPowder,
  "Red Chilli Powder": redChiliPowder,
  "Sambar Masala": sambarMasala,
  "Turmeric Powder": turmericPowder,

  Vegetables,
Fruits,
"Dried Fruits": DriedFruits,
"Pulses and Grains": PulsesAndGrains,
Spices,
"Daily Essentials": DailyEssentials,
};

export default imageMap;