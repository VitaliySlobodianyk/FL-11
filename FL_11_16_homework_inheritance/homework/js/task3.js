const myMethods = {
    evolvingSequence: function (...hierarchy) {
        for (let index = 0; index < hierarchy.length; index++) {
            if (index < hierarchy.length - 1) {
                hierarchy[index].prototype.Next = hierarchy[index + 1];
            } else {
                hierarchy[index].prototype.Next = hierarchy[index];
            }
        }
    },
    inctanceOf: function (instance, constructor) {
        return Object.getPrototypeOf(instance) === constructor.prototype;
    }
};

const Pokemon = function (name, type, specie,NextPokemon ,fly = false) {
    this.getPokemonType = function () {
        return name;
    };
    this.getSpecie = function () {
        return specie;
    };
    this.canFly = function () {
        return fly;
    };
    this.getType = function () {
        return type;
    };
    this.evolve = function () {
        if (myMethods.inctanceOf(this, NextPokemon)) {
            console.log('max level reached ');
            return this;
        }
        return new NextPokemon();
    };
};

const Charmander = function () {
    Object.assign(this, new Pokemon('Charmander', 'Fire', 'Lizard Pokémon',Charmeleon));
};
const Charmeleon = function () {
    Object.assign(this, new Pokemon('Charmeleon', 'Fire', 'Flame Pokémon',Charizard));
};
const Charizard = function () {
    Object.assign(this, new Pokemon('Charizard', 'Fire', 'Flame Pokémon',Charizard, true));
};
// myMethods.evolvingSequence(Charmander, Charmeleon, Charizard);

const Pichu = function () {
    Object.assign(this, new Pokemon('Pichu', 'Electric', 'Mouse Pokémon',Pikachu));
};
const Pikachu = function () {
    Object.assign(this, new Pokemon('Pikachu', 'Electric', 'Mouse Pokémon',Raichu));
};
const Raichu = function () {
    Object.assign(this, new Pokemon('Raichu', 'Electric', 'Mouse Pokémon',Raichu));
};
// myMethods.evolvingSequence(Pichu, Pikachu, Raichu);

//  const charmander = new Charmander();
//  const charmeleon = new Charmeleon();
//  const charizard = new Charizard();

//  console.log(charmander.getType()); // -> “Fire”
//  console.log(charmander.getType() === charmeleon.getType()); // -> true
//  console.log(charmeleon.getType() === charizard.getType()); // -> true

//  console.log(charmander.evolve().constructor === Charmeleon); // -> true
//  console.log(charmeleon.evolve().constructor === Charizard); // -> true

//  console.log(charmander.getSpecie()); // -> “Lizard Pokémon”
//  console.log(charmeleon.getSpecie()); // -> “Flame Pokémon”
//  console.log(charizard.getSpecie() === charmeleon.getSpecie()); // -> true

//  console.log(charmander.canFly()); // -> false
//  console.log(charmander.canFly() === charmeleon.canFly()); // -> true
//  console.log(charizard.canFly()); // -> true


  const pichu = new Pichu();
  console.log(pichu.getPokemonType()); // => Pichu

  const pikachu = pichu.evolve();
   console.log(pikachu.getPokemonType()); // Pikachu
   console.log(pikachu.constructor === Pikachu); // true

  const raichu = pikachu.evolve();
  console.log(raichu.getPokemonType()); // Raichu
  console.log(raichu.constructor === Raichu); // true

  const raichu2 = raichu.evolve(); // return raichu back as it's maximum level
  console.log(raichu2 === raichu); // true
